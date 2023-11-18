# 项目介绍

简介:用户可以进入前台与照片交互；管理员进入后台审核照片、管理账户信息。

## 系统的访问流程

​	由于整个项目的路由都是根据角色、权限来动态注册的。所有流程稍微有些复杂，所以需要整理下。

​	为了实现登录用户可以在重新访问网页时直接进入前台或后台项目，所以对用户数据进行了本地持久化处理，根据本地存储的用户数据来注册不同的路由，用户就可以直接访问对应项目了。

### 0.入口

​	初始路由为整个项目的入口，有以下路由表：

1. 注册

   提供`User`角色的账户注册

 2. 登录

    提供账户登录的功能，登录后会根据角色进入前台或后台项目

 3. 404

    若路由未能成功匹配上时，通过该页面提示用户，并返回到上一层。

 4. 任意路由

    1. 用来捕获当前路由路径未能匹配上路由表时的回调，通过返回值来重定向到对应路由中。

    2. 用该钩子可以实现重定向到404、根据角色、权限直接注册路由表并跳转到对应路由中去。
    3. 在初始路由表中，若当前访问的路由路径未能匹配上时：
       1. 若当前用户未登录，会调用`isUserPath（此函数的作用会判断当前路径是否命中前台项目的路径）`
          1. 若命中，直接注册前台项目的路由，并进入对应页面中去。
          2. 未命中，进入404页面
       2. 若当前用户登录了，角色为`User`，同1。
       3. 若当前用户登录了，角色为`Admin`或`SuperAdmin`，则会调用`isAdminPath(此函数的作用会判断当前路径是否命中后台项目的路径)`
          1. 若命中，则会根据当前用户角色权限注册对应的路由
          2. 若未命中，进入404页面

### 1.前台

​	前台项目，`游客`（未登录）和`User`可以直接进入，不过部分路由`游客`不能访问。

### 2. 后台

​	后台项目，`Admin`和`SuperAdmin`，可以直接进入，部分路由有权限，`Admin`可能不能访问这些路由。

### 3.登录

​	登录时，会卸载所有路由，并注册初始路由，并注册前台或后台项目，进入首页。

### 4.注销

​	登录时，会卸载所有路由，并注册初始路由，并跳转到登录页。

## 前台

`游客`和`User`（账户角色）可以进入前台页面。

### `游客`可以：

1. 浏览照片
2. 查看照片评论
3. 进入其他用户页面
   1. 查看该用户已发布的照片
4. 照片曝光埋点
5. 注册
6. 登录

### `User`可以（权限包括了游客权限）：

1. 与照片交互（点赞、评论）
2. 点赞评论
3. 修改个人信息
4. 进入我的页面
   1. 公开或不公开我喜欢的照片 （待定）
   2. 查看照片审核状态
5. 发布照片
6. 获得照片被审核通过的推送消息

## 后台

后台必须登录才能进入，后台角色分为`Admin`和`SuperAdmin`。

### Admin 可以:

1. 查看所有照片
2. 审核照片
3. 修改个人信息

### SuperAdmin 可以(权限包括了 Admin 权限):

1. 修改任意用户的账户信息
2. 下发管理员账户

# 环境搭建

1. 配置路由
2. 配置环境变量
3. 配置 Vue 插件
4. 配置 css 文件
5. 二次封装 axios
6. 封装工具函数 nprogress
7. 配置初始化路由表
8. 封装设置仓库（修改主题，多语言）

# 登录注册

登录注册页是整个系统的入口。
可以注册 User 角色登录到前台项目，也可以直接游客进入前台项目中。
若登录的是管理员账号，则需要进入后台项目。
根据用户登录时的角色，动态注册路由。
若用户直接访问前台中的路由则根据本地中的用户是否登录来注册前台路由，并进入前台项目的对应路由中。

# 前台

可以直接访问前台项目，无需登录，当然也可以跳转到登录页登录账户，登录成功享有更多功能，例如：

1. 点赞、发送照片
2. 点赞，发送评论
3. 收到照片审核成功的消息推送
4. 修改个人信息和密码

## 布局

头部导航栏，主视图的上下结构。
导航栏有：我的（登录）、首页、搜索
菜单栏：在登录状态和非登录状态提供不同的菜单项

1. 登录状态:发送照片、我喜欢的照片、我的照片、我的、注销
2. 非登录状态:登录
3. 都可以使用的：主题切换、国际化、浏览的历史

