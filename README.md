# Nodejs-ByrBBSDaily
这是一个基于Nodejs的express框架构建的北邮人论坛的论坛日报项目。采用mongodb作为数据库。配合[Nodejs-ByrTopTen](https://github.com/Molunerfinn/Nodejs-ByrTopTen)这个爬虫将可以获得数据源，然后自行就能搭建一个论坛日报的web版本。本项目html模版引擎默认采用jade，css预处理默认采用stylus。当然你如果更熟悉ejs、less等也可以自行修改。额外只引入zepto.js，所以整体非常轻量，响应速度很快。对移动端进行了不完整适配，在移动端效果较好。
项目已经上线，线上地址点[这里](http://topten.piegg.cn)

---

## 更新日志
### v1.0 pro-a

- 整合代码
- 删除多余的console.log

## 使用方法
> 以下的命令行的默认目录是在项目根目录下（app.js所在目录）

### 1分钟下载依赖
在命令行下，输入`npm install`或者`cnpm install`（如果你装了cnpm的话），将自动安装依赖。（使用之前默认大家已经装好node环境和npm）
### 5秒启动服务
在命令行下，输入`node ./bin/www`，将会在`127.0.0.1:3000`端口开启服务，在浏览器输入这个地址就能看到初始效果。  
**注意**：**一旦发现没有效果，请检查3000端口是否被占用。**
### 获取数据并输出到前端
**首先需要在本地配置好mongodb数据库。配置教程很多，只需配置好mongodb并开启它的服务即可。**然后调用[Nodejs-ByrTopTen](https://github.com/Molunerfinn/Nodejs-ByrTopTen)这个爬虫，将会爬取数据并写入数据库。  
一旦写入成功，刷新你的`127.0.0.1:3000`就能立即看到效果。

---

## 已知bug

- 安卓UC浏览器无法实现该项目的ajax懒加载
- 字体line-height高度有问题

---

## Todos

- 前端更新、bug修复
- 整合论坛API，实现搜索、收录、点赞等功能
- 采用RN或者类RN技术开发论坛日报的IOS和安卓版

---
## 交流与建议

欢迎大家与我交流，或者pull request给我的项目提建议~你能在github上找到我的联系方式。
