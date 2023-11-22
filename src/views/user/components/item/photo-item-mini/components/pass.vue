<template>
  <div class="photo-item-container">
    <div
      class="img-content"
      @click="onHandleToPhotoDetail">
      <img-lazy
        :url="photo.photos[0].url"
        :q="config.IMG_QUALITY" />
      <div class="mask">
        <avatar
          :size="40"
          class="mb-10"
          :src="photo.user.avatar"
          @click.stop="onHandleToUser" />
        <span @click.stop="onHandleToUser">{{ photo.user.username }}</span>
        <n-button
          v-if="userStore.userInfo.uid === photo.publish_uid"
          @click.stop="onHandleCheckMore"
          size="tiny"
          type="primary">
          {{ $t("moreInfo") }}
        </n-button>
      </div>
    </div>
    <div class="footer">
      <n-ellipsis
        :tooltip="false"
        class="title">
        {{ photo.title }}
      </n-ellipsis>
      <like-photo-btn
        :size="20"
        :pid="photo.pid"
        v-model:is-liked="photo.is_liked"
        v-model:like-count="photo.like_count" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import { useNavigator } from "@/hooks";
import { renderModal } from "@/render";
import MoreInfo from "./more-info.vue";
import LikePhotoBtn from "@User/components/public/like-photo-btn/index.vue";
import type { Photo } from "@/apis/photo/types";
import { config } from "@/config";

// props
const props = defineProps<{ photo: Photo }>();
// router
const {
  user: { goPhotoDetail, goUser },
} = useNavigator();
// 用户仓库
const userStore = useUserStore();

// 查看照片审核详情信息
const onHandleCheckMore = (e: MouseEvent) => {
  // @ts-ignore
  renderModal(MoreInfo, { photo: props.photo }, { x: e.clientX, y: e.clientY });
};

// 进入照片详情页
const onHandleToPhotoDetail = () => goPhotoDetail(props.photo.pid);

// 进入用户页
const onHandleToUser = () => goUser(props.photo.publish_uid);

defineOptions({ name: "PhotoPass" });
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
    @media screen and (max-width: 400px) {
      :deep(n-ellipsis) {
        font-size: 12px;
      }
    }
  }
}
</style>
