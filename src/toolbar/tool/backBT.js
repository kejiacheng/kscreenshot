import { css } from '../../util'
import backToPreImg from '../backToPreImg'
import img from '../../assets/imgs/back.png'

export default function backBT (me) {
    let backBT = document.createElement('span')
    backBT.id = 'kssbackeBT'
    backBT.className = 'kssToolbarBT'
    backBT.title = '后退'

    css(backBT, {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    let backImg = document.createElement('img')
    backImg.src = img
    me.backBT = backBT
    css(backImg, {
        width: '20px',
        height: '20px',
        'margin-top': '5px'
    })

    backBT.appendChild(backImg)

    backBT.addEventListener('click', function () {
        if (me.snapshootList.length > 1) {
            if (me.snapshootList.length === 2) {
                me.isEdit = false
                me.currentToolType = null
                me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
                document.removeEventListener('mousemove', me.toolmousemove)
                document.removeEventListener('mouseup', me.toolmouseup)
            }
            me.snapshootList.pop()
        }
      
        me.currentImgDom.src = me.snapshootList[me.snapshootList.length - 1]
        setTimeout(function () {
            backToPreImg(me)
        }, 0)
    })

    return backBT
} 