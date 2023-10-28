<template>
  <div class="account-filter-container">
    <n-form inline>
      <n-form-item
        class="item"
        :label="$t('username')"
        label-placement="left">
        <n-input
          :placeholder="$t('pleaseEnter', { title: $t('username') })"
          v-model:value="cKeywords"
          @update:value="debounceKeywords"></n-input>
      </n-form-item>
      <n-form-item
        class="item"
        :label="$t('role')"
        label-placement="left">
        <n-select
          :placeholder="$t('pleaseSelect')"
          :options="(roleOptions as any)"
          @update:value="onHandleRoles" />
      </n-form-item>
      <n-form-item
        class="item"
        :label="$t('desc')"
        label-placement="left">
        <n-switch
          :value="desc"
          @update:value="onHandleDesc">
        </n-switch>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { debounce } from "@/utils";
import { Roles } from "@/types/auth";
import type { SelectOption } from "naive-ui";
import type { AccountFilterProps, AccountFilterEmits } from "./types";
import { i18n } from "@/config";
// props
const props = defineProps<AccountFilterProps>();
// emits
const emit = defineEmits<AccountFilterEmits>();
// 关键字
const cKeywords = ref(props.keywords);
// 角色下拉选择框
const roleOptions = computed(() => [
  {
    label: i18n.global.t("all"),
    value: null,
  },
  {
    label: i18n.global.t("superAdmin"),
    value: Roles.SuperAdmin,
  },
  {
    label: i18n.global.t("admin"),
    value: Roles.Admin,
  },
  {
    label: i18n.global.t("user"),
    value: Roles.User,
  },
]);

// 关键字更新的回调
const onHandleKeywords = (value: string) => {
  emit("update:keywords", value.trim());
};

// 选择的角色更新的回调
const onHandleRoles = (value: Roles | null) => {
  emit("update:role", value);
};

// 排序方式更新的回调
const onHandleDesc = (value: boolean) => {
  emit("update:desc", value);
};

// 防抖的关键字更新
const debounceKeywords = debounce(onHandleKeywords);

defineOptions({ name: "AccountFilter" });
</script>

<style scoped lang="scss">
.account-filter-container {
  padding-top: 10px;
  .n-select {
    min-width: 150px;
  }
}
</style>
