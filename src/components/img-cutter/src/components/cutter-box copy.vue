<template>
  <div
    class="cutter-mask"
    ref="maskDOM">
    <div
      class="cutter-box"
      @touchstart.stop="handleTouchStart"
      @mousedown.stop="handleMousedown"
      :style="style">
      <div class="top-left"></div>
      <div class="top-right"></div>
      <div class="right-top"></div>
      <div class="left-top"></div>
      <div
        class="set-top-center top-center"
        @mousedown.stop="handleMouseDownTC"></div>
      <div class="set-left-center left-center"></div>
      <div
        class="set-right-center right-center"
        @touchstart.stop=""
        @mousedown.stop="handleMouseDownRC"></div>
      <div
        class="set-bottom-center bottom-center"
        @touchstart.stop
        @mousedown.stop="handleMouseDownBC"></div>
      <div class="left-bottom"></div>
      <div class="right-bottom"></div>
      <div class="bottom-left"></div>
      <div class="bottom-right"></div>
      <!--四个角-->
      <div class="set-top-right"></div>
      <div class="set-top-left"></div>
      <div class="set-bottom-right"></div>
      <div class="set-bottom-left"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// js实现拉伸
import { computed, ref } from "vue";

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
// 遮罩层容器
const maskDOM = ref<HTMLElement | null>(null);
// 裁剪框的样式
const style = computed(() => ({
  top: props.top + "px",
  left: props.left + "px",
  width: props.width + "px",
  height: props.height + "px",
}));
// 拉伸的快慢
const RIZE_SPEED = 0.025;
// 裁剪框最小尺寸
const minSize = 50;
// 鼠标按下的回调
const handleMousedown = (e: MouseEvent) => {
  // @ts-ignore
  const target = e.target as HTMLElement;
  // 非裁剪框触发
  if (!target.classList.contains("drag-area")) return;
  // 鼠标移动的回调
  const handleMouseMove = (e: MouseEvent) => {
    // 鼠标在cutter-mask的坐标
    const x = e.offsetX + target.offsetLeft;
    const y = e.offsetY + target.offsetTop;
    handleOffset(x, y);
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
};

// 手指按下的回调
const handleTouchStart = (e: TouchEvent) => {
  const target = e.target as HTMLElement;
  // 非裁剪框触发
  if (!target.classList.contains("drag-area")) return;
  // 手指移动的回调
  const handleTouchMove = (e: TouchEvent) => {
    if (maskDOM.value) {
      const [{ clientX, clientY }] = Array.from(e.touches);
      const { left, top } = maskDOM.value.getBoundingClientRect();
      // 计算出手指在cutter-mask的坐标
      const x = clientX - left;
      const y = clientY - top;
      handleOffset(x, y);
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
const handleOffset = (x: number, y: number) => {
  if (maskDOM.value) {
    const { clientHeight, clientWidth } = maskDOM.value;
    const { width, height } = props;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    // ----x
    if (x <= halfWidth) {
      // x轴小于裁剪框的一半
      emit("update:left", 0);
    } else if (x >= clientWidth - halfWidth) {
      // x轴大于总宽度-裁剪框的一半
      emit("update:left", clientWidth - width);
    } else {
      // 正常范围
      emit("update:left", x - halfWidth);
    }
    // ----y
    if (y <= halfHeight) {
      // y轴小于裁剪框高度的一半
      emit("update:top", 0);
    } else if (y >= clientHeight - halfHeight) {
      // y轴大于总高度-裁剪框高度的一半
      emit("update:top", clientHeight - height);
    } else {
      // 正常范围
      emit("update:top", y - halfHeight);
    }
  }
};

// 设置当前裁剪框的大小
const handleSize = (
  dx: number,
  dy: number,
  maxWidth: number,
  maxHeight: number
) => {
  // 模拟拉伸后的高度
  const height = dy + props.height;
  // 模拟拉伸后的宽度
  const width = dx + props.width;
  if (height <= maxHeight && height >= minSize) {
    // 若高度小于等于最大高度并且大于等于最小高度
    emit("update:height", height);
  }
  if (width <= maxWidth && width >= minSize) {
    // 总宽度小于等于最大宽度并且大于等于最小宽度
    emit("update:width", width);
  }
};

// 手指按下中的回调
const handleMouseDownBC = (e: MouseEvent) => {
  if (maskDOM.value) {
    const target = maskDOM.value;
    // 缓存布局属性
    const { clientHeight, clientWidth } = target;
    // 计算出当前容器最大的宽度和高度
    const maxWidth = clientWidth - props.left;
    const maxHeight = clientHeight - props.top;
    // 记录起始下拉位置
    const startY = e.clientY;
    // 鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      handleSize(0, (e.clientY - startY) * RIZE_SPEED, maxWidth, maxHeight);
    };
    // 鼠标离开
    const handleMouseLeave = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
      target.removeEventListener("mouseup", handleMouseUp);
    };
    // 鼠标抬起
    const handleMouseUp = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
      target.removeEventListener("mouseup", handleMouseUp);
    };
    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseleave", handleMouseLeave);
    target.addEventListener("mouseup", handleMouseUp);
  }
};

// 手指按下右中的回调
const handleMouseDownRC = (e: MouseEvent) => {
  if (maskDOM.value) {
    const target = maskDOM.value;
    // 缓存布局属性
    const { clientHeight, clientWidth } = target;
    // 计算出当前容器最大的宽度和高度
    const maxWidth = clientWidth - props.left;
    const maxHeight = clientHeight - props.top;
    // 记录起始下拉位置
    const startX = e.clientX;
    // 鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      handleSize(
        (e.clientX - startX) * RIZE_SPEED,
        0 * RIZE_SPEED,
        maxWidth,
        maxHeight
      );
    };
    // 鼠标离开
    const handleMouseLeave = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
      target.removeEventListener("mouseup", handleMouseUp);
    };
    // 鼠标抬起
    const handleMouseUp = () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
      target.removeEventListener("mouseup", handleMouseUp);
    };
    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseleave", handleMouseLeave);
    target.addEventListener("mouseup", handleMouseUp);
  }
};

