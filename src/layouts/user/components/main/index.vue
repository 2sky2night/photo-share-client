<template>
  <div class="main-container" ref="mainDOM">
    <div class="content">
      <router-view #default="{ Component }">
        <!-- <keep-alive :include="['HomePage']"> -->
        <component :is="Component"></component>
        <!-- </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import { pubsub } from '@/utils';

const mainDOM = ref<HTMLDivElement | null>(null)
const threshold = window.innerHeight * .1
const route = useRoute()

watch(() => route.path, () => {
  pubsub.emit('user:to-top',false)
})

onMounted(() => {
  if (mainDOM.value) {
    const target = mainDOM.value
    // 滚动事件的回调
    target.addEventListener('scroll', () => {
      if (target.scrollHeight - threshold <= target.scrollTop + target.clientHeight) {
        pubsub.emit('user:page-bottom')
      }
    })
    // 监听发布者，将视图滚动到顶部
    pubsub.on('user:to-top', (_, flag = true) => {
      target.scroll({
        top: 0,
        left: 0,
        behavior: flag ? 'smooth' : undefined
      })
    })
  }
})

defineOptions({
  name: 'Main'
})
</script>

<style scoped lang='scss'>
.main-container {
  height: calc(100% - var(--user-header-height));
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-color-1);

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--scroll-thumb-color);
  }

  .content {
    margin: 0 auto;
    width: var(--user-main-width);
    height: 100%;
    // background-color: var(--bg-color-1);
  }
}

@media screen and (max-width:1300px) {
  .main-container {
    .content {
      margin: 0;
      width: inherit;
    }
  }
}
</style>