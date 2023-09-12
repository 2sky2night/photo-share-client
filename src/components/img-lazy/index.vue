<template>
  <div class="img-lazy-container" ref="container">
    <Transition name="img">
      <img v-if="isShow" :src="props.url">
    </Transition>
    <skeleton v-if="!isShow"></skeleton>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ url: string }>()
// 容器
const container = ref<HTMLDivElement | null>(null)
// 是否显示
const isShow = ref(false)
// 监听者
const observer = new IntersectionObserver(entries => {
  entries.some(entry => {
    if (entry.isIntersecting) {
      // 与视图相交了
      const img = new Image()
      img.src = props.url
      if (img.complete) {
        // 缓存加载完成
        isShow.value = true
        // 加载完成取消静态，释放内存
        onHandleUnObserver()
      } else {
        // 发送请求加载图片
        img.onload = () => {
          isShow.value = true
          onHandleUnObserver()
        }
      }
      return true
    }
  })
})

// 取消监听
const onHandleUnObserver = () => {
  const target = container.value as HTMLDivElement
  observer.unobserve(target)
  observer.disconnect()
}

onMounted(() => {
  const target = container.value as HTMLDivElement
  observer.observe(target)
})

onBeforeUnmount(onHandleUnObserver)


defineOptions({
  name: 'ImgLzay'
})
</script>

<style scoped lang='scss'>
.img-lazy-container {
  width: 100%;
  height: 100%;
  img {
    -webkit-user-drag: none;
    height: 100%;
    width: 100%;
  }
}
.img-enter-active{
  transition: var(--time-normal);
}
.img-enter-from{
  opacity: 0;
}
.img-enter-to{
  opacity: 1;
}
</style>