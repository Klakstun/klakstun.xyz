import indexHtml from "./html/index.html";
import uploadHtml from "./html/upload.html";
import downloadHtml from "./html/download.html";
import adminHtml from "./html/admin.html";
import error404Html from "./error/404.html";

import commonCss from "./css/common.css";
import indexCss from "./css/index.css";
import uploadCss from "./css/upload.css";
import downloadCss from "./css/download.css";
import styleCss from "./css/style.css";

const VERSION = "admin-1";

const TOKEN_LEN = 16;
const TOKEN_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TOKEN_RE = /^[A-Za-z0-9]{16}$/;

const HOUR_MS = 3600 * 1000;
const DEFAULT_TTL_HOURS = 24;
const DEFAULT_MAX_DOWNLOADS = 1;
const MAX_DOWNLOADS_LIMIT = 10;
const ORPHAN_MAX_AGE_MS = 8 * 24 * HOUR_MS; // 没有过期信息的旧文件，最长保留 8 天
const GRACE_MS = 2 * HOUR_MS; // 上传/下载进行中的宽限期
const SCAN_MAX_PAGES = 10; // 每个前缀最多扫描 10 页（每页 1000 个对象）
const ADMIN_LIST_LIMIT = 30;

function genToken() {
  const bytes = new Uint8Array(TOKEN_LEN);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < TOKEN_LEN; i++) out += TOKEN_CHARS[bytes[i] % TOKEN_CHARS.length];
  return out;
}

// 合法有效期：1~24 小时，或 48/72/96/120/144/168 小时
function parseTtlHours(raw) {
  const h = parseInt(raw, 10);
  if (Number.isInteger(h)) {
    if (h >= 1 && h <= 24) return h;
    if (h >= 48 && h <= 168 && h % 24 === 0) return h;
  }
  return DEFAULT_TTL_HOURS;
}

// 合法下载次数：1~10
function parseMaxDownloads(raw) {
  const n = parseInt(raw, 10);
  if (Number.isInteger(n) && n >= 1 && n <= MAX_DOWNLOADS_LIMIT) return n;
  return DEFAULT_MAX_DOWNLOADS;
}

const CSS = {
  common: commonCss,
  index: indexCss,
  upload: uploadCss,
  download: downloadCss,
  style: styleCss,
};

function inlineCss(src) {
  return String(src).replace(
    /<link\b[^>]*href=["'][^"']*\/css\/([\w-]+)\.css["'][^>]*>/gi,
    (m, name) =>
      CSS[name] !== undefined ? "<style>\n" + CSS[name] + "\n</style>" : m
  );
}

const html = (body, status = 200) =>
  new Response(inlineCss(body), {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
    },
  });

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const aiJson = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
  });

const PAGES = {
  "": indexHtml,
  index: indexHtml,
  upload: uploadHtml,
  download: downloadHtml,
};

function pageKey(pathname) {
  let p = pathname.replace(/\/+/g, "/");
  if (p.startsWith("/html/")) p = p.slice(5);
  p = p.replace(/\.html$/, "");
  p = p.replace(/^\/+|\/+$/g, "");
  return p;
}

// ---------------------------------------------------------------
// R2 基础操作
// ---------------------------------------------------------------

async function purge(env, token) {
  try {
    await env.BUCKET.delete([`file_${token}`, `state_${token}`]);
  } catch (e) {
    try { await env.BUCKET.delete(`file_${token}`); } catch {}
    try { await env.BUCKET.delete(`state_${token}`); } catch {}
  }
}

async function purgeMany(env, tokens) {
  for (let i = 0; i < tokens.length; i += 500) {
    const keys = [];
    for (const t of tokens.slice(i, i + 500)) {
      keys.push(`file_${t}`, `state_${t}`);
    }
    try {
      await env.BUCKET.delete(keys);
    } catch (e) {
      for (const t of tokens.slice(i, i + 500)) await purge(env, t);
    }
  }
}

