import indexHtml from "./html/index.html";
import uploadHtml from "./html/upload.html";
import downloadHtml from "./html/download.html";
import error404Html from "./error/404.html";

import commonCss from "./css/common.css";
import indexCss from "./css/index.css";
import uploadCss from "./css/upload.css";
import downloadCss from "./css/download.css";
import styleCss from "./css/style.css";

const VERSION = "inline-css-1";

const TOKEN_LEN = 16;
const TOKEN_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TOKEN_RE = /^[A-Za-z0-9]{16}$/;

function genToken() {
  const bytes = new Uint8Array(TOKEN_LEN);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < TOKEN_LEN; i++) out += TOKEN_CHARS[bytes[i] % TOKEN_CHARS.length];
  return out;
}

const CSS = {
  common: commonCss,
  index: indexCss,
  upload: uploadCss,
  download: downloadCss,
  style: styleCss,
};

// 把 <link rel="stylesheet" href="/css/xxx.css"> 替换成内联 <style>
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

// 常驻诊断：只输出打包状态，不涉及 R2、token 或用户数据
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
    info("404.html", error404Html),
    "",
    "[binding]",
    "BUCKET bound: " + (env && env.BUCKET ? "yes" : "no"),
    "",
    "[request]",
    "method: " + request.method,
    "path: " + url.pathname,
    "",
    "[inline test]",
    "index.html has <link>: " + /<link\b/i.test(String(indexHtml)),
    "after inline has <style>: " + /<style>/i.test(inlineCss(indexHtml)),
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isGet = request.method === "GET" || request.method === "HEAD";

    // 诊断
    if (isGet && url.pathname === "/debug") {
      return debugResponse(request, url, env);
    }

    // 上传
    if (request.method === "POST" && pageKey(url.pathname) === "upload") {
      return handleUpload(request, env);
    }

    // 页面
    if (isGet) {
      const key = pageKey(url.pathname);
      if (key === "download" && url.searchParams.has("token")) {
        return handleDownload(url, env);
      }
      if (Object.prototype.hasOwnProperty.call(PAGES, key)) {
        return html(PAGES[key]);
      }
    }

    // 兜底 404
    return html(error404Html, 404);
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

  const token = genToken();
  const fileName = file.name || "download";
  const contentType = file.type || "application/octet-stream";

  await env.BUCKET.put(`file_${token}`, file.stream(), {
    httpMetadata: { contentType },
    customMetadata: { fileName },
  });

  await env.BUCKET.put(`state_${token}`, JSON.stringify({ used: false }), {
    httpMetadata: { contentType: "application/json" },
  });

  return json({ token, downloadUrl: `/download?token=${token}` });
}

async function handleDownload(url, env) {
  const token = url.searchParams.get("token");
  if (!token || !TOKEN_RE.test(token)) {
    return html("<h1>无效的密钥</h1>", 400);
  }

  const stateObj = await env.BUCKET.get(`state_${token}`);
  if (!stateObj) {
    return html("<h1>文件不存在或已被下载（410）</h1>", 410);
  }

  let state;
  try {
    state = await stateObj.json();
  } catch {
    return html("<h1>状态损坏（410）</h1>", 410);
  }
  if (state.used) {
    return html("<h1>该密钥已被使用（410）</h1>", 410);
  }

  await env.BUCKET.put(`state_${token}`, JSON.stringify({ used: true }), {
    httpMetadata: { contentType: "application/json" },
  });

  const fileObj = await env.BUCKET.get(`file_${token}`);
  if (!fileObj) {
    await env.BUCKET.delete(`state_${token}`);
    return html("<h1>文件不存在（410）</h1>", 410);
  }

  const fileName = fileObj.customMetadata?.fileName || "download";
  const contentType =
    fileObj.httpMetadata?.contentType || "application/octet-stream";

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async () => {
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
      try {
        await env.BUCKET.delete(`file_${token}`);
        await env.BUCKET.delete(`state_${token}`);
      } catch {}
    }
  })();

  const encodedName = encodeURIComponent(fileName);
  return new Response(readable, {
    status: 200,
    headers: {
      "content-type": contentType,
      "content-disposition": `attachment; filename*=UTF-8''${encodedName}`,
    },
  });
}