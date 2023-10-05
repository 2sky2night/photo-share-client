/**
 * 模态框实例
 */
export interface ModalIns {
  /**
   * 重置模态框所有的数据
   * @returns
   */
  handleReset: () => void;
  /**
   * 模态框的显隐
   * @param v 真开启急假隐藏
   * @returns
   */
  handleModalAnima: (v: boolean) => void;
}
/**
 * imgcutter实例
 */
export interface ImgCutterIns {
  /**
   * 关闭模态框
   */
  handleUnShowModal: () => void;
  /**
   * 显示模态框
   * @param e 传入鼠标对象开启良好的过渡动画效果
   */
  handleShowModal: (e?: MouseEvent) => void;
}
