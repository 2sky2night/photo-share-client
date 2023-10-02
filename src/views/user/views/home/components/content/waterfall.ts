import { nextTick, watch } from 'vue'
import type { Photo } from "@/apis/photo/types";

// 只使用了防抖 虽说最终处理每个元素时重排次数较多，但是在瀑布流容器尺寸发生变化时不会再重排了
class WaterFallResolve {
  /**
   * 图片列表
   */
  list: Photo[];
  /**
   * 列数
   */
  column: number;
  /**
   * 每列高度
   */
  columnsHeight: number[];
  /**
   * 瀑布流容器
   */
  rootDOM: HTMLElement;
  /**
   * 孩子容器
   */
  childDOM: HTMLCollectionOf<HTMLElement>;
  /**
   * 瀑布流容器大小的监听器
   */
  observer: null | ResizeObserver;
  /**
   * 每一列的宽度
   */
  columnWidth: number;
  /**
   * 上下之间的间距
   */
  gap: number;
  /**
   * 防抖版的resolve
   */
  debounceResolve = this.debounceResolveMaker()
  /**
   * 防抖延迟时间?
   */
  delay = 500
  constructor(list: Photo[], column: number, rootDOM: HTMLElement, gap: number) {
    this.list = list
    this.column = column
    this.columnsHeight = Object.seal(Array.from<number>({ length: column }).fill(0))
    this.rootDOM = rootDOM;
    this.gap = gap
    // 计算出每列的宽度
    this.columnWidth = (rootDOM.clientWidth - (this.gap * (this.column - 1))) / this.column
    this.observer = null
    // @ts-ignore
    this.childDOM = this.rootDOM.getElementsByClassName('photo-item')
    this.init()
  }
  init() {
    this.rootDOM.style.position = 'relative'
    // 监听瀑布流容器宽度发送变化的回调
    this.observer = new ResizeObserver(() => {
      // 根据视口宽度设置每列个数
      if (window.innerWidth <= 500) {
        // 500 每列两个
        this.updateColumn(2)
      } else if (window.innerWidth <= 800) {
        // 800 每列3个
        this.updateColumn(3)
      } else {
        // 每列4个
        this.updateColumn(4)
      }
    })
    // 监听瀑布流容器
    this.observer.observe(this.rootDOM)
    watch(() => this.list.length, () => {
      nextTick(() => this.resolve())
    }, { immediate: true })
  }
  /**
   * 防抖版本的resolve
   * 避免短时间内大量数据更新或容器尺寸变化过快导致频繁触发resolve
   */
  debounceResolveMaker() {
    let timer: null | number = null;
    const context = this
    return function () {
      if (timer !== null) {
        clearInterval(timer)
      }
      timer = setTimeout(function () {
        context.resolve()
      }, context.delay)
    }
  }
  /**
   * 重置每列高度
   */
  resetHeight() {
    for (let index = 0; index < this.columnsHeight.length; index++) {
      this.columnsHeight[index] = 0
    }
  }
  /**
   * 更新瀑布流的列数布局
   * @param num 
   */
  updateColumn(num: number) {
    this.column = num
    // 重置所有列数组
    this.columnsHeight = Object.seal(Array.from<number>({ length: this.column }).fill(0))
    // 重新计算每项的空间
    this.columnWidth = (this.rootDOM.clientWidth - (this.gap * (this.column - 1))) / this.column
    // 重新计算每项的位置
    this.debounceResolve()
  }
  /**
   * 处理瀑布流中每个元素的布局
   */
  resolve() {
    this.resetHeight()
    // 遍历每一个元素
    out: for (let index = 0; index < this.childDOM.length;) {
      /**
       * 瀑布流规则
       * 当前行的第一项所处的列必须是上一行中高度最矮的列
       * 当前行的第二项所处的列必须是上一行中高度倒数第二矮的列
       * ...
      */

      // 从小到大排序当前所有列高度
      const columnList = this.columnsHeight.map((column, index) => ({ column: index, height: column })).sort((a, b) => a.height - b.height)
      // 遍历当前行，每次处理一行的内容
      for (let j = 0; j < columnList.length; j++) {
        // 获取当前的某个项
        const target = this.childDOM[index]
        const item = columnList[j]
        // 获取当前图片项
        const photo = this.list[index]
        if (target) {
          // 设置绝对定位
          target.style.position = 'absolute'
          // 设置图片高度
          const imgContainer = target.querySelector('.img-container') as HTMLElement
          if (imgContainer) {
            imgContainer.style.height = this.getHeight(photo.photos[0].width, photo.photos[0].height)
          }
          // 设置图片项的宽度
          target.style.width = this.columnWidth + 'px'
          // 设置当前列的left偏移量
          target.style.left = `${(this.columnWidth + this.gap) * item.column}px`
          // 设置当前列的height偏移量
          target.style.top = this.columnsHeight[item.column] + 'px'
          // 更新当前列的高度
          this.columnsHeight[item.column] += target.clientHeight + this.gap;
          index++
        } else {
          break out;
        }
      }

    }
    // 由于子元素都是脱离文档流的，导致瀑布流布局容器高度塌陷，我们帮他设置高度
    this.rootDOM.style.height = Math.max(...this.columnsHeight) + 'px'
  }
  /**
   * 释放相关监听器
   */
  release() {
    // 释放侦听器
    this.observer?.unobserve(this.rootDOM)
    this.observer?.disconnect()
  }
  /**
   * 暂停监听容器是否发生变化
   */
  pauseObeserve() {
    this.observer?.unobserve(this.rootDOM)
  }
  /**
   * 开启监听
   */
  startObserve() {
    this.observer?.observe(this.rootDOM)
  }

