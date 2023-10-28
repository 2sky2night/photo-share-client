import { uploadAvatarAPI } from "@/apis/file";
import { UserInfo } from "@/apis/user/types";
import ImgCutter from "@/components/img-cutter/src/index.vue";
import type { ImgCutterIns } from "@/components/img-cutter/src/types";
import Avatar from "@/components/public/avatar/index.vue";
import { i18n } from "@/config";
import { renderModal } from "@/render";
import { useConfigStore } from "@/store";
import { editAccountAPI } from "@Admin/apis/user";
import { styled } from "@styils/vue";
import { Close } from "@vicons/ionicons5";
import {
  FormInst,
  NButton,
  NCard,
  NConfigProvider,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NSwitch,
  darkTheme,
} from "naive-ui";

export function editAccountModal(
  user: UserInfo,
  offset: { x: number; y: number }
) {
  const { isDark } = useConfigStore();
  return new Promise<void>((resolve, reject) => {
    renderModal(
      {
        name: "EditAccountModal",
        unmounted() {
          reject();
        },
        emits: ["close"],
        data() {
          return {
            cutterIns: null,
            isLoading: false,
            formIns: null,
            isEditPassword: false,
            model: {
              avatar: user.avatar,
              username: user.username,
              password: "",
            },
          };
        },
        computed: {
          rules() {
            return {
              username: [
                {
                  required: true,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("username"),
                  }),
                },
                {
                  min: 1,
                  max: 13,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 13,
                    min: 1,
                    title: i18n.global.t("username"),
                  }),
                },
              ],
              password: [
                {
                  required: true,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("pleaseEnter", {
                    title: i18n.global.t("password"),
                  }),
                },
                {
                  min: 6,
                  max: 14,
                  trigger: ["blur", "input"],
                  message: i18n.global.t("fieldLengthError", {
                    max: 14,
                    min: 6,
                    title: i18n.global.t("password"),
                  }),
                },
              ],
            };
          },
          isEdit() {
            const { password, username, avatar } = this.model;
            if (password !== "") {
              return true;
            }
            if (avatar !== user.avatar) {
              return true;
            }
            if (username !== user.username) {
              return true;
            }
            return false;
          },
        },
        methods: {
          // 关闭
          handleClose() {
            this.$emit("close");
            reject();
          },
          // 重置
          handleReset() {
            this.model.username = user.username;
            this.model.password = "";
            this.model.avatar = user.avatar;
          },
          submit() {
            this.isLoading = true;
            const body: Record<string, any> = {};
            if (this.isEditPassword) {
              body.password = this.model.password;
            }
            if (this.model.avatar !== user.avatar) {
              body.avatar = this.model.avatar;
            }
            if (this.model.username !== user.username) {
              body.username = this.model.username;
            }
            editAccountAPI(user.uid, body).then(
              () => {
                resolve();
                this.handleClose();
                this.isLoading = false;
              },
              () => {
                this.handleReset();
                this.isLoading = false;
              }
            );
          },
          // 提交
          handleSubmit() {
            if (this.formIns) {
              (this.formIns as FormInst).validate().then(
                () => {
                  this.submit();
                },
                (error) => {
                  console.error(error);
                }
              );
            }
          },
          // 更新用户名
          handleUpdateUsername(value: string) {
            this.model.username = value;
          },
          // 更新密码
          handleUpdatePassword(value: string) {
            this.model.password = value;
          },
          // 裁剪图片的回调
          handleCutDown(file: File | null) {
            if (file) {
              const formData = new FormData();
              formData.append("avatar", file);
              uploadAvatarAPI(formData).then(
                (result) => {
                  this.model.avatar = result.data;
                },
                () => {
                  this.outputError(i18n.global.t("uploadFileFail"));
                }
              );
            } else {
              this.handleCutDownError();
            }
          },
          // 图片类型检查
          handleTypeCatch(file: File) {
            if (!file.type.includes("image")) {
              this.outputError(i18n.global.t("fileTypeError"));
              return false;
            }
            if (file.size > 1024 * 1024 * 10) {
              this.outputError(i18n.global.t("fileSizeError"));
              return false;
            }
            return true;
          },
          // 裁剪失败的回调
          handleCutDownError() {
            this.outputError(i18n.global.t("cutDownFail"));
          },
          // 错误输出
          outputError(reason: string) {
            if (window.$message) {
              window.$message.error(reason);
            } else {
              console.error(reason);
            }
          },
          // 获取图片裁剪框
          handleGetCutter(ele: any) {
            this.cutterIns = ele;
          },
          // 显示图片裁剪框
          handleShowCutter() {
            if (this.cutterIns) {
              (this.cutterIns as ImgCutterIns).handleShowModal();
            }
          },
          // 获取表单实例
          handleGetForm(ele: any) {
            this.formIns = ele;
          },
          // 修改密码
          handleEditPassword(value: boolean) {
            this.isEditPassword = value;
          },
        },
        render() {
          // 关闭按钮
          const ClostBtn = () => {
            return (
              <NIcon
                class="text-hover pointer"
                size={20}
                // @ts-ignore
                onClick={this.handleClose}>
                <Close />
              </NIcon>
            );
          };

          // 内容区
          const MainContainer = () => {
            const Password = styled("div", {
              width: "100%",
            });
            const EditPassword = styled("div", {
              position: "absolute",
              top: "-30px",
              right: "0px",
            });
            return (
              <NForm
                showRequireMark={false}
                rules={this.rules}
                model={this.model}
                ref={this.handleGetForm}>
                <NFormItem
                  label={i18n.global.t("username")}
                  path="username">
                  <NInput
                    value={this.model.username}
                    onUpdate:value={this.handleUpdateUsername}
                    placeholder={i18n.global.t("pleaseEnter", {
                      title: i18n.global.t("username"),
                    })}
                  />
                </NFormItem>
                <NFormItem
                  style="position: relative"
                  label={i18n.global.t("password")}
                  path={this.isEditPassword ? "password" : undefined}>
                  <Password>
                    <EditPassword>
                      <span class="mr-5">{i18n.global.t("editPassword")}</span>
                      <NSwitch
                        onUpdate:value={this.handleEditPassword}
                        value={this.isEditPassword}
                      />
                    </EditPassword>
                    {this.isEditPassword ? (
                      <NInput
                        type="password"
                        value={this.model.password}
                        onUpdate:value={this.handleUpdatePassword}
                        placeholder={i18n.global.t("pleaseEnter", {
                          title: i18n.global.t("password"),
                        })}
                      />
                    ) : null}
                  </Password>
                </NFormItem>
                <NFormItem label={i18n.global.t("avatar")}>
                  <Avatar
                    src={this.model.avatar}
                    size={30}
                    imgSize="large"
                    // @ts-ignore
                    onClick={this.handleShowCutter}
                  />
                  <ImgCutter
                    ref={this.handleGetCutter}
                    needTrigger={false}
                    isDark={isDark}
                    fileTypeCatch={this.handleTypeCatch}
                    otherError={this.handleCutDownError}
                    // @ts-ignore
                    onCutDown={this.handleCutDown}></ImgCutter>
                </NFormItem>
              </NForm>
            );
          };

          // 底部
          const Footer = () => {
            const Container = styled("div", {
              display: "flex",
              justifyContent: "end",
            });
            return (
              <Container>
                <NButton
                  loading={this.isLoading}
                  onClick={this.handleClose}
                  class="mr-5">
                  {i18n.global.t("cancel")}
                </NButton>
                <NButton
                  type="primary"
                  loading={this.isLoading}
                  onClick={this.handleSubmit}
                  disabled={!this.isEdit}>
                  {i18n.global.t("confirm")}
                </NButton>
              </Container>
            );
          };

          return (
            <NConfigProvider theme={isDark ? darkTheme : null}>
              <NCard
                style="max-width:600px;width:80vw"
                title={i18n.global.t("editUser")}
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