## 页面

1. 首页
   1. 瀑布流布局
   2. 初始骨架屏加载
   3. 无限加载
2. 搜索页
   1. 搜索用户
   2. 搜索照片
   3. 搜索评论
   4. 可以通过 url 保存搜索结果
3. 我的
   1. 我喜欢的照片
   2. 我发布的照片（审核通过、审核未通过、未审核）
4. 详情页
   1. 照片浏览量上报
   2. 查看照片信息（响应式）
   3. 评论模块(分页加载、发送评论)
   4. 更多相似推荐（🎈 待定）
5. 用户页
   1. 用户发布的照片
   2. 用户喜欢的照片
6. 发布照片页
7. 浏览历史页
8. 修改我的信息
   1. 基本信息
   2. 修改密码
9. 发现页 （🎈）
   1. 根据标签内容来查看对应标签下的照片

# 频道 Pubsub

1. `user:page-bottom`，当前台项目的 main 组件触底时触发
2. `user:post-comment`，发送评论成功时触发
3. `user:to-top`,路由路径变化触发或手动触发，让 main 组件滚动到顶部
4. `window.resize`,当浏览器视口尺寸发生变化时，传入 window.inner 的高宽
5. `user:search-input-focus`,搜索页输入框聚焦
6. `admin:page-bottom`，当后台项目`main`组件触底时触发。

# 后台

后台页面的访问方式(二选一)：

1. 通过本地存储的token信息直接访问
2. 通过登录页进入后台系统

## 布局

非常经典的`Header`、`Sider`、`Main`，即可。
`Header`:展示 logo、用户信息、用户功能下拉菜单、展示面包屑？
`Sider`:导航菜单。
`Main`:主视图，业务基本汇聚于此。

### Header

​	Header分为左侧和右侧操作区域

1. 左侧
   1. 菜单`sider`的折叠和展开
   2. 面包屑导航
2. 右侧
   1. 下拉菜单：包含`路由导航`和`功能操作`
   2. 全屏按钮
   3. 国际化
   4. 主题切换

### Sider

​	侧边栏为菜单栏，提供路由导航，根据用户角色动态渲染菜单。

1. 侧边栏的展开和缩放
2. 侧边栏支持路由模式
3. 侧边栏支持国际化

### Main

​	主视图，包含了业务区以及浏览的路由历史记录

### 移动端布局支持🎈

​	待定

## 角色权限

### Admin

1. 首页数据看板
2. 照片列表表格（审核照片）
3. 个人信息管理
4. 创建`User`账户
5. 管理评论
6. 管理标签

### SuperAdmin

在`Admin`基础之上还包括以下权限:

1. 用户信息管理（修改所有账户的信息）
2. 下发管理员`Admin`账户

## 页面

1. 首页数据看板
2. 审核（照片、评论🎈）
   1. 审核照片页
      1. 发布的图片以表格分页展示
      2. 查看图片
      3. 审核图片
      4. 删除图片 🎈
      5.  通过过滤器，查询某个用户或某种审核状态的图片
3. 个人信息管理
   1. 修改密码（修改密码后会重新登录）
   2. 修改个人资料
4. 用户信息管理
   1. 修改所有账户的信息
   2. 创建账户
   3. 删除账户 🎈
   5. 通过过滤器（关键词、对应用户、排序）查找用户
5. 管理页面
   1. 管理评论
      1. 删除评论（软删除）
      2. 过滤器查找（某个照片、某个用户、排序、删除状态）的评论
      3. 查看评论列表
      4. 恢复评论
      5. 查看评论详情
   2. 管理照片标签
      1. 删除
      2. 编辑
      3. 增加
      4. 查询
         1. 根据id排序
         2. 查询某个管理员创建的标签

# 待定完成的功能

## 用户

1. 关注系统

2. 更完善的个人信息

3. 删除用户

   为什么不能随随便便删除？删除User角色用户到无所谓，顶多级联删除相关记录，但删除管理员角色就会到photo表字段审核uid的错误。想要解决就需要使用触发器将审核状态置为未审核，后面需要再做。

## 照片

1. 相似照片推荐
2. 照片的标签系统

## 消息推送功能

1. 点赞通知
2. 审核
3. 管理员删除评论通知
   ...

# Time

## 10.4

