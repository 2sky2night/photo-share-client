<template>
  <div class="page">
    <layout-backgourd></layout-backgourd>
    <div class="form-container">
      <h2>PhotoShare</h2>
      <div class="main">
        <div class="panel">
          <n-tabs type='segment' :value="route.path" @update:value="onHandleNav">
            <n-tab name="/login">
              {{ $t('login') }}
            </n-tab>
            <n-tab name="/register">
              {{ $t('register') }}
            </n-tab>
          </n-tabs>
        </div>
        <n-form :show-require-mark="false" :rules="rules" class="mt-10" :model="formData" ref="formIns">
          <n-form-item :label="$t('username')" path="username">
            <n-input :placeholder="$t('pleaseEnter', { title: $t('username') })"
              v-model:value="formData.username"></n-input>
          </n-form-item>
          <n-form-item class="mt-10" :label="$t('password')" path="password">
            <n-input :placeholder="$t('pleaseEnter', { title: $t('password') })" v-model:value="formData.password"
              type="password"></n-input>
          </n-form-item>
          <div class="action">
            <a href="javascript:void(0)" @click="onHandleVisitor" class="text-hover">{{ $t('iAmVisitor') }}</a>
            <div class="action-btn">
              <n-button class="mr-10" @click="onHandleReset">{{ $t('reset') }}</n-button>
              <n-button type="primary" @click="onHandleLogin">{{ $t('login') }}</n-button>
            </div>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import { useUserStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/config/i18n'
import type { FormRules, FormInst } from 'naive-ui'
import LayoutBackgourd from '@/components/public/layout-backgourd/dom-less.vue'

// 路由对象
const router = useRouter()
// 路由元数据
const route = useRoute()
// 用户仓库
const userStore = useUserStore()
// 数据
const formData = reactive({
  username: '',
  password: ''
})
// 表单实例
const formIns = ref<FormInst | null>(null)
// 表单验证
const rules: FormRules = {
  username: [
    { required: true, trigger: ['blur', 'input'], message: i18n.global.t('pleaseEnter', { title: i18n.global.t('username') }) },
    { min: 1, max: 10, trigger: ['blur', 'input'], message: i18n.global.t('fieldLengthError', { max: 10, min: 1, title: i18n.global.t('username') }) }
  ],
  password: [
    { required: true, trigger: ['blur', 'input'], message: i18n.global.t('pleaseEnter', { title: i18n.global.t('password') }) },
    { min: 6, max: 14, trigger: ['blur', 'input'], message: i18n.global.t('fieldLengthError', { max: 14, min: 6, title: i18n.global.t('password') }) }
  ]
}

/**
 * 游客登录
 */
const onHandleVisitor = () => {
  userStore.regiterRoutes()
  router.push('/')
}

/**
 * 登录
 */
const onHandleLogin = async () => {
  if (formIns.value) {
    await formIns.value.validate()
    await userStore.login(formData.username, formData.password)
    router.replace('/')
  }
}

/**
 * 选择的面板更新的回调
 */
const onHandleNav = (path: string) => {
  router.push(path)
}

/**
 * 重置表单域
 */
const onHandleReset = () => {
  formData.password = ''
  formData.username = ''
  if (formIns.value) {
    formIns.value.restoreValidation()
  }
}

onMounted(() => {
  formData.password = '123456789'
  formData.username='KK'
})

defineOptions({
  name: 'Login'
})
</script>

<style scoped lang='scss'>
.page {
  color:var(--text-color-1);
  height: 100vh;
  box-sizing: border-box;
  width: 100vw;
  position: relative;

  .form-container {
    background-color: var(--bg-color-1);
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 20px 10px;
    box-shadow: 0 0 10px var(--box-shadow-color);
    border-radius: 10px;
    border: 1px solid var(--border-color-1);
    // transition: var(--time-normal);

    .panel {
      margin: 20px 0;
    }

    .action {
      display: flex;
      justify-content: space-between
    }

    h2 {
      text-align: center;
      font-size: 25px;
      color: var(--primary-color);
    }
  }

}

// 小屏幕
@media screen and (max-width:650px) {
  .page {
    .main {
      background-color: var(--bg-color-1);
      padding: 10px;
      border-radius: 10px;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: none;
      inset: 0;
      height: unset;
      width: unset;
      background-color: #0000006b;

      .panel {
        margin: 20px
      }

      form {
        margin: 0 20px;
      }


      h2 {
        // -webkit-text-stroke: 1px #fff;
        align-self: center;
        margin-bottom: 15px;
        font-size: 40px;
      }
    }
  }
}
</style>