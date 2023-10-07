<template>
  <div class="history-page">
    <n-h2 align-text>
      <n-text type="primary">{{ $t("history") }}</n-text>
    </n-h2>
    <div class="content">
      <template v-if="pagination.isFirstLoading"
        ><photo-skeleton></photo-skeleton
      ></template>
      <template v-else>
        <template v-if="list.length">
          <div
            class="container"
            ref="containerDOM">
            <photo-item
              v-for="item in list"
              :key="item.pid"
              v-model:like="item.is_liked"
              v-model:like-count="item.like_count"
              :photo="item" />
          </div>
          <div class="tips">
            <div
              class="loading"
              v-if="pagination.isLoading">
              <n-spin size="small">
                <template #description>
                  <span class="sub-text">{{ $t("loading") }}</span>
                </template>
              </n-spin>
            </div>
            <div
              class="end"
              v-if="
                pagination.isLoading === false && pagination.has_more === false
              ">
              <span class="sub-text">{{ $t("noMore") }}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <empty :desc="$t('noData', { title: $t('photo') })"></empty>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { usePhotoStore } from "@/store";
import PhotoItem from "@User/components/item/photo-item/index.vue";
import { useMobile } from "@/hooks";
import PhotoSkeleton from "@User/components/skeleton/photo-list.vue";
import { getPhotoByPidsAPI } from "@/apis/photo";
import WaterFallResolve from "../home/components/content/waterfall";
import { pubsub } from "@/utils";
import type { Photo } from "@/apis/photo/types";

// 视图容器
const containerDOM = ref<HTMLDivElement | null>(null);
// 照片列表
const photoStore = usePhotoStore();
// 照片列表
const list = reactive<Photo[]>([]);
// 瀑布流解决方案实例
let wf: WaterFallResolve | null = null;
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  isLoading: false,
  isFirstLoading: false,
  has_more: false,
});
// 移动端检查
const { isMoblie } = useMobile();

// 获取某一页的pid
const getPids = () => {
  const { pageNum, pageSize } = pagination.value;
  const offset = (pageNum - 1) * pageSize;
  const list = photoStore.historyPids.slice(offset, offset + pageSize);
  pagination.value.has_more = photoStore.historyPids.length > offset + pageSize;
  if (pagination.value.has_more === false) {
    // 没有更多了 移除监听
    pubsub.removeOn("user:page-bottom", onHandleBottom);
  }
  return list;
};

// 获取数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  const pids = getPids();
  const result = await getPhotoByPidsAPI(pids);
  result.data.forEach((photo) => list.push(photo));
  pagination.value.isLoading = false;
};

// 重置加载
const onHandleReset = async () => {
  pagination.value.isFirstLoading = true;
  // 添加监听
  pubsub.on("user:page-bottom", onHandleBottom);
  await onHandleGetData();
  pagination.value.isFirstLoading = false;
};

// 滚动到底部的回调
const onHandleBottom = () => {
  if (pagination.value.isFirstLoading || pagination.value.isLoading) return;
  pagination.value.pageNum++;
  onHandleGetData();
};

onMounted(async () => {
  await onHandleReset();
  const target = containerDOM.value;
  if (target) {
    wf = new WaterFallResolve(list, isMoblie.value ? 2 : 4, target, 10);
  }
});

onBeforeUnmount(() => {
  wf = null;
  // 移除监听
  pubsub.removeOn("user:page-bottom", onHandleBottom);
});

defineOptions({
  name: "HistroyPage",
});
</script>

<style scoped lang="scss">
.history-page {
  padding: 15px 10px;
  .tips {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
