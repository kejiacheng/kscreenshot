import { css, remove } from '../../util'
import arrow from '../arrow'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import backToPreImg from '../backToPreImg'
import makeSnapShoot from '../makeSnapShoot'

export default function arrowBT (me) {
    let arrowBT = document.createElement('span')
    arrowBT.id = 'kssArrowBT'
    css(arrowBT, {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })
    let arrowImg = document.createElement('img')
    arrowImg.src = '../../assets/imgs/arrow.png'

    css(arrowImg, {
        width: '20px',
        height: '20px',
        'margin-top': '5px'
    })

    arrowBT.appendChild(arrowImg)

    arrowBT.addEventListener('click', function () {
        me.isEdit = true
        
        if (me.currentToolType === 'arrow') {
            return
        }

        me.currentToolType = 'arrow'

        me.rectangleCanvas.addEventListener('mousedown', arrowMousedownEvent)
        
        function arrowMousedownEvent (e) {
            document.removeEventListener('mousedown', me.drawLineMousedownEvent)
            document.removeEventListener('mousemove', me.drawLineMousemoveEvent)
            document.removeEventListener('mouseup', me.drawLineMouseupEvent)
            // if (e.button === 2) {
            //     return
            // }
            let startX = e.clientX
            let startY = e.clientY
            
            document.addEventListener('mousemove', arrowMousemoveEvent)
            document.addEventListener('mouseup', arrowMouseupEvent)

            function arrowMousemoveEvent (e) {
                backToPreImg(me)
                let endX = e.clientX
                let endY = e.clientY
            
                if (endX < me.startX) {
                    endX = me.startX
                } else if (endX > (me.startX + me.width)) {
                    endX = me.startX + me.width
                }

                if (endY < me.startY) {
                    endY = me.startY
                } else if (endY > (me.startY + me.height)) {
                    endY = me.startY + me.height
                }
    
                arrow({x: startX - me.startX, y: startY - me.startY}, {x: endX - me.startX, y: endY - me.startY}, me)
            }

            function arrowMouseupEvent (e) {
                let endX = e.clientX
                let endY = e.clientY

                if (startX === endX && startY === endY) {
                    document.removeEventListener('mousemove', arrowMousemoveEvent)
                    document.removeEventListener('mouseup', arrowMouseupEvent)
                    return
                }

                makeSnapShoot(me)
                
                document.removeEventListener('mousemove', arrowMousemoveEvent)
                document.removeEventListener('mouseup', arrowMouseupEvent)
            }

            me.arrowMousemoveEvent = arrowMousemoveEvent
            me.arrowMouseupEvent = arrowMouseupEvent
        }

        me.arrowMousedownEvent = arrowMousedownEvent
    })

    return arrowBT
}