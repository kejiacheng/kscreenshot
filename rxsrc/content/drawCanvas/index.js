import { fromEvent } from 'rxjs'
import { css } from "../../utils"
import drawMiddleImage from '../../utils/drawMiddleImage'
import clearMiddleImage from '../../utils/clearMiddleImage'

export default function drawCanvas (me) {
  const drawCanvas = document.createElement('canvas')
  drawCanvas.id = 'drawCanvas'

  me.kscreenshotBox.appendChild(drawCanvas)
  me.drawCanvas = drawCanvas

  const drawCanvasMousedown = fromEvent(drawCanvas, 'mousedown')
  const drawCanvasMousemove = fromEvent(document, 'mousemove')
  const drawCanvasMouseup = fromEvent(document, 'mouseup')
  let startX, startY
  let top, left

  drawCanvasMousedown
    .subscribe(e => {
      if (me.isEdit) {
        return
      }

      clearMiddleImage(me)
      startX = e.clientX
      startY = e.clientY

      const mousemoveSub = drawCanvasMousemove
        .subscribe(e => {
          let clientHeight = me.clientHeight
          let clientWidth = me.clientWidth

          top = me.startY + e.clientY - startY

          if (me.startY + e.clientY - startY + me.height > clientHeight) {
            top = clientHeight - me.height
          }

          if (me.startY + e.clientY - startY < 0) {
            top = 0
          }

          left = me.startX + e.clientX - startX

          if (me.startX + e.clientX - startX + me.width > clientWidth) {
            left = clientWidth - me.width
          }

          if (me.startX + e.clientX - startX < 0) {
            left = 0
          }

          css(me.kscreenshotBox, {
            top: top + 'px',
            left: left + 'px'
          })
        })

      const mouseupSub = drawCanvasMouseup
        .subscribe(e => {
          me.startY = top
          me.startX = left

          drawMiddleImage(me)
          mousemoveSub.unsubscribe()
          mouseupSub.unsubscribe()
        })
    })
}