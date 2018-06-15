import { css } from '../../util'
import backToPreImg from '../backToPreImg'
import makeSnapShoot from '../makeSnapShoot'

export default function circleBT () {
    let circleBT = document.createElement('span')
    circleBT.id = 'kssArrowBT'
    circleBT.innerHTML = '圆形'

    css(circleBT, {
        display: 'inline-block',
        width: '40px',
        height: '30px',
        'line-height': '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    circleBT.addEventListener('click', function () {
        me.isEdit = true

        if (me.currentToolType === 'circle') {
            return
        }

        me.currentToolType = 'circle'

        if (me.toolmousedown) {
            me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
            document.removeEventListener('mousemove', me.toolmousemove)
            document.removeEventListener('mouseup', me.toolmouseup)
        }

        me.rectangleCanvas.addEventListener('mousedown', circleMousedownEvent)
        me.toolmousedown= circleMousedownEvent

        function circleMousedownEvent (e) {
            if (e.button === 2) {
                return
            }
            document.addEventListener('mousemove', circleMousemoveEvent)
            document.addEventListener('mouseup', circleMouseupEvent)
            me.toolmousemove = circleMousemoveEvent
            me.toolmouseup = circleMouseupEvent

            function circleMousemoveEvent (e) {
                backToPreImg(me)
            }

            function circleMouseupEvent (e) {
                document.removeEventListener('mousemove', circleMousemoveEvent)
                document.removeEventListener('mouseup', circleMouseupEvent)
                makeSnapShoot(me)
            }
        }
    })

    return circleBT
}