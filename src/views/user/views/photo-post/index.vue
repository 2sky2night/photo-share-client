<template>
  <div class="post-photo-page">
    <n-form>
      <n-form-item :label="$t('photoTitle')">
        <n-input
          v-model:value="body.title"
          :placeholder="$t('pleaseEnter', { title: $t('photoTitle') })" />
      </n-form-item>
      <n-form-item :label="$t('photoDes')">
        <n-input
          type="textarea"
          v-model:value="body.content"
          :placeholder="$t('pleaseEnter', { title: $t('photoDes') })" />
      </n-form-item>
      <n-form-item :label="$t('uploadPhotoList')">
        <n-upload
          name="photo"
          @finish=""
          @update:file-list="onHandleRemoveFile"
          @before-upload="onHandleBeforeUpload"
          :headers="{ authorization: `Bearer ${token}` }"
          action="/api/file/upload/photo"
          v-model:file-list="fileList"
          list-type="image-card">
          点击上传
        </n-upload>
      </n-form-item>
      <div class="actions">
        <n-button class="mr-10">{{ $t("reset") }}</n-button>
        <n-button type="primary">{{ $t("confirm") }}</n-button>
      </div>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { postPhotoAPI } from "@User/apis/photo";
import { i18n } from "@/config";
import type { FormInst, UploadFileInfo } from "naive-ui";
import type { PostPhotoBody } from "@User/apis/photo/types";

// 用户的token
const { token } = storeToRefs(useUserStore());
// 照片的数据
// title:1-20
// content:1-255
// photo:1-10
const body = ref<PostPhotoBody>({ title: "", content: "", photos: [] });
// 表单实例
const formIns = ref<FormInst | null>(null);
// 照片文件列表
const fileList = ref<UploadFileInfo[]>([]);
// message
const message = useMessage();

// 在上传文件之前
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

// 文件列表更新的回调
const onHandleRemoveFile = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> })=> {

}

// 文件上传成功的回调
const onHandleFinish = (options: { file: UploadFileInfo, event?: ProgressEvent }) => {

}

defineOptions({ name: "PostPhotoPage" });
</script>

<style scoped lang="scss">
.post-photo-page {
  padding: 10px 20px;
  .actions {
    display: flex;
    justify-content: end;
  }
}
</style>
