<template>
  <div class="photo-result-container">
    <template v-if="pagination.isFirstLoading">
      <photo-skeleton :length="pageSize"></photo-skeleton>
    </template>
    <template v-else>
      <template v-if="pagination.isLoading">
        <photo-skeleton :length="pageSize"></photo-skeleton>
        <div class="pagination">
          <n-pagination
            :item-count="pagination.total"
            :page="props.pageNum"
            :page-size="props.pageSize" />
        </div>
      </template>
      <template v-else>
        <template v-if="list.length">
          <div class="container">
            <div
              class="list"
              :ref="onHandleGetDOM">
              <photo-item
                v-for="item in list"
                :key="item.pid"
                v-model:like="item.is_liked"
                v-model:like-count="item.like_count"
                :photo="item" />
            </div>
            <div class="pagination">
              <n-pagination
                :item-count="pagination.total"
                @update:page="onHandlePageChange"
                :page="props.pageNum"
                :page-size="props.pageSize" />
            </div>
          </div>
        </template>
        <template v-else>
          <empty :desc="$t('noData', { title: $t('photo') })"></empty>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount, onBeforeMount, watch } from "vue";
import PhotoItem from "@User/components/item/photo-item/index.vue";
import PhotoSkeleton from "@User/components/skeleton/photo-list.vue";
import { useMobile } from "@/hooks";
import { searchPhotoAPI } from "@User/apis/search";
import WaterFallResolve from "@User/views/home/components/content/waterfall";
import type { Photo } from "@/apis/photo/types";

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
// 分页数据
const pagination = ref({
  isLoading: false,
  isFirstLoading: false,
  total: 0,
});
// 移动端检测
const { isMoblie } = useMobile();
// 瀑布流容器解决方案
let wf: WaterFallResolve | null = null;

// 加载数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  list.length = 0;
  const { data } = await searchPhotoAPI({ ...props });
  data.list.forEach((item) => list.push(item));
  pagination.value.total = data.total;
  pagination.value.isLoading = false;
};

// 重置加载
const onHandleReset = async () => {
  pagination.value.isFirstLoading = true;
  onHandleGetData();
  pagination.value.isFirstLoading = false;
};

// 页码更新的回调
const onHandlePageChange = (v: number) => {
  emit("update:pageNum", v);
};

// 获取瀑布流容器DOM
const onHandleGetDOM = (dom: any) => {
  containerDOM.value = dom as HTMLDivElement;
  wf = new WaterFallResolve(
    list,
    isMoblie.value ? 2 : 4,
    containerDOM.value,
    10
  );
};

// 初次加载
onBeforeMount(onHandleReset);
// 卸载时
onBeforeUnmount(() => {
  wf = null;
});

// 监听查询参数变化，加载数据
watch(props, onHandleReset);
</script>

<style scoped lang="scss">
.photo-result-container {
  margin-top: 10px;
  .tips {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  .empty {
    padding: 20px 0;
  }
}
</style>
