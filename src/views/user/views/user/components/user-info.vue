<template>
  <template v-if="isLoading">正在加载</template>
  <user-info-comp
    v-if="!isLoading && data"
    :user-data="data">
    <n-button
      size="small"
      type="primary"
      >关注</n-button
    >
  </user-info-comp>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import UserInfoComp from "@User/components/user-info/index.vue";
import { getUserInfoByParamAPI } from "@User/apis/user";
import type { UserInfoResponse } from "@User/apis/user/types";

// props
const props = defineProps<{ uid: number }>();
// 用户信息
let data: UserInfoResponse | null = null;
// 正在加载
const isLoading = ref(false);

// 获取数据
const onHandleGetData = async () => {
  isLoading.value = true;
  const res = await getUserInfoByParamAPI(props.uid);
  data = res.data;
  isLoading.value = false;
};

onBeforeMount(onHandleGetData);
</script>

<style scoped lang="scss"></style>