// 手指按下上中的回调
const handleMouseDownTC = () => {};
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
    border: 2px solid #fff;
    resize: both;
    cursor: ew-resize;
    overflow: hidden;

    > div {
      position: absolute;
      background-color: #fff;
      border-radius: 10px;
    }

    .set-top-left {
      width: 10px;
      height: 10px;
      top: -5px;
      left: -5px;
      background-color: red;
    }

    .set-top-right {
      width: 10px;
      height: 10px;
      top: -5px;
      right: -5px;
      background-color: red;
    }

    .set-bottom-right {
      width: 10px;
      height: 10px;
      bottom: -5px;
      right: -5px;
      background-color: red;
    }

    .set-bottom-left {
      width: 10px;
      height: 10px;
      bottom: -5px;
      left: -5px;
      background-color: red;
    }

    // 上右
    .top-right {
      height: 5px;
      width: 20px;
      top: 0;
      right: -2px;
      transform: translateY(-50%);
    }

    // 上中
    .top-center {
      height: 5px;
      width: 20px;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    // 上左
    .top-left {
      height: 5px;
      width: 20px;
      top: 0;
      left: -2px;
      transform: translateY(-50%);
    }

    // 左上
    .left-top {
      height: 20px;
      width: 5px;
      top: -2px;
      left: 0;
      transform: translateX(-50%);
    }

    // 左中
    .left-center {
      height: 20px;
      width: 5px;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
    }

    // 左下
    .left-bottom {
      height: 20px;
      width: 5px;
      bottom: -2px;
      left: 0;
      transform: translateX(-50%);
    }

    // 下左
    .bottom-left {
      left: -2px;
      bottom: 0;
      transform: translateY(50%);
      width: 20px;
      height: 5px;
    }

    // 下中
    .bottom-center {
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      width: 20px;
      height: 5px;
    }

    // 下右
    .bottom-right {
      right: -2px;
      bottom: 0;
      transform: translateY(50%);
      width: 20px;
      height: 5px;
    }

    // 右下
    .right-bottom {
      height: 20px;
      width: 5px;
      bottom: -2px;
      right: 0;
      transform: translateX(50%);
    }

    // 右中
    .right-center {
      right: 0;
      transform: translate(50%, -50%);
      width: 5px;
      height: 20px;
      top: 50%;
    }

    // 右上
    .right-top {
      height: 20px;
      width: 5px;
      top: -2px;
      right: 0;
      transform: translateX(50%);
    }
  }
}
</style>
