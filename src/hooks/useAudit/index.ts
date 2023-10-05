import { AuditStatus } from "@/types/photo";
import { computed } from "vue";
import { i18n } from "@/config";

/**
 * 格式化审核状态
 * @param status
 * @returns
 */
export function useAudit(status: AuditStatus) {
  const result = computed(() => {
    switch (status) {
      case AuditStatus.NO_AUDIT:
        return i18n.global.t("notAudit");
      case AuditStatus.PASS:
        return i18n.global.t("passAudit");
      case AuditStatus.NO_PASS:
        return i18n.global.t("unpassAudit");
    }
  });
  return result;
}
