<template>
  <div class="navigation-container">
    <nav-item v-for="item in navs" :key="item.path" :path="item.path" :title="item.title"></nav-item>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store';
import NavItem from './nav-item.vue';
import { UserNav, VisitorNav } from '../config'

// 是否登录
const { isLogin } = storeToRefs(useUserStore())
// 导航栏
const navs = computed(() => {
  return isLogin.value ? UserNav.value : VisitorNav.value
})
</script>

<style scoped lang='scss'>
.navigation-container {
  display: flex;
}

@media screen and (max-width:650px) {
  .navigation-container {
    display: none;
  }
}
</style>