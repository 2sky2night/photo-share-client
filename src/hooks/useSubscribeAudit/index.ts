import { h } from "vue";
import { useNotification } from "naive-ui";
import { subscribeAuditAPI, unsubscribeAuditAPI } from "@User/apis/photo";
import { useNavigator } from "@/hooks";
import { AuditStatus, PhotoAuditResult } from "@/types/photo";
import type { Response } from "@/utils/request/types";
import { i18n } from "@/config";

// 事件流实例
let es: EventSource | null = null;

export function useSubscribeAudit() {
  
  // 会话id
  let sessionId = "";

  // router
  const {
    user: { goPhotoDetail, goMyPhoto },
  } = useNavigator();

  // notify
  const notify = useNotification();

  // 创建频道推送
  const toSubscribe = async () => {
    const result = await subscribeAuditAPI();
    sessionId = result.data;
  };

  // 连接频道推送
  const connection = () => {
    if (es === null) {
      es = new EventSource(`/api/photo/events/connect?sessionId=${sessionId}`);
      es.addEventListener(sessionId, (e) => {
        const { data }: Response<PhotoAuditResult> = JSON.parse(e.data);
        if (data !== null) {
          // 有最新的广播消息
          notify.info({
            content: () => {
              return data.status === AuditStatus.PASS
                ? h("div", { onClick: () => goPhotoDetail(data.pid) }, [
                    i18n.global.t("photoPass"),
                  ])
                : h("div", { onClick: () => goMyPhoto() }, [
                    i18n.global.t("photoUnPass"),
                  ]);
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
  const startSSE = async () => {
    if (es === null) {
      await toSubscribe();
      connection();
    }
  };

  /**
   * 关闭SSE服务
   */
  const endSSE = async () => {
    disconnect();
    await toUnsubscribe();
  };

  // 监听关闭创建就发送请求销毁频道连接
  window.addEventListener("unload", endSSE);

  return {
    /**
     * 创建频道
     */
    toSubscribe,
    /**
     * 开启SSE推送服务
     */
    connection,
    /**
     * 销毁频道
     */
    toUnsubscribe,
    /**
     * 断开sse推送服务
     */
    disconnect,
    endSSE,
    startSSE,
  };
}
