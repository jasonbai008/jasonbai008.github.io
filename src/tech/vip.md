# 懒人帆樯

## Astar VPN

✅ Edge 浏览器

1. 使用 **Edge 浏览器**，打开 [Astar VPN](https://microsoftedge.microsoft.com/addons/detail/astar-vpn-%E9%80%82%E5%90%88%E6%89%80%E6%9C%89%E4%BA%BA%E7%9A%84%E5%85%8D%E8%B4%B9%E4%B8%94%E5%BF%AB%E9%80%9F%E7%9A%84-/phnnpafoelnadmgjkinijkbaogoekoff)，点击右上角的 `获取` 按钮，将插件安装到浏览器里。
2. 安装完成后，点击浏览器右上角的 `扩展拼图` 图标，点击插件右侧的 `📌` 将插件固定到任务栏。
3. 选择一个免费节点（前三个节点免费），点击 `连接` 按钮即可自由上网。

## Fan VPN

[FanVPN](https://fanvpn.net/) 是**一款免费的 Chrome 浏览器 VPN 插件**，高速稳定 👍，一键冲浪 ❤️。

✅ Chrome 浏览器  
✅ Edge 浏览器  
✅ Android 手机  
❌ iOS 手机

- [官网安装教程](https://fanvpn.net/#install)
- 帆樯后，进入 [Chrome 应用商店](https://chromewebstore.google.com/detail/fanvpn/efcglfachpgebjoeilpbmplfmacjajem)在线安装
- 免帆樯，下载 [ZIP 包](https://fanvpn.net/downloads/fanvpn-latest.zip)，手动安装到浏览器
- 免帆樯，下载 [APK 包](https://fanvpn.net/downloads/FanVPN-1.0.2.apk)，手动安装到安卓手机

## Subscriptions

V2Ray 客户端免费订阅链接：

- [https://gcore.jsdelivr.net/gh/aews/jd/v20830.txt](https://gcore.jsdelivr.net/gh/aews/jd/v20830.txt)
- [https://fq.jasonbai.dpdns.org?type=base64](https://fq.jasonbai.dpdns.org?type=base64)

## Softwares

| 平台        | 推荐客户端                                                                                                                                                                                                              | 备注               |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| **Windows** | [v2rayN](https://v2rayn.2dust.link), [FlClash](https://github.com/chen08209/FlClash), [mihomo-party](https://github.com/mihomo-party-org/mihomo-party), [Clash Verge Rev](https://github.com/ClashVerge/ClashVerge-Rev) | 全面支持           |
| **Android** | [ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid), [FlClash](https://github.com/chen08209/FlClash), [v2rayNG](https://v2rayng.2dust.link/)                                                        | 建议使用 Meta 核心 |
| **iOS**     | [Surge](https://surgeapp.com/), [Shadowrocket](https://shadowrocket.com/), [Stash](https://stashapp.com/)                                                                                                               | 完美适配           |
| **MacOS**   | [FlClash](https://github.com/chen08209/FlClash), [mihomo-party](https://github.com/mihomo-party-org/mihomo-party), [Clash Verge Rev](https://github.com/ClashVerge/ClashVerge-Rev), [Surge](https://surgeapp.com/)      | M1/M2 完美兼容     |

## EdgeTunnel

::: tip 介绍
个人搭建工具。高速免费海外冲浪，每天 10 万次请求额度，早上 8 点更新。
:::

> edgetunnel 是一个基于 CF Workers/Pages 平台的边缘计算隧道解密方案。它能够高效地处理网络流量，并提供强大的管理面板和灵活的节点配置能力。

## 1. 教程视频

<video src="https://asset.jasonbai.dpdns.org/blog/cf-free.mp4" controls width="100%"></video>

## 2. 完整思路

1. 注册免费域名（[教程](/tech/deploy.html#_2-注册免费域名-dpdns)），例如：`jack.dpdns.org`
2. 注册 Cloudflare 账号
3. 在 Cloudflare 中托管域名（[教程](/tech/deploy.html#_3-在-cloudflare中托管域名)）
4. 新建 Worker KV
5. 新建 Worker，将 [\_worker.js](https://github.com/cmliu/edgetunnel/blob/main/_worker.js) 内容粘贴到编辑器并部署
6. 进入 Worker，设置 > 变量，添加 `ADMIN`，值为管理员密码，例如：`123`
7. 进入 Worker，绑定 > 添加绑定 > KV 命名空间，变量名称填 `KV`（可新建或选用已有）
8. 进入 Worker，域 > 添加自定义域，例如：`cf.jack.dpdns.org`，等待证书生效
9. 访问控制台：`https://cf.jack.dpdns.org/admin`，输入密码：`123`
10. 复制订阅链接
11. 根据自己的系统，下载并安装[客户端](#softwares)，例如：`V2RayN`
12. 打开客户端，按 `Ctrl + V`，导入订阅链接
13. 选择 `订阅分组` > `更新全部订阅（不通过代理）`，拿到优选节点
14. `Ctrl + A` 全选节点，`Ctrl + R`，测试所有节点真实速度
15. 随便选择一个节点，按 `Enter` 键
16. 在最下方选择 `自动配置系统代理`，开始帆樯
17. 打开 [lite.ipcheck.ing](https://lite.ipcheck.ing)，查看自己 IP 所在的地区
18. 在最下方选择 `清除系统代理`，结束帆樯
19. 根据 [设置 Workers/Pages 可用请求数统计](https://blog.cmliussss.com/p/edt2/#%F0%9F%93%8A-%E8%AE%BE%E7%BD%AE-Workers-Pages-%E5%8F%AF%E7%94%A8%E8%AF%B7%E6%B1%82%E6%95%B0%E7%BB%9F%E8%AE%A1) 在 Admin 页面，显示每日请求额度使用情况

## 3. 详细教程

- [零度教程](https://www.freedidi.com/23618.html)
- [官方教程](https://blog.cmliussss.com/p/edt2/)（重点参考）
- [代码仓库](https://github.com/cmliu/edgetunnel)（重点参考）

## 4. 软件界面

V2RayN 软件界面：

![软件界面](/tech/v2rayn.png)

## 5. 使用统计

默认后台不开启用量统计，如需开启，需要手动设置一下：[开启统计](https://blog.cmliussss.com/p/edt2/#%F0%9F%93%8A-%E8%AE%BE%E7%BD%AE-Workers-Pages-%E5%8F%AF%E7%94%A8%E8%AF%B7%E6%B1%82%E6%95%B0%E7%BB%9F%E8%AE%A1)

![使用统计](https://blog.cmliussss.com/img/edt2/cf1-0-1.png)
