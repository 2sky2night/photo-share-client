<template>
  <div class="photo-result-container">
    <div class="container">
      <template v-if="isFirstLoading"
        ><photo-skeleton></photo-skeleton
      ></template>
      <template v-else>
        <template v-if="list.length">
          <div
            class="list"
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
              v-if="isLoading">
              <n-spin size="small">
                <template #description>
                  <span class="sub-text">{{ $t("loading") }}</span>
                </template>
              </n-spin>
            </div>
            <div
              class="end"
              v-if="isLoading === false && hasMore === false">
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
import { reactive, ref, onBeforeUnmount, onMounted, watch } from "vue";
import PhotoItem from "@User/components/item/photo-item/index.vue";
import PhotoSkeleton from "@User/components/skeleton/photo-list.vue";
import { searchPhotoAPI } from "@User/apis/search";
import WaterFallResolve from "@User/views/home/components/content/waterfall";
import { pubsub } from "@/utils";
import type { Photo } from "@/apis/photo/types";
import { nextTick } from "vue";

// props
const props = defineProps<{
  pageNum: number;
  keywords: string;
  pageSize: number;
}>();
// emit
const emit = defineEmits<{
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();
// 数据列表
const list = reactive<Photo[]>([]);
// 瀑布流容器
const containerDOM = ref<HTMLDivElement | null>(null);
// 正在加载
const isLoading = ref(true);
// 初始化加载
const isFirstLoading = ref(false);
// 还有更多?
const hasMore = ref(false);
// 瀑布流解决方案
let ws: WaterFallResolve | null = null;
// 监听了触底的回调？
let isOn = false;

// 获取数据
const onHandleGetData = async () => {
  isLoading.value = true;
  const { pageNum, pageSize, keywords } = props;
  const result = await searchPhotoAPI({
    pageNum,
    pageSize,
    desc: true,
    keywords,
  });
  hasMore.value = result.data.has_more;
  result.data.list.forEach((photo) => list.push(photo));
  if (hasMore.value === false) {
    // 没有更多了
    removeEventBottom();
  }
  isLoading.value = false;
};

// 初始化加载
const onHandleReset = async () => {
  isFirstLoading.value = true;
  if (isOn === false) addEventBottom();
  list.length = 0;
  emit("update:pageNum", 1);
  await onHandleGetData();
  isFirstLoading.value = false;
};

// 页面触底的回调
const onHandleBottom = () => {
  if (isFirstLoading.value || isLoading.value) return;
  emit("update:pageNum", props.pageNum + 1);
  nextTick(() => {
    // pageNum更新是异步的，可以等待更新完成后再发送请求
    onHandleGetData();
  });
};

// 添加触底监听
const addEventBottom = () => {
  isOn = true;
  pubsub.on("user:page-bottom", onHandleBottom);
};

// 移除触底监听
const removeEventBottom = () => {
  isOn = false;
  pubsub.removeOn("user:page-bottom", onHandleBottom);
};

// 加载数据
onMounted(async () => {
  await onHandleReset();
  if (containerDOM.value) {
    ws = new WaterFallResolve(list, 4, containerDOM.value, 10);
  }
});

// 卸载时
onBeforeUnmount(() => {
  if (ws) {
    ws.release();
    ws = null;
  }
  isOn && removeEventBottom();
});

watch(() => props.keywords, onHandleReset);
</script>

<style scoped lang="scss">
.photo-result-container {
  margin-top: 10px;
  .tips {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
}
</style>
