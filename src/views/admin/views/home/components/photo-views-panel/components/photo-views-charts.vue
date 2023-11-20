<template>
  <div class="photo-views-charts">
    <n-radio-group
      :value="selectValue"
      @update:value="handleUpdateSelect">
      <n-radio
        name="photo-views-radio"
        :value="0">
        {{ $t("todayD") }}
      </n-radio>
      <n-radio
        name="photo-views-radio"
        :value="7">
        {{ $t("weekD") }}
      </n-radio>
      <n-radio
        name="photo-views-radio"
        :value="false">
        {{ $t("all") }}
      </n-radio>
    </n-radio-group>
    <charts :option="option"></charts>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Charts from "@/components/charts/index.vue";
import { photoViewsAPI } from "@Admin/apis/data";
import { i18n } from "@/config";
import type { PhotoViewsCount } from "@Admin/apis/data/types";
import type { EChartsOption } from "echarts";

// 列表项
const list = ref<PhotoViewsCount[]>([]);
// 当前选择的天数(默认今天)
const selectValue = ref<number | undefined>(0);
// 正在加载
let isLoading = false;
// 图表配置项
const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: "category",
      data: list.value.map((item) => item.pid),
      name: "tid",
    },
    yAxis: {
      type: "value",
      name: i18n.global.t("views"),
    },
    series: [
      {
        data: list.value.map((item) => item.views),
        type: "bar",
      },
    ],
  };
});

// 获取数据
const handleGetData = async () => {
  isLoading = true;
  list.value.length = 0;
  const { data } = await photoViewsAPI(selectValue.value, 20);
  data.forEach((item) => list.value.push(item));
  isLoading = false;
};

// 选择的天数更新
const handleUpdateSelect = (value: number | false) => {
  if (isLoading) return;
  if (value === false) {
    selectValue.value = undefined;
  } else {
    selectValue.value = value;
  }
  // 更新图表数据
  handleGetData();
};

// 加载数据
await handleGetData();
</script>

<style scoped lang="scss">
.photo-views-charts {
  height: 300px;
}
</style>
