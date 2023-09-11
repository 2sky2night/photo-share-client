<template>
  <div class="page">
    <div class="form-container">
      <h2>PhotoShare</h2>
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
          <n-button class="mr-10" @click="onHandleReset">{{ $t('reset') }}</n-button>
          <n-button type="primary" @click="onHandleLogin">{{ $t('login') }}</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import i18n from '@/config/i18n'
import type { FormRules, FormInst } from 'naive-ui'

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
 * 登录
 */
const onHandleLogin = async () => {
  if (formIns.value) {
    await userStore.login(formData.username, formData.password)
  }
}

/**
 * 重置表单域
 */
const onHandleReset = () => {
  formData.password = ''
  formData.username = ''
}

defineOptions({
  name: 'Login'
})
</script>

<style scoped lang='scss'>
.page {
  padding: 0 10px;
  height: 100vh;
  box-sizing: border-box;
  width: 100vw;
  position: relative;

  // background-color:var(--primary-color);
  .form-container {
    background-color: initial;
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 20px 10px;
    height: 300px;
    box-shadow: 0 0 10px var(--box-shadow-color);
    border-radius: 10px;
    border: 1px solid var(--border-color-1);
    transition: var(--time-normal);

    .action {
      display: flex;
      justify-content: end;
    }

    h2 {
      font-size: 25px;
      color: var(--primary-color);
    }
  }

}

// 小屏幕
@media screen and (max-width:650px) {
  .page {
    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: none;
      inset: 0;
      height: unset;
      width: unset;

      form {
        margin: 0 20px;
      }

      h2 {
        align-self: center;
        margin-bottom: 35px;
        font-size: 35px;
      }
    }
  }
}
</style>