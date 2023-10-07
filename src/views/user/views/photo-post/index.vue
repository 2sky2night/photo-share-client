<template>
  <div class="post-photo-page">
    <n-form
      ref="formIns"
      :show-require-mark="false"
      :rules="rules"
      :model="body">
      <n-form-item
        :label="$t('photoTitle')"
        path="title">
        <n-input
          maxlength="10"
          v-model:value="body.title"
          :placeholder="$t('pleaseEnter', { title: $t('photoTitle') })" />
      </n-form-item>
      <n-form-item
        :label="$t('photoDes')"
        path="content">
        <n-input
          type="textarea"
          maxlength="255"
          v-model:value="body.content"
          :placeholder="$t('pleaseEnter', { title: $t('photoDes') })" />
      </n-form-item>
      <n-form-item
        :label="$t('uploadPhotoList')"
        path="photos">
        <n-upload
          name="photo"
          @finish="onHandleFinish"
          @remove="onHandleRemoveFile"
          @before-upload="onHandleBeforeUpload"
          :headers="{ authorization: `Bearer ${token}` }"
          action="/api/file/upload/photo"
          v-model:file-list="fileList"
          list-type="image-card"
          ref="uploadIns">
          <n-text>{{ $t("uploadTips") }}</n-text>
        </n-upload>
      </n-form-item>
      <n-form-item :label="$t('tags')">
        <n-dynamic-tags
          v-model:value="tags"
          :max="5">
          <template #input="{ submit, deactivate }">
            <n-select
              size="small"
              @blur="deactivate"
              default-value="life"
              :options="[{ label: $t('life'), value: 'life' }]" />
          </template>
          <template #trigger="{ activate, disabled }">
            <n-button
              size="small"
              type="primary"
              dashed
              :disabled="disabled"
              @click="activate()">
              <template #icon>
                <n-icon>
                  <Add />
                </n-icon>
              </template>
              <n-text>{{ $t("add") }}</n-text>
            </n-button>
          </template>
        </n-dynamic-tags>
      </n-form-item>
      <div class="actions">
        <n-button
          class="mr-10"
          @click="onHandleReset"
          >{{ $t("reset") }}</n-button
        >
        <n-button
          type="primary"
          @click="onHandleSubmit"
          >{{ $t("confirm") }}</n-button
        >
      </div>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMessage, useDialog } from "naive-ui";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { Add } from "@vicons/ionicons5";
import { postPhotoAPI } from "@User/apis/photo";
import { i18n } from "@/config";
import type { FormInst, UploadFileInfo, FormRules, UploadInst } from "naive-ui";
import type { UploadPhotoResponse } from "@/apis/file/types";
import type { PostPhotoBody } from "@User/apis/photo/types";
import type { Response } from "@/utils/request/types";

// 用户的token
const { token } = storeToRefs(useUserStore());
// 照片的数据
const body = ref<PostPhotoBody>({ title: "", content: "", photos: [] });
// 表单实例
const formIns = ref<FormInst | null>(null);
// 上传照片的实例
const uploadIns = ref<UploadInst | null>(null);
// 照片文件列表
const fileList = ref<UploadFileInfo[]>([]);
// message
const message = useMessage();
// dialog
const dialog = useDialog();
// 上传的文件以及文件列表的url
const fileInfoList: { fileId: string; url: string }[] = [];
// 表单规则
const rules = computed<FormRules>(() => ({
  title: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("title"),
      }),
    },
    {
      min: 1,
      max: 10,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 10,
        min: 1,
        title: i18n.global.t("title"),
      }),
    },
  ],
  content: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: i18n.global.t("pleaseEnter", {
        title: i18n.global.t("content"),
      }),
    },
    {
      min: 1,
      max: 255,
      trigger: ["blur", "input"],
      message: i18n.global.t("fieldLengthError", {
        max: 255,
        min: 1,
        title: i18n.global.t("content"),
      }),
    },
  ],
  photos: [
    {
      validator(_, list: Array<string>) {
        if (list.length > 0 && list.length <= 10) {
          return true;
        } else {
          return new Error(i18n.global.t("photosLengthTips"));
        }
      },
    },
  ],
}));
// 正在加载
const isLoading = ref(false);
// 标签
const tags = computed(() => [
  i18n.global.t("life"),
  i18n.global.t("game"),
  i18n.global.t("sport"),
  i18n.global.t("food"),
  i18n.global.t("love"),
  i18n.global.t("workplace"),
]);

// 在上传文件之前校验文件
const onHandleBeforeUpload = ({ file: fileInfo }: { file: UploadFileInfo }) => {
  const file = fileInfo.file;
  if (file) {
    if (file.size > 1024 * 1024 * 10) {
      message.warning(i18n.global.t("fileSizeError"));
      return false;
    }
    if (file.type.includes("image") === false) {
      message.warning(i18n.global.t("fileTypeError"));
      return false;
    }
    return true;
  } else {
    message.warning(i18n.global.t("uploadFileFail"));
    return false;
  }
};

// 文件被移除的回调
const onHandleRemoveFile = ({
  file,
}: {
  file: UploadFileInfo;
  fileList: Array<UploadFileInfo>;
}) => {
  const index = fileInfoList.findIndex((ele) => ele.fileId === file.id);
  if (index !== -1) {
    fileInfoList.splice(index, 1);
    body.value.photos.splice(index, 1);
  }
};

// 文件上传成功的回调
const onHandleFinish = ({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) => {
  if (event && event.target) {
    const result: Response<UploadPhotoResponse> = JSON.parse(
      (event.target as any).response
    );
    // 记录用户上传的照片url和对应照片
    fileInfoList.push({ fileId: file.id, url: result.data });
    body.value.photos.push(result.data);
  }
};

// 确认提交?
const onHandleSubmit = async () => {
  try {
    formIns.value && (await formIns.value.validate());
    dialog.info({
      content: i18n.global.t("postPhotoTips"),
      positiveText: i18n.global.t("confirm"),
      negativeText: i18n.global.t("cancel"),
      title: i18n.global.t("tips"),
      onPositiveClick: submit,
    });
  } catch (error) {}
};

// 重置表单域
const onHandleReset = () => {
  formIns.value && formIns.value.restoreValidation();
  uploadIns.value && uploadIns.value.clear();
  body.value.content = "";
  body.value.title = "";
  body.value.photos.length = 0;
  fileInfoList.length = 0;
  fileList.value.length = 0;
};

// 提交照片
const submit = async () => {
  isLoading.value = true;
  await postPhotoAPI(body.value);
  isLoading.value = false;
  message.success(i18n.global.t("s_postPhoto"));
  // 重置表单域
  onHandleReset();
};

defineOptions({ name: "PostPhotoPage" });
</script>

<style scoped lang="scss">
.post-photo-page {
  padding: 10px 20px;
  padding-top: 30px;
  .actions {
    display: flex;
    justify-content: end;
  }
}
</style>
