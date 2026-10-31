const tokenInput = document.getElementById("tokenInput");
const downloadBtn = document.getElementById("downloadBtn");
const statusEl = document.getElementById("status");

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.add("show");
  statusEl.classList.toggle("error", isError);
}

tokenInput.addEventListener("input", () => {
  const v = tokenInput.value.trim();
  downloadBtn.disabled = !/^[A-Za-z0-9]{16}$/.test(v);
  statusEl.classList.remove("show");
});

downloadBtn.addEventListener("click", async () => {
  const token = tokenInput.value.trim();
  if (!/^[A-Za-z0-9]{16}$/.test(token)) {
    setStatus("密钥格式不正确（应为 16 位字母数字）", true);
    return;
  }
  downloadBtn.disabled = true;
  setStatus("下载中…");

  try {
    const res = await fetch(`/download?token=${encodeURIComponent(token)}`);
    if (!res.ok) {
      const text = await res.text();
      const m = text.match(/<h1>(.*?)<\/h1>/);
      throw new Error(m ? m[1] : `下载失败（${res.status}）`);
    }

    let filename = "download";
    const cd = res.headers.get("content-disposition") || "";
    const m = cd.match(/filename\*=UTF-8''([^;]+)/);
    if (m) filename = decodeURIComponent(m[1]);

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setStatus("下载完成，文件已从服务器删除。");
  } catch (err) {
    setStatus(err.message, true);
    downloadBtn.disabled = false;
  }
});

// 带 ?token= 打开本页时自动填入
const urlToken = new URLSearchParams(location.search).get("token");
if (urlToken && /^[A-Za-z0-9]{16}$/.test(urlToken)) {
  tokenInput.value = urlToken;
  downloadBtn.disabled = false;
}