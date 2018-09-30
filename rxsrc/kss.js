import html2canvas from 'html2canvas'
import { fromEvent, fromEventPattern, of } from 'rxjs'
import { take, takeUntil, map, concatAll } from 'rxjs/operators'
import { addClass, removeClass, removeDom, css } from "./utils"
import backRightClient from './utils/backRightClient'
import drawCanvas from './content/drawCanvas'
import createDragDom from './content/createDragDom'
import drawMiddleImage from './utils/drawMiddleImage'
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
      me.kscreenshotBox = null //截图框
      me.drawCanvas = null //用以画图的canvas
      me.drawingStatus = null //1.开始画截图框 2.画截图框 3.结束画截图框
      //截图框属性
      me.width = 0
      me.height = 0
      me.isEdit = false

      //屏幕宽高
      me.clientHeight = document.documentElement.clientHeight
      me.clientWidth = document.documentElement.clientWidth

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

            const html2canvasMousedown = fromEvent(canvas, 'mousedown')
            const html2canvasMousemove = fromEvent(document, 'mousemove')
            const html2canvasMouseup = fromEvent(document, 'mouseup')

            const mousedownSub = html2canvasMousedown
              .pipe(
                map(e => {
                  if (e.button !== 0) {
                    return html2canvasMousemove
                      .pipe(take(0))
                  }

                  me.preventMenuSub = fromEvent(document, 'contextmenu')
                    .subscribe(e => e.preventDefault())

                  startDrawBox(e)

                  return html2canvasMousemove.pipe(takeUntil(html2canvasMouseup))
                }),
                concatAll()
              )
              .subscribe(e => {
                drawingBox(e)
              })

            const mouseupSub = html2canvasMouseup
              .subscribe(e => {
                if (e.button === 1) {
                  return
                }
                if (e.button === 2) {
                  me.preventMenuSub.unsubscribe()
                  mouseupSub.unsubscribe()
                  me.end()
                } else if (e.button === 0 && me.drawingStatus !== 3) {
                  endDrawBox(e)
                }

                mousedownSub.unsubscribe()
              })
          })
      }

      //结束截图
      me.end = () => {
        me.isScreenshot = false

        removeClass(document.body, 'kssBody')

        me.html2canvas && removeDom(me.html2canvas)
        me.kscreenshotBox && removeDom(me.kscreenshotBox)

        me.html2canvas = null
        me.kscreenshotBox = null
        me.drawCanvas = null
        me.width = 0
        me.height = 0
        me.isEdit = false
      }

      //开始画截图框
      function startDrawBox (e) {
        me.drawingStatus = 1

        me.startX = e.clientX
        me.startY = e.clientY

        removeDom(document.getElementById('kscreenshotBox'))
        let kscreenshotBox = document.createElement('div')
        kscreenshotBox.id = 'kscreenshotBox'
        me.kscreenshotBox = kscreenshotBox

        document.body.appendChild(kscreenshotBox)
      }

      //画截图框
      function drawingBox (e) {
        me.drawingStatus = 2
        of(backRightClient(me, e))
          .subscribe(([clientX, clientY]) => {
            css(me.kscreenshotBox, {
              height: Math.abs(clientY - me.startY) + 'px',
              width: Math.abs(clientX - me.startX) + 'px',
              top: Math.min(me.startY, clientY) + 'px',
              left: Math.min(me.startX, clientX) + 'px'
            })
        }).unsubscribe()
      }

      //结束画截图框
      function endDrawBox (e) {
        me.drawingStatus =  3
        //鼠标未发生移动则截取全屏
        if (e.clientX === me.startX && e.clientY === me.startY) {
          me.startX = 2
          me.startY = 2
          me.height = me.clientHeight - 4
          me.width = me.clientWidth - 4
          css(me.kscreenshotBox, {
            height: me.height + 'px',
            width: me.width + 'px',
            top: me.startY + 'px',
            left: me.startX + 'px'
          })
        } else {
          const [clientX, clientY] = backRightClient(me, e)
          me.width = Math.abs(clientX - me.startX)
          me.height = Math.abs(clientY - me.startY)
          me.startX = Math.min(me.startX, clientX)
          me.startY = Math.min(me.startY, clientY)
        }

        drawCanvas(me)
        createDragDom(me)
        drawMiddleImage(me)
      }

      me.init()
    }
  }

  return kscreenshot
})()

export default kss