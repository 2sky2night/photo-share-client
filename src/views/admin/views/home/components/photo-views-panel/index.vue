<template>
  <div class="photo-views-panel-container">
    <title-comp>{{ $t("photoViewsTotal") }}</title-comp>
    <lazy-component suspense>
      <photo-views-charts></photo-views-charts>
    </lazy-component>
  </div>
</template>

<script lang="ts" setup>
import TitleComp from "../title/index.vue";
import LazyComponent from "@/components/lazy-component/index.vue";
import PhotoViewsCharts from "./components/photo-views-charts.vue";

defineOptions({
  name: "PhotoViewsPanel",
});
</script>
