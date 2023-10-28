<template>
  <div
    class="img-cutter-container"
    ref="modalDOM"
    :class="modalClass"
    @click.stop>
    <div class="header">
      <div class="title">裁剪图片</div>
      <div
        class="close-btn"
        @click="handleCloseBtn">
        x
      </div>
    </div>
    <div class="main">
      <div
        class="cutter-container"
        v-if="isCutter && imgUrl">
        <div class="pre-img-container">
          <img
            class="pre-img"
            :src="imgUrl"
            ref="preImgDOM" />
          <cutter-box
            v-model:height="cutterOffset.height"
            v-model:left="cutterOffset.left"
            v-model:top="cutterOffset.top"
            v-model:width="cutterOffset.width" />
        </div>
      </div>
      <div
        class="upload-container"
        v-else>
        <input
          accept="image/*"
          ref="fileInputDOM"
          type="file"
          @change="handleFileChange"
          class="upload-input" />
        <div
          class="upload-cotent"
          :class="{ active: isInDropArea }"
          @dragend="toggleActive"
          @dragleave="toggleActive"
          @dragenter.prevent="toggleActive"
          @drop.prevent="handleDrop"
          @dragover.prevent
          @click="handleUpload">
          <span>+</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <button
        class="cancel"
        @click="handleCloseBtn">
        取消
      </button>
      <button
        :disabled="isCutter === false && imgUrl === null"
        class="confirm"
        @click="handleConfrim">
        确认
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, onBeforeUnmount } from "vue";
import CutterBox from "./cutter-box.vue";
import type { ModalIns } from "../types";

// props
const props = defineProps<{
  /**
   * 检测文件类型的回调
   */
  fileTypeCatch: (data: File) => any;
  /**
   * 其他出错的回调
   */
  otherError: (reason: any) => any;
  /**
   * 模态框弹出的left偏移量
   */
  startLeft: number | null;
  /**
   * 模态框弹出的right偏移量
   */
  startTop: number | null;
  /**
   * 模态框的class
   */
  modalClass: string;
}>();
// emit
const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "cutDown", file: File | null): void;
}>();
// 模态框DOM
const modalDOM = ref<HTMLDivElement | null>(null);
// 文件域DOM
const fileInputDOM = ref<HTMLInputElement | null>(null);
// 完整图片
const preImgDOM = ref<HTMLImageElement | null>(null);
// 当前是上传还是裁剪模式? false上传,true裁剪模式
const isCutter = ref(false);
// 图片信息
let imgFileInfo: null | { name: string; type: string; lastModified: number } =
  null;
// 上传图片的url
let imgUrl: string | null = null;
// 当前文件在拖拽放置区域?
const isInDropArea = ref(false);
// 裁剪框的偏移量
const cutterOffset = ref({
  top: 0,
  left: 0,
  width: 100,
  height: 100,
});
// 动画定时器
let timer: any | null = null;
// 动画时间
const ANIMA_TIME = 300;

// 点击确定
const handleConfrim = () => {
  nextTick(() => {
    // 完整图片的DOM
    const imgDOM = preImgDOM.value;
    if (imgUrl && imgDOM) {
      const { naturalHeight, clientHeight } = imgDOM;
      const { width, height, left, top } = cutterOffset.value;
      // 用canvans实现裁剪
      const canvas = document.createElement("canvas");
      // 画布大小就是裁剪框大小
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 计算出原图片和当前图片的缩放比例
        // 这一步非常关键，因为在渲染图片时，canvas是直接将图片原尺寸渲染上去了
        // 会导致我们设置的偏移量和大小会有巨大的误差(因为我们是在被缩放过的图片调整裁剪框的位置大小)
        // 所以我们需要计算出缩放的比例
        const rate = +(clientHeight / naturalHeight).toFixed(2);
        // 根据偏移量和尺寸渲染对应位置的图片
        // 前面五个参数是渲染的图片、原图片的x坐标、原图片的y坐标、裁剪尺寸
        // 后面四个参数是canvas画布的输出位置，将图片渲染在（0，0）的位置，大小为width, height
        // @ts-ignore
        ctx.drawImage(
          imgDOM,
          left / rate,
          top / rate,
          width / rate,
          height / rate,
          0,
          0,
          width,
          height
        ); // 正确
        // ctx.drawImage(imgDOM, left, top, width, height, 0, 0, width, height) 错误，因为原始尺寸和真实尺寸不一致，不能拿来渲染
        // 将图片导出
        canvas.toBlob((blob) => {
          if (blob && imgFileInfo) {
            emit(
              "cutDown",
              new File([blob], imgFileInfo.name, {
                type: imgFileInfo.type,
                lastModified: imgFileInfo.lastModified,
              })
            );
          } else {
            emit("cutDown", null);
          }
          // 关闭模态框
          handleCloseBtn();
        });
      } else {
        props.otherError("画布上下文无法获取!");
        // 关闭模态框
        handleCloseBtn();
      }
    } else {
      // 请先上传图片!
      props.otherError("请先上传图片!");
    }
  });
};

// 关闭模态框
const handleCloseBtn = () => {
  handleReset();
  emit("closeModal");
};

// 激活或取消激活高亮放置区域
const toggleActive = () => (isInDropArea.value = !isInDropArea.value);

