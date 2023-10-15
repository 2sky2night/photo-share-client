<template>
  <user-info-comp
    :loading="isLoading"
    :user-data="data">
    <n-button
      size="small"
      type="primary"
      >{{ $t("follow") }}</n-button
    >
  </user-info-comp>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from "vue";
import UserInfoComp from "@User/components/public/user-info/index.vue";
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

// 加载数据
onBeforeMount(onHandleGetData);
// 监听路由参数更新获取最新数据
watch(() => props.uid, onHandleGetData);
</script>
