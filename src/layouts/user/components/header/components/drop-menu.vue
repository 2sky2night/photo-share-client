<template>
  <n-dropdown trigger="hover" :options="menuOption" @select="onHandleSelect">
    <avatar
      src="https://sns-avatar-qc.xhscdn.com/avatar/62d0c5698c90547df06c3caa.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip">
    </avatar>
  </n-dropdown>
  <langModel v-model="showModal"></langModel>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import avatar from '@/components/public/avatar/index.vue'
import { UserMenu, VisitorMenu } from '../config'
import langModel from '@/components/public/lang-modal/index.vue'

// router
const router = useRouter()
// 用户仓库
const userStore = useUserStore()
// 语言模态框
const showModal = ref(false)
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
      showModal.value = true
    } else if (key === 'logout') {
      userStore.logout()
      router.replace('/login')
    }
  }
}
</script>