import { css } from '../../util'
import backToPreImg from '../backToPreImg'
import makeSnapShoot from '../makeSnapShoot'
import img from '../../assets/imgs/rect.png'
import activeToolbarItem from '../activeToolbarItem'
import layerSort from '../layerSort'

export default function rectBT (me) {
    let rectBT = document.createElement('span')
    rectBT.id = 'kssRectBT'
    rectBT.className = 'kssToolbarItemBT'
    rectBT.title = '方形工具'

    let rectImg = document.createElement('img')
    rectImg.className = 'kssToolbarItemImg'
    rectImg.src = img
    me.rectBT = rectBT

    rectBT.appendChild(rectImg)

    rectBT.addEventListener('click', function () {
        me.isEdit = true
        
        if (me.currentToolType === 'rect') {
            return
        }
     
        me.currentToolType = 'rect'
        activeToolbarItem(rectBT)
        layerSort(me, 'canvasLayer')

        if (me.toolmousedown) {
            me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
            document.removeEventListener('mousemove', me.toolmousemove)
            document.removeEventListener('mouseup', me.toolmouseup)
        }

        me.rectangleCanvas.addEventListener('mousedown', rectMousedownEvent)
        me.toolmousedown= rectMousedownEvent

        function rectMousedownEvent (e) {
            if (e.button === 2) {
                return
            }
            let startX = e.clientX - me.startX
            let startY = e.clientY - me.startY
            
            document.addEventListener('mousemove', rectMousemoveEvent)
            document.addEventListener('mouseup', rectMouseupEvent)
            me.toolmousemove = rectMousemoveEvent
            me.toolmouseup = rectMouseupEvent

            function rectMousemoveEvent (e) {
                backToPreImg(me)
                let context = me.rectangleCanvas.getContext("2d")
                let endX = e.clientX
                let endY = e.clientY

                if (endX < me.startX) {
                    endX = me.startX
                } else if (endX > (me.startX + me.width)) {
                    endX = me.startX + me.width
                }

                endX -= me.startX

                if (endY < me.startY) {
                    endY = me.startY
                } else if (endY > (me.startY + me.height)) {
                    endY = me.startY + me.height
                }

                endY -= me.startY

                context.beginPath()
                context.moveTo(Math.min(startX, endX) * me.scale, Math.min(startY, endY) * me.scale)
                context.lineTo(Math.max(startX, endX) * me.scale, Math.min(startY, endY) * me.scale)
                context.lineTo(Math.max(startX, endX) * me.scale, Math.max(startY, endY) * me.scale)
                context.lineTo(Math.min(startX, endX) * me.scale, Math.max(startY, endY) * me.scale)
                context.lineTo(Math.min(startX, endX) * me.scale, Math.min(startY, endY) * me.scale)
                context.lineWidth = 1
                context.strokeStyle = me.toolbarColor
                context.stroke()  
                context.closePath()
            }

            function rectMouseupEvent (e) {
                document.removeEventListener('mousemove', rectMousemoveEvent)
                document.removeEventListener('mouseup', rectMouseupEvent)
                makeSnapShoot(me)
            }
        }
    })

    return rectBT
}