async function putState(env, token, remaining, expiresAt, maxDownloads) {
  await env.BUCKET.put(
    `state_${token}`,
    JSON.stringify({ remaining, maxDownloads, expiresAt }),
    {
      httpMetadata: { contentType: "application/json" },
      customMetadata: {
        expiresAt: String(expiresAt || 0),
        remaining: String(remaining),
        maxDownloads: String(maxDownloads),
      },
    }
  );
}

async function listAll(env, prefix, withMeta) {
  const objects = [];
  let cursor;
  for (let i = 0; i < SCAN_MAX_PAGES; i++) {
    const opts = { prefix, cursor, limit: 1000 };
    if (withMeta) opts.include = ["customMetadata"];
    const r = await env.BUCKET.list(opts);
    for (const o of r.objects) objects.push(o);
    if (!r.truncated) return { objects, truncated: false };
    cursor = r.cursor;
  }
  return { objects, truncated: true };
}

function buildIndex(states, files, now) {
  const map = new Map();
  for (const o of states) {
    const t = o.key.slice("state_".length);
    map.set(t, { token: t, state: o, file: null });
  }
  for (const o of files) {
    const t = o.key.slice("file_".length);
    const e = map.get(t);
    if (e) e.file = o;
    else map.set(t, { token: t, state: null, file: o });
  }

  const items = [];
  for (const e of map.values()) {
    const md = (e.state && e.state.customMetadata) || {};
    const exp = Number(md.expiresAt) || 0;
    const remaining = md.remaining !== undefined ? Number(md.remaining) : null;
    const maxDl = md.maxDownloads !== undefined ? Number(md.maxDownloads) : null;
    const uploaded = new Date((e.file || e.state).uploaded).getTime();
    const stateTime = e.state ? new Date(e.state.uploaded).getTime() : uploaded;

    let status;
    if (!e.state) status = now - uploaded > GRACE_MS ? "orphan_file" : "uploading";
    else if (!e.file) status = now - stateTime > GRACE_MS ? "orphan_state" : "finishing";
    else if (exp > 0 && exp <= now) status = "expired";
    else if (now - uploaded > ORPHAN_MAX_AGE_MS) status = "expired";
    else if (remaining === 0) status = now - stateTime > GRACE_MS ? "stuck" : "finishing";
    else status = "active";

    items.push({
      token: e.token,
      status,
      size: e.file ? e.file.size : 0,
      uploaded,
      expiresAt: exp || null,
      remaining,
      maxDownloads: maxDl,
    });
  }
  return items;
}

async function sweep(env, trigger) {
  const now = Date.now();
  const [s, f] = await Promise.all([
    listAll(env, "state_", true),
    listAll(env, "file_", false),
  ]);
  const items = buildIndex(s.objects, f.objects, now);

  const result = {
    at: now,
    trigger,
    scanned: items.length,
    expired: 0,
    orphans: 0,
    stuck: 0,
    truncated: s.truncated || f.truncated,
  };
  const doomed = [];
  for (const it of items) {
    if (it.status === "expired") { result.expired++; doomed.push(it.token); }
    else if (it.status === "orphan_file" || it.status === "orphan_state") { result.orphans++; doomed.push(it.token); }
    else if (it.status === "stuck") { result.stuck++; doomed.push(it.token); }
  }
  await purgeMany(env, doomed);

  try {
    await env.BUCKET.put("meta_sweep", JSON.stringify(result), {
      httpMetadata: { contentType: "application/json" },
    });
  } catch {}
  return result;
}

// ---------------------------------------------------------------
// 运维后台
// ---------------------------------------------------------------

async function sha256(s) {
  return new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))
  );
}

async function checkAdmin(request, env) {
  if (!env.ADMIN_TOKEN) return "unconfigured";
  const m = (request.headers.get("authorization") || "").match(/^Bearer (.+)$/);
  if (!m) return false;
  const [a, b] = await Promise.all([sha256(m[1]), sha256(String(env.ADMIN_TOKEN))]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

const adminJson = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });

