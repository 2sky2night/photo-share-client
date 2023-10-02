# 项目介绍
   简介:用户可以进入前台与照片交互；管理员进入后台审核照片、管理账户信息。
## 前台
   `游客`和`User`（账户角色）可以进入前台页面。
   `游客`可以：
      1.浏览照片
      2.查看照片评论
      3.进入其他用户页面
         3.1 查看该用户已发布的照片
      4.照片曝光埋点
      5.注册
      6.登录
   `User`可以（在游客之上）：
      1.与照片交互（点赞、评论）
      2.点赞评论
      3.修改个人信息
      4.进入我的页面
         4.1.公开或不公开我喜欢的照片 （待定）
         4.2.查看照片审核状态
      5.发布照片
## 后台
   后台必须登录才能进入，后台角色分为`Admin`和`SuperAdmin`。
   Admin可以:
      1.查看所有照片
      2.审核照片
      3.修改个人信息
   SuperAdmin可以(在Admin之上):
      1.修改任意用户的账户信息
      2.下发管理员账户

# 环境搭建
1.配置路由
2.配置环境变量
3.配置Vue插件
4.配置css文件
5.二次封装axios
6.封装工具函数nprogress
7.配置初始化路由表
8.封装设置仓库（修改主题，多语言）

# 登录注册
   登录注册页是整个系统的入口。
   可以注册User角色登录到前台项目，也可以直接游客进入前台项目中。
   若登录的是管理员账号，则需要进入后台项目。
   根据用户登录时的角色，动态注册路由。
   若用户直接访问前台中的路由则根据本地用户数据来注册前台路由表进入前台项目

# 前台
   可以直接访问前台项目，无需登录，当然也可以跳转到登录页登录账户，登录成功享有更多功能。
## 布局
   头部导航栏，主视图的上下结构。
   导航栏有：我的（登录）、首页、搜索
   菜单栏：在登录状态和非登录状态提供不同的菜单项
      1.登录状态:发送照片、我喜欢的照片、我的照片、我的、注销
      2.非登录状态:登录
      3.公共的：主题切换、国际化、浏览的历史
## 页面
   1.首页
      1.瀑布流布局
      2.初始骨架屏加载
      3.无限加载
   2.搜索页（待定）
   3.我的：1.我喜欢的照片 2.我发布的照片（审核通过、审核未通过、未审核）
   4.详情页
      1.照片浏览量上报
      2.查看照片信息（响应式）
      3.评论模块(分页加载、发生评论)
      4.更多相似推荐（待定）
   5.用户页
   6.发布照片页
   7.浏览历史页
   8.修改我的信息
## 频道Pubsub
1.`user:page-bottom`，当前台项目的main组件触底时触发
2.`user:post-comment`，发送评论成功时触发
3.`user:to-top`,路由路径变化触发或手动触发，让main组件滚动到顶部
4.`window.resize`,当浏览器视口尺寸发生变化时，传入window.inner的高宽

# 后台
