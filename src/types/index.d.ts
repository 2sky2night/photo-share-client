import type { MessageApi } from 'naive-ui'
export { };

declare global {
  interface Window {
    /**
     * naive-ui的消息组件api
     */
    $message: MessageApi
  }
}