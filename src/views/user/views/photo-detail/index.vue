<template>
  <div class="detail-page">
    <photo-info :pid="pid"></photo-info>
    <comment class="mt-10" :pid="pid"></comment>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useMessage } from 'naive-ui';
import PhotoInfo from './components/info/index.vue'
import comment from './components/comment/index.vue'
import i18n from '@/config/i18n';

const route = useRoute()
const router = useRouter()
const pid = ref<number>(parseRoutePid())
const message = useMessage()

function parseRoutePid(currentRoute = route) {
  const { pid: _pid } = currentRoute.params
  const pid = +_pid
  if (isNaN(pid)) {
    message.warning(i18n.global.t('paramsError'))
    router.replace('/')
    throw new Error(i18n.global.t('paramsError'))
  } else {
    return pid
  }
}

// 路由更新
onBeforeRouteUpdate((to) => {
  pid.value = parseRoutePid(to)
})

defineOptions({
  name: 'DetailPage'
})
</script>

<style scoped lang='scss'>
.detail-page {
  box-sizing: border-box;
  padding: 10px;
}
@media screen and (max-width:650px) {
  .detail-page  {
    // 留给底部菜单栏的安全空间
    padding-bottom: 100px;
  }
}
</style>