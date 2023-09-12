<template>
  <div class="layout-backgourd" ref="layoutIns">
    <bg :length="500"></bg>
  </div>
</template>

<script lang='ts' setup>
// dom少版本
import { ref, onMounted } from 'vue'
import bg from './components/bg.vue';

// 视图容器
const layoutIns = ref<HTMLDivElement | null>(null)

// 滚动的动画效果
const onHandleAnimation = () => {
  requestAnimationFrame(() => {
    if (layoutIns && layoutIns.value) {
      layoutIns.value.scrollTop++
      onHandleAnimation()
    }
  })
}

// 滚动事件
const onHandleScroll = () => {
  if (layoutIns.value) {
    // 滚动距离超过视口高度
    if (layoutIns.value.scrollTop >= window.innerHeight) {
      layoutIns.value.scroll(0, 0)
    }
  }
}

onMounted(() => {
  if (layoutIns.value) {
    layoutIns.value.addEventListener('scroll', onHandleScroll)
    onHandleAnimation()
  }
})

</script>

<style scoped lang='scss'>
.layout-backgourd {
  height: 100%;
  overflow: hidden;

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background-color: var(--mask-color);
  }
}
</style>