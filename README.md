# 一次性文件传输（Cloudflare Workers + R2）

极简网页服务：上传文件 → 生成密钥（token）→ 对方凭密钥下载一次 → 下载后文件与记录自动销毁。无需注册、无多用户，个人自用。

## 技术栈

- 运行时：Cloudflare Workers（JavaScript）
- 存储：仅 R2 对象存储（不用 KV / Durable Objects）
- 前端：HTML + 独立 CSS/JS，由 worker.js 以 Text 模块 import 后路由返回
- 部署：wrangler 命令行

## 文件结构

```
one-shot-file/
├── worker.js
├── wrangler.toml
├── package.json
├── README.md
├── test.sh
├── .gitignore
├── html/
│   ├── index.html
│   ├── upload.html
│   └── download.html
├── css/
│   ├── common.css
│   ├── index.css
│   ├── upload.css
│   └── download.css
└── js/
    ├── upload.js
    └── download.js
```

## 路由

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 主页（导航） |
| GET | `/upload` | 上传页 |
| GET | `/download` | 下载页（无 token 时显示输入框） |
| GET | `/download?token=xxx` | 实际下载文件流 |
| POST | `/upload` | 上传接口，返回 `{token, downloadUrl}` |
| GET | `/css/*.css` | 返回 CSS 文本 |
| GET | `/js/*.js` | 返回 JS 文本 |

## R2 对象

- `file_${token}`：文件本体；`httpMetadata.contentType` 存 MIME，`customMetadata.fileName` 存原始文件名
- `state_${token}`：状态 JSON `{ used: false | true }`

一次性语义：
1. 下载先读 `state_${token}`，不存在或 `used:true` → 410
2. 否则置 `used:true`，读 `file_${token}`，用 `TransformStream` 流式返回
3. 流写完（或中断）后删除 `file_` 与 `state_` 两个对象

## 已知取舍

- R2 无原子条件写，极端并发下同一 token 理论上可能被读两次。个人自用场景接受。
- 未做自动过期清理（可后续加 R2 生命周期规则）。
- 下载中断会消耗 token（删除在流的 finally 里执行）。

## 部署

### 1. 安装

```bash
npm install
npx wrangler login
```

### 2. 创建 R2 桶

仪表盘 → R2 → Create bucket → 名称 `one-shot-file`。
（R2 需先开通，可能需绑定支付方式。）桶名须与 `wrangler.toml` 中 `bucket_name` 一致。

### 3. 本地预览

```bash
npm run dev
```

验证：首页显示 → 上传拿 token → 下载成功 → 再下载 410 → R2 对象已删除。

### 4. 部署

```bash
npm run deploy
```

成功后会给出 `https://one-shot-file.<子域>.workers.dev`。

## 注意

- `wrangler.toml` 的 `[[rules]]` 必须位于顶层，`globs` 只匹配 `html/`、`css/`、`js/` 子目录，避免误伤 `worker.js`。
- 新增静态文件时，要在 `worker.js` 顶部 `import` 并在 `STATIC` 表加一行，否则访问不到。
- `content-type` 必须正确：CSS 用 `text/css`，JS 用 `application/javascript`。
## License

MIT