// 设置图片并进入裁剪状态
const handleToCutter = (data: File) => {
  // 检测图片的类型
  if (props.fileTypeCatch(data)) {
    // 创建图片本地url地址来预览图片
    const imgBlob = new Blob([data], { type: data.type });
    // 设置图片的信息
    imgFileInfo = {
      name: data.name,
      type: data.type,
      lastModified: data.lastModified,
    };
    imgUrl = URL.createObjectURL(imgBlob);
    // 显示裁剪图片
    isCutter.value = true;
  } else {
    // 文件上传类型检测出现错误，清空文件域
    if (fileInputDOM.value) {
      // @ts-ignore
      fileInputDOM.value.value = null;
    }
  }
};

// 文件域被修改
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    handleToCutter(target.files[0]);
  }
};

// 重置状态
const handleReset = () => {
  imgUrl = null;
  imgFileInfo = null;
  isCutter.value = false;
  cutterOffset.value.height = 100;
  cutterOffset.value.width = 100;
  cutterOffset.value.top = 0;
  cutterOffset.value.left = 0;
};

// 拖拽文件松手的回调
const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files[0]) {
    handleToCutter(e.dataTransfer.files[0]);
  }
  toggleActive();
};

// 上传文件
const handleUpload = () => fileInputDOM.value && fileInputDOM.value.click();

// 模态框非居中显隐出场动画
const modalAnimaNotCenter = (v: boolean, target: HTMLElement) => {
  if (v) {
    // 入场
    target.classList.add("modal-enter");
    timer = setTimeout(() => {
      target.classList.remove("modal-enter");
    }, ANIMA_TIME);
  } else {
    // 离场
    target.classList.add("modal-leave");
    timer = setTimeout(() => {
      target.classList.remove("modal-leave");
    }, ANIMA_TIME);
  }
};

// 模态框居中显隐出场动画
const modalAnimaCenter = (v: boolean, target: HTMLElement) => {
  if (v) {
    // 入场
    target.classList.add("modal-enter-center");
    timer = setTimeout(() => {
      target.classList.remove("modal-enter-center");
    }, ANIMA_TIME);
  } else {
    // 离场
    target.classList.add("modal-leave-center");
    timer = setTimeout(() => {
      target.classList.remove("modal-leave-center");
    }, ANIMA_TIME);
  }
};

// 模态框入离场动画
const handleModalAnima = (v: boolean) => {
  const target = modalDOM.value;
  if (target) {
    nextTick(() => {
      // 添加宏任务异步添加入场出场动画
      if (props.startLeft === null) {
        // 居中出现
        modalAnimaCenter(v, target);
      } else {
        // 非居中出现
        target.style.setProperty("--left", `${props.startLeft}px`);
        target.style.setProperty("--top", `${props.startTop}px`);
        modalAnimaNotCenter(v, target);
      }
    });
  }
};

// 暴露方法
defineExpose<ModalIns>({ handleReset, handleModalAnima });

// 取消动画定时器
onBeforeUnmount(() => timer !== null && clearTimeout(timer));
</script>

<style scoped lang="scss">
.img-cutter-container {
  --header-height: 45px;
  --footer-height: 45px;
  width: 80vw;
  height: 65vh;
  max-width: 800px;
  background-color: var(--cutter-modal-bg);
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  user-select: none;

  button {
    height: 33px;
    box-sizing: border-box;
    padding: 5px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .header {
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    .title {
      font-size: 18px;
    }

    .close-btn {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .main {
    height: calc(100% - var(--header-height) - var(--footer-height));

    > div {
      height: 100%;

      &.cutter-container {
        background-color: #000;
        display: flex;
        justify-content: center;

        .pre-img-container {
          position: relative;
          .pre-img {
            user-select: none;
            -webkit-user-drag: none;
            max-height: 100%;
            max-width: 100%;
          }
        }
      }

      &.upload-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .upload-cotent {
          width: 200px;
          height: 200px;
          border: 2px #eee dashed;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &.active {
            border-color: var(--cutter-primary-color);

            span {
              color: var(--cutter-primary-color);
            }
          }

          span {
            font-size: 50px;
            color: #eee;
          }

          &:hover {
            span {
              color: var(--cutter-primary-color);
            }

            border-color: var(--cutter-primary-color);
          }
        }

        .upload-input {
          display: none;
        }
      }
    }
  }

  .footer {
    height: var(--footer-height);
    display: flex;
    justify-content: end;
    align-items: center;

    button {
      color: var(--cutter-text-color);
      &:first-child {
        background-color: inherit;
        margin-right: 5px;
      }

      &.confirm {
        color: #fff;
        background-color: var(--cutter-primary-color);

        &:disabled {
          background-color: var(--cutter-primary-disable);
          cursor: not-allowed;
        }
      }
    }
  }
}

.modal-enter-center {
  animation: modalAnimaCenter 0.3s 1 ease-out;
}

.modal-leave-center {
  animation: modalAnimaCenter 0.3s 1 ease-out reverse;
}

.modal-enter {
  animation: modalAnima 0.3s 1 ease-out;
}

.modal-leave {
  animation: modalAnima 0.3s 1 ease-out reverse;
}

@keyframes modalAnima {
  from {
    position: absolute;
    left: var(--left);
    top: var(--top);
    transform-origin: top left;
    transform: scale(0.3);
    opacity: 0.5;
  }
  to {
    transform-origin: top left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes modalAnimaCenter {
  from {
    transform: scale(0.3);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
