<template>
  <n-select
    clearable
    multiple
    :options="options"
    :render-label="renderLabel"
    :render-tag="renderTags"
    :loading="isLoading"
    :max-tag-count="10"
    v-model:value="selectList"
    @update:value="onHandleSelect"
    @scroll="onHandleScroll" />
</template>

<script lang="ts" setup>
import { ref, computed, h, onBeforeMount } from "vue";
import TagsItem from "./components/tags-item.vue";
import TagsLabel from "./components/tags-label.vue";
import { getPhotoTagsListAPI } from "@User/apis/photo";
import type { TagsBase } from "@/apis/photo/types";
import type { SelectRenderTag } from "naive-ui";
import type { TagsSelectorEmits, TagsSelectorProps } from "./types";

// props
defineProps<TagsSelectorProps>();
// emits
const emits = defineEmits<TagsSelectorEmits>();
// 正在加载
const isLoading = ref(false);
// 标签列表
const list = ref<TagsBase[]>([]);
// 选择的标签
const selectList = ref<number[]>([]);
// 页码
let pageNum = 1;
// 是否还有更多
let hasMore = false;
// 下拉选择项
const options = computed(() =>
  list.value.map((item) => {
    return {
      value: item.tid,
    };
  })
);

// 渲染列表项
const renderLabel = (option: { value: number }) => {
  const item = list.value.find((tags) => tags.tid === option.value);
  if (item) {
    return h(TagsLabel, { item });
  } else {
    return h("span", "错误");
  }
};

// 渲染选择的标签
const renderTags: SelectRenderTag = ({ option, handleClose }) => {
  const item = list.value.find((tags) => tags.tid === option.value);
  if (item) {
    return h(TagsItem, { item, handleClose });
  } else {
    return h("span", "错误");
  }
};

// 获取标签列表数据
const onHandleGetData = async () => {
  isLoading.value = true;
  const { data } = await getPhotoTagsListAPI({
    pageNum,
    pageSize: 10,
    desc: false,
  });
  data.list.forEach((item) => list.value.push(item));
  hasMore = data.has_more;
  isLoading.value = false;
};

// 选择器滚动的回调
const onHandleScroll = (e: Event) => {
  if (isLoading.value || !hasMore) return;
  const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement;
  if (clientHeight + scrollTop + 10 >= scrollHeight) {
    pageNum++;
    onHandleGetData();
  }
};

// 选择更新的回调
const onHandleSelect = (values: number[]) => {
  emits("update:tids", values);
};

// 加载列表项数据
onBeforeMount(onHandleGetData);

defineOptions({
  name: "TagsSelector",
});
</script>
