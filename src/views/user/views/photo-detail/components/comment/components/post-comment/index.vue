<template>
  <div class="post-comment">
    <n-input
      type="textarea"
      v-model:value="content"
      maxlength="255"
      :resizable="false"
      :placeholder="$t('pleaseEnter', { title: $t('comment') })"></n-input>
    <div class="actions mt-10">
      <n-button @click="onHandleReset">{{ $t("reset") }}</n-button>
      <auth-action>
        <n-button
          @click="onHandlePost"
          :loading="isLoading"
          class="ml-5"
          type="primary"
          >{{ $t("send") }}</n-button
        >
      </auth-action>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import AuthAction from "@User/components/public/auth-action/index.vue";
import { postCommentAPI } from "@User/apis/photo";
import { pubsub } from "@/utils";

const props = defineProps<{ pid: number }>();
const isLoading = ref(false);
// 评论内容
const content = ref("");

// 重置
const onHandleReset = () => {
  content.value = "";
};

// 发送评论
const onHandlePost = async () => {
  isLoading.value = true;
  await postCommentAPI(props.pid, content.value);
  // 通知评论发送成功，重新加载评论列表组件
  pubsub.emit("user:post-comment");
  // 重置内容
  onHandleReset();
  isLoading.value = false;
};

// 卸载组件时卸载对应的频道监听
onBeforeUnmount(() => {
  pubsub.remove("user:post-comment");
});

defineOptions({
  name: "PostComment",
});
</script>

<style scoped lang="scss">
.post-comment {
  height: 150px;

  .actions {
    display: flex;
    justify-content: end;
  }
}
</style>
