<template>
  <div class="photo-item">
    <div
      class="img-container"
      ref="imgDOM"
      @click="handleClickPhoto">
      <img
        v-if="showImg"
        :src="imgSrc" />
      <skeleton v-else />
    </div>
    <div class="info mt-5">
      <div class="title">
        <n-ellipsis
          :line-clamp="2"
          :tooltip="false">
          {{ photo.title }}
        </n-ellipsis>
      </div>
      <div class="data">
        <div class="user">
          <avatar :src="photo.user.avatar"></avatar>
          <span class="ml-5">{{ photo.user.username }}</span>
        </div>
        <like-btn
          :size="20"
          :pid="photo.pid"
          :is-liked="photo.is_liked"
          :like-count="photo.like_count"
          @update:is-liked="handleUpdateIsLiked"
          @update:like-count="handleUpdateLikeCount" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useNavigator } from "@/hooks";
import Skeleton from "@/components/skeleton/index.vue";
import LikeBtn from "@User/components/public/like-photo-btn/index.vue";
import { photoTransition } from "@/views/user/render";
import { config } from "@/config";
import type { Photo } from "@/apis/photo/types";

// props
const props = defineProps<{
  photo: Photo;
  isLiked: boolean;
  likeCount: number;
}>();
// emits
const emit = defineEmits<{
  "update:isLiked": [value: boolean];
  "update:likeCount": [value: number];
}>();
// 导航
const {
  user: { goPhotoDetail },
} = useNavigator();
// 图片显隐
const showImg = ref(false);
// 图片容器
const imgDOM = ref<HTMLElement | null>(null);
// 图片的地址
const imgSrc = computed(() => {
  return `${config.IMG_BASE_URL}${props.photo.photos[0].url}?q=30`;
});
// 首次加载相交监听器
let ob = new IntersectionObserver(([entity]) => {
  if (entity.isIntersecting) {
    // 相交了
    const img = new Image();
    img.src = imgSrc.value;
    if (img.complete) {
      // 同步加载完成（缓存过）
      handleShowImg();
    } else {
      // 异步加载完成
      img.onload = handleShowImg;
    }
  }
});
// 动画效果相交的监听器
let obAnimation = new IntersectionObserver(() => toggleClassToImg());

// 给img添加/移除class样式
const toggleClassToImg = () => {
  if (imgDOM.value) {
    const img = imgDOM.value.querySelector("img");
    if (img) {
      if (img.classList.contains("fade")) {
        img.classList.remove("fade");
      } else {
        img.classList.add("fade");
      }
    }
  }
};

// 点击图片的回调
const handleClickPhoto = () => {
  if (imgDOM.value) {
    const { top, left, width, height } = imgDOM.value.getBoundingClientRect();
    photoTransition(top, left, width, height, props.photo.photos[0].url);
  }
  goPhotoDetail(props.photo.pid);
};

// 点赞更新的回调
const handleUpdateIsLiked = (value: boolean) => {
  emit("update:isLiked", value);
};

// 点赞数量更新的回调
const handleUpdateLikeCount = (value: number) => {
  emit("update:likeCount", value);
};

// 显示图片
const handleShowImg = () => {
  showImg.value = true;
  nextTick(toggleClassToImg);
  distoryOb();
};

// 销毁监听器
const distoryOb = () => {
  if (imgDOM.value) {
    ob.unobserve(imgDOM.value);
    ob.disconnect();
  }
};

// 销毁动画监听器
const distoryObAnimation = () => {
  if (imgDOM.value) {
    obAnimation.unobserve(imgDOM.value);
    obAnimation.disconnect();
  }
};

// 渲染组件时进行视口相交监听
onMounted(() => {
  if (imgDOM.value) {
    ob.observe(imgDOM.value);
    obAnimation.observe(imgDOM.value);
  }
});

// 销毁监听器
onBeforeUnmount(() => {
  distoryOb();
  distoryObAnimation();
  // @ts-ignore
  ob = null;
  // @ts-ignore
  obAnimation = null;
});

defineOptions({
  name: "PhotoItem",
});
</script>

<style scoped lang="scss">
.fade {
  animation: fade 1 var(--time-normal) ease;
}
.photo-item {
  .img-container {
    border-radius: 10px;
    overflow: hidden;
    height: 225px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    .data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        align-items: center;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (max-width: 650px) {
  .photo-item .img-container {
    height: 150px;
  }
}
</style>
