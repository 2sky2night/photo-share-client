<template>
  <div
    class="charts-container"
    ref="containerDOM"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import * as echarts from "echarts";
import type { ChartsInst } from "./types";

// props
const props = defineProps<{
  /**
   * 图表配置项
   */
  option: echarts.EChartsOption;
}>();
// 主题
const { isDark } = storeToRefs(useConfigStore());
// 图表容器
const containerDOM = ref<HTMLDivElement | null>(null);
// 容器大小监听
let ob: null | ResizeObserver = new ResizeObserver(([entity]) => {
  if (chartsIns) {
    const { width, height } = entity.contentRect;
    chartsIns.resize({ width, height });
  }
});
// 图表实例
let chartsIns: null | echarts.ECharts = null;

// 重载实例
const resetIns = () => {
  const target = containerDOM.value;
  if (target && chartsIns) {
    chartsIns.dispose();
    chartsIns = echarts.init(target, isDark.value ? "dark" : "light");
    chartsIns.setOption(props.option);
  }
};

// 重新渲染图表
const resetRender = () => {
  chartsIns && chartsIns.setOption(props.option);
};

// 初始化
const handleMounted = () => {
  const target = containerDOM.value;
  if (target && ob) {
    console.log("初始化图表");
    chartsIns = echarts.init(target, isDark.value ? "dark" : "light");
    chartsIns.setOption(props.option);
    ob.observe(target);
  }
};

// 卸载前
const handleBeforeUnmount = () => {
  if (chartsIns && ob) {
    chartsIns.dispose();
    ob.disconnect();
    ob = null;
    chartsIns = null;
  }
};

onMounted(handleMounted);

onBeforeUnmount(handleBeforeUnmount);

// 监听配置项更新，重新渲染图表
watch(() => props.option, resetRender);
// 监听主题更新，重新加载实例
watch(isDark, resetIns);

defineExpose<ChartsInst>({
  resetRender,
  resetIns,
});

defineOptions({
  name: "Charts",
});
</script>

<style scoped lang="scss">
.charts-container {
  min-width: 200px;
  min-height: 200px;
  height: 100%;
  width: 100%;
}
</style>
