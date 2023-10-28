<template>
  <n-card>
    <template v-slot:header>{{ $t("editPofile") }}</template>
    <template v-slot:default>
      <n-form
        ref="formIns"
        :show-require-mark="false"
        :model="data"
        :rules="rules">
        <n-form-item
          :label="$t('username')"
          path="username">
          <n-input
            v-model:value="data.username"
            @update:value="onHandleChange" />
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
      <div class="footer">
        <n-button
          :loading="isLoading"
          :disabled="!canReset"
          @click="onHandleReset">
          {{ $t("cancel") }}
        </n-button>
        <n-button
          type="primary"
          class="ml-10"
          :loading="isLoading"
          @click="onHandleSubmit">
          {{ $t("confirm") }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMessage, useDialog } from "naive-ui";
import { useUserStore, useConfigStore } from "@/store";
import ImgCutter from "@/components/img-cutter/src/index.vue";
import { uploadAvatarAPI } from "@/apis/file";
import { i18n } from "@/config";
import type { FormInst, FormRules } from "naive-ui";
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
// 是否可以重置
const canReset = ref(false);
// message
const message = useMessage();
// dialog
const dialog = useDialog();
// 正在加载
const isLoading = ref(false);
// 表单实例
const formIns = ref<FormInst | null>(null);
// 表单规则
const rules = computed<FormRules>(() => ({
  username: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("username"),
      }),
    },
    {
      min: 1,
      max: 13,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 13,
        min: 1,
        title: i18n.global.t("username"),
      }),
    },
  ],
}));

// 打开裁剪框
const onHandleShowCutter = (e: MouseEvent) => {
  cutterInst.value && cutterInst.value.handleShowModal(e);
};

// 裁剪好的回调
const onHandleCutDown = async (file: File | null) => {
  if (file) {
    isLoading.value = true;
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await uploadAvatarAPI(formData);
    data.value.avatar = res.data;
    onHandleChange();
    isLoading.value = false;
  } else {
    message.warning(i18n.global.t("cutDownFail"));
  }
};

// 重置的回调
const onHandleReset = () => {
  data.value.avatar = userStore.userInfo.avatar;
  data.value.username = userStore.userInfo.username;
  canReset.value = false;
};

// 文件类型校验
const onHandleFileType = (data: File) => {
  if (data.size > 1024 * 1024 * 10) {
    message.warning(i18n.global.t("fileSizeError"));
    return false;
  }
  if (!data.type.includes("image")) {
    message.warning(i18n.global.t("fileTypeError"));
    return false;
  }
  return true;
};

// 裁剪图片组件中出现错误的回调
const onHandleErrorCatch = () => {
  message.warning(i18n.global.t("cutDownFail"));
};

// 检测到用户信息有更新了
const onHandleChange = () => {
  canReset.value = true;
};

// 确认修改?
const onHandleSubmit = async () => {
  if (formIns.value) {
    try {
      await formIns.value.validate();
      dialog.info({
        content: i18n.global.t("updateInfoTips"),
        positiveText: i18n.global.t("confirm"),
        negativeText: i18n.global.t("cancel"),
        title: i18n.global.t("tips"),
        onPositiveClick: submit,
      });
    } catch (error) {}
  }
};

// 确认更新的回调
const submit = async () => {
  isLoading.value = true;
  try {
    await userStore.updateUserInfo({
      username: data.value.username,
      avatar: data.value.avatar as string,
    });
    message.success(i18n.global.t("s_updateInfo"));
  } catch (error) {}
  isLoading.value = false;
};

defineOptions({ name: "EditInfo" });
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: end;
}
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
