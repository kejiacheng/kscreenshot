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

        me.rectangleCanvas.addEventListener('mousedown', drawLineMousedownEvent)

        function drawLineMousedownEvent (e) {
            document.removeEventListener('mousedown', me.arrowMousedownEvent)
            document.removeEventListener('mousemove', me.arrowMousemoveEvent)
            document.removeEventListener('mouseup', me.arrowMouseupEvent)
     
            let context = me.rectangleCanvas.getContext("2d")
            context.beginPath()
            context.moveTo(e.clientX - me.startX, e.clientY - me.startY)
            context.lineWidth = 10
            context.strokeStyle="red";
     
            document.addEventListener('mousemove', drawLineMousemoveEvent)
            document.addEventListener('mouseup', drawLineMouseupEvent)

            function drawLineMousemoveEvent (e) {
                context.lineTo(e.clientX - me.startX, e.clientY - me.startY)
                context.stroke()  
            }
            
            function drawLineMouseupEvent (e) {
                context.closePath()

                makeSnapShoot(me)

                document.removeEventListener('mousemove', drawLineMousemoveEvent)
                document.removeEventListener('mouseup', drawLineMouseupEvent)
            }

            me.drawLineMousemoveEvent = drawLineMousemoveEvent
            me.drawLineMouseupEvent = drawLineMouseupEvent
        }

        me.drawLineMousedownEvent = drawLineMousedownEvent
    })

    return drawLineBT
}