const adminPage = () =>
  new Response(adminHtml, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });

async function collectStats(env) {
  const now = Date.now();
  const [s, f] = await Promise.all([
    listAll(env, "state_", true),
    listAll(env, "file_", false),
  ]);
  const items = buildIndex(s.objects, f.objects, now);

  const counts = {};
  let totalBytes = 0;
  let oldest = null;
  for (const it of items) {
    counts[it.status] = (counts[it.status] || 0) + 1;
    totalBytes += it.size;
    if (it.uploaded && (oldest === null || it.uploaded < oldest)) oldest = it.uploaded;
  }

  items.sort((a, b) => b.uploaded - a.uploaded);
  const list = items.slice(0, ADMIN_LIST_LIMIT).map((it) => ({
    id: it.token.slice(0, 4) + "************",
    status: it.status,
    size: it.size,
    uploaded: it.uploaded,
    expiresAt: it.expiresAt,
    remaining: it.remaining,
    maxDownloads: it.maxDownloads,
  }));

  let lastSweep = null;
  try {
    const o = await env.BUCKET.get("meta_sweep");
    if (o) lastSweep = await o.json();
  } catch {}

  return {
    now,
    total: items.length,
    counts,
    totalBytes,
    oldest,
    truncated: s.truncated || f.truncated,
    list,
    lastSweep,
  };
}

function serverInfo(env) {
  const len = (v) => (v == null ? null : String(v).length);
  return {
    version: VERSION,
    bucketBound: !!(env && env.BUCKET),
    cron: "0 * * * *",
    limits: {
      maxDownloads: MAX_DOWNLOADS_LIMIT,
      maxTtlHours: 168,
      graceHours: GRACE_MS / HOUR_MS,
      legacyMaxDays: ORPHAN_MAX_AGE_MS / (24 * HOUR_MS),
    },
    bundle: {
      "index.html": len(indexHtml),
      "upload.html": len(uploadHtml),
      "download.html": len(downloadHtml),
      "admin.html": len(adminHtml),
      "404.html": len(error404Html),
      "common.css": len(commonCss),
      "index.css": len(indexCss),
      "upload.css": len(uploadCss),
      "download.css": len(downloadCss),
      "style.css": len(styleCss),
    },
  };
}

async function selfTest(env) {
  const key = "meta_selftest_" + genToken();
  const out = { ok: false };
  try {
    let t = Date.now();
    await env.BUCKET.put(key, "ok");
    out.putMs = Date.now() - t;

    t = Date.now();
    const o = await env.BUCKET.get(key);
    const txt = o ? await o.text() : null;
    out.getMs = Date.now() - t;
    out.readBack = txt === "ok";

    t = Date.now();
    await env.BUCKET.delete(key);
    out.deleteMs = Date.now() - t;
    out.deleted = (await env.BUCKET.head(key)) === null;

    out.ok = out.readBack && out.deleted;
  } catch (e) {
    out.error = String((e && e.message) || e);
    try { await env.BUCKET.delete(key); } catch {}
  }
  return out;
}

async function handleAdminApi(request, url, env) {
  const auth = await checkAdmin(request, env);
  if (auth === "unconfigured") {
    return adminJson({ error: "服务端未配置 ADMIN_TOKEN" }, 503);
  }
  if (!auth) {
    await new Promise((r) => setTimeout(r, 500));
    return adminJson({ error: "unauthorized" }, 401);
  }

  const path = url.pathname;
  try {
    if (request.method === "GET" && path === "/admin/api/stats") {
      return adminJson({ ...(await collectStats(env)), server: serverInfo(env) });
    }
    if (request.method === "POST" && path === "/admin/api/sweep") {
      return adminJson(await sweep(env, "manual"));
    }
    if (request.method === "POST" && path === "/admin/api/selftest") {
      return adminJson(await selfTest(env));
    }
  } catch (e) {
    return adminJson({ error: String((e && e.message) || e) }, 500);
  }
  return adminJson({ error: "not found" }, 404);
}

