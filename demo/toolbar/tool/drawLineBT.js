import { css } from '../../util'
import makeSnapShoot from '../makeSnapShoot'

export default function drawLineBT (me) {
    let drawLineBT = document.createElement('span')
    drawLineBT.id = 'kssDrawLineBT'
    drawLineBT.innerHTML = '画线'

    css(drawLineBT, {
        display: 'inline-block',
        width: '40px',
        height: '30px',
        'line-height': '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    drawLineBT.addEventListener('click', function () {
        me.isEdit = true
        
        if (me.currentToolType === 'drawLine') {
            return
        }
     
        me.currentToolType = 'drawLine'
       
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
            context.moveTo(e.clientX - me.startX, e.clientY - me.startY)
            context.lineWidth = 10
            context.strokeStyle = me.toolbarColor
     
            document.addEventListener('mousemove', drawLineMousemoveEvent)
            document.addEventListener('mouseup', drawLineMouseupEvent)
            me.toolmousemove = drawLineMousemoveEvent
            me.toolmouseup = drawLineMouseupEvent

            function drawLineMousemoveEvent (e) {
                context.lineTo(e.clientX - me.startX, e.clientY - me.startY)
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