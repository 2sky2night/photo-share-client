<template>
  <div class="logo-container">
    <img src="@/assets/vue.svg" />
    <span
      class="title"
      v-if="settingData.isExpand">
      PhotoShare
      </span>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@Admin/store";
import { storeToRefs } from "pinia";

const { settingData } = storeToRefs(useSettingStore());

defineOptions({
  name: "SiderLogo",
});
</script>

<style scoped lang="scss">
.logo-container {
  text-align: center;
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  img {
    position: relative;
    top: 5px;
    width: 35px;
    height: 35px;
  }
  .title {
    position: relative;
    font-size: 25px;
    font-weight: 600;
    color: var(--primary-color);
  }
}
</style>
