<template>
  <div class="tabs-panel-container">
    <n-tabs
      v-model:value="_activeName"
      @update:value="onHandleChangeValue"
      :size="isMoblie ? 'small' : 'medium'"
      :placement="isMoblie ? 'top' : 'left'"
      type="line">
      <n-tab
        v-for="item in tabList"
        :name="item.name"
        :key="item.name">
        <span class="tab-label">{{ item.label }}</span>
      </n-tab>
    </n-tabs>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 响应式的tabs 移动端tab栏水平排列 pc端tab栏垂直排列
import { ref, watch } from "vue";
import { useMobile } from "@/hooks";

// props
const props = defineProps<{
  tabList: { name: string; label: string }[];
  activeName: string;
}>();
// emits
const emit = defineEmits<{
  "update:activeName": [value: string];
}>();
// 移动端检测
const { isMoblie } = useMobile();

// 激活的某一项
const _activeName = ref(props.activeName);

// _activename更新的回调(组件内部更新)
const onHandleChangeValue = (value: string) => emit("update:activeName", value);
// activename更新的回调(外部更新)
watch(
  () => props.activeName,
  (v) => (_activeName.value = v)
);
defineOptions({ name: "TabsPanel" });
</script>

<style scoped lang="scss">
.tabs-panel-container {
  display: flex;
  flex-direction: row;
  border-top: 1px solid var(--border-color-1);

  :deep(.n-tabs) {
    width: auto;
    .n-tabs-nav-scroll-content {
      height: 100%;
    }
  }
  .content {
    flex-grow: 1;
    padding: 10px;
  }
}
@media screen and (max-width: 650px) {
  .tabs-panel-container {
    flex-direction: column;
    border-top: none;
    @media screen and (max-width: 400px) {
      .tab-label {
        font-size: 13px;
      }
    }
  }
}
</style>
