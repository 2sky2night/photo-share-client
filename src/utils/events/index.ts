import { h } from "vue";
import { subscribeAuditAPI, unsubscribeAuditAPI } from "@User/apis/photo";
import { AuditStatus, PhotoAuditResult } from "@/types/photo";
import router from "@/router";
import type { Response } from "@/utils/request/types";
import { i18n } from "@/config";

// 事件流实例
export let es: EventSource | null = null;

// 会话id
let sessionId = "";

// 创建频道推送
const toSubscribe = async () => {
  try {
    const result = await subscribeAuditAPI();
    sessionId = result.data;
  } catch (error) {}
};

// 连接频道推送
const connection = () => {
  if (es === null) {
    es = new EventSource(`/api/photo/events/connect?sessionId=${sessionId}`);
    es.addEventListener(sessionId, (e) => {
      const { data }: Response<PhotoAuditResult> = JSON.parse(e.data);
      if (data !== null) {
        // 有最新的广播消息
        window.$notify.info({
          content: () => {
            return data.status === AuditStatus.PASS
              ? h(
                  "div",
                  {
                    style: "cursor:pointer",
                    onClick: () => router.push(`/photo/detail/${data.pid}`),
                  },
                  [i18n.global.t("photoPass")]
                )
              : h(
                  "div",
                  {
                    style: "cursor:pointer",
                    onClick: () => router.push("/my"),
                  },
                  [i18n.global.t("photoUnPass")]
                );
          },
          title: i18n.global.t("tips"),
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
    });
    es.addEventListener("error", () => {});
  }
};

// 销毁频道推送
const toUnsubscribe = async () => {
  await unsubscribeAuditAPI();
};

// 断开频道推送
const disconnect = () => {
  es && es.close();
  es = null;
};

/**
 * 开启SSE服务
 */
export const startSSE = async () => {
  if (es === null) {
    await toSubscribe();
    connection();
  }
};

/**
 * 关闭SSE服务
 */
export const endSSE = async () => {
  disconnect();
  await toUnsubscribe();
};

// 监听关闭标签页就发送请求销毁频道连接
window.addEventListener("unload", endSSE);
