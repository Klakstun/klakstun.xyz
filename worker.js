export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. 静态资源（只保留 CSS）
    const STATIC = {
      "/css/common.css": [commonCss, "text/css; charset=utf-8"],
      "/css/index.css": [indexCss, "text/css; charset=utf-8"],
      "/css/upload.css": [uploadCss, "text/css; charset=utf-8"],
      "/css/download.css": [downloadCss, "text/css; charset=utf-8"],
    };

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

    // 2. 页面路由（兼容带 .html 和不带 .html 的访问）
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
      return html(indexHtml);
    }
    if (request.method === "GET" && (url.pathname === "/upload" || url.pathname === "/upload.html")) {
      return html(uploadHtml);
    }
    if (request.method === "GET" && (url.pathname === "/download" || url.pathname === "/download.html")) {
      // 如果带了 token，就进入下载逻辑
      if (url.searchParams.has("token")) {
        return handleDownload(url, env);
      }
      return html(downloadHtml);
    }
    if (request.method === "POST" && url.pathname === "/upload") {
      return handleUpload(request, env);
    }

    // 3. 兜底 404
    return html(error404Html, 404);
  },
};