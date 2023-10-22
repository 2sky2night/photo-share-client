<template>
  <n-card>
    <template v-slot:header>{{ $t("editPofile") }}</template>
    <template v-slot:default>
      <n-form>
        <n-form-item :label="$t('username')">
          <n-input v-model:value="data.username"></n-input>
        </n-form-item>
        <n-form-item :label="$t('avatar')">
          <div class="avatar-list">
            <avatar
              @click="onHandleShowCutter"
              :src="(data.avatar as any)"
              :size="80"
              class="mr-10" />
            <avatar
              @click="onHandleShowCutter"
              :src="(data.avatar as any)"
              :size="50"
              class="mr-10" />
            <avatar
              @click="onHandleShowCutter"
              :src="(data.avatar as any)"
              :size="30" />
          </div>
          <img-cutter
            primary-color="#18a058"
            primary-dis-color="#4ec887"
            ref="cutterInst"
            :other-error="onHandleErrorCatch"
            :file-type-catch="onHandleFileType"
            :is-dark="configStore.isDark"
            :need-trigger="false"
            @cut-down="onHandleCutDown" />
        </n-form-item>
      </n-form>
    </template>
    <template v-slot:footer>
      <n-button>取消</n-button>
      <n-button>确认</n-button>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore, useConfigStore } from "@/store";
import ImgCutter from "@/components/img-cutter/src/index.vue";
import { uploadAvatarAPI } from "@/apis/file";
import type { ImgCutterIns } from "@/components/img-cutter/src/types";

// 用户仓库
const userStore = useUserStore();
// 配置仓库
const configStore = useConfigStore();
// 裁剪框实例
const cutterInst = ref<ImgCutterIns | null>(null);
// 数据
const data = ref({
  username: userStore.userInfo.username,
  avatar: userStore.userInfo.avatar,
});

// 打开裁剪框
const onHandleShowCutter = (e: MouseEvent) => {
  cutterInst.value && cutterInst.value.handleShowModal(e);
};

// 裁剪好的回调
const onHandleCutDown = async (file: File | null) => {
  if (file) {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await uploadAvatarAPI(formData);
    data.value.avatar = res.data;
  }
};

// 文件类型校验
const onHandleFileType = (data: File) => {
  return true;
};

// 裁剪图片组件中出现错误的回调
const onHandleErrorCatch = (error: any) => {};

defineOptions({ name: "EditInfo" });
</script>

<style scoped lang="scss">
.avatar-list {
  display: flex;
  align-items: center;
  :deep(.n-avatar) {
    cursor: pointer;
    &:nth-child(1) {
      width: 120px;
      height: 120px;
    }
    &:nth-child(2) {
      width: 80px;
      height: 80px;
    }
    &:nth-child(3) {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
