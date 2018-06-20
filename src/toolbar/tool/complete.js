import { css, remove } from '../../util'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import copy from '../copy'
import download from '../download'
import endAndClear from '../endAndClear'

export default function complete (me) {
    let completeBT = document.createElement('span')
    completeBT.id = 'kssCompleteBT'
    completeBT.innerHTML = '完成'
    completeBT.title = '完成截图'

    css(completeBT, {
        display: 'inline-block',
        width: '40px',
        height: '30px',
        'line-height': '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    completeBT.addEventListener('click', function () {
        me.isEdit = true
        
        copy(me.snapshootList[me.snapshootList.length - 1])
        download(me)
        endAndClear(me)
    })

    return completeBT
}