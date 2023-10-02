<template>
  <div class="content">
    <template v-if="pagination.firstLoading">
      <photo-skeleton class="mt-10" :length="10"></photo-skeleton>
    </template>
    <template v-else>
      <div class="content-container" ref="containerDOM">
        <photo-item v-for="item in list" v-model:like="item.is_liked" v-model:like-count="item.like_count" :photo="item"
          :key="item.pid"></photo-item>
      </div>
      <div class="loading" v-if="pagination.loading">
        <n-spin size="small">
          <template #description>
            <span class="sub-text">{{ $t('loading') }}</span>
          </template>
        </n-spin>
      </div>
      <div class="end" v-if="pagination.loading === false && pagination.has_more === false">
        <span class="sub-text">{{ $t('noMore') }}</span>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { reactive, nextTick, onMounted, ref, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import { userGetPhotoAPI } from '@/apis/photo'
import { useMobile } from '@/hooks'
import PhotoItem from '@User/components/photo-item/index.vue'
import PhotoSkeleton from '@User/components/skeleton/photo-list.vue'
import WaterFallResolve from './waterfall';
import type { Photo } from '@/apis/photo/types';
import { pubsub } from '@/utils';

// 瀑布流布局容器
const containerDOM = ref<HTMLElement | null>(null)
// 列表
const list = reactive<Photo[]>([])
// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 5,
  loading: false,
  has_more: false,
  firstLoading: true
})
// 瀑布流实例
let wf: WaterFallResolve | null = null
// 移动端
const { isMoblie } = useMobile()

// 获取数据
const onHandleGetData = async () => {
  pagination.loading = true
  const res = await userGetPhotoAPI({ desc: true, status: 1, page: pagination.page, pageSize: pagination.pageSize })
  res.data.list.forEach(ele => list.push(ele))
  res.data.list.forEach(ele => list.push(ele))
  res.data.list.forEach(ele => list.push(ele))
  res.data.list.forEach(ele => list.push(ele))
  pagination.has_more = res.data.has_more
  pagination.loading = false
  return pagination.has_more
}

// 页面触底的回调
const onHandleBottom = async () => {
  if (pagination.loading || pagination.firstLoading) {
    return
  }
  pagination.page++
  const flag = await onHandleGetData()
  if (!flag) {
    // 没有更多了
    // 取消监听频道
    pubsub.removeOn('user:page-bottom', onHandleBottom)
  }
}

// 加载数据
// 生成瀑布流布局
onMounted(async () => {
  // 监听频道
  pubsub.on('user:page-bottom', onHandleBottom)
  pagination.firstLoading = true
  await onHandleGetData()
  pagination.firstLoading = false
  nextTick(() => {
    if (containerDOM.value) {
      wf = new WaterFallResolve(list, isMoblie.value ? 2 : 4, containerDOM.value, 10)
    }
  })
})
// 激活组件了，开启尺寸监听
onActivated(() => {
  wf?.startObserve()
})
// 缓存组件了，取消监听尺寸
onDeactivated(() => {
  wf?.pauseObeserve()
})

// 销毁监听
onBeforeUnmount(() => {
  wf?.release()
  // 取消监听频道
  pubsub.removeOn('user:page-bottom', onHandleBottom)
})

defineOptions({
  name: 'Content'
})
</script>

<style scoped lang='scss'>
.content {
  .content-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  .end {
    padding: 20px 0;
    text-align: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    height: 90px;
  }
}
</style>