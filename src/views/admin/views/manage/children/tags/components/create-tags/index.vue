<template>
  <n-button
    type="primary"
    @click="onToggleShow"
    >{{ $t("createTags") }}</n-button
  >
  <n-modal
    v-model:show="showModal"
    :on-after-leave="onHandleCancel">
    <n-card
      style="width: 80vw; max-width: 600px"
      size="huge"
      role="dialog"
      aria-modal="true"
      :title="$t('createTags')"
      :bordered="false">
      <template #header-extra>
        <n-icon
          class="pointer text-hover"
          :size="20"
          @click="onToggleShow">
          <close />
        </n-icon>
      </template>
      <template #default>
        <n-form
          ref="formInst"
          :model="tagsData"
          :rules="formRules">
          <n-form-item
            :label="$t('tagsNameZH')"
            path="nameZH">
            <n-input
              v-model:value="tagsData.nameZH"
              :placeholder="
                $t('pleaseEnter', {
                  title: $t('tagsNameZH'),
                })
              " />
          </n-form-item>
          <n-form-item
            :label="$t('tagsNameEN')"
            path="nameEN">
            <n-input
              v-model:value="tagsData.nameEN"
              :placeholder="
                $t('pleaseEnter', {
                  title: $t('tagsNameEN'),
                })
              " />
          </n-form-item>
          <n-form-item
            :label="$t('descZH')"
            path="descriptionZH">
            <n-input
              v-model:value="tagsData.descriptionZH"
              :placeholder="
                $t('pleaseEnter', {
                  title: $t('descZH'),
                })
              " />
          </n-form-item>
          <n-form-item
            :label="$t('descEN')"
            path="descriptionEN">
            <n-input
              v-model:value="tagsData.descriptionEN"
              :placeholder="
                $t('pleaseEnter', {
                  title: $t('descEN'),
                })
              " />
          </n-form-item>
        </n-form>
      </template>
      <template #footer>
        <div class="footer-container">
          <n-button @click="onHandleCancel">
            {{ $t("reset") }}
          </n-button>
          <n-button
            class="ml-5"
            type="primary"
            @click="onHandleSubmit">
            {{ $t("confirm") }}
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Close } from "@vicons/ionicons5";
import { createTagsAPI } from "@Admin/apis/photo";
import { useMessage } from "naive-ui";
import { i18n } from "@/config";
import type { TagsActionsEmits } from "./types";
import type { CreateTagsBody } from "@Admin/apis/photo/types";
import type { FormInst } from "naive-ui";

// emits
const emit = defineEmits<TagsActionsEmits>();
// 创建标签的数据
const tagsData = ref<CreateTagsBody>({
  nameZH: "",
  nameEN: "",
  descriptionZH: "",
  descriptionEN: "",
});
// 控制模态框显隐
const showModal = ref(false);
// 表单实例
const formInst = ref<FormInst | null>(null);
// 表单规则
const formRules = computed(() => {
  return {
    nameZH: [
      {
        required: true,
        trigger: ["blur", "input"],
        message: i18n.global.t("pleaseEnter", {
          title: i18n.global.t("tagsNameZH"),
        }),
      },
      {
        min: 1,
        max: 20,
        trigger: ["blur", "input"],
        message: i18n.global.t("fieldLengthError", {
          max: 20,
          min: 1,
          title: i18n.global.t("tagsNameZH"),
        }),
      },
    ],
    nameEN: [
      {
        required: true,
        trigger: ["blur", "input"],
        message: i18n.global.t("pleaseEnter", {
          title: i18n.global.t("tagsNameEN"),
        }),
      },
      {
        min: 1,
        max: 30,
        trigger: ["blur", "input"],
        message: i18n.global.t("fieldLengthError", {
          max: 30,
          min: 1,
          title: i18n.global.t("tagsNameEN"),
        }),
      },
    ],
    descriptionZH: [
      {
        required: false,
        trigger: ["blur", "input"],
        message: i18n.global.t("pleaseEnter", {
          title: i18n.global.t("descZH"),
        }),
      },
      {
        min: 1,
        max: 100,
        trigger: ["blur", "input"],
        message: i18n.global.t("fieldLengthError", {
          max: 100,
          min: 1,
          title: i18n.global.t("descZH"),
        }),
      },
    ],
    descriptionEN: [
      {
        required: false,
        trigger: ["blur", "input"],
        message: i18n.global.t("pleaseEnter", {
          title: i18n.global.t("descEN"),
        }),
      },
      {
        min: 1,
        max: 100,
        trigger: ["blur", "input"],
        message: i18n.global.t("fieldLengthError", {
          max: 100,
          min: 1,
          title: i18n.global.t("descEN"),
        }),
      },
    ],
  };
});
// message
const message = useMessage();

// 提交
const onHandleSubmit = async () => {
  if (formInst.value) {
    await formInst.value.validate();
    try {
      const { nameZH, nameEN, descriptionZH, descriptionEN } = tagsData.value;
      const data: CreateTagsBody = {
        nameZH,
        nameEN,
      };
      if (descriptionZH) data.descriptionZH = descriptionZH;
      if (descriptionEN) data.descriptionEN = descriptionEN;
      await createTagsAPI(data);
      message.success(i18n.global.t("s_createTags"));
      emit("done");
    } finally {
      onToggleShow();
    }
  } else {
    message.warning(i18n.global.t("actionError"));
    onToggleShow();
  }
};

// 重置表单数据以及表单状态
const onHandleCancel = () => {
  formInst.value && formInst.value.restoreValidation();
  onHandleReset();
};

// 重置表单数据
const onHandleReset = () => {
  tagsData.value.nameZH = "";
  tagsData.value.nameEN = "";
  tagsData.value.descriptionZH = "";
  tagsData.value.descriptionEN = "";
};

// 点击显隐创建标签模态框
const onToggleShow = () => {
  showModal.value = !showModal.value;
};

defineOptions({
  name: "CreateTags",
});
</script>

<style scoped lang="scss">
.footer-container {
  display: flex;
  justify-content: end;
}
</style>
