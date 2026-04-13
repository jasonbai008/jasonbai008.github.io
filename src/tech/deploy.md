# 站长之路

## 免费部署网页

::: tip
以下三种方式部署的网页，都可以绑定自己的域名，在国内顺利打开。
:::

### 1. **Github Pages** <Badge text="一般" type="error"/>

将网站代码托管到 Github 上的仓库里，开启 Pages 服务，即可实现免费的 https 网站。可惜**国内经常打不开**。

### 2. **Cloudflare Pages** <Badge text="还行" type="warning"/>

注册并登录 [Cloudflare](https://www.cloudflare-cn.com/)，新建 Pages，可以关联自己的 Github 仓库，这样更新仓库后，Cloudflare 会自动更新对应的 Pages，非常方便。但**也经常打不开**。

### 3. **Netlify Pages** <Badge text="不错" type="tip"/>

代码仓库还是在 Github，注册登录 [Netlify](https://www.netlify.com/)，新建 Site，选择 GitHub，选择对应的仓库，点击 Deploy。**国内打开速度杠杠的快**, 可惜微信屏蔽了。

## 免费站长之路

### 1. 开通 Github 个人账号

### 2. 注册免费域名 (DPDNS)

- **账号注册**：访问 [DigitalPlat Domains](https://dash.domain.digitalplat.org/signup?ref=4Yy2qKIrVx) 注册。建议使用自己的邮箱，地址信息参考 [美国地址生成器](https://www.meiguodizhi.com/)
- **申请域名**：登录后点击左侧 `注册` 菜单，输入你想要的子域名，后缀选择 `.dpdns.org` 检测可用性
- **完成注册**：如果可用，在弹窗中确认完成注册，例如：`xiaobai.dpdns.org`
- **到期续期**：域名永久免费，但需在到期前 180 天内手动续期一次，每次续期延长 365 天
- **详细教程**：[永久免费域名详细指南](https://juejin.cn/post/7564716291446325286)

### 3. 在 Cloudflare 上托管域名

- **添加站点**：登录 [Cloudflare](https://dash.cloudflare.com/)，点击 `添加站点`，输入你的域名（如 `xiaobai.dpdns.org`），计划选择 `Free`。
- **修改 NS 服务器**：Cloudflare 会给出两个名称服务器（Nameservers）。回到 DPDNS 平台，在域名管理界面将 NS 修改为 Cloudflare 提供的地址。
- **等待生效**：DNS 变更通常在几分钟内生效。完成后，你就可以在 Cloudflare 的 DNS 设置中自由管理解析记录了。
- **绑定应用**：托管后，可将 Cloudflare Pages 或 Workers 绑定到此域名，有效解决国内无法直接访问 `*.pages.dev` 或 `*.workers.dev` 的问题。
- **参考教程**：[DPDNS 托管到 Cloudflare 教程](https://blog.fridayssheep.top/archives/how-to-get-a-free-dpdns-domain)

### 4. 创建代码仓库 (GitHub)

- **新建仓库**：在 [GitHub](https://github.com/) 上创建一个新的公开或私有仓库，并将你的前端代码推送（Push）上去。
- **开启 Pages**：在仓库的 `Settings` -> `Pages` 中，将 `Build and deployment` 设置为从分支部署（通常是 `main` 分支的 `/root` 目录）。
- **访问限制**：完成后你会得到一个 `https://[username].github.io/[repo]/` 的链接。由于网络环境原因，该域名在国内经常无法直接访问，建议将其作为源码托管和自动部署的源头。

### 5. 部署 Cloudflare Pages

- **关联 GitHub**：登录 Cloudflare 控制台，进入 `Workers & Pages` -> `Pages`，点击 `Connect to Git` 并选择你的 GitHub 仓库。
- **构建配置**：如果你的项目是纯 HTML，则无需构建命令；如果是 Vue/React 等框架，需设置相应的 `Build command`（如 `npm run build`）和 `Output directory`（如 `dist`）。
- **绑定自定义域名**：在 Pages 项目的 `Custom domains` 中，绑定你之前在 Cloudflare 托管的子域名（如 `web.xiaobai.dpdns.org`）。
- **优势**：绑定域名后，国内用户可以非常稳定地访问你的网站，且支持自动集成生产环境的 SSL 证书。

### 6. 部署 Netlify Pages

- **快速部署**：在 [Netlify](https://www.netlify.com/) 中点击 `Add new site` -> `Import an existing project`，关联 GitHub 仓库即可实现全自动部署。
- **默认域名优势**：Netlify 分配的 `*.netlify.app` 域名在国内目前的访问速度相对理想。
- **局限性**：虽然也支持绑定自定义域名，但比较麻烦。

### 7. 注册智谱AI (中转方案)

- **获取密钥**：访问 [智谱AI 开放平台](https://bigmodel.cn/) 注册账号，在控制台获取 `API Key`。
- **免费额度**：新用户有200万免费 Token 额度，支持所有模型，非常适合作为初学者的第一个 AI 接口。
- **安全提示**：API Key 是极其敏感的信息，切勿直接写在前端代码中，需通过边缘函数（Edge Functions）或服务器进行转发。

### 8. 编写 Netlify Edge Functions

- **核心功能**：利用边缘函数转发前端请求到智谱AI或 Gemini 的服务器，实现跨域访问并隐藏 API Key。
- **文件路径**：在项目根目录创建 `netlify/edge-functions/proxy.js`。边缘函数支持流式响应（Streaming），能让 AI 的回复像打字机一样逐字显示。
- **环境配置**：在 Netlify 的 `Site settings` -> `Environment variables` 中配置你的 `ZHIPUAI_API_KEY`。

### 9. 编写 Cloudflare Workers

- **Serverless 接口**：Cloudflare Workers 类似轻量级的后端接口，适合处理 API 转发逻辑。
- **解决域名屏蔽**：默认的 `*.workers.dev` 域名在国内是被屏蔽的。你必须在 Worker 的 `Triggers` -> `Custom Domains` 中绑定自己的域名（如 `api.xiaobai.dpdns.org`）才能正常调用。
- **代码实现**：使用 JavaScript 编写简单的 `fetch` 转发逻辑，并配置环境变量以确保安全。

### 10. 总结建议

- **最佳组合**：使用 **GitHub** 托管代码 + **Cloudflare Pages** 部署前端 + **Cloudflare Workers** 或 **Netlify Edge Functions** 转发 API 请求。
- **域名管理**：所有对外的服务（网页、接口）都建议绑定自己的 DPDNS 子域名，以获得最稳定的国内访问体验。
- **密钥管理**：务必将所有的 API Key 记录在本地的 `.env` 或备忘录中，因为平台通常只会在创建时完整显示一次。

### 11. 注册 Gemini API 密钥

- **环境要求**：注册和使用 Google AI Studio 需使用特定地区的网络环境（如美国、新加坡等）。
- **获取途径**：访问 [Google AI Studio](https://aistudio.google.com/)，点击 `Get API key` 即可。
- **模型选择**：目前可以免费调用API接口的模型有： `Gemini-2.5-Flash` 和 `Gemini-2.5-Flash-Lite`。
- **注意事项**：只能通过上面的边缘函数转发请求，并且模型字段的值必须全部小写。

### 12. 进阶：Netlify Form

- **功能描述**：无需后端代码即可收集表单数据。Netlify 会自动解析 HTML 中的表单并保存提交记录。
- **开启服务**：在 HTML 的 `<form>` 标签上添加 `netlify`属性即可自动激活。
- **防骚扰配置**：建议添加 `netlify-honeypot` 属性以启用简单的垃圾邮件防护。
- **管理提交**：登录 Netlify 控制台，在 `Site configuration` -> `Forms` 中查看和导出所有提交的数据。

### 13. 进阶：Netlify Identity

- **功能描述**：全套的用户管理方案，支持注册、登录、找回密码以及社交账号登录（如 GitHub/Google）。
- **开启服务**：在 Netlify 控制台进入 `Site settings` -> `Identity` -> 点击 `Enable Identity`。
- **快捷使用**：引入 `netlify-identity-widget` 脚本，几行代码即可调起一个完整的登录弹窗。
- **用户管理**：在 `Identity` 标签页下可以管理已注册用户，或设置“仅限邀请（Invite only）”模式来限制访问。

### 14. 进阶：Cloudflare Email Routing

- **功能描述**：利用 Cloudflare Email Routing，可以为你的域名创建无数个自定义邮箱地址（如 `me@yourdomain.com`），并将所有发往这些地址的邮件自动转发到你的常用邮箱（如 Gmail 或 QQ 邮箱）。
- **前提条件**：域名必须托管在 Cloudflare 上，并已开启 DNS 解析。
- **启用步骤**：在 Cloudflare 控制台选择你的域名，进入 `Email` -> `Email Routing`，点击 `Get started`。
- **配置目标地址**：在 `Destination addresses` 中添加你用来接收转发邮件的真实邮箱，并根据收到的验证邮件完成激活。
- **创建自定义地址**：在 `Routing rules` 中点击 `Create address`，输入你想要的邮箱前缀（如 `info`、`support` 等），选择转发到已验证的目标地址。
- **万能接收 (Catch-all)**：如果想接收发往该域名下“任何”不存在地址的邮件，可以开启 `Catch-all address` 功能，这对于防止因拼写错误错过邮件非常有用。
- **发送邮件**：注意，Cloudflare Email Routing 目前仅支持**接收和转发**。如果需要以自定义域名身份**发送**邮件，建议配合 Resend 或 Gmail 的 SMTP 服务使用。

## Netlify VS Cloudflare

<br>
<details>
<summary>关键信息对比</summary>

---

### 一、核心定位差异（先记这句话）

| 平台           | 核心定位             | 一句话总结                                           |
| -------------- | -------------------- | ---------------------------------------------------- |
| **Netlify**    | 前端全栈一体化平台   | “把代码推上去，网站就活了” —— 专注开发体验和自动化   |
| **Cloudflare** | 全球网络基础设施平台 | “让网站更快、更安全、更智能” —— 专注网络层和边缘计算 |

---

### 二、免费服务详细对比

#### 1. 静态托管基础能力

| 服务           | Netlify                       | Cloudflare                     |
| -------------- | ----------------------------- | ------------------------------ |
| **托管空间**   | 无限项目（500 个）            | 无限站点                       |
| **带宽**       | 100 GB/月                     | **无限**（免费套餐不限带宽）   |
| **HTTPS**      | 自动免费 SSL（Let's Encrypt） | 自动免费 SSL + 通用 SSL        |
| **CDN**        | 全球 CDN（部分节点）          | **全球 300+ 节点**（核心优势） |
| **自定义域名** | ✅ 支持                        | ✅ 支持                         |

**个人开发者价值**：Cloudflare 带宽不限，如果你的个人项目意外爆火（比如上了热搜），Netlify 可能流量超额停服，Cloudflare 不会。

---

#### 2. 部署与 Git 集成

| 服务               | Netlify                               | Cloudflare                                    |
| ------------------ | ------------------------------------- | --------------------------------------------- |
| **Git 自动部署**   | ✅ 原生支持（GitHub/GitLab/Bitbucket） | ⚠️ 需搭配 **Cloudflare Pages**（也是原生支持） |
| **预览部署（PR）** | ✅ 每个 PR 自动生成预览链接            | ✅ Pages 同样支持 PR 预览                      |
| **构建分钟数**     | 300 分钟/月（可能不够用）             | **500 构建分钟/月**（Pages 免费套餐）         |
| **回滚**           | ✅ 一键回滚到任意历史版本              | ✅ Pages 支持回滚                              |

**注意**：Cloudflare 的托管产品叫 **Cloudflare Pages**（对标 Netlify），Workers 是另一条产品线。很多人会混淆。

---

#### 3. 后端能力（对前端开发者最有价值的部分）

| 服务             | Netlify                                  | Cloudflare                                                                    |
| ---------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| **无服务器函数** | **Functions**（Node.js 环境）            | **Workers**（V8 环境，JS/TS/Rust）                                            |
| **免费额度**     | 100 万次调用/月                          | 10 万次请求/天（≈300 万/月）                                                  |
| **数据库/存储**  | ❌ 无原生数据库                           | ✅ **D1**（SQLite 边缘数据库，免费 5GB）<br>✅ **R2**（对象存储，免费 10GB/月） |
| **KV 存储**      | ❌ 无                                     | ✅ **Workers KV**（免费 1GB，全局低延迟缓存）                                  |
| **表单处理**     | ✅ **Netlify Forms**（免费 100 条/月）    | ❌ 无原生（需自己实现）                                                        |
| **身份认证**     | ✅ **Netlify Identity**（免费 1000 用户） | ❌ 无原生（可搭配 Auth0 等）                                                   |
| **定时任务**     | ❌ 无                                     | ✅ **Cron Triggers**（免费套餐可用）                                           |

**个人开发者价值差异**：

- 想做个带数据库的全栈应用（如博客后台、待办事项）→ Cloudflare 可以**完全免费**搞定（D1 + Workers）
- 想要开箱即用的表单收集、用户登录 → Netlify 更省事

---

#### 4. 边缘计算与性能优化

| 服务            | Netlify                     | Cloudflare                           |
| --------------- | --------------------------- | ------------------------------------ |
| **边缘函数**    | Edge Functions（基于 Deno） | Workers（V8，更成熟）                |
| **图片优化**    | ❌ 无原生                    | ✅ **Image Resizing**（免费额度有限） |
| **重定向/改写** | `_redirects` 文件配置       | Workers 或 Pages 的 `_redirects`     |
| **A/B 测试**    | Split Testing（需配置）     | Workers 可灵活实现                   |

---

#### 5. 开发体验与周边

| 服务         | Netlify                           | Cloudflare                             |
| ------------ | --------------------------------- | -------------------------------------- |
| **本地开发** | `netlify dev`（模拟函数和重定向） | `wrangler`（功能强大，但学习曲线稍陡） |
| **分析工具** | 基础流量分析                      | ✅ **Web Analytics**（免费、隐私友好）  |
| **域名注册** | ❌ 不提供                          | ✅ 成本价注册（不赚差价）               |
| **邮件转发** | ❌ 不提供                          | ✅ **Email Routing**（免费邮箱转发）    |
| **团队协作** | 免费邀请协作成员                  | 免费套餐协作功能有限                   |

---

### 三、对个人开发者的典型使用场景

#### 场景 1：纯粹的个人博客/作品集

- **Netlify**：一键连接 GitHub，每次 push 自动部署，省心
- **Cloudflare Pages**：同样简单，而且带宽不限，访问更快

**结论**：两者都可以，但 Cloudflare 的无限带宽更安心。

---

#### 场景 2：带后台功能的个人项目（如记账工具、收藏夹）

- **Netlify**：用 Functions 写 API，但数据库需要外部服务（如 Supabase、MongoDB Atlas）
- **Cloudflare**：直接用 D1 数据库 + Workers API，全套在 Cloudflare 生态内，零成本

**结论**：Cloudflare 更适合做“全栈免费应用”。

---

#### 场景 3：需要表单收集（如联系表单、留言板）

- **Netlify**：开箱即用，HTML 里加个 `netlify` 属性就行
- **Cloudflare**：需要自己写 Worker 处理表单提交和存储

**结论**：Netlify 胜出。

---

#### 场景 4：需要用户登录系统

- **Netlify**：Identity 服务，几分钟配置好
- **Cloudflare**：没有原生方案，需要自己集成 Auth0 或 Supabase

**结论**：Netlify 胜出。

---

#### 场景 5：学习现代前端全栈技术

- **Netlify**：学习的是“Jamstack + Node.js Serverless”
- **Cloudflare**：学习的是“边缘计算 + 全球网络架构”，更前沿

**结论**：看你的学习目标，Cloudflare 的技术栈更独特、更有区分度。

---

### 四、我的建议（针对前端个人开发者）

| 你的需求                           | 推荐方案                                    |
| ---------------------------------- | ------------------------------------------- |
| 只做静态站点（博客、文档、作品集） | **Cloudflare Pages**（无限带宽 + 全球 CDN） |
| 需要快速做带表单/登录的个人项目    | **Netlify**（Identity + Forms 开箱即用）    |
| 想做全栈应用且不想付数据库费用     | **Cloudflare**（D1 + R2 + Workers）         |
| 想学习边缘计算、简历上有亮点       | **Cloudflare**（Worker 技术栈更独特）       |
| 想体验最好的前端部署 DX            | **Netlify**（UI 和工具链更成熟）            |

---

### 五、一个实用组合

很多前端开发者会**两个平台都用**：

- 主要站点放 **Cloudflare Pages**（带宽不限，不怕流量突增）
- 需要表单/登录时，在 Netlify 单独部署一个服务（或通过函数转发）
- 用 **Cloudflare 的域名注册 + DNS**（成本价，不赚差价）
- 用 **Cloudflare Web Analytics** 统一看流量（免费且不耗性能）

如果你告诉我你想做具体什么类型的项目（博客、工具类应用、带后台的管理系统等），我可以给你画一个具体的架构方案。

</details>

## 网络连通性检测

```js
/* URL check */
/**
 * 检查指定 URL 的连通性
 * @param {string} url - 待检查的网址
 * @param {HTMLElement} dot - 状态指示灯元素
 */
async function checkUrl(url, dot) {
  // 1. 设置指示灯样式为“检测中”状态
  dot.className = "dot checking";
  // 2. 创建 AbortController 用于手动中止 fetch 请求（实现超时控制）
  const ctrl = new AbortController();
  // 3. 设置 6 秒超时：如果 6 秒内没有响应，则中止请求
  const tid = setTimeout(() => ctrl.abort(), 6000);
  try {
    // 4. 发起 fetch 请求
    // mode: "no-cors" 允许跨域请求但会返回一个“不透明(opaque)”的响应
    // 这意味着你无法读取响应体、状态码或响应头，但能确认服务器是否响应
    await fetch(url, { mode: "no-cors", signal: ctrl.signal });
    // 5. 如果 fetch 成功完成（即使返回的是 404 或 500 错误，在 no-cors 模式下也会 resolve）
    dot.className = "dot ok";
  } catch {
    // 6. 如果发生网络错误（如 DNS 解析失败、连接被拒绝）或请求被超时中止，则标记为失败
    dot.className = "dot fail";
  } finally {
    // 7. 无论请求结果如何，清除定时器以释放资源
    clearTimeout(tid);
  }
}
```

## 使用 shell 脚本部署网站

我们可以在本地通过 shell 脚本进行项目打包、代码提交、部署到服务器等操作。

1.  在项目根目录新建一个`deploy.sh`文件
2.  在 package.json 中添加 npm scripts

```javascript {3}
{
  "scripts": {
    "deploy": "sh deploy.sh"
  }
}
```

3.  编辑 deploy.sh，添加部署脚本

```shell
#!/bin/bash

# 确保脚本抛出遇到的错误，遇到错误退出
set -e

echo "Deploying website on xxx.xxx.xx.xxx ..."

# 生成静态文件
npm run build

# 将打包后的文件上传至目标服务器对应路径下
scp -r ./dist/* root@xxx.xxx.xx.xxx:/home/project
```

4.  部署网站

```shell
npm run deploy
# or
yarn deploy
```

## 下载防盗链图片

### 方法一

1. 在开发者工具里的 `Sources` 面板中查看图片,右击图片选择：`Save images as data uri`，图片变成 base64 文本。
2. 在网上找到[在线 Base64 转图片工具](https://phototool.cn/base64-img/)，粘贴文本，下载图片。

### 方法二

直接在所在网站的`控制台`里，输入以下代码，并替换最后的 class 属性值。

```js
// 方法：将背景图片转换为blob并下载
function downloadBackgroundImage(selector) {
  const element = document.querySelector(selector);
  const style = window.getComputedStyle(element);
  const backgroundImage = style.backgroundImage;
  const url = backgroundImage.slice(5, -2);

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "background-image.jpg";
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => console.error("下载失败:", error));
}

// 使用示例
downloadBackgroundImage(".your-div-class");
```

## Nginx 开启 https

### 购买免费证书

> **DV 证书** ：域名验证型证书，证书审核方式为通过验证域名所有权即可签发证书。此类型证书适合个人和小微企业申请，价格较低，申请快捷，但是证书中无法显示企业信息。

阿里云上可以免费领取 **20 个免费 DV 证书**，每个证书**有效期 1 年**，领取地址：[https://www.aliyun.com/product/cas](https://www.aliyun.com/product/cas)，
领取完，申请绑定域名即可。

### 下载证书

下载 nginx 使用的证书，包括：**xxx.key**（私钥） 和 **xxx.pem** （证书）

### 上传证书

```sh
# 提前登录服务器，新建cert文件夹
# 然后在本地执行上传命令
scp xxx.key xxx.pem root@xx.xx.xx.xx:/etc/nginx/cert
```

### 配置 nginx

1.  首先编辑：`/etc/nginx/sites-available/default` 配置文件，设置 http 请求重定向到 https：

```sh
server {
    listen 80;
    # 填写绑定证书的域名
    server_name xxxxxx.com;
    #强制将http的URL重写成https
    rewrite ^(.*) https://$server_name$1 permanent;
}
```

2.  添加监听 443 端口的配置文件: luban

```sh
# 在/etc/nginx/sites-available/路径下新建luban文件
server {
  # SSL configuration
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;

	server_name xxx.com;

	ssl_certificate  /etc/nginx/cert/xxx.pem;
	ssl_certificate_key /etc/nginx/cert/xxx.key;

	root /home/xxx;

	index index.html index.htm index.nginx-debian.html;

	location / {
		try_files $uri $uri/ =404;
	}
}
```

3.  建立软连接并重启服务

```sh
ln -s /etc/nginx/sites-available/luban /etc/nginx/sites-enabled/luban
nginx -s reload
```
