<template>
  <div class="nav-item p-btn" :class="{ 'active': route.path === path }" @click="onHandleClick">
    <span>{{ title }}</span>
  </div>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const props = defineProps<{ path: string; title: string }>()

const onHandleClick = () => {
  router.push(props.path)
}
</script>

<style scoped lang='scss'>
.nav-item {  
  &.active {
    background-color: var(--primary-color);
    color: #fff;
  }
  &:not(:last-child){
    margin-right: 10px;
  }
}
</style>