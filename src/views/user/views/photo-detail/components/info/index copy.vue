<template>
  <div class="photo-info-container">
    <template v-if="info">
      <!--650px下竖着展示图片-->
      <template v-if="isMoblie">
        <div class="img-list">
          <img-lazy :class="{ 'active': index === 0 && isFinish }" @img-load="() => onHandleLoad(index)"
            v-for="(item, index) in info.photos" :url="'http://127.0.0.1:3000' + item.url" />
        </div>
        <div class="info-container-pe" @click="onHandleToggleInfo" :class="{ 'active': isShow }">
          <div class="drag-tips mb-5">
            <div class="tips"></div>
          </div>
          <div class="title mb-5">{{ info.title }}</div>
          <div :class="{ 'desc-el': !isShow }" class="desc mb-5">{{ info.content }}</div>
          <div class="user mb-5">
            <avatar
              src="https://sns-avatar-qc.xhscdn.com/avatar/62d0c5698c90547df06c3caa.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip">
            </avatar>
            <span class="ml-5">{{ info.user.username }}</span>
          </div>
          <div class="data">
            <div class="like mr-10">
              <n-icon>
                <HeartOutlined />
              </n-icon>
              <span class="ml-5">{{ info.like_count }}</span>
            </div>
            <div class="view">
              <n-icon>
                <EyeRegular />
              </n-icon>
              <span class="ml-5">{{ info.views }}</span>
            </div>
          </div>
          <div class="like-btn">
            <like-btn :size="30" v-model:like-count="info.like_count" :pid="info.pid"
              v-model:is-liked="info.is_liked"></like-btn>
          </div>
        </div>
      </template>
      <!--650px以上通过轮播图的方式展示图片-->
      <template v-else>
        <n-carousel class="mb-10">
          <img-lazy class="carousel-img" :class="{ 'active': index === 0 && isFinish }"
            @img-load="() => onHandleLoad(index)" v-for="(item, index) in info.photos"
            :url="'http://127.0.0.1:3000' + item.url" />
        </n-carousel>
        <div class="info_container_pc">
          <div class="title mb-10">{{ info.title }}</div>
          <div class="user mb-10">
            <!-- <avatar :src="info.user.avatar" :size="35"></avatar> -->
            <avatar
              src="https://sns-avatar-qc.xhscdn.com/avatar/62d0c5698c90547df06c3caa.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip">
            </avatar>
            <span class="ml-5">{{ info.user.username }}</span>
          </div>
          <div class="desc mb-10">{{ info.content }}</div>
          <div class="data">
            <div class="like mr-10">
              <n-icon>
                <HeartOutlined />
              </n-icon>
              <span class="ml-5">{{ info.like_count }}</span>
            </div>
            <div class="view">
              <n-icon>
                <EyeRegular />
              </n-icon>
              <span class="ml-5">{{ info.views }}</span>
            </div>
          </div>
          <div class="like-btn">
            <like-btn :size="30" v-model:like-count="info.like_count" :pid="info.pid"
              v-model:is-liked="info.is_liked"></like-btn>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <!--加载中-->
      <template v-if="isMoblie">
        <skeleton height="300px"></skeleton>
        <skeleton height="300px"></skeleton>
        <skeleton height="300px"></skeleton>
      </template>
      <skeleton v-else height="500px"></skeleton>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useMobile } from '@/hooks'
import { getPhotoDetailAPI } from '@User/apis/photo'
import LikeBtn from '@User/components/like-photo-btn/index.vue'
import { EyeRegular } from '@vicons/fa'
import { HeartOutlined } from '@vicons/antd'
import avatar from '@/components/public/avatar/index.vue'
import type { Photo } from '@/apis/photo/types';
import { pubsub } from '@/utils';

// props
const props = defineProps<{ pid: number }>()
// 数据
const info = ref<Photo | null>(null)
// 第一张图片加载完成
const isFinish = ref(false)
// 是否为小屏幕
const { isMoblie } = useMobile()
// pe:是否显示照片详情信息
const isShow = ref(false)

// pe:查看照片详情信息
const onHandleToggleInfo = () => {
  isShow.value = !isShow.value
}

// 获取数据
const onHandleGetData = async () => {
  const res = await getPhotoDetailAPI(props.pid)
  info.value = res.data
}

// 监听图片加载完成的回调
const onHandleLoad = (index: number) => {
  if (isFinish.value) return
  // 若第一张图片加载完成，卸载预览图片
  if (!index) {
    // 至少等进场动画效果执行完毕再卸载
    setTimeout(() => {
      isFinish.value = true
      pubsub.emit('user:img-transition')
      // 离场动画执行完成卸载事件
      setTimeout(() => {
        pubsub.remove('user:img-transition')
      }, 300)
    }, 300);
  }
}

onBeforeMount(onHandleGetData)

// 路由更新，重新获取数据
watch(() => props.pid, onHandleGetData)

defineOptions({
  name: "PhotoInfo"
})
</script>

<style scoped lang='scss'>
// 移动端(650px以下)布局图片竖着
// 650以上图片以轮播图的形式展示
.photo-info-container {
  color: var(--text-color-1);

  .img-list {
    width: 100%;


    >div:first-child {
      visibility: hidden;

      &.active {
        visibility: unset;
      }
    }
  }
}

@media screen and (max-width:650px) {
  .photo-info-container {
    // 留给底部菜单栏的安全空间
    margin-bottom: 90px;
  }
}

// pe信息栏展示
.info-container-pe {
  border-radius: 10px 10px 0 0;
  transition: var(--time-normal) all;
  background-color: var(--bg-color-1);
  position: fixed;
  bottom: -78px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 10px 5px;
  box-shadow: 0 0 10px var(--box-shadow-color);

  &.active {
    bottom: 0px;
  }

  .drag-tips {
    cursor: pointer;
    display: flex;
    justify-content: center;

    .tips {
      width: 50%;
      height: 6px;
      border-radius: 10px;
      background-color: var(--text-color-1);
    }
  }

  .user {
    display: flex;
    align-items: center;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 17px;
    white-space: nowrap;
  }

  .like-btn {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .desc {
    font-size: 12px;
    color: var(--text-color-2);
  }

  .desc-el {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .data {
    display: flex;

    i {
      position: relative;
      top: 2px;
    }
  }
}

// pc端(650px以上)以轮播图的形式展示每张图片
:deep(.n-carousel) {
  position: relative;
  background-color: var(--bg-color-2);
  border-radius: 10px;
  height: 500px;

  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 35%, var(--mask-color))
  }

  .n-carousel__slide {
    img {
      height: 500px;
      object-fit: contain;
    }

    // 让第一个未加载完成时隐藏图片，加载完成显示图片
    .img-lazy-container {
      display: flex;

    }

    &[data-index='1'] {
      .img-lazy-container {
        visibility: hidden;

        &.active {
          visibility: unset;
        }
      }
    }
  }

  .n-carousel__dots {
    z-index: 99;
  }
}

// pc端信息栏展示
.info_container_pc {
  position: relative;

  .title {
    font-size: 20px;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .like-btn {
    position: absolute;
    right: 10px;
    top: 40px;
  }

  .data {
    display: flex;
    font-size: 12px;
    align-items: center;
    color: var(--text-color-2);
  }
}
</style>