import { css } from '../../util'
import makeSnapShoot from '../makeSnapShoot'
import activeToolbarItem from '../activeToolbarItem'
import img from '../../assets/imgs/text.png'

export default function textBT (me) {
    let textBT = document.createElement('span')
    textBT.id = 'kssTextBT'
    textBT.className = 'kssToolbarItemBT'
    textBT.title = '字体工具'

    let textImg = document.createElement('img')
    textImg.className = 'kssToolbarItemImg'
    textImg.src = img
    me.textBT = textBT

    textBT.appendChild(textImg)

    textBT.addEventListener('click', function () {
        me.isEdit = true
        
        if (me.currentToolType === 'text') {
            return
        }

        me.currentToolType = 'text'
        activeToolbarItem(textBT)

        if (me.toolmousedown) {
            me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
            document.removeEventListener('mousemove', me.toolmousemove)
            document.removeEventListener('mouseup', me.toolmouseup)
        }

        me.rectangleCanvas.addEventListener('click', textClickEvent)
        me.toolmousedown= textClickEvent

        function textClickEvent (e) {
            let startX = e.clientX
            let startY = e.clientY
            console.log(startX)
            console.log(startY)
            console.log(me.startX)
            console.log(me.startY)
            let textarea = document.createElement('textarea')

            css(textarea, {
                position: 'absolute',
                top: startY - me.startY + 'px',
                left: startX - me.startX + 'px'
            })
        }
    })

    return textBT
}