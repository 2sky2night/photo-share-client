/**
 * 防抖
 * @param cb 回调 
 * @param delay  延时多少毫秒
 * @param context this 
 * @returns 
 */
export function debounce(cb: Function, delay = 500, context = window) {
  let timer: null | number = null
  return (...args: any[]) => {
    if (timer !== null) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      cb.apply(context, args)
      timer = null
    }, delay)
  }
}

/**
 * 根据原有尺寸和现有宽度计算出现有高度
 * @param width 原宽度
 * @param height 原高度
 * @param currentWidth 现有宽度
 */
export function getCurrentHeight(width: number, height: number, currentWidth: number) {
  const ratio = currentWidth / width
  return height * ratio
}

/**
 * 根据原有尺寸和现有宽度计算出现有宽度
 * @param width 原宽度
 * @param height 原高度
 * @param currentWidth 现有高度
 */
export function getCurrentWidth(width: number, height: number, currentHeight: number) {
  const ratio = currentHeight / height
  return width * ratio
}

/**
 * 格式化数量
 * @param count 
 */
export function formatCount(count: number) {
  if (count < 1000) {
    return count
  } else if (count < 10000) {
    return (count / 1000).toFixed(1) + 'k'
  } else {
    return (count / 10000).toFixed(1) + 'w'
  }
}