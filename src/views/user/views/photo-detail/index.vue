<template>
  <div class="detail-page">
    <template v-if="pid !== null">
      <photo-info :pid="pid"></photo-info>
      <comment
        class="mt-10"
        :pid="pid"></comment>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { useParams } from "@/hooks";
import PhotoInfo from "./components/info/index.vue";
import comment from "./components/comment/index.vue";
import i18n from "@/config/i18n";

const router = useRouter();
const pid = ref<number | null>(null);
const message = useMessage();

useParams<{ pid: number }>(
  (result) => {
    pid.value = result.pid;
  },
  ([key]) => {
    message.warning(i18n.global.t("paramsError_", { title: key }));
    router.replace("/");
  }
);

defineOptions({
  name: "DetailPage",
});
</script>

<style scoped lang="scss">
.detail-page {
  box-sizing: border-box;
  padding: 10px;
}
@media screen and (max-width: 650px) {
  .detail-page {
    // 留给底部菜单栏的安全空间
    padding-bottom: 100px;
  }
}
</style>
