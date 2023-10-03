<template>
  <div class="photo-item-container">
    <div
      class="img-content"
      @click="onHandleToDetail">
      <img-lazy :url="photo.photos[0].url" />
      <div class="mask">
        <!-- <avatar :size="40" class="mb-10" :src="photo.user.avatar"></avatar>
        <span>{{ photo.user.username }}</span> -->
      </div>
    </div>
    <div class="footer">
      <!--审核通过-->
      <div
        class="pass-info"
        v-if="photo.status === AuditStatus.PASS">
        <n-ellipsis
          :tooltip="false"
          class="title"
          >{{ photo.title }}</n-ellipsis
        >
        <like-photo-btn
          :size="20"
          :pid="photo.pid"
          v-model:is-liked="photo.is_liked"
          v-model:like-count="photo.like_count" />
      </div>
      <!--审核未通过、未审核且是当前登录用户访问的-->
      <div
        class="audit-info"
        v-else-if="userStore.userInfo.uid === photo.publish_uid">
        未完成...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import LikePhotoBtn from "@User/components/public/like-photo-btn/index.vue";
import { AuditStatus } from "@/types/photo";
import type { Photo } from "@/apis/photo/types";

// props
const props = defineProps<{ photo: Photo }>();
// router
const router = useRouter();
// 用户仓库
const userStore = useUserStore();

// 进入详情页
const onHandleToDetail = () => router.push(`/photo/detail/${props.photo.pid}`);

defineOptions({ name: "PhotoCell" });
</script>

<style scoped lang="scss">
.photo-item-container {
  border-radius: 5px;
  overflow: hidden;
  color: var(--text-color-1);
  .img-content {
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: hidden;
    .mask {
      opacity: 0;
      position: absolute;
      inset: 0;
      background-color: var(--mask-color);
      transition: var(--time-normal);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      :deep(.n-avatar) {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
    &:hover .mask {
      opacity: 1;
    }
    &:hover {
      :deep(.img-lazy-container) {
        img {
          transform: scale(1.05);
        }
      }
    }
    :deep(.img-lazy-container) {
      height: 35vh;
      img {
        transition: var(--time-normal) transform;
        object-fit: cover;
      }
      @media screen and (min-width: 1300px) {
        height: 35vh;
      }
      @media screen and (max-width: 650px) {
        height: 40vw;
      }
    }
  }
  .footer {
    > div {
      height: 40px;
      border-left: var(--border);
      border-right: var(--border);
      border-bottom: var(--border);
      border-radius: 0 0 5px 5px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 3px;
      justify-content: space-between;
      @media screen and (max-width: 650px) {
        height: 30px;
      }
      &.pass-info {
        @media screen and (max-width: 400px) {
          :deep(n-ellipsis) {
            font-size: 12px;
          }
        }
      }
      &.audit-info {
      }
    }
  }
}
</style>
