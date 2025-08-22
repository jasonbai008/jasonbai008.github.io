# 网站部署

## 免费部署个人网页

### 1. **Netlify** <Badge text="最棒" type="tip"/>

代码仓库还是在 Github，注册登录 [Netlify](https://www.netlify.com/)，新建 Project，选择 GitHub，选择对应的仓库，点击 Deploy。**国内打开速度杠杠的快**, 可惜微信屏蔽了。

### 2. **Github Pages** <Badge text="一般" type="warning"/>

将网站代码托管到 Github 上的仓库里，开启 Pages 服务，即可实现免费的 https 网站。可惜**国内经常打不开**。

### 3. **Cloudflare Pages** <Badge text="一般" type="warning"/>

注册并登录 [Cloudflare](https://www.cloudflare-cn.com/)，新建 Pages，可以关联自己的 Github 仓库，这样更新仓库后，Cloudflare 会自动更新对应的 Pages，非常方便。但**国内很多省份打不开**。

## Git代码提交规范

| 前缀            | 含义                                                              | 示例                                       |
| :-------------- | :---------------------------------------------------------------- | :----------------------------------------- |
| **`feat:`**     | 新增功能 (feature)                                                | `feat: 添加用户密码重置功能`               |
| **`fix:`**      | 修复bug (bug fix)                                                 | `fix: 修复用户列表分页错误的bug`           |
| **`docs:`**     | 文档更新 (documentation)                                          | `docs: 更新API接口文档`                    |
| **`style:`**    | 代码格式调整 (不影响代码运行的变动，如空格、分号、缩进等)         | `style: 按照ESLint规则格式化代码`          |
| **`refactor:`** | 代码重构（既不是新增功能，也不是修改bug）                         | `refactor: 使用hooks重写UserInfo组件`      |
| **`perf:`**     | 性能优化 (performance)                                            | `perf: 使用缓存优化Dashboard数据加载时间`  |
| **`test:`**     | 增加或修改测试用例                                                | `test: 为Login模块添加单元测试`            |
| **`build:`**    | 构建系统或外部依赖的更改 (如 webpack, npm, gulp)                  | `build: 升级webpack到v5版本`               |
| **`ci:`**       | CI配置文件的更改 (如 Travis, Jenkins, GitLab CI)                  | `ci: 在GitHub Actions中增加自动化部署流程` |
| **`chore:`**    | 其他不修改src或测试文件的改动（维护性任务，如重构、工具链更新等） | `chore: 优化项目目录结构`                  |
| **`revert:`**   | 回滚之前的某个提交                                                | `revert: revert: 撤销某次错误的提交`       |

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

## 本地预览打包后的应用

1.  安装 VSCode 插件：`Live Server`
2.  修改根目录下的 vue.config.js 文件

```js {4}
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/dist/", // 这里改成dist
  devServer: {
    host: "localhost",
  },
});
```

3.  确保应用的路由模式是 `hash` 模式
4.  执行打包命令：`yarn build`
5.  VSCode 左侧文件树中，在 dist/index.html 上右击鼠标选择：`Open with Live Server`
6.  在浏览器里输入：`http://localhost:5500/dist/index.html` 即可

## 下载防盗链图片

### 方法一

1. 在开发者工具里的 `Sources` 面板中查看图片,右击图片选择：`Save images as data uri`，图片变成base64文本。
2. 在网上找到[在线Base64转图片工具](https://phototool.cn/base64-img/)，粘贴文本，下载图片。

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
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'background-image.jpg';
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch(error => console.error('下载失败:', error));
}

// 使用示例
downloadBackgroundImage('.your-div-class');
```
## 透视 Vite 代理地址

配置 Vite 让其在终端打印实际的请求地址：

```js
export default defineConfig({
  // ... 其他配置 ...
  server: {
    proxy: {
      '/api': {
        target: 'http://实际的后端地址',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理请求:', req.method, req.url, '→', options.target + proxyReq.path);
          });
        }
      }
    }
  }
```

## 给终端设置临时代理

临时让所有命令行工具走代理，以下的代理端口号，是`翻墙工具软件上显示的 http 端口号`。

```sh
# 设置临时代理（仅当前终端有效）：
# 作用于所有命令行工具（curl、wget、git、apt）
export http_proxy=http://127.0.0.1:10809;
export https_proxy=http://127.0.0.1:10809;

# 测试代理是否成功：
curl -v http://www.google.com  # 测试 HTTP
curl -v https://www.google.com  # 测试 HTTPS

# 查看临时代理：
echo $http_proxy;
echo $https_proxy;

# 取消临时代理：
unset http_proxy;
unset https_proxy;
```

只让 Git 走代理，不影响其他命令：

```sh
# 设置Git长期代理：
git config --global http.proxy "http://127.0.0.1:10809"
git config --global https.proxy "http://127.0.0.1:10809"

# 查看Git长期代理：
git config --global --get http.proxy;
git config --global --get https.proxy;

# 取消 Git 长期代理：
git config --global --unset http.proxy
git config --global --unset https.proxy
```



## 一键合并分支

在 `package.json` 中添加以下命令，临时使用 bash 执行一串 git 命令：

```sh
# 重点是：bash -c \"一堆bash脚本\"
"scripts": {
  "merge-to-dev": "bash -c \"cur_branch=$(git branch --show-current); git checkout develop && git pull && git merge --no-edit $cur_branch && git push && git checkout $cur_branch;\""
}
```

执行命令：`npm run merge-to-dev`,便可把当前分支的代码合并到 develop 分支

## 设置 Git 别名

设置全局别名，例如执行：`git to develop`
git 会自动执行：切换到 develop 分支，拉取代码，合并当前分支，推送到远程，切换回当前分支

```sh
git config --global alias.to '!f() { cur_branch=$(git branch --show-current); git checkout $1 && git pull && git merge --no-edit $cur_branch && git push && git checkout $cur_branch; }; f'
```

## 贪吃蛇

<img src="/tech/github-snake.svg" alt="github-snake" />

以上贪吃蛇 SVG，可以直接使用：

```html
<img src="https://jasonbai008.github.io/tech/github-snake.svg" alt="github-snake" />
```

也可以根据自己 Github 的提交记录生成个人的 svg。但是非常麻烦，以下是详细教程：

- [如何在 github 主页放一条贪吃蛇](https://zhuanlan.zhihu.com/p/659930382)

## Vite 打包配置

为打包后的文件归类，配置 `vite.config.js` ：

```js
build: {
    outDir: "dist",  // 打包输出目录
    rollupOptions: {
      output: {
        // 指定 JS 输出到 `dist/js` 目录
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          // 指定 CSS 输出到 `dist/css` 目录
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash][extname]'
          }
          // 指定 字体 输出到 `dist/fonts` 目录
          if (assetInfo.name && assetInfo.name.endsWith('.ttf')) {
            return 'fonts/[name].[hash][extname]'
          }
          // 其他资源文件输出到 `dist/assets` 目录
          return 'assets/[name].[hash][extname]'
        }
      }
    }
  }
