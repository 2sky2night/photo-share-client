<template>
  <div class="photo-info-container">
    <template v-if="info">
      <!--650px下竖着展示图片-->
      <template v-if="isMoblie">
        <div class="img-list">
          <div
            v-for="item in info.photos"
            class="img"
            :style="{
              '--c-width': `${innerWidth - 20}`,
              '--width': `${item.width}`,
              '--heightPx': `${item.height}px`,
            }">
            <img-lazy :url="item.url" />
          </div>
        </div>
        <div
          class="info-container-pe"
          :class="{ active: isShow }">
          <div
            class="drag-tips mb-5"
            @click="onHandleToggleInfo">
            <div class="tips"></div>
          </div>
          <div class="title mb-5">{{ info.title }}</div>
          <div
            :class="{ 'desc-el': !isShow }"
            class="desc mb-5">
            {{ info.content }}
          </div>
          <div class="user mb-5">
            <avatar :src="info.user.avatar"> </avatar>
            <span class="ml-5">{{ info.user.username }}</span>
          </div>
          <div class="data">
            <div class="like mr-10">
              <n-icon>
                <HeartOutlined />
              </n-icon>
              <count-format
                class="ml-5"
                :count="info.like_count"></count-format>
            </div>
            <div class="view">
              <n-icon>
                <EyeRegular />
              </n-icon>
              <count-format
                class="ml-5"
                :count="info.views"></count-format>
            </div>
          </div>
          <time-format :time-str="info.createdAt"></time-format>
          <div class="like-btn">
            <like-btn
              :size="30"
              v-model:like-count="info.like_count"
              :pid="info.pid"
              v-model:is-liked="info.is_liked"></like-btn>
          </div>
        </div>
      </template>
      <!--650px以上通过轮播图的方式展示图片-->
      <template v-else>
        <n-carousel class="mb-10">
          <img-lazy
            class="carousel-img"
            v-for="item in info.photos"
            :url="item.url" />
        </n-carousel>
        <div class="info_container_pc">
          <div class="title mb-10">{{ info.title }}</div>
          <div class="user mb-10">
            <avatar :src="info.user.avatar"> </avatar>
            <span class="ml-5">{{ info.user.username }}</span>
          </div>
          <div class="desc mb-10">{{ info.content }}</div>
          <div class="data">
            <div class="like mr-10">
              <n-icon>
                <HeartOutlined />
              </n-icon>
              <count-format
                class="ml-5"
                :count="info.like_count"></count-format>
            </div>
            <div class="view">
              <n-icon>
                <EyeRegular />
              </n-icon>
              <count-format
                class="ml-5"
                :count="info.views"></count-format>
            </div>
          </div>
          <time-format :time-str="info.createdAt"></time-format>
          <div class="like-btn">
            <like-btn
              :size="30"
              v-model:like-count="info.like_count"
              :pid="info.pid"
              v-model:is-liked="info.is_liked"></like-btn>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <!--加载中的样式-->
      <template v-if="isMoblie">
        <skeleton
          class="mb-5"
          height="300px"></skeleton>
        <skeleton
          class="mb-5"
          height="300px"></skeleton>
        <skeleton height="300px"></skeleton>
      </template>
      <template v-else>
        <skeleton
          class="mb-10"
          height="500px"></skeleton>
        <skeleton
          class="mb-10"
          height="20px"
          width="40%"></skeleton>
        <skeleton
          height="20px"
          width="60%"></skeleton>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from "vue";
import { useMobile } from "@/hooks";
import LikeBtn from "@User/components/public/like-photo-btn/index.vue";
import { EyeRegular } from "@vicons/fa";
import { HeartOutlined } from "@vicons/antd";
import { getPhotoDetailAPI, postPhotoViewAPI } from "@User/apis/photo";
import type { Photo } from "@/apis/photo/types";

// props
const props = defineProps<{ pid: number }>();
// 数据
const info = ref<Photo | null>(null);
// 是否为小屏幕
const { isMoblie, innerWidth } = useMobile();
// pe:是否显示照片详情信息
const isShow = ref(false);

// pe:查看照片详情信息
const onHandleToggleInfo = () => {
  isShow.value = !isShow.value;
};

// 获取数据
const onHandleGetData = async () => {
  postPhotoViewAPI(props.pid);
  const res = await getPhotoDetailAPI(props.pid);
  document.title = res.data.title + " | Photo Share";
  info.value = res.data;
};

// 加载数据
onBeforeMount(onHandleGetData);

// 路由更新，重新获取数据
watch(
  () => props.pid,
  () => {
    info.value = null;
    onHandleGetData();
  }
);

defineOptions({
  name: "PhotoInfo",
});
</script>

<style scoped lang="scss">
// 移动端(650px以下)布局图片竖着
// 650以上图片以轮播图的形式展示
.photo-info-container {
  color: var(--text-color-1);

  .img-list {
    width: 100%;

    .img {
      // 通过原有尺寸计算出高度
      --radio: calc(var(--c-width) / var(--width));
      height: calc(var(--heightPx) * var(--radio));

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}

// pe信息栏展示
.info-container-pe {
  border-radius: 10px 10px 0 0;
  transition: var(--time-normal) all;
  background-color: var(--bg-color-1);
  position: fixed;
  bottom: -100px;
  z-index: 999;
  max-height: 100vh;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 10px 5px;
  box-shadow: 0 0 10px var(--box-shadow-color);

  &.active {
    bottom: 0px;
  }

  .drag-tips {
    cursor: pointer;
    display: flex;
    justify-content: center;

    .tips {
      width: 50%;
      height: 6px;
      border-radius: 10px;
      background-color: var(--text-color-1);
    }
  }

  .user {
    display: flex;
    align-items: center;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 17px;
    white-space: nowrap;
  }

  .like-btn {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .desc {
    font-size: 12px;
    color: var(--text-color-2);
  }

  .desc-el {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .data {
    display: flex;
    font-size: 13px;
    color: var(--text-color-2);

    i {
      position: relative;
      top: 2px;
    }
  }
}

// pc端(650px以上)以轮播图的形式展示每张图片
:deep(.n-carousel) {
  position: relative;
  background-color: var(--bg-color-2);
  border-radius: 10px;
  height: 500px;

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 35%,
      var(--mask-color)
    );
  }

  .n-carousel__slide {
    img {
      height: 500px;
      object-fit: contain;
    }

    .img-lazy-container {
      display: flex;
    }
  }

  .n-carousel__dots {
    z-index: 99;
  }
}

// pc端信息栏展示
.info_container_pc {
  position: relative;

  .title {
    font-size: 20px;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .like-btn {
    position: absolute;
    right: 10px;
    top: 40px;
  }

  .data {
    display: flex;
    font-size: 12px;
    align-items: center;
    color: var(--text-color-2);
  }
}
</style>
