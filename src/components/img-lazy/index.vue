<template>
  <div
    class="img-lazy-container"
    ref="container">
    <Transition name="img">
      <img
        v-if="isShow"
        :src="src" />
    </Transition>
    <skeleton v-if="!isShow"></skeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { config } from "@/config";

// emits
const emit = defineEmits<{
  imgLoad: [];
}>();
// props
const props = defineProps<{
  /**
   * 图片地址
   */
  url: string;
  /**
   * 图片质量(设置了会作为查询参数携带上)
   */
  q?: number;
}>();
// 容器
const container = ref<HTMLDivElement | null>(null);
// 是否显示
const isShow = ref(false);
// 图片的src
const src = `${config.IMG_BASE_URL}${
  props.q === undefined ? props.url : props.url + `?q=${props.q}`
}`;
// 监听者
const observer = new IntersectionObserver((entries) => {
  entries.some((entry) => {
    if (entry.isIntersecting) {
      // 与视图相交了
      const img = new Image();
      img.src = src;
      if (img.complete) {
        // 缓存加载完成
        isShow.value = true;
        // 加载完成取消静态，释放内存
        emit("imgLoad");
        onHandleUnObserver();
      } else {
        // 发送请求加载图片
        img.onload = () => {
          isShow.value = true;
          emit("imgLoad");
          onHandleUnObserver();
        };
      }
    }
    return true;
  });
});

// 取消监听
const onHandleUnObserver = () => {
  const target = container.value as HTMLDivElement;
  if (target) {
    observer.unobserve(target);
    observer.disconnect();
  }
};

onMounted(() => {
  const target = container.value as HTMLDivElement;
  if (target) {
    observer.observe(target);
  }
});

onBeforeUnmount(onHandleUnObserver);

defineOptions({
  name: "ImgLzay",
});
</script>

<style scoped lang="scss">
.img-lazy-container {
  width: 100%;
  height: 100%;

  img {
    -webkit-user-drag: none;
    height: 100%;
    width: 100%;
  }
}

.img-enter-active {
  transition: var(--time-normal);
}

.img-enter-from {
  opacity: 0;
}

.img-enter-to {
  opacity: 1;
}
</style>