```

## 注册免费域名

- 网址：[dpdns.org](https://domain.digitalplat.org/)  
- 教程：[https://linux.do/t/topic/571608](https://linux.do/t/topic/571608)
- 域名：可以注册一个，给代码仓库Star后，可以注册两个免费域名

## Cloudflare 部署网页

::: warning 注意
Cloudflare 的 Workers 都已被封，Pages 目前可以使用。  
打开 Cloudflare 最好翻墙，以前不翻墙能很顺利的打开，现在有被墙的风险！
:::

::: tip 非常棒
在 Github 上新建私人仓库，在 Cloudflare 上针对私人仓库，新建 Pages，这样就可以避免暴露源码了！
:::

为了能有个免费的网页，真是太难了，先后探索了：  
`Github Pages` > `Gitee Pages` > `Github Pages` > `Cloudflare Pages`

- **Github Pages** 访问速度太慢，尤其页面上有很多图片的情况下。
- **Gitee Pages** 本来访问速度杠杠的，但是今年五一之前突然下线了，彻底不能用了。
- **Cloudflare Pages** 没想到出奇的好使，**访问速度比 Github 快一倍！而且免费！**

下面介绍一下 Cloudflare Pages 的使用步骤：

1.  打开 [Cloudflare 中国官网](https://www.cloudflare-cn.com/)
2.  使用个人邮箱注册并登录
3.  进入到`个人账户` > `Workers and Pages` > 切换到 `Pages`选项卡
4.  通过导入现有 Git 存储库创建，点击 `连接到 Git` 按钮
5.  关联你的个人 Github 账户，根据提示赋予权限
6.  选择一个你的 Github 上的一个代码仓库，点击 `开始设置`
7.  自定义一个满意的`项目名称`，到时候访问的地址是：`项目名称.pages.dev`
8.  如果是普通的 html 项目，直接开始部署
9.  如果是 vue 项目，框架预设选择 `Vue`，构建命令 `npm run build`，构建输出目录`docs`
10. 然后直接部署到全球节点，部署完，等待大概最多 5 分钟就可以访问了

### 部署旧项目遇到问题

```sh
# 遇到这种报错：
at ChildProcess.<anonymous> (/snapshot/dist/run-build.js)
```

在部署设置步骤，设置环境变量： `YARN VERSION = 1`

如遇到其它报错，继续叠加设置环境变量： `NODE OPTIONS = --openssl-legacy-provider`

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


