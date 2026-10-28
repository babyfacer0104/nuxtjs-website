# nuxtjs-website

基于 **Nuxt 4** 的简易管理后台示例：登录鉴权 + 首页数据概览 + 商品增删改查。

## 功能

- 登录 / 退出（HMAC 签名的 httpOnly Cookie，有效期 1 天）
- 路由守卫：未登录访问任意页面跳转 `/login`，登录后回到原页面
- 首页：商品数、总库存、库存总值
- 商品管理：列表、关键字搜索、新增、编辑、删除，带服务端校验
- 数据存储：Nitro storage（本地文件 `.data/db/`），无需安装数据库

演示账号：**admin / 123456**

## 环境要求

- Node.js `^22.21.0`、`^24.11.0` 或 `>=26.0.0`（推荐 24 LTS）
- pnpm 10+

## 安装

```bash
git clone https://github.com/babyfacer0104/nuxtjs-website.git
cd nuxtjs-website
pnpm install
```

> pnpm 10+ 默认禁止依赖执行安装脚本，而 Nuxt 依赖的 esbuild 需要。安装后如出现
> `Ignored build scripts: esbuild`，执行下面命令并选中 esbuild 即可：
>
> ```bash
> pnpm approve-builds
> ```
>
> 也可以手动在项目根目录创建 `pnpm-workspace.yaml`（该文件不纳入版本库）：
>
> ```yaml
> allowBuilds:
>   esbuild: true
> ```

## 运行

```bash
pnpm dev        # 开发模式，访问 http://localhost:3000
pnpm build      # 生产构建，产物在 .output/
pnpm preview    # 本地预览生产构建
```

生产环境直接运行构建产物：

```bash
NUXT_AUTH_SECRET=你的随机密钥 node .output/server/index.mjs
```

## 配置

| 环境变量 | 说明 | 默认值 |
| --- | --- | --- |
| `NUXT_AUTH_SECRET` | 登录 Cookie 签名密钥，**生产环境必须修改** | `change-me-in-production` |
| `PORT` | 生产服务端口 | `3000` |

演示账号写在 `server/utils/auth.ts` 的 `DEMO_USER` 中。

## 目录结构

```
app/
  pages/
    login.vue              登录页
    index.vue              首页
    items/index.vue        商品列表（搜索、删除）
    items/new.vue          新增商品
    items/[id].vue         编辑商品
  components/ItemForm.vue  新增/编辑共用表单
  composables/useAuth.ts   登录状态（login / logout / fetchUser）
  middleware/auth.global.ts 全局路由守卫
  layouts/default.vue      顶部导航布局
  assets/main.css          全局样式
server/
  api/auth/                login / logout / me
  api/items/               商品 CRUD 接口
  middleware/auth.ts       /api/**（除 /api/auth/**）需登录
  utils/auth.ts            Token 签发与校验
  utils/items.ts           数据读写与校验
```

## 接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/auth/login` | 登录，body: `{ username, password }` |
| POST | `/api/auth/logout` | 退出 |
| GET | `/api/auth/me` | 当前用户 |
| GET | `/api/items?keyword=` | 商品列表（可搜索） |
| POST | `/api/items` | 新增，body: `{ name, price, stock, description }` |
| GET | `/api/items/:id` | 商品详情 |
| PUT | `/api/items/:id` | 修改 |
| DELETE | `/api/items/:id` | 删除 |

## 常见问题

- **命令行请求 localhost 返回 502**：本机开了 HTTP 代理，设置 `NO_PROXY=localhost,127.0.0.1` 后重试。
- **Node 版本警告**：Node 25 不在 Nuxt 官方支持范围内，遇到异常请换用 Node 24 LTS。
