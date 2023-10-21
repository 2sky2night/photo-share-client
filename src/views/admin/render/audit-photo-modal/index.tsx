import { ref } from "vue";
import {
  NCard,
  NIcon,
  NButton,
  NForm,
  NFormItem,
  NRadio,
  NRadioGroup,
  NInput,
  NConfigProvider,
} from "naive-ui";
import { useConfigStore } from "@/store";
import { Close } from "@vicons/ionicons5";
import { renderModal } from "@/render";
import { i18n } from "@/config";
import { AuditStatus } from "@/types/photo";
import { darkTheme } from "naive-ui";
import { auditPhotoAPI } from "@Admin/apis/photo";
import type { Photo } from "@/apis/photo/types";

export function auditPhotoModal(
  photo: Photo,
  offset?: { x: number; y: number }
) {
  const { isDark } = useConfigStore();
  return new Promise<void>((resolve, reject) => {
    renderModal(
      {
        emits: ["close"],
        setup(_, context) {
          // 当前选择的审核值
          const currentAudit = ref<AuditStatus>(photo.status);
          // 当前审核的描述
          const currentDesc = ref(photo.audit_desc);
          // 关闭模态框
          const handleClose = () => {
            reject();
            context.emit("close");
          };

          // 选择的审核值发送变化的回调
          const handleUpdateAudit = (value: AuditStatus) => {
            currentAudit.value = value;
          };

          // 当前审核描述发生变化的回调
          const handleUpdateDesc = (value: string) => {
            currentDesc.value = value.trim();
          };

          // 点击确定的回调
          const handleSubmit = async () => {
            const desc = currentDesc.value;
            const status = currentAudit.value;
            try {
              await auditPhotoAPI(
                photo.pid,
                desc ? { desc, status } : { status }
              );
              resolve();
              // 关闭模态框
              handleClose();
              window.$message.success(i18n.global.t("auditSuccess"));
            } catch (error) {
              // 关闭模态框
              handleClose();
            }
          };

          return () => (
            <NConfigProvider theme={isDark ? darkTheme : undefined}>
              <NCard
                style="width: 600px;background-color:var(--bg-color-1);color:var(--text-color-1);"
                title="模态框"
                bordered={false}
                size="huge"
                role="dialog"
                aria-modal="true">
                {{
                  default: () => (
                    <NForm disabled={photo.status !== AuditStatus.NO_AUDIT}>
                      <NFormItem label={i18n.global.t("audit")}>
                        <NRadioGroup
                          value={currentAudit.value}
                          onUpdate:value={handleUpdateAudit}>
                          <NRadio value={AuditStatus.NO_AUDIT}>
                            {i18n.global.t("notAudit")}
                          </NRadio>
                          <NRadio value={AuditStatus.NO_PASS}>
                            {i18n.global.t("unpassAudit")}
                          </NRadio>
                          <NRadio value={AuditStatus.PASS}>
                            {i18n.global.t("passAudit")}
                          </NRadio>
                        </NRadioGroup>
                      </NFormItem>
                      <NFormItem label={i18n.global.t("auditDesc")}>
                        <NInput
                          type="textarea"
                          maxlength={100}
                          resizable={false}
                          placeholder={i18n.global.t("pleaseEnter", {
                            title: i18n.global.t("auditDesc"),
                          })}
                          value={currentDesc.value}
                          onUpdate:value={handleUpdateDesc}></NInput>
                      </NFormItem>
                    </NForm>
                  ),
                  "header-extra": () => (
                    <NIcon
                      // @ts-ignore
                      onClick={handleClose}
                      size={20}>
                      <Close></Close>
                    </NIcon>
                  ),
                  footer: () => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                      }}>
                      <NButton
                        class="mr-5"
                        onClick={handleClose}>
                        {i18n.global.t("cancel")}
                      </NButton>
                      <NButton
                        disabled={photo.status !== AuditStatus.NO_AUDIT}
                        type="primary"
                        onClick={handleSubmit}>
                        {i18n.global.t("confirm")}
                      </NButton>
                    </div>
                  ),
                }}
              </NCard>
            </NConfigProvider>
          );
        },
      },
      {},
      offset
    );
  });
}
