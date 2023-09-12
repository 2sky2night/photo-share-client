<template>
  <div class="layout-backgourd" ref="layoutIns">
    <bg :length="200" v-for="item in listRecord" @is-finsh="onHandleFinish"></bg>
  </div>
</template>

<script lang='ts' setup>
// 1.dom多版本
//  1.1.列表渲染bg组件
//  1.2.raf自动向下滚动
//  1.3.监听滚动事件，快滚动到底部加载更多数据
// 2.不用列表渲染版本
//  2.1.渲染bg组件
//  2.2.raf自动向下滚动
//  2.3.监听滚动事件，快到底部使用scroll滚动到顶部
import { reactive, ref, onMounted } from 'vue'
import bg from './components/bg.vue';

// 列表个数，为什么是响应式？因为数组中每个元素
// 代表一个bg组件，每次滚动我们只需要添加一个元素即可
// 在页面中插入一个bg组件
const listRecord = reactive([1, 1])
// 视图容器
const layoutIns = ref<HTMLDivElement | null>(null)
// 正在加载某个子组件
let loading = true
// 最大底部阈值
const bottomMax = 5000

// 子组件加载完成时
const onHandleFinish = () => {
  loading = false
}

// 主视图滚动事件
const onHandleScroll = () => {
  if (loading) {
    // 某个子组件正在加载，不加载新的子组件
    return
  }
  if (layoutIns.value) {
    const target = layoutIns.value
    // 计算出当前是否滚动到底部了，插入新的图片列表
    // scrollHeight - innerHeight是为了减去阈值，可以在距离底部多少时加载
    if (target.scrollHeight - window.innerHeight <= target.scrollTop + target.clientHeight) {
      listRecord.push(1)
      loading = true
    }
    // // 若滚动到最大距离让他滚动到顶部,避免一直滚动追加图片导致DOM太多卡顿
    // if (target.scrollTop >= bottomMax) {
    //   target.scroll(0, 0)
    // }
  }
}

// 自动滚动
const onHandleAnimation = () => {
  requestAnimationFrame(() => {
    if (layoutIns && layoutIns.value) {
      // 需要检测当前容器是否存在
      layoutIns.value.scrollTop++
      onHandleAnimation()
    }
  })
}

onMounted(() => {
  if (layoutIns.value) {
    const target = layoutIns.value
    target.addEventListener('scroll', onHandleScroll)
    onHandleAnimation()
  }
})

</script>

<style scoped lang='scss'>
.layout-backgourd {
  height: 100%;
  overflow: hidden;
}
</style>