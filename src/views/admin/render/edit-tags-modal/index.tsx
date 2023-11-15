import { renderModal } from "@/render";
import { styled } from "@styils/vue";
import {
  NButton,
  NConfigProvider,
  NCard,
  darkTheme,
  NIcon,
  NFormItem,
  NForm,
  NInput,
  FormInst,
} from "naive-ui";
import { Close } from "@vicons/ionicons5";
import { editTagsAPI } from "@Admin/apis/photo";
import type { TagsBase } from "@/apis/photo/types";
import { useConfigStore } from "@/store";
import { i18n } from "@/config";

/**
 * 渲染编辑标签模态框
 * @param tags
 */
export function editTagsModal(
  tags: TagsBase,
  offset: { x: number; y: number }
) {
  const { isDark } = useConfigStore();
  return new Promise<void>((resolve, reject) => {
    renderModal(
      {
        name: "EditTagsModal",
        emits: ["close"],
        data() {
          return {
            formData: {
              nameZH: tags.name_zh,
              nameEN: tags.name_en,
              descriptionZH: tags.description_zh ? tags.description_zh : "",
              descriptionEN: tags.description_en ? tags.description_en : "",
            },
            formInst: null,
          };
        },
        computed: {
          rules() {
            return {
              nameZH: [
                {
                  required: true,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("tagsNameZH"),
                  }),
                },
                {
                  min: 1,
                  max: 20,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 20,
                    min: 1,
                    title: i18n.global.t("tagsNameZH"),
                  }),
                },
              ],
              nameEN: [
                {
                  required: true,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("tagsNameEN"),
                  }),
                },
                {
                  min: 1,
                  max: 30,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 30,
                    min: 1,
                    title: i18n.global.t("tagsNameEN"),
                  }),
                },
              ],
              descriptionZH: [
                {
                  required: false,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("descZH"),
                  }),
                },
                {
                  min: 1,
                  max: 100,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 100,
                    min: 1,
                    title: i18n.global.t("descZH"),
                  }),
                },
              ],
              descriptionEN: [
                {
                  required: false,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("descEN"),
                  }),
                },
                {
                  min: 1,
                  max: 100,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 100,
                    min: 1,
                    title: i18n.global.t("descEN"),
                  }),
                },
              ],
            };
          },
        },
        methods: {
          /**
           * 关闭模态框
           * @param e 真-取消修改，假-应用修改
           */
          handleClose(e = true) {
            this.$emit("close");
            e ? reject() : resolve();
          },
          /**
           * 获取表单实例
           * @param formIns
           */
          handleGetFormIns(formIns: any) {
            this.formInst = formIns;
          },
          /**
           * 确认
           */
          handleSubmit() {
            if (this.formInst) {
              // 表单校验
              (this.formInst as FormInst).validate().then(
                async () => {
                  // 校验成功
                  try {
                    await editTagsAPI(tags.tid, this.$data.formData);
                    window.$message.success(i18n.global.t("s_editTags"));
                    this.handleClose(false);
                  } catch {
                    this.handleClose();
                  }
                },
                () => {
                  // 校验失败
                }
              );
            } else {
              window.$message.warning(i18n.global.t("actionError"));
              this.handleClose();
            }
          },
          /**
           * 更新标签中文名
           */
          handleUpdateTagsZH(value: string) {
            this.formData.nameZH = value;
          },
          /**
           * 更新标签英文名
           */
          handleUpdateTagsEN(value: string) {
            this.formData.nameEN = value;
          },
          /**
           * 更新描述中文
           */
          handleUpdateDescZH(value: string) {
            this.formData.descriptionZH = value;
          },
          /**
           * 更新描述英文
           * @param value
           */
          handleUpdateDescEN(value: string) {
            this.formData.descriptionEN = value;
          },
        },
        render() {
          // 关闭按钮
          const ClostBtn = () => (
            <NIcon
              class="text-hover pointer"
              size={20}
              // @ts-ignore
              onClick={() => this.handleClose()}>
              <Close></Close>
            </NIcon>
          );
          // 主视图表单域
          const MainContainer = () => (
            <NForm
              labelPlacement="left"
              labelWidth={150}
              rules={this.rules}
              model={this.formData}
              ref={this.handleGetFormIns}>
              <NFormItem
                label={i18n.global.t("tagsNameZH")}
                path="nameZH">
                <NInput
                  placeholder={i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("tagsNameZH"),
                  })}
                  value={this.formData.nameZH}
                  onUpdate:value={this.handleUpdateTagsZH}
                />
              </NFormItem>
              <NFormItem
                label={i18n.global.t("tagsNameEN")}
                path="nameEN">
                <NInput
                  placeholder={i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("tagsNameEN"),
                  })}
                  value={this.formData.nameEN}
                  onUpdate:value={this.handleUpdateTagsEN}
                />
              </NFormItem>
              <NFormItem
                label={i18n.global.t("descZH")}
                path="descriptionZH">
                <NInput
                  placeholder={i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("descZH"),
                  })}
                  value={this.formData.descriptionZH}
                  onUpdate:value={this.handleUpdateDescZH}
                />
              </NFormItem>
              <NFormItem
                label={i18n.global.t("descEN")}
                path="descriptionEN">
                <NInput
                  placeholder={i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("descEN"),
                  })}
                  value={this.formData.descriptionEN}
                  onUpdate:value={this.handleUpdateDescEN}
                />
              </NFormItem>
            </NForm>
          );
          // 底部操作区
          const Footer = () => {
            const Container = styled("div", {
              display: "flex",
              justifyContent: "end",
            });
            return (
              <Container>
                <NButton
                  class="mr-5"
                  onClick={() => this.handleClose()}>
                  {i18n.global.t("cancel")}
                </NButton>
                <NButton
                  type="primary"
                  onClick={this.handleSubmit}>
                  {i18n.global.t("confirm")}
                </NButton>
              </Container>
            );
          };

          return (
            <NConfigProvider theme={isDark ? darkTheme : null}>
              <NCard
                style="max-width:600px;width:80vw"
                title={i18n.global.t("editTags")}
                bordered={false}
                size="huge"
                role="dialog"
                aria-modal="true">
                {{
                  "header-extra": () => <ClostBtn />,
                  default: () => <MainContainer />,
                  footer: () => <Footer />,
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
