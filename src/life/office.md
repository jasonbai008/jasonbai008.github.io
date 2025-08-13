# 日常办公

## 搜索替代

百度广告多，谷歌打不开，以下两个搜索引擎可以替代百度：

- [**bing.com**](https://cn.bing.com/) 来自微软的搜索引擎，搜索质量很高 :+1:
- [**yandex.com**](https://www.yandex.com/) 来自俄罗斯的搜索引擎 :point_left:

## 自制一寸两寸照片

1. 自拍一张照片，背景尽量干净，比如墙壁
2. 使用 [RemoveBg](https://www.remove.bg/zh/upload) 去除照片背景，下载为 `png 文件`
3. 打开 **证件照大师** 网站，选择 [PNG 证件照制作](https://id-photo.cn/png/) 菜单
4. 点击 `重新选择照片`按钮，上传导出的`png 文件`，选择 `背景颜色` 和 `证件照尺寸`
5. 调整选区大小，在页面下方看最终效果，点击最终证件照下载图片

## 在线 Photoshop

[Photopea](https://www.photopea.com/)，无需注册，直接使用

## 一行代码编辑网页

```js
// 按F12打开浏览器的开发者工具，切换到 `Console`，输入以下代码：
document.designMode = "on";
```

## 轻松访问 Hugging Face

1. 在微软应用商店中下载并安装 `Watt Toolkit`
2. 运行此软件，选择 `网络加速`，并勾选 `Github`，点击右上角 `一键加速`
3. 访问 [huggingface.co](https://huggingface.co/) 查看效果。
   <img :src="$withBase('/tech/watt.png')" class="medium-zoom-image" style="width:80%"/>

## 轻松访问 Github

1. 下载 [FastGithub](https://gitee.com/lubanseven/store/releases/download/v1.0/fastgithub.zip)
2. 解压后，直接运行 `FastGithub.UI.exe`
3. 点击右上角 x 号，最小化到托盘
4. 微软应用商店中的：`Watt Toolkit` 也可以开启 Github 加速。
   <img :src="$withBase('/tech/fastgithub.png')" class="medium-zoom-image" style="width:80%"/>

## Outlook 只展示托盘图标

Outlook 点击关闭按钮就退出了。为了避免退出，可以设置最小化时，只展示右下角托盘图标。

- 右击右下角的 Outlook 托盘图标，在菜单里勾选：**最小化时隐藏**

## 恢复 Win11 完整右键菜单

Windows11 系统的右键菜单，每次都要选择`显示更多选项`，非常烦人。如果想把 Windows11 系统的右键菜单改回 Win10 版的

- **懒人方法：**`Shift`+右击鼠标

- **一劳永逸的方法**：可以在任务栏的搜索框里搜索`CMD`，然后选择`以管理员身份运行`，粘贴以下命令，并按`Enter`确认，重启电脑即可。

```sh
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

如果想改回去，执行下面的命令即可：

```sh
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

## Markdown 免费转 PDF

1. 下载并安装 `VS Code` 代码编辑器
2. 安装 `Markdown Preview Enhanced` 插件
3. 打开一个 md 文件，右击鼠标，选择：`Markdown Preview Enhanced:Open preview to the Side`
4. 在右侧弹出的预览界面上，右击鼠标，选择 `Chrome(Puppeteer)` -> `PDF`
5. 即可在 md 文件旁边生成**同名的 pdf 文件**

## 百度网盘下载提速的两个方法

1. 点击顶部的`游戏图标`，体验 10 分钟新游戏，就可以`免费试用提速5分钟`，**7M/s**，**每天只能提速 1 次**
2. 点击：`设置` > `传输` > `优化速率` > `去开启`，点击`应用`按钮，这种方法只对**热门下载资源**有效

## 使用 PPT 录屏

我们可以不用额外安装任何工具，直接使用**PowerPoint**录制屏幕。

1. 新建一个空的 PPT 文件
2. 选择：`插入` > `新建幻灯片`，新建一个空白幻灯片页面
3. 点击右上角的 `屏幕录制` 按钮
4. 屏幕最顶部会出现录制屏幕的控制条，点击 `选择区域`，划选需要录制的屏幕区域
5. 点击`录制`按钮，开始录屏
6. 按 `Win + Shift + Q` 结束录制
7. 回到 PPT 中，在录制的视频上右击鼠标，选择 `将媒体另存为`，即可将录屏保存为 mp4 文件

## 修改 hosts 文件

> hosts 文件，是一个 `IP : 域名`映射表。当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从 Hosts 文件中寻找对应的 IP 地址，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交 DNS 域名解析服务器进行 IP 地址的解析。

位置：`C:\windows\system32\drivers\etc\`

如果没有权限编辑保存 hosts 文件，可以：**将 hosts 文件复制到桌面，用记事本打开，修改完保存，再复制回原目录。**

## 取消浏览器自动加 https

日常开发过程中，启动前端服务后，通常需要打开：http://localhost:8080。但谷歌浏览器会自动将协议升级为 https，导致页面打不开。

```json
host: "127.0.0.1"  // 可以规避这个问题
```

## 顶级选择文本秘籍

1. 选中当前词汇：**双击鼠标**
2. 选中当前段落：**三击鼠标左键**

## 精准定位办公室空调开关

作为**空调刺客**，感觉有必要分享一下办公室空调的使用技巧：

- 如果不好意思关空调，可以把设定温度调高到 27 度，这样温度一旦过低，空调就不吹风了。和关了一样的效果。
- 如果想关空调，找不到开关，**可以尝试在出风口上找编号，然后再找对应编号的开关**。可以达到精准定位的效果。

## 让鼠标光标自己移动

零设置、零成本

1. 把鼠标放到笔记本电脑:computer:`右下角`:arrow_lower_right:
2. 使鼠标的头部压在键盘:keyboard:`上下左右的箭头上`，或部分箭头上
3. 不断调整鼠标位置，直到屏幕上的`光标来回晃动`

## 屏幕分屏显示快捷键

```shell
# 打开软件A，这时按 Win + ←，软件A的界面将占据左半个屏幕
Win + ←

# 打开软件B，这时按 Win + →，软件B的界面将占据右半个屏幕
Win + →

```

## 登录 wifi 后台

直接在浏览器里输入：[192.168.1.1](http://192.168.1.1)，输入用户名和密码，一般在`路由器背面`。

## 截屏利器

平时在电脑上使用微信客户端即可方便截屏，但有些时候无法安装微信或 QQ，这时候可以使用 win10 自带的快捷键：`Win + Shift + S`进行截屏。  
今天推荐一款超好用的截屏软件，可以完美替代微信客户端。

- 软件名称：**Snipaste**
- 软件功能：截屏 + 标注 + 贴图 + 取色
- 软件介绍：[Windows 上最好的免费截图标注工具：Snipaste](https://sspai.com/post/34962)
- 软件下载：[https://www.snipaste.com/](https://www.snipaste.com/)

## 设置定时关机

```shell
# 使用下方快捷键调出运行窗口
Win + R

# 输入下方命令，设置600s后关机
shutdown -s -t 600

# 输入下方命令，取消自动关机
shutdown -a
```

## 使用打印机扫描文件

```shell
# 使用下方快捷键调出运行窗口
Win + R

# 输入：WFS，打开系统自带的扫描软件
WFS
```

## 图片 转 PDF

直接下载并使用这款神器：[ImageToPDForXPS](/blog/tech/recommend.html#工具类)

## Word 转 PDF

Word 文档自带了导出为 PDF 的功能，只需要：**文件** > **导出** > **创建 PDF/XPS 文档**

## 识别图片中的文字

直接使用我开发的这款小程序即可：[慧眼识材](/blog/tech/projects.html#小程序)

## 下载网页中的视频

1. 在手机上下载并安装`QQ浏览器`
2. 在 QQ 浏览器上打开网页，播放视频
3. 提示安装`视频播放插件`，如果安装失败，一般过几天会自动安装好
4. 播放视频的时候，视频右侧有下载图标，点击后选择“普通下载”即可
5. 如果下载的视频是 m3u8 格式，再直接转成 mp4 即可

## 抖音图文遮挡视频的解决办法

1. 用食指和中指瞬间放大视频，再松开即可
