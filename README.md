<p align="center">
    <img width="180" src="https://raw.githubusercontent.com/2sky2night/photo-share-client/main/docs/img/icon.png" alt="Photo Share logo">
    <h1 style="text-align:center">Photo Share</h1>
</p>

# 介绍

Photo Share 是一个在线分享照片的平台，用户可以随时随地分享自己的生活状态。

- 使用 [Vue](https://github.com/vuejs/core)、[Nest](https://github.com/nestjs/nest) 搭建的全栈应用
- 前后台一体的项目，根据用户的角色可以访问对应的页面
- 前台全面适配响应式布局；支持主题切换、国际化等功能
- 使用双 Token 续签用户身份令牌方案，提升用户使用体验
- 本地持久化存储用户信息，便于用户再次访问应用

# Demo

[线上地址](http://47.120.18.126:8000/)

# 功能

应用根据用户登录系统时的角色而访问前台或后台项目（注册前台或后台路由），当然游客直接进入前台页面。

用户整体分为了 User、Admin、SuperAdmin 三种角色，User 可以访问前台项目，Admin 以及 SuperAdmin 为管理员可以访问后台项目。User 可以在前台项目中与照片交互，如发布、浏览、点赞、评论照片。管理员主要可以审核照片，管理评论、标签以及用户，User 发布的照片只有被管理员审核通过后，其他用户才能看见该照片。

## 前台

1. 发布照片
2. 评论、点赞照片
3. 发布、点赞评论
4. 查看已发布的照片（审核通过、未审核、审核未通过）
5. 查看点赞的照片
6. 搜索照片、评论、用户
7. 查看某标签下的照片
8. 查看历史记录
9. 支持主题切换
10. 支持国际化
11. 编辑个人信息

## 后台

1. 数据看板总览
2. 审核照片
3. 管理评论
4. 管理用户
5. 管理标签
6. 编辑个人信息
7. 支持主题切换
8. 支持国际化

# 应用快照

## 入口

![01](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/01.png?raw=true)

## 前台

### 首页

![02](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/02.png?raw=true)

### 详情

![03](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/03.png?raw=true)

![04](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/04.png?raw=true)

### 我的

![05](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/05.png?raw=true)

### 编辑

![06](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/06.png?raw=true)

### 搜索

![07](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/07.png?raw=true)

### 发现

![08](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/08.png?raw=true)

## 后台

### 首页

![09](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/09.png?raw=true)

### 审核

![10](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/10.png?raw=true)

### 管理评论

![11](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/11.png?raw=true)

### 管理标签

![12](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/12.png?raw=true)

### 账户

![13](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/13.png?raw=true)

### 编辑

![14](https://github.com/2sky2night/photo-share-client/blob/main/docs/img/screenshot/14.png?raw=true)

# 仓库

🥰 前端:https://github.com/2sky2night/photo-share-client

😭 后端:https://github.com/2sky2night/photo-share-server

# 更新日志

## 2023/11/22

1.0 发布
