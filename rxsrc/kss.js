import html2canvas from 'html2canvas'
import { fromEvent, fromEventPattern } from '../demo/package/index'
import { addClass, removeClass, removeDom } from "./utils"
import './kss.scss'

const kss = (function () {
  let instance

  class kscreenshot {
    constructor (
      {
         key = 65,
         immediately = false
      }
    ) {
      const me = this

      if (instance) {
        return instance
      } else {
        instance = me
      }

      me.isScreenshot = false //是否处于截图状态
      me.html2canvas = null //html2canvas 生成的canvas

      //初始化
      me.init = () => {
        const initSource = fromEventPattern(me.start, me.end)

        fromEvent(document, 'keydown')
          .subscribe(e => {
            if (e.keyCode === key && e.shiftKey && !me.isScreenshot) {
              me.initSubsciption = initSource.subscribe()
            } else if (e.keyCode === 27) {
              me.initSubsciption && me.initSubsciption.unsubscribe()
            }
          })

        immediately && (me.initSubsciption = initSource.subscribe())
      }

      //开始截图
      me.start = () => {
        me.isScreenshot = true

        html2canvas(document.body, {useCORS:true})
          .then((canvas) => {
            me.html2canvas = canvas
            canvas.id = 'kss'

            document.body.appendChild(canvas)

            addClass(document.body, 'kssBody')

            // canvas.addEventListener('mousedown', that.startDrawDown)
          })
      }

      //结束截图
      me.end = () => {
        me.isScreenshot = false

        removeClass(document.body, 'kssBody')
        me.html2canvas && removeDom(me.html2canvas)
      }

      me.init()
    }
  }

  return kscreenshot
})()

export default kss