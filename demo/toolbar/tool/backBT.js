import { css } from '../../util'
import backToPreImg from '../backToPreImg';

export default function backBT (me) {
    let backBT = document.createElement('span')
    backBT.id = 'kssbackeBT'
    backBT.innerHTML = '后退'

    css(backBT, {
        display: 'inline-block',
        width: '40px',
        height: '30px',
        'line-height': '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    backBT.addEventListener('click', function () {
        me.snapshootList.length > 1 && me.snapshootList.pop()
        me.currentImgDom.src = me.snapshootList[me.snapshootList.length - 1]
        setTimeout(function () {
            backToPreImg(me)
        }, 0)
    })

    return backBT
} 