<template>
  <div
    class="photo-item"
    ref="photoDOM">
    <div
      class="img-container"
      @click="onHandleImg">
      <img-lazy :url="photo.photos[0].url"></img-lazy>
    </div>
    <div class="desc">
      <div class="title">
        <n-ellipsis
          :line-clamp="2"
          :tooltip="false">
          {{ photo.title }}
        </n-ellipsis>
      </div>
      <div class="footer">
        <div class="user">
          <avatar :src="photo.user.avatar"> </avatar>
          <div class="username ml-5">{{ photo.user.username }}</div>
        </div>
        <div class="like">
          <like-photo-btn
            @update:likeStatus="onHandleLikeStatus"
            :like-count="photo.like_count"
            :is-liked="photo.is_liked"
            :pid="photo.pid"
            :size="18" />
          <count-format
            :count="photo.like_count"
            size="15"
            :sub="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import avatar from "@/components/public/avatar/index.vue";
import LikePhotoBtn from "@User/components/public/like-photo-btn/index.vue";
import { photoTransition } from "@User/render";
import type { Photo } from "@/apis/photo/types";

const router = useRouter();
const props = defineProps<{ photo: Photo; like: boolean; likeCount: number }>();
const emit = defineEmits<{
  "update:like": [value: boolean];
  "update:like-count": [value: number];
}>();
// 组件的DOM
const photoDOM = ref<HTMLDivElement | null>(null);

// 点击照片的回调
const onHandleImg = () => {
  if (photoDOM.value) {
    const { top, left, width, height } = photoDOM.value.getBoundingClientRect();
    photoTransition(top, left, width, height - 80, props.photo.photos[0].url);
  }
  router.push(`photo/detail/${props.photo.pid}`);
};

// 喜欢照片状态更新的回调
const onHandleLikeStatus = (status: boolean, count: number) => {
  emit("update:like", status);
  emit("update:like-count", count);
};

defineOptions({
  name: "PhotoItem",
});
</script>

<style scoped lang="scss">
// 若使用css变量完成瀑布流，请解释掉width和height的css变量
.photo-item {
  user-select: none;
  color: var(--text-color-1);
  // width: var(--img-width);
  transition: var(--time-normal);

  .img-container {
    // height: var(--img-height);
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;

    :deep(img) {
      display: block;
    }
  }

  .desc {
    padding: 5px;
    box-sizing: border-box;
    height: 80px;

    .title {
      height: 45px;
      width: 100%;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .like {
        display: flex;
        align-items: center;

        i {
          position: relative;
          top: 2px;
          cursor: pointer;
        }
      }

      .user {
        display: flex;
        align-items: center;

        :deep(.n-avatar) {
          min-width: 30px;
          height: 30px;
        }

        .username {
          width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
