import { css, remove, typeChecking } from '../../util'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import copy from '../copy'
import download from '../download'
import endAndClear from '../endAndClear'

export default function completeBT (me) {
    let completeBT = document.createElement('span')
    completeBT.id = 'kssCompleteBT'
    completeBT.className = 'kssToolbarItemBT'
    completeBT.innerHTML = '完成'
    completeBT.title = '完成截图'

    css(completeBT, {
        width: '40px',
        'line-height': '28px'
    })

    completeBT.addEventListener('click', async function () {
        me.isEdit = true
        
        const lastShot = me.snapshootList[me.snapshootList.length - 1]
        copy(me, lastShot)
        me.needDownload === true && (await download(me))
        typeChecking(me.endCB) === '[object Function]' && me.endCB(lastShot)
        endAndClear(me)
    })

    return completeBT
}