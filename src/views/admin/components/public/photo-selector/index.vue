<template>
  <div class="photo-selector-container">
    <n-select
      remote
      clearable
      style="width: 150px"
      :value="pid"
      :options="options"
      @update:value="onHandleUpdate"
      @scroll="onHandleScroll">
    </n-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import { getPhotosBriefly } from "@Admin/apis/photo";
import type { PhotoSelectorProps, PhotoSelectorEmits } from "./types";

// props
defineProps<PhotoSelectorProps>();
// emits
const emit = defineEmits<PhotoSelectorEmits>();
// 列表项目
const list = ref<number[]>([]);
// 分页项目
const pagination = ref({
  pageNum: 1,
  isLoading: false,
  hasMore: false,
});
// 下拉选择条目
const options = computed(() =>
  list.value.map((item) => ({ label: item, value: item }))
);

// 加载数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  const { data } = await getPhotosBriefly(pagination.value.pageNum, 20, false);
  data.list.forEach((item) => list.value.push(item.pid));
  pagination.value.hasMore = data.has_more;
  pagination.value.isLoading = false;
};

// 选择更新的回调
const onHandleUpdate = (value: number | null) => {
  emit("update:pid", value);
};

// 滚动底部加载的回调
const onHandleScroll = (e: Event) => {
  if (pagination.value.isLoading || !pagination.value.hasMore) return;
  const target = e.currentTarget as HTMLElement;
  if (target) {
    if (target.scrollTop + target.clientHeight + 10 >= target.scrollHeight) {
      pagination.value.pageNum++;
      onHandleGetData();
    }
  }
};

// 获取数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "PhotoSelector" });
</script>
