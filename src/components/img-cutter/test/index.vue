<template>
  <ImgCutter
    ref="ins"
    @cut-down="handleCutDown"
    is-dark
    :file-type-catch="handleTypeCatch"></ImgCutter>
  <button @click="handleClick">点我弹出模态框</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ImgCutter from "../src/index.vue";
import type { ImgCutterIns } from "../src/types";

const ins = ref<ImgCutterIns | null>(null);

const handleCutDown = (file: File | null) => {
  console.log(file);
};

const handleTypeCatch = (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    alert("false");
    return false;
  } else {
    return true;
  }
};

const handleClick = () => {
  ins.value && ins.value.handleShowModal();
};

defineOptions({ name: "TestImgCutter" });
</script>
