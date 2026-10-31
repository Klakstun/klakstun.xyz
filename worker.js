import indexHtml from "./html/index.html";
import uploadHtml from "./html/upload.html";
import downloadHtml from "./html/download.html";
import error404Html from "./error/404.html";

import commonCss from "./css/common.css";
import indexCss from "./css/index.css";
import uploadCss from "./css/upload.css";
import downloadCss from "./css/download.css";

import uploadJs from "./js/upload.js";
import downloadJs from "./js/download.js";

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

const html = (body, status = 200) =>
  new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const STATIC = {
  "/css/common.css": [commonCss, "text/css; charset=utf-8"],
  "/css/index.css": [indexCss, "text/css; charset=utf-8"],
  "/css/upload.css": [uploadCss, "text/css; charset=utf-8"],
  "/css/download.css": [downloadCss, "text/css; charset=utf-8"],
  "/js/upload.js": [uploadJs, "application/javascript; charset=utf-8"],
  "/js/download.js": [downloadJs, "application/javascript; charset=utf-8"],
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && STATIC[url.pathname]) {
      const [body, contentType] = STATIC[url.pathname];
      return new Response(body, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=300",
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/") {
      return html(indexHtml);
    }
    if (request.method === "GET" && url.pathname === "/upload") {
      return html(uploadHtml);
    }
    if (request.method === "GET" && url.pathname === "/download") {
      if (url.searchParams.has("token")) {
        return handleDownload(url, env);
      }
      return html(downloadHtml);
    }
    if (request.method === "POST" && url.pathname === "/upload") {
      return handleUpload(request, env);
    }

    // 找不到路由，返回自定义的 404 页面
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