1. 登录注册页添加主题、语言设置组件
2. 封装导航钩子，易于维护
3. 搭建 My 页的发布照片页
4. 封装函数式模态框(实现元素共享、居中的过渡效果)
5. 封装 PhotoItemMini 组件
6. 修改检查前台路由路径匹配的函数 bug(bug 问题是：当前子路由全部不命中就返回不命中的结果了，完全没考虑兄弟路由等后面未校验路由，需要等所有路由路径都被校验过了才能给出结果！！！)
7. My 和 User 页搭建完成

明日任务:完成个人信息修改、发布照片、历史任务 √

## 10.5

1. 封装 useQuery 钩子，快速校验解析路由 query 参数
2. User 页参数化 tabs。路由查询参数与 tabs 栏绑定，可以通过路由切换 tabs 栏
3. 后端:
   1. 完善了修改密码接口，需要校验当前密码才能更新成功
   2. 新增上传头像接口
   3. 完善更新用户信息接口，可以选择性的更新某个字段了
4. 编辑页完成，包括修改用户信息、修改用户密码
5. 完善了`ImgCutter`组件，如动画，配置项等。
6. 搜索、浏览历史、发布照片路由页面配置
7. 完善头部下拉导航菜单
8. 网页标题国际化
9. 发布照片页搭建

## 10.6

1. 发布照片页完成
2. 是否要做照片审核结果的推送功能？(通过 `SSE`、`Websocket` 长连接通信)，完成，通过 `SSE` 技术实现了服务端推送消息。(能否改成`websocket`?因为`SSE`比较适合广播) √
3. 后端：
   1. 通过 `SSE` 实现了照片审核结果的消息推送，客户端可以即时收到照片审核的结果。
   2. 增加通过 pid 列表获取照片列表
4. 历史记录页完成

> TODO：
>
>1. 搜索页接口 √
>2. 前台搜索页 √
>3. 后台搭建 √

## 10.7

1. 后端：搜索照片接口。
2. 头部导航栏解决子路由高亮问题
3. 搜索照片（搜索评论、用户？？）
4. 搜索照片页搭建中...

> TODO:
> 1. 完善搜索页... √
> 2. 照片搜索结果有 bug，只要瀑布流容器 dom 被卸载，重新获取数据渲染 dom 时，瀑布流容器不会生效 √

## 10.8

1. 解决搜索照片页的 DOM 更新后瀑布流实例无法获取最新 DOM 来排列子项的 bug
2. 后端:
   1. 搜索评论
   2. 搜索用户
3. 重写搜索照片写，将无限滚动改为分页加载
4. 搜索评论、照片页完成

## 10.15

1. 增加发布照片页筛选器显示逻辑
2. 搜索用户页完成
3. 后端
   1. 挂载的静态图片可以根据查询参数来设置图片质量了，减轻服务器、客户端的流量
4. 404页
5. 后台项目路由配置
6. 重写任意路由捕获钩子
7. 后台项目的布局...

> TODO:
>
> 1. 对于图片，是否可以根据参数来设置图片分辨率？提升加载速度 ✅
>2. 500页
> 3. 403页，用户无权限访问页面时跳转403页
> 4. 后端能不能上redis?
> 5. 全屏状态下，F11无法被捕获，导致全屏图标不能和当前全屏状态同步

## 10.16

后台项目的布局：

1. `sider`的展开缩放、国际化
2. `header`的面包屑导航
3. `main`的拆分组件：视图区、历史记录区。

## 10.21

后台项目：

1. 布局`Main`组件中主视图滚动底部的监听。
2. 布局`Main`组件路由历史记录的搭建
   1. 访问即可产生一个浏览的历史记录
   2. 可以删除、删除全部、删除全部并保留当前历史记录等功能
   3. 激活的页面高亮历史记录项
   4. 当被激活的历史记录未显示在视口时，会自动调整偏移量显示。（有点bug？？）
3. 审核页搭建，搭建审核照片页，完成列表展示、审核照片的功能。



今天主要是把时间都花在封装**历史记录**组件、研究**data-table**组件、封装**audit-photo-modal**组件去了，复习了下JSX写法。。。



> TO-DO
>
> 1. 注销账户是否需要清除用户本地数据：后台项目中浏览的页面历史记录、前台项目中浏览的照片历史记录 ✅
>
> 2. 后台项目的移动端适配?
> 3. 后端审核评论的功能，管理员可以软删除评论。？



