/**
 * 事件监听的回调
 */
export type ListenerHandle = (token: string, ...args: any[]) => any;
/**
 * 消息订阅发布
 */
export class Pubsub<Token extends string> {
  private channels: {
    [propName: string]: Function[];
  };
  constructor() {
    this.channels = {};
  }
  /**
   * 事件触发
   * @param token 频道名称
   * @param args 事件触发时注入的参数
   */
  emit(token: Token, ...args: any[]) {
    const channel = this.findChannel(token);
    if (channel === undefined) {
      console.info("无此频道,已经为你创建频道:" + token);
      this.addChannel(token);
    } else {
      channel.forEach((cb) => {
        cb(token, ...args);
      });
    }
  }
  /**
   * 事件监听
   * @param token
   * @param cb
   */
  on(token: Token, cb: ListenerHandle) {
    const channel = this.findChannel(token);
    if (channel === undefined) {
      console.info("无此频道，已经为你先创建此频道" + token);
      this.addChannel(token, cb);
    } else {
      channel.push(cb);
    }
  }
  /**
   * 移除某个频道的监听
   * @param token 频道id
   * @param cb 哪个监听者要被移除
   */
  removeOn(token: Token, cb: ListenerHandle) {
    const channel = this.findChannel(token);
    if (channel) {
      if (
        !channel.some((ele, index) => {
          if (ele === cb) {
            channel.splice(index, 1);
            console.log(`频道:${token}:删除监听者${cb.name}成功!`);
            return true;
          }
        })
      ) {
        console.info(`频道:${token}:该频道不存在该监听者:${cb.name}`);
      }
    } else {
      console.info("不存在该频道:" + token);
    }
  }
  /**
   * 移除整个频道
   * @param token
   */
  remove(token: Token) {
    const channel = this.findChannel(token);
    if (channel) {
      Reflect.deleteProperty(this.channels, token);
    } else {
      console.info("不存在该频道:" + token);
    }
  }
  /**
   * 寻找频道
   * @param token 频道id
   */
  private findChannel(token: string) {
    return Reflect.get(this.channels, token);
  }
  /**
   * 创建频道
   * @param token 频道id
   * @param cb 回调
   */
  private addChannel(token: string, cb?: Function) {
    this.channels[token] = cb ? [cb] : [];
    return void 0;
  }
}

/**
 * 默认单实例的PubSub
 */
export const pubsub = new Pubsub<Token>();

/**
 * 本次项目所用的token（频道名称）
 */
type Token =
  /**
   * 前台项目：视口滚动到底部的事件
   */
  | "user:page-bottom"
  /**
   * 前台项目：发送评论的事件
   */
  | "user:post-comment"
  /**
   * 前台项目：需要滚动到顶部
   */
  | "user:to-top"
  /**
   * 全局：窗口尺寸变化的事件
   */
  | "window.resize"
  /**
   * 前台项目：搜索框需要聚焦的事件
   */
  | "user:search-input-focus"
  /**
   * 后台项目：页面滚动到底部的事件
   */
  | "admin:page-bottom"
  /**
   * 后台项目：页面需要滚动到顶部
   */
  | "admin:to-top";
