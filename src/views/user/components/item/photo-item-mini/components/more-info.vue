<template>
  <n-card
    class="photo-info-container"
    style="width: 80vw; max-width: 600px"
    :bordered="false"
    role="dialog"
    aria-modal="true">
    <template #header>
      <span class="modal-title">{{ i18n.global.t("photoInfo") }}</span>
    </template>
    <template #header-extra>
      <n-icon
        size="20"
        @click="onHandleCloseModal"
        ><close
      /></n-icon>
    </template>
    <template #default>
      <div class="content">
        <div class="title mb-10">{{ photo.title }}</div>
        <n-ellipsis
          class="desc"
          :line-clamp="3"
          :tooltip="false"
          >{{ photo.content }}</n-ellipsis
        >
        <n-carousel
          show-arrow
          class="mb-10">
          <div
            class="item"
            v-for="item in photo.photos">
            <img :src="config.IMG_BASE_URL + item.url" />
          </div>
        </n-carousel>
        <div class="more-info">
          <div class="publish-time mr-10">
            <span>{{ i18n.global.t("publishTime") }}：</span>
            <time-format
              :time-str="photo.createdAt"
              :sub="false"></time-format>
          </div>
          <div class="audit-time mr-10">
            <span>{{ i18n.global.t("auditTime") }}：</span>
            <time-format
              v-if="photo.audit_time"
              :time-str="photo.audit_time"
              :sub="false" />
            <span v-else>--</span>
          </div>
          <div class="audit-result">
            <span>{{ i18n.global.t("auditStatus") }}：</span>
            <span>{{ stauts }}</span>
          </div>
        </div>
        <div class="audit-desc">
          <span>{{ i18n.global.t("auditDesc") }}：</span>
          <span v-if="photo.audit_desc">{{ photo.audit_desc }}</span>
          <span v-else>--</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <n-button
          type="primary"
          size="small"
          @click="onHandleCloseModal"
          >{{ i18n.global.t("close") }}</n-button
        >
      </div>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { useAudit } from "@/hooks";
import TimeFormat from "@/components/time/index.vue";
import { NCard, NButton, NCarousel, NEllipsis } from "naive-ui";
import { Close } from "@vicons/ionicons5";
import { i18n } from "@/config";
import { config } from "@/config";
import type { Photo } from "@/apis/photo/types";

// props
const props = defineProps<{
  photo: Photo;
}>();
// emit
const emit = defineEmits<{
  close: [];
}>();
// 审核状态
const stauts = useAudit(props.photo.status);

// 关闭模态框
const onHandleCloseModal = () => emit("close");
</script>

<style scoped lang="scss">
.photo-info-container {
  background-color: var(--bg-color-1);
  color: var(--text-color-1);
  .modal-title {
    color: var(--text-color-1);
  }
  i {
    cursor: pointer;
  }
  .content {
    .title {
      font-size: 15px;
      font-weight: 600;
    }
    :deep(.n-carousel) {
      height: 30vw;
      min-height: 200px;
      max-height: 350px;
      .item {
        width: 100%;
        height: 100%;
        background-color: var(--bg-color-3);
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .more-info {
      display: flex;
      flex-wrap: wrap;
    }
    @media screen and (max-width: 650px) {
      font-size: 13px;
    }
  }
  .footer {
    display: flex;
    justify-content: end;
  }
}
</style>
