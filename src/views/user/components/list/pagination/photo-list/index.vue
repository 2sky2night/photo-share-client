<template>
  <div class="photo-list-container">
    <!--加载中-->
    <template v-if="pagination.isLoading">
      <photo-list-skeleton></photo-list-skeleton>
      <div class="pagination mt-10">
        <n-pagination
          :page="pagination.pageNum"
          :page-size="pagination.pageSize"
          :item-count="pagination.itemCount"
          show-size-picker
          :page-sizes="[10, 20, 30, 40]" />
      </div>
    </template>
    <!--加载完成-->
    <template v-else>
      <!--有数据-->
      <template v-if="list.length">
        <div class="container">
          <photo-item
            v-for="item in list"
            :photo="item"
            v-model:is-liked="item.is_liked"
            v-model:like-count="item.like_count" />
        </div>
        <div class="pagination mt-10">
          <n-pagination
            show-size-picker
            :page-slot="isMoblie ? 5 : 8"
            :item-count="pagination.itemCount"
            :page-sizes="[10, 20, 30, 40]"
            :page="pagination.pageNum"
            :page-size="pagination.pageSize"
            @update:page="handlePageUpdate"
            @update-page-size="handlePageSizeUpdate" />
        </div>
      </template>
      <!--无数据-->
      <template v-else>
        <n-result
          style="margin-top: 30px"
          status="info"
          size="large"
          :title="$t('noData', { title: $t('photo') })"
          :description="$t('noPhotoTips')">
          <template #footer>
            <n-button>{{ $t("tips404") }}</n-button>
          </template>
        </n-result>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useMobile } from "@/hooks";
import PhotoListSkeleton from "@User/components/skeleton/photo-list.vue";
import PhotoItem from "@User/components/item/photo-item-common/index.vue";
import { pubsub } from "@/utils";
import type { Photo } from "@/apis/photo/types";
import type { PhotoListProps, PhotoListInst } from "./types";

// props
const props = defineProps<PhotoListProps>();
// 移动端检测
const { isMoblie } = useMobile();
// 列表项
const list = ref<Photo[]>([]);
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
  isLoading: false,
  itemCount: 0,
});

// 获取数据
const handleGetData = async () => {
  pagination.value.isLoading = true;
  list.value.length = 0;
  const { pageNum, pageSize } = pagination.value;
  const result = await props.handle(pageNum, pageSize);
  result.list.forEach((item) => list.value.push(item));
  pagination.value.itemCount = result.total;
  pagination.value.isLoading = false;
};

// 页长度更新的回调
const handlePageSizeUpdate = (value: number) => {
  pagination.value.pageSize = value;
  handlePageUpdate(1);
};

// 页码更新的回调
const handlePageUpdate = (value: number) => {
  pagination.value.pageNum = value;
  // 主视图滚动到顶部
  pubsub.emit("user:to-top", false);
  // 加载更多数据
  handleGetData();
};

// 重置加载
const handleReset = () => {
  handlePageUpdate(1);
};

// 获取数据
onBeforeMount(handleReset);

// 暴露的api
defineExpose<PhotoListInst>({ handleReset });

defineOptions({
  name: "PhotoList",
});
</script>

<style scoped lang="scss">
.photo-list-container {
  .container {
    min-height: 75vh;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty {
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 1300px) {
  .photo-list-container {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (max-width: 1000px) {
  .photo-list-container {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 650px) {
  .photo-list-container {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
