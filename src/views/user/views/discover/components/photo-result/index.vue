<template>
  <div class="photo-result-container">
    <photo-list
      :handle="handle"
      ref="listInst" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import PhotoList from "@User/components/list/pagination/photo-list/index.vue";
import { getPhotosByTagsAPI } from "@User/apis/photo";
import { userGetPhotoAPI } from "@/apis/photo";
import { AuditStatus } from "@/types/photo";
import type { PhotoResultProps } from "./types";
import type { PhotoListInst } from "@User/components/list/pagination/photo-list/types";

// props
const props = defineProps<PhotoResultProps>();
// 列表项组件实例
const listInst = ref<null | PhotoListInst>(null);

// 列表加载处理器
const handle = async (pageNum: number, pageSize: number) => {
  const { tid } = props;
  if (tid === null) {
    // 未选择标签
    const result = await userGetPhotoAPI({
      status: AuditStatus.PASS,
      page: pageNum,
      pageSize,
      desc: true,
    });
    return result.data;
  } else {
    // 选择了标签
    const result = await getPhotosByTagsAPI({
      pageNum,
      pageSize,
      desc: true,
      tid,
    });
    return result.data;
  }
};

// 监听tid更新，更新就重置页码加载数据
watch(
  () => props.tid,
  () => {
    listInst.value && listInst.value.handleReset();
  }
);
</script>