## 10.22

后台项目:

1. 完善模态框渲染函数
   1. 现在可以让组件支持各种生命周期钩子函数的调用了。
   2. 支持平凡的入场方式`ordinary`，其效果为淡入淡出。
2. 封装图片预览组件
3. 审核照片页搭建完成
4. 完善ImgCutter组件，支持深色模式 ✅

后端：

1. 修改获取账户列表`/auth/account/list`接口，可以筛选不同类型的用户了。
2. 新增获取User账户列表`/auth/account/user`接口，可以获取User账户了。
3. 管理员获取照片列表`/photo/admin/list`支持根据创建日期排序了。

> TO DO
>
> 1. 删除照片?
> 2. 编辑页，完善上传文件相关的提示，表单校验

> 感悟
>
> 今天在封装图片预览组件时，发现自己连一个一元一次方程都不会解了。
>
> 场景就是预览图片时可以通过交互设置图片旋转多少角度。在切换下一张图片时需要重置所有的偏移量，起初我是直接将rotate置为0，会导致动画效果非常搞笑，因为设置了过渡时间，图片要被旋转很多次回到0度，所以我想的是将当前偏移量+x变为360的倍数，所以需要计算这个方程：`(this.rotate+x)%360=0`
>
> ```js
>         // 重置偏移量
>         resetSetting() {
>           this.scale = 1;
>            // (this.rotate+x)%360=0，算出x
>           this.rotate = 0;
>         },
> ```
>
> 但好像解出来的值不太符合我的预期。。
>
> 最终我的解决方案是一直累加，直到可以被整除为止。
>
> ```js
>         // 重置偏移量
>         resetSetting() {
>           this.scale = 1;
>           while (this.rotate % 360 !== 0) {
>             this.rotate++;
>           }
>         },
> ```
>
> 但这样也不太好，例如我顺时针10度，重置时会导致直接反转到360度，动画效果不好看，明明可以退回到10度的。
>
> 最最终的优化效果：
>
> ```js
>         // 重置偏移量
>         resetSetting() {
>           this.scale = 1;
>           // 逆时针
>           let sub = this.scale;
>           // 顺时针
>           let add = this.scale;
>           // 通过顺时针逆时针谁先到360的倍数就赋值为谁，优化动画效果
>           while (sub % 360 !== 0) {
>             sub--;
>           }
>           while (add % 360 !== 0) {
>             add++;
>           }
>           if (Math.abs(sub) >= add) {
>             // 逆时针到360倍数大于add
>             this.rotate = add;
>           } else {
>             // 顺时针到360倍数大于sub
>             this.rotate = sub;
>           }
>         },
> ```
>
> 

## 10.24

后台项目:

1. 完善编辑页
2. 注销用户时删除所有历史记录
3. 搭建账户管理页

后端:

1. 接口更新，移除`/auth/register/admin`,替换为`/auth/create/account`，超级管理员可以创建任意角色的用户了。（超级管理员可以创建任意角色的用户，包括超级管理员❗）

## 10.28

后台项目:

1. 完善管理账户页
   1. 封装创建用户渲染函数
   2. 封装编辑用户渲染函数
2. 完善面包屑图标适配
3. 搭建管理评论
4. 配置组件库国际化，调整`n-config-provider`组件的位置到根组件，这样能让所有组件都能适配国际化和主题

后端:

1. 接口更新`/auth/update/{uid}`支持可选式更新用户某些字段了。
2. 增加删除评论接口`/photo/comment/:cid`
3. 增加恢复评论接口`/photo/comment/restore/:cid`
4. 增加查看所有评论接口`/photo/comment/all`

> TO DO
>
> 后端
>
> 1. 管理员查看评论列表接口 ✅
> 2. 软删除评论 ✅
> 3. 删除用户--注意需要对用户表做触发器，在删除用户时，若是管理员需要将该用户审核的照片状态全部置为未审核状态；若是User则级联删除相关信息即可。
> 4. 标签系统

## 10.29

后台

1. 增加几个过滤器组件：用户、删除状态、图片
2. 管理评论页完成
3. 403、500结果页

后端

