<template>
  <n-h2 v-if="currentTags">{{ currentTags }}</n-h2>
  <teleport to="body">
    <div
      class="tags-selector-trigger text-hover pointer"
      :class="{ active: tid }"
      @click="toggleShowModal">
      <n-icon size="20">
        <right-icon />
      </n-icon>
    </div>
  </teleport>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 80vw; max-width: 600px"
      size="huge"
      role="dialog"
      aria-modal="true"
      :title="$t('tags')"
      :bordered="false">
      <template #header-extra>
        <n-icon
          class="text-hover pointer"
          size="20"
          @click="toggleShowModal">
          <close-icon />
        </n-icon>
      </template>
      <div
        class="container"
        @scroll="onHandleScroll">
        <template v-if="isFirstLoading">
          <span>{{ $t("loading") }}</span>
        </template>
        <template v-else>
          <n-space>
            <tags-item
              v-for="item in list"
              :item="item"
              :tid="tid"
              :key="item.tid"
              @update:tid="onHanldeUpdate" />
          </n-space>
          <template v-if="pagination.isLoading">
            <div class="loading-content mt-10">
              <n-spin size="small">
                <template v-slot:description>
                  <span>{{ $t("loading") }}</span>
                </template>
              </n-spin>
            </div>
          </template>
        </template>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, nextTick, computed } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import TagsItem from "./components/tags-item.vue";
import { Close as CloseIcon } from "@vicons/ionicons5";
import { ChevronRight12Regular as RightIcon } from "@vicons/fluent";
import { getPhotoTagsListAPI } from "@User/apis/photo";
import { LOCALE_VALUE } from "@/config";
import type { TagsBase } from "@/apis/photo/types";
import type { TagsSelectorProps, TagsSelectorEmits } from "./types";
import type { Ref } from "vue";

// props
const props = defineProps<TagsSelectorProps>();
// emits
const emit = defineEmits<TagsSelectorEmits>();
// 设置仓库
const { locale } = storeToRefs(useConfigStore());
// 标签列表
const list = ref<TagsBase[]>([]);
// 模态框显隐
const showModal = ref(false);
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
  isLoading: false,
  hasMore: false,
});
// 初次加载
let isFirstLoading: Ref | null = ref(true);
// 当前选择的标签
const currentTags = computed(() => {
  const tags = list.value.find((item) => item.tid === props.tid);
  if (tags === undefined) {
    return false;
  } else {
    if (locale.value === LOCALE_VALUE.ZH) {
      return tags.name_zh;
    } else {
      return tags.name_en;
    }
  }
});

// 控制模态框显隐
const toggleShowModal = () => {
  showModal.value = !showModal.value;
};

// 获取数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  const { pageNum, pageSize } = pagination.value;
  const { data } = await getPhotoTagsListAPI({
    pageNum,
    pageSize,
    desc: false,
  });
  data.list.forEach((item) => list.value.push(item));
  pagination.value.hasMore = data.has_more;
  pagination.value.isLoading = false;
};

// 选择的标签更新了
const onHanldeUpdate = (tid: number | null) => {
  emit("update:tid", tid);
  // 关闭模态框
  toggleShowModal();
};

// 容器滚动的回调
const onHandleScroll = (e: Event) => {
  if (
    isFirstLoading?.value ||
    pagination.value.isLoading ||
    !pagination.value.hasMore
  )
    return;
  const target = e.target as HTMLElement;
  if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
    // 滚动到底部了
    pagination.value.pageNum++;
    onHandleGetData();
  }
};

// 加载数据
onBeforeMount(async () => {
  await onHandleGetData();
  (isFirstLoading as Ref).value = false;
  nextTick(() => {
    isFirstLoading = null;
  });
});

defineOptions({
  name: "TagsSelector",
});
</script>

<style scoped lang="scss">
.tags-selector-trigger {
  width: 25px;
  height: 40px;
  border: var(--border);
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -20px 0 50px var(--box-shadow-color);
  transition: var(--time-normal);
  background-color: var(--bg-color-1);
  i {
    position: relative;
    top: -1px;
    left: -1px;
  }
  &.active {
    box-shadow: -20px 0 50px var(--primary-color);
    i {
      color: var(--primary-color);
    }
  }
}
.container {
  max-height: 100px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .loading-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