function debugResponse(request, url, env) {
  const info = (name, v) =>
    name + ": " + typeof v + " len=" + (v == null ? "null" : String(v).length);
  const lines = [
    "worker version: " + VERSION,
    "",
    "[bundle]",
    info("common.css", commonCss),
    info("index.css", indexCss),
    info("upload.css", uploadCss),
    info("download.css", downloadCss),
    info("style.css", styleCss),
    info("index.html", indexHtml),
    info("upload.html", uploadHtml),
    info("download.html", downloadHtml),
    info("admin.html", adminHtml),
    info("404.html", error404Html),
    "",
    "[binding]",
    "BUCKET bound: " + (env && env.BUCKET ? "yes" : "no"),
    "ADMIN_TOKEN set: " + (env && env.ADMIN_TOKEN ? "yes" : "no"),
    "",
    "[request]",
    "method: " + request.method,
    "path: " + url.pathname,
    "",
    "[inline test]",
    "index.html has <link>: " + /<link\b/i.test(String(indexHtml)),
    "after inline has <style>: " + /<style>/i.test(inlineCss(indexHtml)),
    "upload.html has count-2: " + String(uploadHtml).includes("count-2"),
    "",
    "详细信息见 /admin",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

// ---------------------------------------------------------------
// 入口
// ---------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isGet = request.method === "GET" || request.method === "HEAD";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      });
    }

    if (url.pathname.startsWith("/admin/api/")) {
      return handleAdminApi(request, url, env);
    }

    if (isGet && url.pathname === "/debug") {
      return debugResponse(request, url, env);
    }

    if (request.method === "POST" && url.pathname === "/api/upload") {
      return handleAiUpload(request, env);
    }

    if (request.method === "POST" && pageKey(url.pathname) === "upload") {
      return handleUpload(request, env);
    }

    if (isGet) {
      const key = pageKey(url.pathname);
      if (key === "admin") {
        return adminPage();
      }
      if (key === "download" && url.searchParams.has("token")) {
        return handleDownload(url, env, ctx);
      }
      if (Object.prototype.hasOwnProperty.call(PAGES, key)) {
        return html(PAGES[key]);
      }
    }

    return html(error404Html, 404);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sweep(env, "cron"));
  },
};

async function handleUpload(request, env) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "无效的表单数据" }, 400);
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return json({ error: "未选择文件" }, 400);
  }

  const ttlHours = parseTtlHours(form.get("ttlHours"));
  const maxDownloads = parseMaxDownloads(form.get("maxDownloads"));
  const expiresAt = Date.now() + ttlHours * HOUR_MS;

  const token = genToken();
  const fileName = file.name || "download";
  const contentType = file.type || "application/octet-stream";

  try {
    await env.BUCKET.put(`file_${token}`, file.stream(), {
      httpMetadata: { contentType },
      customMetadata: { fileName },
    });
    await putState(env, token, maxDownloads, expiresAt, maxDownloads);
  } catch (e) {
    await purge(env, token);
    return json({ error: "上传失败，请重试" }, 500);
  }

  return json({
    token,
    ttlHours,
    maxDownloads,
    expiresAt,
    downloadUrl: `/download?token=${token}`,
  });
}

