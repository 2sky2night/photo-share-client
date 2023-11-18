<template>
  <div class="about-container">
    <div class="item">
      <div class="title">
        <n-icon
          size="25"
          class="mr-5">
          <info-icon></info-icon>
        </n-icon>
        <span>介绍</span>
      </div>
      <div class="info">
        PhotoShare,是一个分享照片的平台,用户可以随时随地分享自己的生活状态。
      </div>
    </div>
    <div class="item">
      <div class="title">
        <n-icon
          size="25"
          class="mr-5">
          <stack-icon></stack-icon>
        </n-icon>
        <span>技术栈</span>
      </div>
      <div class="info">
        后端:Nest.js+mysql+sequelize
        <br />
        前端:Vue.js+naive-ui+ts+sass
      </div>
    </div>
    <div class="item">
      <div class="title">
        <n-icon
          size="25"
          class="mr-5">
          <github-icon />
        </n-icon>
        <span>Github</span>
      </div>
      <div class="info">
        后端:<a
          href="https://github.com/2sky2night/photo-share-server"
          target="_blank"
          >https://github.com/2sky2night/photo-share-server</a
        >
        <br />
        前端:<a
          href="https://github.com/2sky2night/photo-share-client"
          target="_blank"
          >https://github.com/2sky2night/photo-share-client</a
        >
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Github as GithubIcon } from "@vicons/fa";
import {
  AppFolder24Filled as StackIcon,
  Info24Filled as InfoIcon,
} from "@vicons/fluent";

defineOptions({
  name: "About",
});
</script>

<style scoped lang="scss">
.about-container {
  .item {
    margin-bottom: 10px;
    .title {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
}
</style>
