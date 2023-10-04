<template>
  <div class="published-photo-container">
    <div class="filter-container">
      <n-radio-group
        :value="auditValue"
        @update:value="onHandleStatusChange"
        name="radiogroup">
        <n-radio
          :size="isMoblie ? 'small' : 'medium'"
          v-for="item in auditList"
          :key="item.value"
          :value="item.value">
          <span class="radio-text">{{ item.label }}</span>
        </n-radio>
      </n-radio-group>
      <n-switch
        :size="isMoblie ? 'small' : 'medium'"
        v-model:value="descOrder"
        @update:value="onHandleReset"
        :loading="isLoading">
        <template #checked>{{ $t("desc") }}</template>
        <template #unchecked>{{ $t("asc") }} </template>
      </n-switch>
    </div>
    <photo-list
      ref="photoListIns"
      :cb="onHandleGetData">
    </photo-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/store";
import { useMobile } from "@/hooks";
import PhotoList from "@User/components/list/photo-list/index.vue";
import { userGetPhotoAPI } from "@/apis/photo";
import { AuditStatus } from "@/types/photo";
import i18n from "@/config/i18n";
import type { PhotoListIns } from "@User/components/list/photo-list/types";

// 用户id
const {
  userInfo: { uid },
} = useUserStore();
// 审核筛选列表
const auditList = computed(() => [
  {
    label: i18n.global.t("all"),
    value: -1,
  },
  {
    label: i18n.global.t("passAudit"),
    value: AuditStatus.PASS,
  },
  {
    label: i18n.global.t("unpassAudit"),
    value: AuditStatus.NO_PASS,
  },
  {
    label: i18n.global.t("notAudit"),
    value: AuditStatus.NO_AUDIT,
  },
]);
// 是否为移动端
const { isMoblie } = useMobile();
// 当前选择的审核值(-1代表全部)
const auditValue = ref<AuditStatus | -1>(-1);
// 照片列表实例
const photoListIns = ref<PhotoListIns | null>(null);
// 正在加载
const isLoading = ref(false);
// 升序降序
const descOrder = ref(true);

// 获取用户自己的照片
const onHandleGetData = async (pageNum: number, pageSize: number) => {
  isLoading.value = true;
  const result = await userGetPhotoAPI({
    page: pageNum,
    pageSize: pageSize,
    status: auditValue.value === -1 ? undefined : auditValue.value,
    uid,
    desc: descOrder.value,
  });
  isLoading.value = false;
  return result.data;
};

// 审核状态更新的回调
const onHandleStatusChange = (value: AuditStatus | -1) => {
  if (isLoading.value) return;
  auditValue.value = value;
  onHandleReset();
};

// 选择的审核状态或排序方式改变时，重新加载数据
const onHandleReset = () => {
  // 重置页码以及数据，重新加载最新数据
  photoListIns.value && photoListIns.value.handleReset();
};

defineOptions({
  name: "PublishedPhoto",
});
</script>

<style scoped lang="scss">
.published-photo-container {
  color: var(--text-color-1);
  .filter-container {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 650px) {
      flex-direction: column;
      align-items: start;
      :deep(.n-switch) {
        position: relative;
        margin-top: 10px;
        left: -5px;
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .radio-text {
    font-size: 13px;
  }
}
</style>
