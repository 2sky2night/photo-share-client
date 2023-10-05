<template>
  <div
    class="img-cutter-trigger"
    @click="handleShowModal" v-if="needTrigger">
    <slot name="default">
      <button>裁剪图片</button>
    </slot>
  </div>
  <teleport to="body">
    <div
      class="img-cutter-mask"
      @click="handleUnShowModal"
      v-show="isShowModal">
      <cutter-modal
        :modal-class="modalClass"
        :start-left="triggerOffset.left"
        :start-top="triggerOffset.right"
        :other-error="otherError"
        :file-type-catch="fileTypeCatch"
        ref="modalIns"
        @cutDown="handleCutDown"
        @close-modal="handleUnShowModal"></cutter-modal>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, nextTick } from "vue";
import CutterModal from "./components/modal.vue";
import type { ModalIns, ImgCutterIns } from "./types";

// props
withDefaults(
  defineProps<{
    /**
     * 文件类型检测的回调 返回布尔值代表类型校验成功或失败
     */
    fileTypeCatch?: (data: File) => any;
    /**
     * 其他出错回调
     */
    otherError?: (reason: any) => any;
    /**
     * 按钮主色
     */
    primaryColor?: string;
    /**
     * 禁用按钮主色
     */
    primaryDisColor?: string;
    /**
     * 模态框class
     */
    modalClass?: string;
    /**
     * 需要默认触发器?
     */
    needTrigger?: boolean;
  }>(),
  {
    fileTypeCatch: (data: File) => {
      if (data.type.includes("image")) {
        return true;
      } else {
        console.error("上传的文件类型出错!");
        return false;
      }
    },
    otherError: (reason: any) => {
      console.error(reason);
    },
    primaryColor: "#409eff",
    primaryDisColor: "#6ba9e7",
    modalClass: "",
    needTrigger:true
  }
);
// emit
const emit = defineEmits<{
  (e: "update:showModal", value: boolean): void;
  (e: "cutDown", file: File | null): void;
}>();
// 触发器元素的偏移量
const triggerOffset: Record<string, null | number> = { left: 0, right: 0 };
// 模态框实例
const modalIns = ref<ModalIns | null>(null);
// 是否显示模态框
const isShowModal = ref(false);
// 定时器
let timer: any | null = null;

// 显示模态框
const handleShowModal = (e?: MouseEvent) => {
  // 设置初始模态框弹出的位置
  triggerOffset.left = e ? e.clientX : null;
  triggerOffset.right = e ? e.clientY : null;
  nextTick(() => {
    // 执行进场动画
    isShowModal.value = true;
    modalIns.value && modalIns.value.handleModalAnima(true);
    emit("update:showModal", true);
  })
};

// 关闭模态框
const handleUnShowModal = () => {
  if (modalIns.value) {
    // 执行离场动画
    modalIns.value.handleModalAnima(false);
    // 重置裁剪框组件相关数据
    modalIns.value.handleReset();
  }
  timer = setTimeout(() => {
    isShowModal.value = false;
    emit("update:showModal", false);
    timer = null;
  }, 255);
};

// 裁剪好的回调
const handleCutDown = (file: File | null) => {
  emit("cutDown", file);
};

// 取消定时器
onBeforeUnmount(() => timer !== null && clearTimeout(timer));

defineExpose<ImgCutterIns>({ handleShowModal, handleUnShowModal });
</script>

<script lang="ts">
export default {
  name: "ImgCutter",
};
</script>

<style scoped lang="scss">
.img-cutter-trigger {
  display: inline-block;
  --cutter-primary-color: v-bind($props.primaryColor);
  --cutter-primary-disable: v-bind($props.primaryDisColor);
  button {
    height: 33px;
    box-sizing: border-box;
    padding: 5px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    background-color: var(--cutter-primary-color);
  }
}

.img-cutter-mask {
  --cutter-primary-color: v-bind($props.primaryColor);
  --cutter-primary-disable: v-bind($props.primaryDisColor);
  position: fixed;
  z-index: 9999;
  background-color: #00000064;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