  /**
   * 根据图片原有宽度和现成宽度的比例，计算出当前图片的高度
   * @param width 图片原有宽度
   * @param height 图片原有高度
   */
  getHeight(width: number, height: number) {
    const rate = this.columnWidth / width
    return height * rate + 'px'
  }
}
export default WaterFallResolve


// 该版本使用防抖+css变量+由于会改变css变量，该变量作用与容器大小，所以会导致重排次数较多
// class WaterFallResolve {
//   /**
//    * 图片列表
//    */
//   list: Photo[];
//   /**
//    * 列数
//    */
//   column: number;
//   /**
//    * 每列高度
//    */
//   columnsHeight: number[];
//   /**
//    * 瀑布流容器
//    */
//   rootDOM: HTMLElement;
//   childDOM: HTMLCollectionOf<HTMLElement>;
//   /**
//    * 瀑布流容器大小的监听器
//    */
//   observer: null | ResizeObserver;
//   /**
//    * 每一列的宽度
//    */
//   columnWidth: number;
//   /**
//    * 上下之间的间距
//    */
//   gap: number;
//   /**
//    * 防抖版的resolve
//    */
//   debounceResolve = this.debounceResolveMaker()
//   constructor(list: Photo[], column: number, rootDOM: HTMLElement, gap: number) {
//     this.list = list
//     this.column = column
//     this.columnsHeight = Object.seal(Array.from<number>({ length: column }).fill(0))
//     this.rootDOM = rootDOM;
//     this.gap = gap
//     // 计算出每列的宽度
//     this.columnWidth = (rootDOM.clientWidth - (this.gap * (this.column - 1))) / this.column
//     this.observer = null
//     // @ts-ignore
//     this.childDOM = this.rootDOM.getElementsByClassName('photo-item')
//     this.init()
//   }
//   init() {
//     this.rootDOM.style.position = 'relative'
//     // 在瀑布流容器上保存相关css变量
//     this.rootDOM.style.setProperty('--root-width', this.rootDOM.clientWidth + 'px')
//     // 子容器的图片大小宽度
//     this.rootDOM.style.setProperty('--img-width', ((this.rootDOM.clientWidth - (this.gap * (this.column - 1))) / this.column) + 'px')
//     // 监听瀑布流容器尺寸发送变化的回调
//     this.observer = new ResizeObserver((e) => {
//       const [entry] = e
//       // 更新每一列的宽度
//       this.columnWidth = (entry.contentRect.width - (this.gap * (this.column - 1))) / this.column
//       this.rootDOM.style.setProperty('--root-width', entry.contentRect.width + 'px')
//       this.rootDOM.style.setProperty('--img-width', this.columnWidth + 'px')
//       // 重新排列整个瀑布流
//       this.debounceResolve()
//     })
//     // 监听瀑布流容器
//     this.observer.observe(this.rootDOM)
//     watch(() => this.list.length, () => {
//       nextTick(() => this.resolve())
//     })
//   }
//   /**
//    * 防抖版本的resolve
//    * 避免短时间内大量数据更新或容器尺寸变化过快导致频繁触发resolve
//    */
//   debounceResolveMaker() {
//     let timer: null | number = null;
//     const context = this
//     return function () {
//       if (timer !== null) {
//         clearInterval(timer)
//       }
//       timer = setTimeout(function () {
//         context.resolve()
//       }, 500)
//     }
//   }
//   /**
//    * 重置每列高度
//    */
//   resetHeight() {
//     for (let index = 0; index < this.columnsHeight.length; index++) {
//       this.columnsHeight[index] = 0
//     }
//   }
//   /**
//    * 处理瀑布流中每个元素的布局
//    */
//   resolve() {
//     this.resetHeight()
//     // 遍历每一个元素
//     out: for (let index = 0; index < this.childDOM.length;) {
//       /**
//        * 瀑布流规则
//        * 当前行的第一项所处的列必须是上一行中高度最矮的列
//        * 当前行的第二项所处的列必须是上一行中高度倒数第二矮的列
//        * ...
//       */
//       // 从小到大排序当前所有列高度
//       const columnList = this.columnsHeight.map((column, index) => ({ column: index, height: column })).sort((a, b) => a.height - b.height)
//       // 遍历当前行，每次处理一行的内容
//       for (let j = 0; j < columnList.length; j++) {
//         // 获取当前的某个项
//         const target = this.childDOM[index]
//         const item = columnList[j]
//         if (target) {
//           // 设置绝对定位
//           target.style.position = 'absolute'
//           // 设置图片高度
//           target.style.setProperty('--img-height', this.getHeight(this.list[index].photos[0].width, this.list[index].photos[0].height))
//           // 设置当前列的left偏移量
//           target.style.left = `${(this.columnWidth + this.gap) * item.column}px`
//           // 设置当前列的height偏移量
//           target.style.top = this.columnsHeight[item.column] + 'px'
//           // 更新当前列的高度
//           this.columnsHeight[item.column] += target.clientHeight + this.gap;
//           index++
//         } else {
//           break out;
//         }
//       }

//     }
//   }
//   /**
//    * 释放相关监听器
//    */
//   release() {
//     console.log('释放');
//     // 释放侦听器
//     this.observer?.unobserve(this.rootDOM)
//     this.observer?.disconnect()
//   }
//   /**
//    * 根据图片原有宽度和现成宽度的比例，计算出当前图片的高度
//    * @param width 图片原有宽度
//    * @param height 图片原有高度
//    */
//   getHeight(width: number, height: number) {
//     const rate = this.columnWidth / width
//     return height * rate + 'px'
//   }
// }

// export default WaterFallResolve

