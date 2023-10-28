import { renderModal } from "@/render";
import { styled } from "@styils/vue";
import {
  NConfigProvider,
  NCard,
  darkTheme,
  NIcon,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  FormInst,
} from "naive-ui";
import { createAccountAPI } from "@Admin/apis/user";
import { Close as CloseIcon } from "@vicons/ionicons5";
import { useConfigStore } from "@/store";
import { Roles } from "@/types/auth";
import { i18n } from "@/config";

export function createAccountModal(offset: { x: number; y: number }) {
  const { isDark } = useConfigStore();
  return new Promise<void>((resolve, reject) => {
    renderModal(
      {
        name: "CreateAccountModal",
        unmounted() {
          reject();
        },
        emits: ["close"],
        data() {
          return {
            model: {
              password: "",
              username: "",
            },
            role: Roles.User,
            isLoading: false,
            formIns: null,
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
        },
        methods: {
          // 获取表单实例
          handleGetFormIns(ele: any) {
            this.formIns = ele;
          },
          // 关闭模态框
          handleClose() {
            reject();
            this.$emit("close");
          },
          submit() {
            const {
              model: { password, username },
              role,
            } = this;
            createAccountAPI({
              password,
              username,
              role,
            }).then(
              () => {
                // 成功
                this.isLoading = false;
                this.$emit("close");
                resolve();
              },
              () => {
                // 失败
                this.isLoading = false;
              }
            );
          },
          // 提交的回调
          handleSubmit() {
            this.isLoading = true;
            if (this.formIns) {
              (this.formIns as FormInst)
                .validate()
                .then(this.submit)
                .catch((errro) => {
                  console.error(errro);
                });
            }
          },
          // 选择的角色值更新的回调
          handleChangeRole(role: Roles) {
            this.role = role;
          },
          // 密码更新的回调
          handleChangePassword(password: string) {
            this.model.password = password;
          },
          // 用户名称更新的回调
          handleChangeUsername(username: string) {
            this.model.username = username;
          },
        },
        render() {
          /**
           * 关闭按钮
           * @returns
           */
          const CloseBtn = () => {
            const Container = styled("div", { cursor: "pointer" });
            return (
              <Container onClick={this.handleClose}>
                <NIcon
                  class="text-hover"
                  size={20}>
                  <CloseIcon />
                </NIcon>
              </Container>
            );
          };

          /**
           * footer
           */
          const FooterContainer = () => {
            const Container = styled("div", {
              display: "flex",
              justifyContent: "end",
            });
            return (
              <Container>
                <NButton
                  loading={this.isLoading}
                  onClick={this.handleClose}>
                  {i18n.global.t("cancel")}
                </NButton>
                <NButton
                  type="primary"
                  class="ml-5"
                  loading={this.isLoading}
                  onClick={this.handleSubmit}>
                  {i18n.global.t("confirm")}
                </NButton>
              </Container>
            );
          };

          /**
           * main
           */
          const MainContainer = () => {
            return (
              <NForm
                model={this.model}
                ref={this.handleGetFormIns}
                showRequireMark={false}
                rules={this.rules}>
                <NFormItem
                  label={i18n.global.t("username")}
                  path="username">
                  <NInput
                    value={this.username}
                    onUpdateValue={this.handleChangeUsername}
                    placeholder={i18n.global.t("pleaseEnter", {
                      title: i18n.global.t("username"),
                    })}
                  />
                </NFormItem>
                <NFormItem
                  label={i18n.global.t("password")}
                  path="password">
                  <NInput
                    value={this.password}
                    type="password"
                    onUpdateValue={this.handleChangePassword}
                    placeholder={i18n.global.t("pleaseEnter", {
                      title: i18n.global.t("password"),
                    })}
                  />
                </NFormItem>
                <NFormItem label={i18n.global.t("role")}>
                  <NRadioGroup
                    value={this.role}
                    onUpdateValue={this.handleChangeRole}>
                    <NRadio value={Roles.User}>{i18n.global.t("user")}</NRadio>
                    <NRadio value={Roles.Admin}>
                      {i18n.global.t("admin")}
                    </NRadio>
                    <NRadio value={Roles.SuperAdmin}>
                      {i18n.global.t("superAdmin")}
                    </NRadio>
                  </NRadioGroup>
                </NFormItem>
              </NForm>
            );
          };

          return (
            <NConfigProvider theme={isDark ? darkTheme : null}>
              <NCard
                style="max-width:600px;width:80vw"
                title={i18n.global.t("addUser")}
                bordered={false}
                size="huge"
                role="dialog"
                aria-modal="true">
                {{
                  default: () => <MainContainer />,
                  footer: () => <FooterContainer />,
                  "header-extra": () => <CloseBtn />,
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
