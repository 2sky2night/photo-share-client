<template>
  <div class="admin-page">
    <div class="tags-actions-container mb-5">
      <create-tags @done="onHandleCreateTags" />
    </div>
    <tags-table ref="tagsTableInst" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CreateTags from "./components/create-tags/index.vue";
import TagsTable from "./components/tags-table/index.vue";
import type { TagsTableInst } from "./components/tags-table/types";

// 标签表格数据实例
const tagsTableInst = ref<TagsTableInst>();

// 增加标签的回调
const onHandleCreateTags = () => {
  // 重置页码，重新加载第一页数据
  tagsTableInst.value && tagsTableInst.value.resetTable();
};

defineOptions({
  name: "ManageTags",
});
</script>

<style scoped lang="scss">
.tags-actions-container {
  display: flex;
  padding:5px 10px;
}
</style>
