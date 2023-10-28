<template>
  <div class="password-container">
    <n-card>
      <template v-slot:header>{{ $t("editPassword") }}</template>
      <template v-slot:default>
        <n-form
          ref="formIns"
          :show-require-mark="false"
          :model="data"
          :rules="rules">
          <n-form-item
            path="oldPassword"
            :label="$t('oldPassword')">
            <n-input
              type="password"
              :placeholder="$t('pleaseEnter', { title: $t('oldPassword') })"
              v-model:value="data.oldPassword" />
          </n-form-item>

          <n-form-item
            path="password"
            :label="$t('password')">
            <n-input
              type="password"
              :placeholder="$t('pleaseEnter', { title: $t('password') })"
              v-model:value="data.password" />
          </n-form-item>

          <n-form-item
            path="rePassword"
            :label="$t('rePassword')">
            <n-input
              type="password"
              :placeholder="$t('pleaseEnter', { title: $t('rePassword') })"
              v-model:value="data.rePassword" />
          </n-form-item>
        </n-form>
      </template>
      <template v-slot:footer>
        <div class="footer">
          <n-button
            :loading="isLoading"
            @click="onHandleReset">
            {{ $t("reset") }}
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useDialog, useMessage } from "naive-ui";
import { i18n } from "@/config";
import { useUserStore } from "@/store";
import { FormInst, FormRules } from "naive-ui";

// 路由对象
const router = useRouter();
// 用户仓库
const userStore = useUserStore();
// 正在加载
const isLoading = ref(false);
// 表单数据
const data = ref({
  password: "",
  oldPassword: "",
  rePassword: "",
});
// 表单规则
const rules = computed<FormRules>(() => ({
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
  password: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("password"),
      }),
    },
    {
      min: 6,
      max: 14,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 14,
        min: 6,
        title: i18n.global.t("password"),
      }),
    },
  ],
  rePassword: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("password"),
      }),
    },
    {
      min: 6,
      max: 14,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 14,
        min: 6,
        title: i18n.global.t("password"),
      }),
    },
    {
      trigger: ["blur"],
      validator(_role, value: string) {
        if (value !== data.value.password) {
          return new Error(i18n.global.t("passwordNotEqual"));
        }
        return true;
      },
    },
  ],
}));
// 表单实例
const formIns = ref<FormInst | null>(null);
// message
const message = useMessage();
// dialog
const dialog = useDialog();

// 重置表单
const onHandleReset = () => {
  data.value.password = "";
  data.value.oldPassword = "";
  data.value.rePassword = "";
  formIns.value && formIns.value.restoreValidation();
};

// 确认更新的回调?
const onHandleSubmit = async () => {
  if (formIns.value) {
    await formIns.value.validate();
    dialog.info({
      content: i18n.global.t("updatePasswordTips"),
      positiveText: i18n.global.t("confirm"),
      negativeText: i18n.global.t("cancel"),
      title: i18n.global.t("tips"),
      onPositiveClick: submit,
    });
  }
};

// 更新的回调
const submit = async () => {
  isLoading.value = true;
  try {
    await userStore.updateUserPassword({
      password: data.value.password,
      oldPassword: data.value.oldPassword,
    });
    router.replace("/login");
    message.success(i18n.global.t("s_updatePassword"));
  } catch {
    onHandleReset();
  }
  isLoading.value = false;
};

defineOptions({ name: "EditPassword" });
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: end;
}
</style>
