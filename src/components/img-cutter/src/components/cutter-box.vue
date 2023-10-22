<template>
  <div
    class="cutter-mask"
    ref="maskDOM">
    <div
      class="cutter-box"
      ref="boxDOM"
      :style="style">
      <div
        class="drag-area"
        @touchstart.stop="handleTouchStart"
        @touchmove.stop
        @mousemove.stop
        @mousedown.stop="handleMousedown"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 拖拽js，拉伸css实现
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

// props
const props = defineProps<{
  top: number;
  left: number;
  width: number;
  height: number;
}>();
// emits
const emit = defineEmits<{
  (e: "update:top", v: number): void;
  (e: "update:left", v: number): void;
  (e: "update:width", v: number): void;
  (e: "update:height", v: number): void;
}>();
// 遮罩层DOM
const maskDOM = ref<HTMLElement | null>(null);
// 裁剪框DOM
const boxDOM = ref<HTMLDivElement | null>(null);
// 裁剪框的样式
const style = computed(() => ({
  top: props.top + "px",
  left: props.left + "px",
  width: props.width + "px",
  height: props.height + "px",
}));

// 鼠标按下的回调
const handleMousedown = (e: MouseEvent) => {
  if (maskDOM.value) {
    // @ts-ignore
    const target = e.target as HTMLElement;
    const { clientHeight: maskHeight, clientWidth: maskWidth } = maskDOM.value;
    // 鼠标移动的回调
    const handleMouseMove = (e: MouseEvent) => {
      // 鼠标在cutter-mask的坐标
      const x = e.offsetX + props.left;
      const y = e.offsetY + props.top;
      handleOffset(x, y, maskWidth, maskHeight);
    };
    // 鼠标抬起的回调
    const handleMouseUp = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseup", handleMouseUp);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
    // 鼠标移出的回调
    const handleMouseLeave = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseup", handleMouseUp);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseup", handleMouseUp);
    target.addEventListener("mouseleave", handleMouseLeave);
  }
};

// 手指按下的回调
const handleTouchStart = (e: TouchEvent) => {
  const target = e.target as HTMLElement;
  // 手指移动的回调
  const handleTouchMove = (e: TouchEvent) => {
    if (maskDOM.value) {
      const [{ clientX, clientY }] = Array.from(e.touches);
      const { left, top, width, height } =
        maskDOM.value.getBoundingClientRect();
      // 计算出手指在cutter-mask的坐标
      const x = clientX - left;
      const y = clientY - top;
      handleOffset(x, y, width, height);
    }
  };
  // 手指抬起的回调
  const hanldeTouchEnd = () => {
    target.removeEventListener("touchmove", handleTouchMove);
    target.removeEventListener("touchend", hanldeTouchEnd);
    target.removeEventListener("touchcancel", handleTouchCancel);
  };
  // 手指移出去的回调
  const handleTouchCancel = () => {
    target.removeEventListener("touchmove", handleTouchMove);
    target.removeEventListener("touchend", hanldeTouchEnd);
    target.removeEventListener("touchcancel", handleTouchCancel);
  };
  target.addEventListener("touchmove", handleTouchMove);
  target.addEventListener("touchend", hanldeTouchEnd);
  target.addEventListener("touchcancel", handleTouchCancel);
};

// 设置当前裁剪框的位置
const handleOffset = (
  x: number,
  y: number,
  maskWidth: number,
  maskHeight: number
) => {
  if (maskDOM.value) {
    const { width, height } = props;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    // ----x
    if (x <= halfWidth) {
      // x轴小于裁剪框的一半
      emit("update:left", 0);
    } else if (x >= maskWidth - halfWidth - 4) {
      // x轴大于总宽度-裁剪框的一半(-4是边框的总宽度)
      emit("update:left", maskWidth - width - 4);
    } else {
      // 正常范围
      emit("update:left", x - halfWidth);
    }
    // ----y
    if (y <= halfHeight) {
      // y轴小于裁剪框高度的一半
      emit("update:top", 0);
    } else if (y >= maskHeight - halfHeight - 4) {
      // y轴大于总高度-裁剪框高度的一半
      emit("update:top", maskHeight - height - 4);
    } else {
      // 正常范围
      emit("update:top", y - halfHeight);
    }
  }
};

onMounted(() => {
  let observerBox: ResizeObserver | null = null;
  let observerMask: ResizeObserver | null = null;
  setTimeout(() => {
    if (boxDOM.value && maskDOM.value) {
      const boxDOMIns = boxDOM.value as HTMLDivElement;
      const maskDOMIns = maskDOM.value as HTMLDivElement;
      // 监听裁剪框容器变化，动态设置裁剪框最大尺寸
      observerBox = new ResizeObserver(([boxEntry]) => {
        const { clientHeight, clientWidth } = maskDOMIns;
        // 计算出当前裁剪框最大宽度和高度
        const maxWidth = clientWidth - props.left;
        const maxHeight = clientHeight - props.top;
        boxDOMIns.style.setProperty("--max-width", `${maxWidth - 4}px`);
        boxDOMIns.style.setProperty("--max-height", `${maxHeight - 4}px`);
        emit("update:height", boxEntry.contentRect.height);
        emit("update:width", boxEntry.contentRect.width);
      });
      observerBox.observe(boxDOMIns);
      // 遮罩层大小发送变化了，说明整个图片的尺寸发送了变化，需要重置裁剪框位置，避免飞出去了
      observerMask = new ResizeObserver(() => {
        emit("update:left", 0);
        emit("update:top", 0);
        emit("update:height", 100);
        emit("update:width", 100);
      });
      observerMask.observe(maskDOMIns);
    }
  });
  onBeforeUnmount(() => {
    observerMask && observerMask.disconnect();
    observerBox && observerBox.disconnect();
  });
});
</script>

<style scoped lang="scss">
.cutter-mask {
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: #00000049;
  background-clip: content-box;

  .cutter-box {
    background-color: transparent;
    position: absolute;
    border: 3px solid #fff;
    resize: both;
    cursor: ew-resize;
    overflow: hidden;
    // 最大尺寸
    max-width: var(--max-width);
    max-height: var(--max-height);
    // 最小尺寸
    min-width: 50px;
    min-height: 50px;

    .drag-area {
      cursor: grabbing;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
