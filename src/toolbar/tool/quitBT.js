import { css, remove } from '../../util'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import img from '../../assets/imgs/cancel.png'
import endAndClear from '../endAndClear'

export default function quitBT (me) {
    let quitBT = document.createElement('span')
    quitBT.id = 'kssQuitBT'
    quitBT.className = 'kssToolbarItemBT'
    quitBT.title = '退出截图'

    let quitImg = document.createElement('img')
    quitImg.className = 'kssToolbarItemImg'
    quitImg.src = img
    me.quitBT = quitImg

    quitBT.appendChild(quitImg)


    quitBT.addEventListener('click', function () {
        me.isEdit = true
        
        endAndClear(me)
        me.cancelCB()
    })

    return quitBT
}