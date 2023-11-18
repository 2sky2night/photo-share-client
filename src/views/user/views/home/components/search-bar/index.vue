<template>
  <div class="search-bar-container">
    <div class="input-container">
      <n-input
        :placeholder="$t('searchInputTips')"
        :value="keywords"
        @keydown.enter="onHandleSearch"
        @update:value="onHandleUpdate" />
      <n-button
        type="primary"
        @click="onHandleSearch"
        :disabled="!keywords.length">
        {{ $t("search") }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useNavigator } from "@/hooks";

// 输入的内容
const keywords = ref("");
// 路由跳转
const {
  user: { goSearch },
} = useNavigator();

// 搜索的回调
const onHandleSearch = () => {
  if (keywords.value) goSearch(keywords.value);
};

// 输入框更新的回调
const onHandleUpdate = (value: string) => {
  keywords.value = value.trim();
};

defineOptions({
  name: "SearchBar",
});
</script>

<style scoped lang="scss">
.search-bar-container {
  margin: 0 20vw;
  transition: var(--time-normal);
  .input-container {
    display: flex;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 650px) {
  .search-bar-container {
    margin: 0 10px;
  }
}
</style>
