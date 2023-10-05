<template>
  <div class="info-edit-container">
    <n-form>
      <n-form-item
        :label="$t('avatar')"
        class="avatar-form"
        @click="onHandleShowModal">
        <avatar
          :src="userInfo.avatar"
          class="big"></avatar>
        <avatar
          :src="userInfo.avatar"
          class="medium"></avatar>
        <avatar
          :src="userInfo.avatar"
          class="small"></avatar>
      </n-form-item>
      <n-form-item :label="$t('username')">
        <n-input
          v-model:value="userInfo.username"
          maxlength="13"
          minlength="1" />
      </n-form-item>
      <n-form-item :label="$t('des')">
        <n-input
          :value="$t('userDescDefault')"
          type="textarea"
          :placeholder="$t('pleaseEnter', { title: $t('des') })" />
      </n-form-item>
      <n-form-item :label="$t('sex')">
        <n-radio-group :value="userInfo.sex">
          <n-radio
            v-for="item in sexList"
            :key="item.value"
            :value="item.value"
            :label="item.label" />
        </n-radio-group>
      </n-form-item>
    </n-form>
    <div class="actions">
      <n-button @click="onHandleReset">{{ $t("reset") }}</n-button>
      <n-button
        @click="onHandleSubmit"
        type="primary"
        class="ml-10"
        :loading="isLoading">
        {{ $t("confirm") }}
      </n-button>
    </div>
    <img-cutter
      primary-color="#18a058"
      primary-dis-color="#4ec887"
      modal-class="cutter-modal"
      ref="cutterIns"
      :need-trigger="false"
      :other-error="onHandleCutError"
      :file-type-catch="onHandleUpload"
      @cut-down="onHandleCutDown" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { useMessage, useDialog } from "naive-ui";
import ImgCutter from "@/components/img-cutter/src/index.vue";
import { uploadAvatarAPI } from "@/apis/file";
import type { ImgCutterIns } from "@/components/img-cutter/src/types";
import { i18n } from "@/config";

// 仓库
const userStore = useUserStore();
// 源用户信息
const { userInfo: _userInfo } = storeToRefs(userStore);
// 待修改的用户信息
const userInfo = ref({
  avatar: _userInfo.value.avatar as null | string,
  username: _userInfo.value.username,
  sex: 1,
});
// dialog
const dialog = useDialog();
// imgCutter实例
const cutterIns = ref<ImgCutterIns | null>(null);
// message
const message = useMessage();
// 弹出模态框
const onHandleShowModal = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName.toLocaleLowerCase() === "img") {
    cutterIns.value && cutterIns.value.handleShowModal(e);
  }
};
// 性别选择列表
const sexList = computed(() => [
  {
    label: i18n.global.t("man"),
    value: 1,
  },
  {
    label: i18n.global.t("woman"),
    value: 2,
  },
  {
    label: i18n.global.t("secrecy"),
    value: 0,
  },
]);
const isLoading = ref(false);

// 裁剪好的回调
const onHandleCutDown = async (file: File | null) => {
  if (file) {
    const src = await onHandleUploadAvatar(file);
    // 最好直接把本地文件通过img标签展示出来，否则又要发送一次请求
    userInfo.value.avatar = src;
  } else {
    onHandleCutError();
  }
};

// 裁剪出错的回调
const onHandleCutError = () => {
  message.warning(i18n.global.t("cutDownFail"));
};

// 图片选择成功的回调
const onHandleUpload = (file: File) => {
  if (file.type.includes("image") === false) {
    // 上传的非图片类型的文件
    message.warning(i18n.global.t("fileTypeError"));
    return false;
  }
  if (file.size > 1024 * 1024 * 10) {
    // 文件大于10mb
    message.warning(i18n.global.t("fileSizeError"));
    return false;
  }
  return true;
};

// 上传头像
const onHandleUploadAvatar = async (file: File) => {
  isLoading.value = true;
  const data = new FormData();
  data.append("avatar", file);
  const result = await uploadAvatarAPI(data);
  isLoading.value = false;
  return result.data;
};

// 确认更新用户信息的回调?
const onHandleSubmit = () => {
  dialog.info({
    content: i18n.global.t("updateInfoTips"),
    positiveText: i18n.global.t("confirm"),
    negativeText: i18n.global.t("cancel"),
    title: i18n.global.t("tips"),
    onPositiveClick: submit,
  });
};

// 发送请求更新用户信息
const submit = async () => {
  isLoading.value = true;
  const { username, avatar } = userInfo.value;
  const body: Partial<Record<"username" | "avatar", string>> = {};
  if (username !== _userInfo.value.username) {
    // 有变化了，说明修改了用户名称
    body.username = username;
  }
  if (avatar !== null && avatar !== _userInfo.value.avatar) {
    // 有变化且不为null，说明修改用户头像
    body.avatar = avatar;
  }
  // 发送请求，更新仓库中的用户信息
  await userStore.updateUserInfo(body);
  message.success(i18n.global.t("s_updateInfo"));
  isLoading.value = false;
};

// 重置
const onHandleReset = () => {
  userInfo.value.avatar = _userInfo.value.avatar as null | string;
  userInfo.value.username = _userInfo.value.username;
};

defineOptions({ name: "InfoEdit" });
</script>

<style scoped lang="scss">
.info-edit-container {
  padding: 10px;
  .avatar-form {
    .n-avatar {
      margin-right: 30px;
      align-self: end;
      cursor: pointer;
      &.big {
        width: 150px;
        height: 150px;
      }
      &.small {
        width: 60px;
        height: 60px;
      }
      &.medium {
        width: 100px;
        height: 100px;
      }
      @media screen and (max-width: 650px) {
        margin-right: 10px;
        &.big {
          width: 100px;
          height: 100px;
        }
        &.medium {
          width: 60px;
          height: 60px;
        }
        &.small {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .actions {
    display: flex;
    justify-content: end;
  }
}
</style>
