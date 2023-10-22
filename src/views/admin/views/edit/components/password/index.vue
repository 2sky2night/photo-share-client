<template>
  <div class="password-container">
    <n-card>
      <template v-slot:header>{{ $t("editPassword") }}</template>
      <template v-slot:default>123</template>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import { userEditPasswordAPI } from "@/apis/user";

const userStore = useUserStore();
defineOptions({ name: "EditPassword" });
</script>

<style scoped lang="scss"></style>
