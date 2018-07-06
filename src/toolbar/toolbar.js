import { css } from '../util'

import complete from './tool/complete'
import arrowBT from './tool/arrowBT'
import backBT from './tool/backBT'
import drawLineBT from './tool/drawLineBT'
import rectBT from './tool/rectBT'
import ellipseBT from './tool/ellipseBT'
import colorBT from './tool/colorBT'
import textBT from './tool/textBT'

import toolbarMiddleArea from './toolbarMiddleArea'
import toolbarPosition from './toolbarPosition'

export default function createToolbar (toolbarWidth, toolbarHeight, toolbarMarginTop, me) {
    let toolbar = document.createElement('div')
    toolbar.id = 'kssToolbar'

    css(toolbar, {
        top: me.height + toolbarMarginTop + 'px',
        width: toolbarWidth + 'px',
        height: toolbarHeight + 'px'
    })

    toolbarPosition(me, me.width, me.height, me.startY, me.startX, toolbar)
    
    toolbar.appendChild(complete(me))
    toolbar.appendChild(backBT(me))
    toolbar.appendChild(arrowBT(me))
    toolbar.appendChild(drawLineBT(me))
    toolbar.appendChild(rectBT(me))
    toolbar.appendChild(ellipseBT(me))
    toolbar.appendChild(colorBT(me))
    toolbar.appendChild(textBT(me))
    
    toolbar.appendChild(toolbarMiddleArea(me))

    me.kssScreenShotWrapper.appendChild(toolbar)

    return toolbar
}