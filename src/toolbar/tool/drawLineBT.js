import { css } from '../../util'
import makeSnapShoot from '../makeSnapShoot'
import img from '../../assets/imgs/draw.png'
import activeToolbarItem from '../activeToolbarItem'
import layerSort from '../layerSort'

export default function drawLineBT (me) {
    let drawLineBT = document.createElement('span')
    drawLineBT.id = 'kssDrawLineBT'
    drawLineBT.className = 'kssToolbarItemBT'
    drawLineBT.title = '画刷工具'

    let drawLineImg = document.createElement('img')
    drawLineImg.className = 'kssToolbarItemImg'
    drawLineImg.src = img
    me.drawLineBT = drawLineBT

    drawLineBT.appendChild(drawLineImg)

    drawLineBT.addEventListener('click', function () {
        me.isEdit = true
        
        let kssSetLineWidth = document.getElementById('kssSetLineWidth')
        let clientHeight = document.documentElement.clientHeight
        let bottomSurplus = clientHeight - me.startY - me.height - me.toolbarMarginTop - me.toolbarHeight
        
        if (bottomSurplus < 0) {
            css(kssSetLineWidth, {
                top: '30px',
            })
        } else {
            css(kssSetLineWidth, {
                top: '-40px',
            })
        }

        kssSetLineWidth.style.display = 'block'
        kssSetLineWidth.focus()

        if (me.currentToolType === 'drawLine') {
            return
        }
     
        me.currentToolType = 'drawLine'
        activeToolbarItem(drawLineBT)
        layerSort(me, 'canvasLayer')
       
       if (me.toolmousedown) {
            me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
            document.removeEventListener('mousemove', me.toolmousemove)
            document.removeEventListener('mouseup', me.toolmouseup)
        }

        me.rectangleCanvas.addEventListener('mousedown', drawLineMousedownEvent)
        me.toolmousedown= drawLineMousedownEvent

        function drawLineMousedownEvent (e) {
            if (e.button === 2) {
                return
            }
            let context = me.rectangleCanvas.getContext("2d")
            context.beginPath()
            context.moveTo((e.clientX - me.startX) * me.scale, (e.clientY - me.startY) * me.scale)
            
            context.strokeStyle = me.toolbarColor
     
            document.addEventListener('mousemove', drawLineMousemoveEvent)
            document.addEventListener('mouseup', drawLineMouseupEvent)
            me.toolmousemove = drawLineMousemoveEvent
            me.toolmouseup = drawLineMouseupEvent

            function drawLineMousemoveEvent (e) {
                context.lineWidth = me.toolbarLineWidth
                context.lineTo((e.clientX - me.startX) * me.scale, (e.clientY - me.startY) * me.scale)
                context.stroke()  
            }
            
            function drawLineMouseupEvent (e) {
                context.closePath()
                document.removeEventListener('mousemove', drawLineMousemoveEvent)
                document.removeEventListener('mouseup', drawLineMouseupEvent)
                makeSnapShoot(me)
            }
        }
    })

    return drawLineBT
}