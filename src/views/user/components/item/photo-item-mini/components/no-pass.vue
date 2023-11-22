<template>
  <div class="photo-item-container">
    <div
      class="img-content"
      @click="onHandleShowModal">
      <img-lazy :url="photo.photos[0].url"  :q="config.IMG_QUALITY" />
    </div>
    <div class="footer">
      <n-ellipsis :tooltip="false">{{ photo.title }}</n-ellipsis>
      <n-button
        @click="onHandleShowModal"
        size="tiny"
        type="primary"
        >{{ $t("moreInfo") }}</n-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import MoreInfo from "./more-info.vue";
import { renderModal } from "@/render";
import type { Photo } from "@/apis/photo/types";
import { config } from "@/config";

// props
const props = defineProps<{ photo: Photo }>();

// 打开模态框
const onHandleShowModal = (e: MouseEvent) => {
  // @ts-ignore
  renderModal(MoreInfo, { photo: props.photo }, { x: e.clientX, y: e.clientY });
};

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
