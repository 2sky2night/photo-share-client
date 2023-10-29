import { renderModal } from "@/render";
import { useConfigStore } from "@/store";
import {
  NConfigProvider,
  NCard,
  darkTheme,
  NIcon,
  NSpin,
  NForm,
  NFormItem,
  NText,
  NSpace,
  NNumberAnimation,
  NButton,
} from "naive-ui";
import { Close } from "@vicons/ionicons5";
import Avatar from "@/components/public/avatar/index.vue";
import Time from "@/components/time/index.vue";
import { styled } from "@styils/vue";
import { getCommentInfoAPI } from "@Admin/apis/comment";
import { i18n } from "@/config";
import { Comment } from "@/views/user/apis/photo/types";

export function commentMoreModal(
  cid: number,
  offset: { x: number; y: number }
) {
  const { isDark } = useConfigStore();
  renderModal<any, { comment: Comment | null; isLoading: boolean }>(
    {
      emits: ["close"],
      name: "CommentInfo",
      data() {
        return {
          comment: null,
          isLoading: true,
        };
      },
      mounted() {
        this.getData();
      },
      methods: {
        handleClose() {
          this.$emit("close");
        },
        async getData() {
          const { data } = await getCommentInfoAPI(cid);
          this.comment = data;
          this.isLoading = false;
        },
      },
      render() {
        const comment = this.comment as Comment;
        const AvatarContainer = () => (
          <>
            <Avatar
              size={25}
              src={comment.user.avatar}
            />
            <span class="ml-10">{comment.user.username}</span>
          </>
        );
        const MainContainer = () => (
          <NSpin show={this.isLoading}>
            {this.isLoading ? (
              <span>{i18n.global.t("loading")}</span>
            ) : (
              <>
                <NSpace>
                  <NFormItem
                    labelPlacement="left"
                    label={i18n.global.t("user")}>
                    <AvatarContainer></AvatarContainer>
                  </NFormItem>
                  <NFormItem
                    labelPlacement="left"
                    label={`${i18n.global.t("photo")} id`}>
                    {comment.pid}
                  </NFormItem>
                  <NFormItem
                    labelPlacement="left"
                    label={i18n.global.t("likeCount")}>
                    <NNumberAnimation
                      from={0}
                      to={comment.like_count}
                    />
                  </NFormItem>
                </NSpace>
                <NFormItem label={i18n.global.t("content")}>
                  <NText>{comment.content}</NText>
                </NFormItem>
                <NSpace>
                  <NFormItem label={i18n.global.t("createdAt")}>
                    <Time timeStr={comment.createdAt}></Time>
                  </NFormItem>
                  <NFormItem label={i18n.global.t("deletedAt")}>
                    {comment.deletedAt ? (
                      <Time timeStr={comment.deletedAt}></Time>
                    ) : (
                      <span>{i18n.global.t("noDataD")}</span>
                    )}
                  </NFormItem>
                </NSpace>
              </>
            )}
          </NSpin>
        );

        const FooterContainer = () => (
          <NSpace justify="end">
            <NButton
              type="primary"
              onClick={this.handleClose}>
              {i18n.global.t("confirm")}
            </NButton>
          </NSpace>
        );

        const CloseBtn = () => (
          <NIcon
            size={20}
            class="pointer text-hover"
            // @ts-ignore
            onClick={this.handleClose}>
            <Close />
          </NIcon>
        );
        return (
          <NConfigProvider theme={isDark ? darkTheme : null}>
            <NCard
              style="max-width:600px;width:80vw"
              title={i18n.global.t("commentInfo")}
              bordered={false}
              size="huge"
              role="dialog"
              aria-modal="true">
              {{
                default: () => <MainContainer />,
                "header-extra": () => <CloseBtn />,
                footer: () => <FooterContainer />,
              }}
            </NCard>
          </NConfigProvider>
        );
      },
    },
    {},
    offset
  );
}
