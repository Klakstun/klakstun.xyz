const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const uploadBtn = document.getElementById("uploadBtn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const tokenText = document.getElementById("tokenText");
const copyBtn = document.getElementById("copyBtn");

let selectedFile = null;

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.add("show");
  statusEl.classList.toggle("error", isError);
}

fileInput.addEventListener("change", () => {
  selectedFile = fileInput.files[0] || null;
  uploadBtn.disabled = !selectedFile;
  statusEl.classList.remove("show");
});

["dragenter", "dragover"].forEach((evt) =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  })
);
["dragleave", "drop"].forEach((evt) =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
  })
);
dropZone.addEventListener("drop", (e) => {
  const f = e.dataTransfer.files[0];
  if (f) {
    selectedFile = f;
    uploadBtn.disabled = false;
    statusEl.classList.remove("show");
    const dt = new DataTransfer();
    dt.items.add(f);
    fileInput.files = dt.files;
  }
});

uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) return;
  uploadBtn.disabled = true;
  resultEl.classList.remove("show");
  setStatus("上传中…");

  const fd = new FormData();
  fd.append("file", selectedFile);

  try {
    const res = await fetch("/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "上传失败");
    setStatus("上传成功！");
    tokenText.textContent = data.token;
    resultEl.classList.add("show");
  } catch (err) {
    setStatus("上传失败：" + err.message, true);
    uploadBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", async () => {
  const token = tokenText.textContent;
  try {
    await navigator.clipboard.writeText(token);
    copyBtn.textContent = "已复制";
    setTimeout(() => (copyBtn.textContent = "复制"), 1500);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(tokenText);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
});