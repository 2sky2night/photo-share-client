<template>
  <div class="user-charts">
    <charts :option="option"></charts>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Charts from "@/components/charts/index.vue";
import { accountPortionAPI } from "@Admin/apis/data";
import { i18n } from "@/config";
import type { EChartsOption } from "echarts";

// props
const props = defineProps<{ days?: number | undefined }>();
// 数据
const { data } = await accountPortionAPI(props.days);
// 配置项
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: data.admin_count,
            name: i18n.global.t("admin"),
          },
          {
            value: data.super_admin_count,
            name: i18n.global.t("superAdmin"),
          },
          {
            value: data.user_count,
            name: i18n.global.t("user"),
          },
        ],
      },
    ],
  };
});
// 标题
const title = computed(() => {
  if (props.days === 0) {
    return i18n.global.t("todayD");
  } else if (props.days === 7) {
    return i18n.global.t("weekD");
  } else {
    return i18n.global.t("all");
  }
});
</script>

<style scoped lang="scss">
.user-charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  height: 25vw;
  .title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
