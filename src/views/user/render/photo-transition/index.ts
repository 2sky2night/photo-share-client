import { pubsub } from '@/utils'
import './index.css'

/**
 * 图片过渡效果
 */
export function photoTransition(top: number, left: number, width: number, height: number, url: string) {
  document.body.style.overflow = 'hidden'
  const div = document.createElement('div')
  div.classList.add('photo-transition')
  div.classList.add('photo-transition-enter')
  // 根据点击图片时视口宽度决定了过渡效果图片的尺寸
  div.classList.add(window.innerWidth <= 650 ? 'photo-mobile' : 'photo-not-mobile')
  div.style.setProperty('--width', `${width}px`)
  div.style.setProperty('--height', `${height}px`)
  div.style.setProperty('--top', `${top}px`)
  div.style.setProperty('--left', `${left}px`)
  // let isRemove = false
  const img = new Image()
  img.src = import.meta.env.VITE_IMG_URL + url;
  div.appendChild(img)
  document.body.appendChild(div)

  // 等待.3s进场动画完成移除进场动画
  setTimeout(() => {
    if (div) {
      div.classList.remove('photo-transition-enter')
      // 离场动画
      div.classList.add('photo-transition-disappear')
      setTimeout(() => {
        if (div) {
          div.remove()
        }
      },300)
    }
  }, 300)
  return
  // 什么时候卸载？动画完成就卸载，不等待了
  // const handleRemove = async () => {
  //   if (isRemove) return
  //   isRemove = true
  //   window.removeEventListener('popstate', onhandlePathChange)
  //   // 离场动画
  //   div.classList.add('photo-transition-disappear')
  //   await new Promise<void>(r => {
  //     setTimeout(() => {
  //       r()
  //     }, 300)
  //   })
  //   document.body.style.overflow = 'unset'
  //   div.remove()
  //   // 移除监听
  //   pubsub.remove('user:img-transition')
  // }
  // // 什么时候卸载？动画完成就卸载，不等待了
  // // 1.图片加载完成
  // pubsub.on('user:img-transition', handleRemove)
  // // 2.页面切换时,路由切换，卸载图片
  // const onhandlePathChange = () => {
  //   handleRemove()
  // }
  // window.addEventListener('popstate', onhandlePathChange)
}