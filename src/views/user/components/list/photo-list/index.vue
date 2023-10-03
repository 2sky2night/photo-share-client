<template>
  <div class="photo-list-container">
    <template v-if="pagination.isFirstLoading">
      <photo-list-skeleton></photo-list-skeleton>
    </template>
    <template v-else>
      <template v-if="list.length">
        <div class="list-container">
          <photo-item-mini
            v-for="item in list"
            :photo="item"
            :key="item.pid">
          </photo-item-mini>
        </div>
        <div class="tips">
          <span
            v-if="!pagination.has_more"
            class="sub-text"
            >{{ $t("noMore") }}</span
          >
          <n-spin v-if="pagination.isLoading">
            <template #description>
              {{ $t("loading") }}
            </template>
          </n-spin>
        </div>
      </template>
      <div
        class="empty-container"
        v-else>
        <empty :desc="$t('noData', { title: $t('photo') })"></empty>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import PhotoItemMini from "@User/components/item/photo-item-mini/index.vue";
import PhotoListSkeleton from "@User/components/skeleton/photo-list.vue";
import type { PhotoListResponse, Photo as PhotoType } from "@/apis/photo/types";
import { pubsub } from "@/utils";

// props
const props = defineProps<{
  /**
   * 获取数据的API
   */
  cb: (
    pageNum: number,
    pageSize: number,
    desc: boolean
  ) => Promise<PhotoListResponse>;
}>();
// 列表项
const list = ref<PhotoType[]>([]);
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  desc: true,
  has_more: false,
  total: 0,
  isLoading: false,
  isFirstLoading: false,
});
// 订阅滚动底部频道
let isSubscribe = false;

// 获取数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  const { pageNum, pageSize, desc } = pagination.value;
  const result = await props.cb(pageNum, pageSize, desc);
  result.list.forEach((ele) => list.value.push(ele));
  pagination.value.desc = result.desc;
  pagination.value.has_more = result.has_more;
  pagination.value.total = result.total;
  pagination.value.isLoading = false;
  if (result.has_more === false)
    // 没有更多了，移除订阅
    removeChannel();
};

// 移除滚动底部频道
const removeChannel = () => {
  isSubscribe = false;
  pubsub.removeOn("user:page-bottom", onHandleBottom);
};

// 开启滚动监听
const subscribeChannel = () => {
  isSubscribe = true;
  pubsub.on("user:page-bottom", onHandleBottom);
};

// 滚动到底部的回调
const onHandleBottom = async () => {
  // 正在加载
  if (pagination.value.isLoading || pagination.value.isFirstLoading) return;
  pagination.value.pageNum++;
  await onHandleGetData();
};

// 重置加载
const handleRest = async () => {
  // 若被取消订阅了，重新订阅频道
  !isSubscribe && subscribeChannel();
  pagination.value.isFirstLoading = true;
  await onHandleGetData();
  pagination.value.isFirstLoading = false;
};

// 加载数据
onBeforeMount(handleRest);

// 移除监听
onBeforeUnmount(() => isSubscribe && removeChannel());

// 立即开启滚动监听
subscribeChannel();

defineOptions({ name: "PhotoList" });
</script>

<style scoped lang="scss">
.photo-list-container {
  color: var(--text-color-1);
  .tips {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
  .empty-container {
    padding: 15% 0;
  }
  .list-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  @media screen and (max-width: 1000px) {
    .list-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 800px) {
    .list-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
