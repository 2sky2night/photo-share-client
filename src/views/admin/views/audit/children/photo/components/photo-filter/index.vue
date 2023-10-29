<template>
  <div class="filter-container">
    <div class="item">
      <div class="title mr-10">{{ $t("user") }}</div>
      <user-selector
        :uid="uid"
        @update:uid="onHandleUidUpdate" />
    </div>
    <div class="item">
      <div class="title mr-10">{{ $t("audit") }}</div>
      <n-select
        style="width: 200px"
        :placeholder="$t('pleaseSelect')"
        :loading="loading"
        :options="(statusOptions as any)"
        @update:value="onHandleStatusUpdate"
        :value="status" />
    </div>
    <div class="item">
      <div class="title mr-10">{{ $t("desc") }}</div>
      <n-switch
        :loading="loading"
        :value="desc"
        @update:value="onHandleDescUpdate">
      </n-switch>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { computed } from "vue";
import { i18n } from "@/config";
import UserSelector from "@Admin/components/public/user-selector/index.vue";
import type { PhotoFilterProps, PhotoFilterEmits } from "./types";
import { AuditStatus } from "@/types/photo";

// props
defineProps<PhotoFilterProps>();
// emits
const emit = defineEmits<PhotoFilterEmits>();
// 审核状态下拉选择框
const statusOptions = computed(() => [
  {
    label: i18n.global.t("all"),
    value: null,
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

// 审核状态下拉框更新的回调
const onHandleStatusUpdate = (value: AuditStatus | null) => {
  emit("update:status", value);
};

// 选择的用户下拉库更新的回调
const onHandleUidUpdate = (value: number | null) => {
  emit("update:uid", value);
};

// 排序方式更新的回调
const onHandleDescUpdate = (value: boolean) => {
  emit("update:desc", value);
};

defineOptions({ name: "PhotoFilter" });
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  padding: 10px;
  .item {
    align-items: center;
    display: flex;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
