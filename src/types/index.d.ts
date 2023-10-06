import type { MessageApi, NotificationApi } from "naive-ui";
export {};

declare global {
  interface Window {
    /**
     * naive-ui的消息组件api
     */
    $message: MessageApi;
    /**
     * naive-ui的通知组件api
     */
    $notify: NotificationApi;
  }
}
