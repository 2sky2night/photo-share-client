<template>
  <n-radio-group
    :value="isDele"
    @update:value="onHandleValueChange"
    name="radiogroup">
    <n-space>
      <n-radio :value="null">
        {{ $t("all") }}
      </n-radio>
      <n-radio :value="true">
        {{ $t("deleted") }}
      </n-radio>
      <n-radio :value="false">
        {{ $t("noDelete") }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { i18n } from "@/config";
import type { DeleteSelectorProps, DeleteSelectorEmits } from "./types";

// props
defineProps<DeleteSelectorProps>();
// emits
const emit = defineEmits<DeleteSelectorEmits>();

// 更新的回调
const onHandleValueChange = (value: boolean | null) => {
  emit("update:isDele", value);
};
defineOptions({ name: "DeleteSelector" });
</script>
