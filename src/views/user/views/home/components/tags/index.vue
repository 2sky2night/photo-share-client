<template>
  <div class="tags-container">
    <tags-item
      common
      class="mr-5"
      v-for="item in list"
      :key="item.tid"
      :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import tagsItem from "@User/components/item/tags-item/index.vue";
import { getPhotoTagsListAPI } from "@User/apis/photo";
import type { TagsBase } from "@/apis/photo/types";

// 列表项
const list = ref<TagsBase[]>([]);

onBeforeMount(async () => {
  const { data } = await getPhotoTagsListAPI({
    pageNum: 1,
    pageSize: 10,
    desc: false,
  });
  data.list.forEach((item) => list.value.push(item));
});

defineOptions({
  name: "Tags",
});
</script>

<style scoped lang="scss">
.tags-container {
  margin: 0 20vw;
  transition: var(--time-normal);
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 650px) {
  .tags-container {
    margin: 0 10px;
  }
}
</style>
