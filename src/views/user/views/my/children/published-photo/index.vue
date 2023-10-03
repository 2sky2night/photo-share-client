<template>
  <div class="published-photo-container"></div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import PhotoList from "@User/components/list/photo-list/index.vue";
import { userGetPhotoAPI } from "@/apis/photo";

// 用户id
const {
  userInfo: { uid },
} = useUserStore();

// 获取用户自己的照片
// 包括通过、未通过、未审核三种类型的照片 

defineOptions({
  name: "PublishedPhoto",
});
</script>

<style scoped lang="scss">
.published-photo-container {
  color: var(--text-color-1);
}
</style>
