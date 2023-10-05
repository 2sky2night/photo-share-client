import { createI18n } from 'vue-i18n';
import ZH from "./zh";
import EN from './en';

export enum LOCALE_VALUE {
  ZH = "ZH",
  EN = "EN"
}

export const i18n = createI18n({
  // 当前激活的国家文本 （value必须是messages配置项中的某个key）
  locale: LOCALE_VALUE.EN,
  // 失败激活的国家文本（value必须是messages配置项中的某个key）
  fallbackLocale: LOCALE_VALUE.ZH,
  // allowComposition: true,
  // 配置各个国家的文本
  messages: {
    [LOCALE_VALUE.ZH]: ZH,
    [LOCALE_VALUE.EN]: EN
  }
});