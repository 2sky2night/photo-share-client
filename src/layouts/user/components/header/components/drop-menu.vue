<template>
  <n-dropdown trigger="hover" :options="menuOption" @select="onHandleSelect">
    <n-avatar round src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
  </n-dropdown>
  <langModel v-model="showModal"></langModel>
</template>

<script lang='ts' setup>
import { computed,ref } from 'vue';
import { useUserStore } from '@/store';
import { UserMenu, VisitorMenu } from '../config'
import langModel from '@/components/public/lang-modal/index.vue'

// 用户仓库
const userStore = useUserStore()
// 语言模态框
const showModal=ref(false)
// 下拉菜单
const menuOption = computed(() => {
  return userStore.isLogin ? UserMenu.value : VisitorMenu.value
})

// 选择的回调
const onHandleSelect = (key: string) => {
  if (key.includes('/')) {
    // 路由导航
    console.log('路由导航');
  } else {
    if (key === 'language') {
      showModal.value=true
    }
  }
}
</script>