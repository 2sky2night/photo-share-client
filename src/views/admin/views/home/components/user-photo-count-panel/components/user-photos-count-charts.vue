<template>
  <div class="user-photo-count-charts">
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
import { userPostPhotoCountAPI } from "@Admin/apis/data";
import { i18n } from "@/config";
import type { UserPostPhotoCount } from "@Admin/apis/data/types";
import type { EChartsOption } from "echarts";

// 加载
let isLoading = false;
// 列表数据
const list = ref<UserPostPhotoCount[]>([]);
// 选择的天数
const selectValue = ref<number | undefined>(0);
// 配置项
const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      name: "UID",
      type: "category",
      data: list.value.map((item) => item.uid),
    },
    yAxis: {
      name: i18n.global.t("postNum"),
      type: "value",
    },
    series: [
      {
        data: list.value.map((item) => item.total),
        type: "bar",
      },
    ],
  };
});

// 获取数据
const handleGetData = async () => {
  isLoading = true;
  list.value.length = 0;
  const { data } = await userPostPhotoCountAPI(selectValue.value, 20);
  data.forEach((item) => list.value.push(item));
  isLoading = false;
};

// 选择的天数更新的回调
const handleUpdateSelect = (value: false | number) => {
  if (isLoading) return;
  if (value === false) {
    selectValue.value = undefined;
  } else {
    selectValue.value = value;
  }
  handleGetData();
};
</script>

<style scoped lang="scss">
.user-photo-count-charts {
  height: 300px;
}
</style>
