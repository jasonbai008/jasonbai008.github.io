# 海上冲浪

::: tip 前言
世界那么大，我想去看看
:::

## TikTok

> 需要设置很多东西，才能在闲置手机上刷 TikTok，其实只刷抖音也不错

1. 准备一部**不插卡**的闲置手机，恢复出厂设置更好，**绝对不能插卡**
2. 设置手机时间为：**美国华盛顿时间**
3. 设置手机语言为：**英语**
4. 在电脑上翻墙，使用邮箱注册一个**谷歌账号**
5. 手机上：下载并安装翻墙软件[v2rayNG](https://gitee.com/lubanseven/store/releases/download/v1.0/v2Rui4Mobile.apk)
6. 手机上：下载并安装安卓版[TikTok](https://dx17.198449.com/com.zhiliaoapp.musically2644.apk)
7. 根据下方[移动端教程](./surf.html#移动端教程)，在手机上**实现翻墙**
8. 打开 TikTok，尝试使用刚才注册的**谷歌账号登录**
9. 设置**个人生日**
10. 在翻墙成功的情况下就可以畅快的刷 TikTok 了
11. 是不是麻烦死！！！

## 科学上网

::: tip 原理
请求谷歌网站 --------> 节点服务器(转发请求) ---------> 谷歌网站  
谷歌页面打开 <-------- 节点服务器(接收数据) <--------- 谷歌页面数据
:::

### 移动端教程

#### 1. 资源网址

- [https://vpnsky.github.io/](https://vpnsky.github.io/)
- [https://github.com/Pawdroid/Free-servers](https://github.com/Pawdroid/Free-servers)
- [https://hysteria2.github.io/](https://hysteria2.github.io/)
- [https://v2rayshare.com/](https://v2rayshare.com/)
- [https://github.com/2dust/v2rayNG/releases](https://github.com/2dust/v2rayNG/releases)

#### 2. 软件下载

- [Android版](https://gitee.com/lubanseven/store/releases/download/v1.0/v2Rui4Mobile.apk)

#### 3. 订阅地址

::: tip 优先使用第一个

https://raw.githubusercontent.com/Pawdroid/Free-servers/main/sub

<p>{{`https://hysteria2.github.io/uploads/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/0-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}.txt`}}</p>

<p>{{`https://v2rayshare.com/wp-content/uploads/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}.txt`}}</p>
:::

#### 4. 添加订阅地址

打开`v2rayNG` > 点击左上角`菜单`图标 > 选择 `订阅设置` > 粘贴刚才复制的订阅地址 > 点击对钩保存

#### 5. 更新订阅地址

返回到主页面 > 点击右上角`菜单`图标 > 选择 `更新订阅` > 主页面就会出现节点列表

#### 6. 筛选出可用的服务器节点

点击右上角`菜单`图标 > 选择 `测试全部配置真连接` > 等待两分钟 > 再选择 `删除无效配置(先测试)`> 最终列表中只剩下可用的节点了

#### 7. 选择节点并连接

随便点击一个可用的节点，右击右下角`圆型图标` > 图标变绿

#### 8. 测试是否翻墙成功

在浏览器中尝试打开[https://google.com](https://google.com)，如果能打开，就翻墙成功。否则需要切换节点

#### 9. 停止科学上网

再次点击`圆型图标` > 图标变灰

### 电脑端教程

#### 1. 资源网址

- [https://vpnsky.github.io/](https://vpnsky.github.io/)
- [https://github.com/Pawdroid/Free-servers](https://github.com/Pawdroid/Free-servers)
- [https://hysteria2.github.io/](https://hysteria2.github.io/)
- [https://v2rayshare.com/](https://v2rayshare.com/)
- [https://github.com/2dust/v2rayN/releases](https://github.com/2dust/v2rayN/releases)

#### 2. 下载 v2rayNG，解压并运行
点击 [Windows版](https://gitee.com/lubanseven/store/releases/download/v1.0/v2RuiN.zip) 下载，解压后直接双击 exe 图标，不用安装，桌面右下角会出现 `v2rayNG` 小图标


#### 3. 添加订阅

双击小图标，打开主界面，点击`订阅` > `订阅设置`，在弹窗中添加1个/2个订阅地址，并勾选`启用`。

::: tip 优先使用第一个

https://raw.githubusercontent.com/Pawdroid/Free-servers/main/sub

<p>{{`https://hysteria2.github.io/uploads/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/0-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}.txt`}}</p>

<p>{{`https://v2rayshare.com/wp-content/uploads/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}.txt`}}</p>
:::

![添加订阅](/life/fq/dingyue.png)

#### 4. 更新订阅地址

点击`订阅` > `更新订阅`，这时候，就能从订阅地址拉取到一批免费节点。

#### 5. 测试节点速度

在主界面，任选一个节点，`Ctrl+A`选中所有节点，再`Ctrl+R`，测试所有节点，看哪些能用

![测试节点](/life/fq/fq3.png)

#### 6. 选择节点并连接

随便点击一个可用的节点，按`Enter`，关闭主界面，右击小图标，选择`Http代理`> `开启Http代理（全局模式）`，小图标变红

#### 7. 测试是否翻墙成功

在浏览器中尝试打开[https://google.com](https://google.com)，如果能打开，就翻墙成功。否则需要切换节点

#### 8. 切换节点

右击小图标，选择`服务器`，从里面选择一个节点即可。也可以双击小图标，在主界面中选择一个节点，按`Enter`

#### 9. 停止科学上网

右击小图标，选择`Http代理` > `关闭Http代理`
