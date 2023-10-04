<template>
  <div class="setting-container">
    <n-icon
      class="mr-10"
      @click="onHandleshowModal">
      <language></language>
    </n-icon>
    <n-icon @click="onHandleChangeTheme">
      <component :is="configStore.isDark ? 'Sunny' : 'Moon'"></component>
    </n-icon>
  </div>
  <lang-modal v-model:model-value="isShow"></lang-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useConfigStore } from "@/store";
import LangModal from "../lang-modal/index.vue";
import { Sunny, Moon, Language } from "@vicons/ionicons5";

// 配置仓库
const configStore = useConfigStore();
// 模态框显隐
const isShow = ref(false);

// 显示模态框
const onHandleshowModal = () => (isShow.value = true);

// 主题切换
const onHandleChangeTheme = () => configStore.toggleTheme();

defineOptions({
  name: "Setting",
  components: {
    Sunny,
    Moon,
  },
});
</script>

<style scoped lang="scss">
.setting-container {
  color: var(--text-color-1);
  font-size: 20px;
  i {
    cursor: pointer;
  }
}
</style>
