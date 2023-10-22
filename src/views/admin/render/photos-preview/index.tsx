import { styled } from "@styils/vue";
import { renderModal } from "@/render";
import { NIcon } from "naive-ui";
import {
  AddCircle28Filled as AddIcon,
  SubtractCircle28Filled as SubIcon,
  ArrowCounterclockwise28Filled as UnWiseRotateIcon,
  ArrowClockwise28Filled as WiseRotateIcon,
  ArrowCircleRight32Filled as RightIcon,
  ArrowCircleLeft32Filled as LeftIcon,
} from "@vicons/fluent";
import { CloseCircleSharp as CloseIcon } from "@vicons/ionicons5";
import { config } from "@/config";
import type { CSSProperties } from "vue";

/**
 * 预览照片
 * @param photos
 */
export function photosPreviews(photos: string[]) {
  // 整个视图
  const Container = styled("div", {
    width: "100vw",
    color: "#fff",
    display: "flex",
    padding: "0 60px",
    justifyContent: "center",
    boxSizing: "border-box",
    position: "relative",
  });

  // 图片
  const PhotoContent = styled("div", {});

  // 图片容器
  const ImgContent = styled("img", {
    height: "80vh",
    objectFit: "contain",
    transition: "transform var(--time-normal)",
  });

  // leftButton
  const LeftButton = styled("button", {
    all: "unset",
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    i: {
      color: "#fff",
      transition: "color var(--time-normal)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      i: {
        color: "#bbb !important",
      },
    },
  });

  // rightButton
  const RigthButton = styled("button", {
    all: "unset",
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    i: {
      color: "#fff",
      transition: "color var(--time-normal)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      i: {
        color: "#bbb",
      },
    },
  });

  // 工具
  const ToolContainer = styled("div", {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "8px 15px",
    borderRadius: "10px",
    backgroundColor: "var(--mask-color)",
    alignItems: "center",
    display: "flex",
    zIndex: "1",
    i: {
      cursor: "pointer",
      color: "#fff",
      transition: "color var(--time-normal)",
      "&:hover": {
        color: "var(--primary-color)",
      },
    },
  });

  renderModal(
    {
      emits: ["close"],
      data() {
        return {
          currentIndex: 0,
          scale: 1,
          rotate: 0,
        };
      },
      computed: {
        // 左不可用
        disabledLeft() {
          return this.currentIndex === 0;
        },
        // 右不可用
        disabledRight() {
          return this.currentIndex === photos.length - 1;
        },
        // 图片的预览设置
        imgStyle(): CSSProperties {
          return {
            transform: `scale(${this.scale}) rotate(${this.rotate}deg)`,
          };
        },
      },
      methods: {
        // 放大
        handleAddScale() {
          this.scale += 0.1;
        },
        // 缩小
        handleSubScale() {
          if (this.scale - 0.1 > 0) {
            this.scale -= 0.1;
          } else {
            this.scale = 0.1;
          }
        },
        // 顺时针旋转
        handleWiseRotate() {
          this.rotate += 20;
        },
        // 逆时针顺序
        handleUnWiseRotate() {
          this.rotate -= 20;
        },
        // 重置偏移量
        resetSetting() {
          this.scale = 1;
          // 逆时针
          let sub = this.scale;
          // 顺时针
          let add = this.scale;
          // 通过顺时针逆时针谁先到360的倍数就赋值为谁，优化动画效果
          while (sub % 360 !== 0) {
            sub--;
          }
          while (add % 360 !== 0) {
            add++;
          }
          if (Math.abs(sub) >= add) {
            // 逆时针到360倍数大于add
            this.rotate = add;
          } else {
            // 顺时针到360倍数大于sub
            this.rotate = sub;
          }
        },
        // 关闭模态框
        handleClose(e: MouseEvent) {
          // 有data-close的就关闭容器
          const target = e.target as HTMLElement;
          if (target.dataset.close) {
            this.handleCloseDire();
          }
        },
        // 直接关闭模态框
        handleCloseDire() {
          this.$emit("close");
        },
        // 上一张
        handleGoLeft(e: MouseEvent) {
          e.stopPropagation();
          this.resetSetting();
          this.currentIndex--;
        },
        // 下一张
        handleGoRight(e: MouseEvent) {
          e.stopPropagation();
          this.resetSetting();
          this.currentIndex++;
        },
      },
      render() {
        const {
          currentIndex,
          handleGoRight,
          handleGoLeft,
          handleClose,
          imgStyle,
          handleAddScale,
          handleSubScale,
          handleUnWiseRotate,
          handleWiseRotate,
          handleCloseDire,
        } = this;

        // 工具栏组件
        const Tool = () => (
          <ToolContainer>
            <NIcon
              // @ts-ignore
              onClick={handleAddScale}
              size={25}
              class="mr-5">
              <AddIcon />
            </NIcon>
            <NIcon
              // @ts-ignore
              onClick={handleSubScale}
              size={25}
              class="mr-5">
              <SubIcon />
            </NIcon>
            <NIcon
              size={25}
              // @ts-ignore
              onClick={handleUnWiseRotate}
              class="mr-5">
              <UnWiseRotateIcon />
            </NIcon>
            <NIcon
              size={25}
              class="mr-5"
              // @ts-ignore
              onClick={handleWiseRotate}>
              <WiseRotateIcon />
            </NIcon>
            <NIcon
              // @ts-ignore
              onClick={handleCloseDire}
              size={25}>
              <CloseIcon />
            </NIcon>
          </ToolContainer>
        );

        return photos.length === 1 ? (
          <>
            <Tool />
            <PhotoContent>
              <ImgContent
                style={imgStyle}
                src={`${
                  config.IMG_BASE_URL + photos[currentIndex]
                }`}></ImgContent>
            </PhotoContent>
          </>
        ) : (
          <>
            <Tool />
            <Container
              onClick={handleClose}
              data-close>
              <LeftButton
                onClick={handleGoLeft}
                disabled={this.disabledLeft}>
                <NIcon size={50}>
                  <LeftIcon />
                </NIcon>
              </LeftButton>
              <PhotoContent>
                <ImgContent
                  style={imgStyle}
                  src={`${
                    config.IMG_BASE_URL + photos[currentIndex]
                  }`}></ImgContent>
              </PhotoContent>
              <RigthButton
                onClick={handleGoRight}
                disabled={this.disabledRight}>
                <NIcon size={50}>
                  <RightIcon />
                </NIcon>
              </RigthButton>
            </Container>
          </>
        );
      },
    },
    {},
    undefined,
    true
  );
}
