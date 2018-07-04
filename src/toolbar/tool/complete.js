import { css, remove } from '../../util'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import copy from '../copy'
import download from '../download'
import endAndClear from '../endAndClear'

export default function complete (me) {
    let completeBT = document.createElement('span')
    completeBT.id = 'kssCompleteBT'
    completeBT.className = 'kssToolbarItemBT'
    completeBT.innerHTML = '完成'
    completeBT.title = '完成截图'

    css(completeBT, {
        width: '40px',
        'line-height': '30px'
    })

    completeBT.addEventListener('click', function () {
        me.isEdit = true
        
        copy(me, me.snapshootList[me.snapshootList.length - 1])
        download(me)
        endAndClear(me)
    })

    return completeBT
}