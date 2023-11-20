<template>
  <div class="user-panel-container">
    <title-comp>{{ $t("auditTotal") }}</title-comp>
    <div class="container">
      <lazy-component
        suspense
        min-height="300px">
        <audit-charts :days="0"></audit-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <audit-charts :days="7"></audit-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <audit-charts></audit-charts>
      </lazy-component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TitleComp from "../title/index.vue";
import LazyComponent from "@/components/lazy-component/index.vue";
import AuditCharts from "./components/audit-charts.vue";
defineOptions({
  name: "AuditPanel",
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
@media screen and (max-width: 800px) {
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
