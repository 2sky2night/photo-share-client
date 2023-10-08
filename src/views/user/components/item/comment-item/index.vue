<template>
  <div class="comment-item">
    <div class="header mb-5">
      <div class="user">
        <avatar :src="comment.user.avatar" />
        <span class="ml-5">{{ comment.user.username }}</span>
      </div>
      <div
        class="like-btn"
        v-if="needLikeBtn">
        <auth-action>
          <n-icon
            @click="onHandleToggleLike"
            color="red"
            size="20">
            <component :is="isLiked ? Heart : HeartOutline"></component>
          </n-icon>
        </auth-action>
        <count-format
          class="ml-5"
          :count="comment.like_count"
          size="14px"></count-format>
      </div>
    </div>
    <div class="content mb-5">{{ comment.content }}</div>
    <div class="bottom">
      <time-format :time-str="comment.createdAt"></time-format>
    </div>
  </div>
</template>

<script lang="ts" setup>
import authAction from "@User/components/public/auth-action/index.vue";
import { Heart, HeartOutline } from "@vicons/ionicons5";
import { likeCommentAPI, cancelLikeCommentAPI } from "@User/apis/photo";
import { Comment as CommentType } from "@User/apis/photo/types";

// props
const props = withDefaults(
  defineProps<{
    comment: CommentType;
    isLiked: boolean;
    likeCount: number;
    /**
     * 是否需要点赞按钮?
     */
    needLikeBtn?: boolean;
  }>(),
  { needLikeBtn: true }
);
// emits
const emit = defineEmits<{
  "update:isLiked": [value: boolean];
  "update:likeCount": [value: number];
}>();
// 正在加载?
let isLoading = false;

// 点赞的回调
const onHandleToggleLike = async () => {
  if (isLoading) return;
  isLoading = true;
  if (props.isLiked) {
    await cancelLikeCommentAPI(props.comment.cid);
    emit("update:likeCount", props.likeCount - 1);
  } else {
    await likeCommentAPI(props.comment.cid);
    emit("update:likeCount", props.likeCount + 1);
  }
  isLoading = false;
  emit("update:isLiked", !props.isLiked);
};

defineOptions({
  name: "Comment",
});
</script>

<style scoped lang="scss">
.comment-item {
  color: var(--text-color-1);
  padding: 5px;

  .header {
    display: flex;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
    }

    .like-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        position: relative;
        top: 2px;
      }
    }
  }

  .content {
    padding: 5px 0;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