async function handleAiUpload(request, env) {
  const contentLength = parseInt(request.headers.get("content-length"), 10);
  if (contentLength && contentLength > 2 * 1024 * 1024) {
    return aiJson({ error: "Payload too large. Maximum size is 2MB." }, 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return aiJson({ error: "Invalid JSON format." }, 400);
  }

  if (!body || typeof body.text !== "string") {
    return aiJson({ error: "Missing 'text' field." }, 400);
  }

  if (body.text.length > 1000000) {
    return aiJson({ error: "Text too large. Max 1,000,000 characters." }, 413);
  }

  let fileName = body.filename;
  if (!fileName || typeof fileName !== "string") {
    fileName = "ai_output.txt";
  } else {
    fileName = fileName.slice(0, 50).replace(/[\/\\:*?"<>|]/g, "_");
  }
  
  const contentType = (typeof body.type === "string" && body.type) ? body.type : "text/plain; charset=utf-8";
  const textContent = body.text;

  const authHeader = request.headers.get("Authorization");
  const isOwner = authHeader && authHeader === `Bearer ${env.ADMIN_TOKEN}`;

  let ttlHours, maxDownloads;

  if (isOwner) {
    ttlHours = parseInt(body.ttlHours, 10) || 168;
    maxDownloads = parseInt(body.maxDownloads, 10) || 10;
    if (ttlHours > 168) ttlHours = 168; 
    if (maxDownloads > 10) maxDownloads = 10;
  } else {
    ttlHours = 1;
    maxDownloads = 1;
  }

  const expiresAt = Date.now() + ttlHours * HOUR_MS;
  const token = genToken();

  try {
    await env.BUCKET.put(`file_${token}`, textContent, {
      httpMetadata: { contentType },
      customMetadata: { fileName },
    });
    await putState(env, token, maxDownloads, expiresAt, maxDownloads);
  } catch (e) {
    await purge(env, token);
    return aiJson({ error: "Failed to store file." }, 500);
  }

  const origin = new URL(request.url).origin;

  return aiJson({
    success: true,
    token,
    downloadUrl: `${origin}/download?token=${token}`,
    message: `File generated successfully. Expires in ${ttlHours} hours.`
  });
}

async function handleDownload(url, env, ctx) {
  const token = url.searchParams.get("token");
  if (!token || !TOKEN_RE.test(token)) {
    return html("<h1>无效的密钥</h1>", 400);
  }

  const stateObj = await env.BUCKET.get(`state_${token}`);
  if (!stateObj) {
    ctx.waitUntil(purge(env, token));
    return html("<h1>文件不存在或已被下载（410）</h1>", 410);
  }

  let state;
  try {
    state = await stateObj.json();
  } catch {
    ctx.waitUntil(purge(env, token));
    return html("<h1>状态损坏（410）</h1>", 410);
  }

  const remaining =
    typeof state.remaining === "number" ? state.remaining : state.used ? 0 : 1;
  const maxDownloads = state.maxDownloads || 1;

  if (remaining <= 0) {
    ctx.waitUntil(purge(env, token));
    return html("<h1>该密钥已被使用（410）</h1>", 410);
  }
  if (state.expiresAt && Date.now() > state.expiresAt) {
    ctx.waitUntil(purge(env, token));
    return html("<h1>文件已过期并被删除（410）</h1>", 410);
  }

  const left = remaining - 1;
  await putState(env, token, left, state.expiresAt, maxDownloads);

  const fileObj = await env.BUCKET.get(`file_${token}`);
  if (!fileObj) {
    ctx.waitUntil(purge(env, token));
    return html("<h1>文件不存在（410）</h1>", 410);
  }

  const fileName = fileObj.customMetadata?.fileName || "download";
  const contentType =
    fileObj.httpMetadata?.contentType || "application/octet-stream";
  const encodedName = encodeURIComponent(fileName);
  const headers = {
    "content-type": contentType,
    "content-disposition": `attachment; filename*=UTF-8''${encodedName}`,
  };

  if (left > 0) {
    return new Response(fileObj.body, { status: 200, headers });
  }

  const { readable, writable } = new TransformStream();
  const pump = (async () => {
    const writer = writable.getWriter();
    try {
      const reader = fileObj.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(value);
      }
      await writer.close();
    } catch (e) {
      try { await writer.abort(e); } catch {}
    } finally {
      await purge(env, token);
    }
  })();
  ctx.waitUntil(pump);

  return new Response(readable, { status: 200, headers });
}