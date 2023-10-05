<template>
  <div class="password-edit-container">
    <n-form
      :show-require-mark="false"
      ref="formIns"
      :model="formData"
      :rules="rules">
      <n-form-item
        :label="$t('oldPassword')"
        path="oldPassword">
        <n-input
          type="password"
          :placeholder="$t('pleaseEnter', { title: $t('oldPassword') })"
          v-model:value="formData.oldPassword" />
      </n-form-item>
      <n-form-item
        :label="$t('newPassword')"
        path="newPassword">
        <n-input
          type="password"
          :placeholder="$t('pleaseEnter', { title: $t('newPassword') })"
          v-model:value="formData.newPassword" />
      </n-form-item>
      <n-form-item
        :label="$t('reNewPassword')"
        path="reNewPassword">
        <n-input
          type="password"
          :placeholder="$t('pleaseEnter', { title: $t('reNewPassword') })"
          v-model:value="formData.reNewPassword" />
      </n-form-item>
    </n-form>
    <div class="actions">
      <n-button
        class="mr-10"
        @click="onHandleReset">
        {{ $t("reset") }}
      </n-button>
      <n-button
        type="primary"
        @click="onHandleSubmit">
        {{ $t("confirm") }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage, useDialog,useDialogReactiveList } from "naive-ui";
import { useUserStore } from "@/store";
import { i18n } from "@/config";
import type { FormInst, FormRules } from "naive-ui";

// router
const router = useRouter();
// 用户仓库
const userStore = useUserStore();
// 密码
const formData = ref({
  oldPassword: "",
  newPassword: "",
  reNewPassword: "",
});
// 表单实例
const formIns = ref<FormInst | null>(null);
// 表单验证
const rules: FormRules = {
  oldPassword: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("oldPassword"),
      }),
    },
    {
      min: 6,
      max: 14,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 14,
        min: 6,
        title: i18n.global.t("oldPassword"),
      }),
    },
  ],
  newPassword: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("newPassword"),
      }),
    },
    {
      min: 6,
      max: 14,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 14,
        min: 6,
        title: i18n.global.t("newPassword"),
      }),
    },
  ],
  reNewPassword: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("reNewPassword"),
      }),
    },
    {
      min: 6,
      max: 14,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 14,
        min: 6,
        title: i18n.global.t("reNewPassword"),
      }),
    },
    {
      trigger: ["blur"],
      validator(_role, value: string) {
        if (value !== formData.value.newPassword) {
          return new Error(i18n.global.t("passwordNotEqual"));
        }
        return true;
      },
    },
  ],
};
// message
const message = useMessage();
// dialog
const dialog = useDialog();

// 确认提交?
const onHandleSubmit = async () => {
  // 校验表单
  formIns.value && (await formIns.value.validate());
  dialog.info({
    content: i18n.global.t("updatePasswordTips"),
    positiveText: i18n.global.t("confirm"),
    negativeText: i18n.global.t("cancel"),
    title: i18n.global.t("tips"),
    onPositiveClick: submit,
  });
};

// 发送请求更新密码
const submit = async () => {
  try {
    const { oldPassword, newPassword } = formData.value;
    await userStore.updateUserPassword({ password: newPassword, oldPassword });
    router.replace("/login");
    message.success(i18n.global.t("s_updatePassword"));
  } catch (error) {}
};

// 重置
const onHandleReset = () => {
  formIns.value && formIns.value.restoreValidation();
  formData.value.newPassword = "";
  formData.value.reNewPassword = "";
  formData.value.oldPassword = "";
};

defineOptions({ name: "PasswordEdit" });
</script>

<style scoped lang="scss">
.password-edit-container {
  padding: 20px;
  @media screen and (max-width: 650px) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    transform: translate(-50%, -50%);
  }
  .actions {
    display: flex;
    justify-content: end;
  }
}
</style>