1. 增加`/photo/all/briefly`接口，查询照片的简要信息。
2. 增加获取某个评论接口`/photo/comment/:cid`，修改发送评论接口的路径`/photo/comment/create/:pid`
3. 增加`照片标签模型`和`照片与照片标签的联系表`
4. 优化`Logger`拦截器，现在只会打印内部错误或服务器错误的信息了
5. 封装`IntPipe`管道，现在可以拥有更良好的参数错误提示了
6. 搭建标签系统模块
   1. 增
   2. 删
   3. 改

> TO DO
>
> 1. 403页 ✅
> 2. 管理评论页，查看某个评论的更多数据 ✅
> 3. 双token，实现token续签，提升用户体验 ✅
> 4. 拟定接口
>    1. 增加标签 ✅
>    2. 删除标签 ✅
>    3. 修改标签 ✅
>    4. 获取标签 ✅
>    5. 修改发布照片接口，需要接收标签字段，并且需要保存在其关联表中 ✅
>    6. 获取照片相关接口需要修改，需要返回该照片拥有哪些标签（只对前台照片有照片标签信息） ✅
> 5. 封装基本类型的管道，主要是为了由良好的错误信息提示。(暂时只封装了数字型)

## 11.9

​	太久没编码了，真有点忘了整个系统的逻辑了。

后端：

1. 管理员查询标签列表、查询标签列表接口
2. 修复`IntPipe`的bug。
3. 创建照片时，会根据照片id、与标签id列表给对应照片添加标签。~~若标签id列表中有id不存在，则会回滚事务，创建照片失败。~~（不知道为啥事务会超时，所以我只好不用事务。）

> bug复原：intpipe在开启可选时，会直接忽略参数值直接返回undefined。
>
> 解决方案：应根据参数值与可选选项来返回结果。若参数值为undefined时，则看是否开启了可选；若参数值传入了则校验参数值即可。

## 11.10

后端:

1. 修改获取User获取照片、照片列表接口可以返回照片标签信息
2. 增加接口，根据tid获取对应的照片列表

>TO-DO
>
>1. 按照标签（一个或多个标签）来检索照片接口
>2. 等待前端完善标签系统
>      1. 前台：新增发现页（根据标签来检索照片），照片详情页显示标签信息，创建照片时可以选择照片标签
>      2. 后台：管理标签页，增删改查标签

## 11.13

后端：

1. 修改登录接口，返回at、rt两个token
2. 增加刷新token的接口，通过rt获取at

前端：

1. 修改用户仓库，登录后保存at和rt
2. 修改响应拦截器处理401，通过rt刷新at，刷新后重新请求上次失败的请求（未考虑并发失效的问题）。
3. 后台
   1. 搭建管理标签页
      1. 标签数据表格渲染
      2. 筛选标签创建人
      3. tid排序

> TO-DO
>
> 1. 为前端刷新token方案考虑并发失效的问题。
> 2. 增加标签
> 3. 编辑标签

## 11.15

后端

1. 修改修改标签接口，现在可以设置某个描述为null了，若描述的值为空串，则会将对应字段设置为null

前端

1. 后台
   1. 修复审核照片模态框bug，禁止设置照片的状态为未审核状态。
   2. 完善管理标签页
      1. 编辑标签的模态框
      2. 创建标签的模态框
      3. 删除标签
   3. 完善Header区的下拉菜单
2. 前台
   1. 创建照片时，可以设置照片的标签。
   2. 照片详情显示照片标签，点击某个标签可以跳转到发现页查看对应标签下的照片

>TO-DO
>
>后台项目首页做数据看板，包括：
>
>1. 各标签的照片数量统计
>2. 用户发布照片的总浏览量
>3. 用户发布照片数量
>4. ....
>
>前台:
>
>​	1.完成发现页 ✅

## 11.17

1. 修改photo-item-mini组件，使用render函数来渲染模板内容。
2. 搭建发现页（标签选择器、照片列表分页组件）
3. 封装photo-item-common组件

## 11.18

1. 完善发现页
2. 修改前台主页搜索栏下方的快捷搜索标签功能
3. 修改用户列表分页组件的布局

> 增加接口（为了做后台的首页数据看板）
>
> 1. 仪表盘
>    1. 新增用户
>    2. 新增照片
>    3. 新增评论
>    4. 审核数量
>
> 2. 各标签的照片数量统计
>
> 3. 用户发布照片的总浏览量
> 4. 用户发布照片数量
> 5. 当日/所有审核照片的情况