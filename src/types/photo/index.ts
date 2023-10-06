/**
 * 审核状态
 */
export enum AuditStatus {
  /**
   * 未审核
   */
  NO_AUDIT = 0,
  /**
   * 审核通过
   */
  PASS = 1,
  /**
   * 审核不通过
   */
  NO_PASS = 2,
}

/**
 * 审核结果推送
 */
export interface PhotoAuditResult {
  pid: number;
  uid: number;
  status: AuditStatus;
  desc?: string;
}
