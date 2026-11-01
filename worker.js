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

  // 【核心逻辑】判断是不是你自己人
  const authHeader = request.headers.get("Authorization");
  const isOwner = authHeader && authHeader === `Bearer ${env.ADMIN_TOKEN}`;

  let ttlHours, maxDownloads;

  if (isOwner) {
    // 如果是你自己调用，允许通过 JSON 传入 ttlHours 和 maxDownloads，默认 168 小时(7天)，10次
    ttlHours = parseInt(body.ttlHours, 10) || 168;
    maxDownloads = parseInt(body.maxDownloads, 10) || 10;
    if (ttlHours > 168) ttlHours = 168; // 最高锁死 7 天，防止你手滑传个 100 年
    if (maxDownloads > 10) maxDownloads = 10;
  } else {
    // 如果是公开乱入的请求，强制降级为 1 小时、1 次下载
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