<template>
  <div class="audit-charts">
    <charts :option="option"></charts>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Charts from "@/components/charts/index.vue";
import { auditPhotoStatusAPI } from "@Admin/apis/data";
import { i18n } from "@/config";
import type { EChartsOption } from "echarts";

// props
const props = defineProps<{ days?: number | undefined }>();
// 数据
const { data } = await auditPhotoStatusAPI(props.days);
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
            value: data.no_pass,
            name: i18n.global.t("unpassAudit"),
          },
          {
            value: data.pass,
            name: i18n.global.t("passAudit"),
          },
          {
            value: data.unaudit,
            name: i18n.global.t("notAudit"),
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
.audit-charts {
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
