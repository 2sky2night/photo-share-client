# 图片裁剪组件

该组件通过一个触发器打开模态框，模态框可以上传图片并裁剪图片，裁剪好的图片通过自定义事件`cut-down`触发。

## props

`fileTypeCatch:(file:File)=>boolean`:可选函数，会在上传文件回立即触发，用来检测文件类型是否合法，返回布尔值代表检测成功或失败，函数可以接收 File 类型的数据
`otherError:(reason)=>any`:可选函数，在出现错误时会触发回调，用来捕获错误信息，可以接收一个错误信息的参数。
`primaryColor:string`:可选参数,按钮主色
`primaryDisColor:string`:可选参数,按钮被禁用的主色
`modalClass`:可选参数，模态框 class 值
`needTrigger`:可选参数，是否需要显示触发器 defualt 插槽
`isDark`:可选参数，是否开启深色模式

## emit

`update:showModal:(v:boolean)`:模态框打开或关闭的回调，接收一个参数，代表是否打开了模态框
`cut-down:(data:File|null)`:裁剪成功的回调，接收一个参数，代表裁剪后的文件，若为 null 说明导出出现了问题。

## slots

`default`:打开模态框的占位符，不需要任何事件、状态，点击占位符即可打开模态框。

## exposed

`handleShowModal`：打开模态框
`handleUnShowModal`:关闭模态框
