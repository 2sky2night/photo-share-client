<template>
  <div class="page">
    <n-result
      status="500"
      :title="$t('title500')"
      :description="$t('subTitile500')">
      <template #footer>
        <n-button @click="goHome">{{ $t("tips404") }}</n-button>
      </template>
    </n-result>
    <div class="setting">
      <setting></setting>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNavigator } from "@/hooks";
import Setting from "@/components/public/setting/index.vue";
const { goHome } = useNavigator();
defineOptions({
  name: "500",
});
</script>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  .setting{
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
</style>
