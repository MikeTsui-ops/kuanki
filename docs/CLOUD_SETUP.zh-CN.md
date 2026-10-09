# 匡集官网云端开发环境

## 当前交付范围

这是 Next.js + Payload CMS + PostgreSQL 的开发起点，附带 Tailwind CSS、shadcn/ui Button 及中英文验证页。完整营销官网仍待建设。

## 首次启动

1. 仓库为 https://github.com/MikeTsui-ops/kuanki，已获授权使用公开仓库。不要上传 node_modules、.env、media 或 .next，Codespaces 预览端口保持私有。
2. 在仓库点击 Code → Codespaces → Create codespace。
3. 容器首次创建会安装依赖、生成本环境独有的开发密钥、生成后台组件映射并检查类型。
4. 终端运行 `pnpm dev`，在 Ports 中打开 3000 端口，保持 Private。
5. `/zh`、`/en` 为验证页，`/admin` 为内容后台。
6. 首次进入后台自行创建管理员。不要把密码或令牌发到聊天中。

## 数据与预览

- 开发数据库使用独立 PostgreSQL 容器和持久卷，不向外发布 5432 端口。
- 停止后重开 Codespace 可保留开发数据；删除 Codespace 前必须导出需要保留的数据和媒体。
- 页面、响应头与 robots 都阻止预览站被搜索引擎收录；私有端口是主要访问边界。
- 后台可新增双语页面草稿和上传媒体；验证首页目前不读取这些页面内容。
- Logo 原件位于 assets/original/logo.svg，网页裁切版位于 public/brand/logo.svg。
- 切换开发环境后如域名变化，更新未提交的 .env 中 NEXT_PUBLIC_SERVER_URL。

## 验收步骤

1. Codespaces 初始化成功，运行 `pnpm typecheck`。
2. 启动 `pnpm dev`，检查中英文页面及 Logo，确认语言切换有效。
3. 后台创建管理员并登录，创建页面，分别保存中英文草稿。
4. 上传一张测试图，确认未登录访问媒体 API 被拒绝。
5. 重启开发服务器，确认草稿、账号和媒体仍在。
6. 执行 `pnpm build`，并检查仓库 Actions 的构建结果。

## 费用与生产环境

Codespaces 使用 GitHub 账户的开发额度；不用时停止运行，注意停止后的存储用量。它不是正式网站托管。

上线前需要独立正式数据库、对象存储、生产密钥、数据库迁移、备份及监控，并完成 SEO、询盘和完整页面建设。不要直接将当前预览配置当作生产配置。
