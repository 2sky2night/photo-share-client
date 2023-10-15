export interface PhotoListIns {
  /**
   * 重置页码和数据、相关副作用，加载数据
   */
  handleReset: () => Promise<void>;
}
