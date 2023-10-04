<template>
  <div class="published-photo-container">
    <div class="filter mb-10">
      <n-switch
        v-model:value="descOrder"
        @update:value="onHandleReset"
        :loading="isLoading">
        <template #checked>{{ $t("desc") }}</template>
        <template #unchecked>{{ $t("asc") }} </template>
      </n-switch>
    </div>
    <photo-list
      :cb="onHandleGetData"
      ref="photoListIns"></photo-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PhotoList from "@User/components/list/photo-list/index.vue";
import { userGetPhotoAPI } from "@/apis/photo";
import { AuditStatus } from "@/types/photo";
import type { PhotoListIns } from "@/views/user/components/list/photo-list/types";

// props
const props = defineProps<{ uid: number }>();
// 降序
const descOrder = ref(true);
// 照片列表实例
const photoListIns = ref<PhotoListIns | null>(null);
// 正在加载
const isLoading = ref(false);

// 获取数据
const onHandleGetData = async (pageNum: number, pageSize: number) => {
  isLoading.value = true;
  const result = await userGetPhotoAPI({
    uid: props.uid,
    status: AuditStatus.PASS,
    page: pageNum,
    pageSize: pageSize,
    desc: descOrder.value,
  });
  isLoading.value = false;
  return result.data;
};

// 排序顺序更新后重置数据
const onHandleReset = () => {
  photoListIns.value && photoListIns.value.handleReset();
};
</script>
<style scoped lang="scss">
.filter {
  display: flex;
  justify-content: end;
}
</style>
