#!/usr/bin/env bash
# 一次性文件传输 —— 端到端测试
# 用法：./test.sh <BASE_URL>
#   ./test.sh http://127.0.0.1:8787
#   ./test.sh https://one-shot-file.xxx.workers.dev
set -euo pipefail

BASE="${1:-http://127.0.0.1:8787}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "== Base URL: $BASE"

# 1. 准备测试文件
echo "hello one-shot $(date +%s)" > "$TMP/in.txt"

# 2. 上传
echo "== 上传"
RESP="$(curl -sS -X POST -F "file=@$TMP/in.txt" "$BASE/upload")"
echo "响应: $RESP"

TOKEN="$(printf '%s' "$RESP" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')"
if [ -z "$TOKEN" ]; then
  echo "!! 未取到 token，退出"
  exit 1
fi
echo "token: $TOKEN"

# 3. 第一次下载，应成功
echo "== 第一次下载（应成功）"
CODE1="$(curl -sS -o "$TMP/out1.txt" -w '%{http_code}' "$BASE/download?token=$TOKEN")"
echo "HTTP $CODE1"
cat "$TMP/out1.txt"

# 4. 第二次下载，应 410
echo "== 第二次下载（应 410）"
CODE2="$(curl -sS -o "$TMP/out2.txt" -w '%{http_code}' "$BASE/download?token=$TOKEN")"
echo "HTTP $CODE2"

if [ "$CODE1" = "200" ] && [ "$CODE2" = "410" ]; then
  echo "== 测试通过"
else
  echo "== 测试失败（期望 200 / 410，实际 $CODE1 / $CODE2）"
  exit 1
fi