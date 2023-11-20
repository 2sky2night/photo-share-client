<template>
  <div class="tags-charts">
    <charts
      :option="option"
      ref="chartsInst" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useConfigStore } from "@/store";
import { storeToRefs } from "pinia";
import Charts from "@/components/charts/index.vue";
import { tagsPhotoCountAPI } from "@Admin/apis/data";
import { LOCALE_VALUE, i18n } from "@/config";
import type { EChartsOption } from "echarts";

// props
const props = defineProps<{
  /**
   * 多少天前的数据?不传则为全部数据
   */
  days?: number | undefined;
}>();
// 设置仓库
const { locale } = storeToRefs(useConfigStore());
// 数据
const { data: list } = await tagsPhotoCountAPI(props.days);
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
        data: list.map((item) => {
          return {
            value: item.total,
            name:
              locale.value === LOCALE_VALUE.EN ? item.name_en : item.name_zh,
          };
        }),
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
.tags-charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  height: 25vw;
  .title{
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
