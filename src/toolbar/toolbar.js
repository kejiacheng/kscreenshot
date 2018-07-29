import { css, typeChecking } from '../util'

import completeBT from './tool/completeBT'
import quitBT from './tool/quitBT'
import arrowBT from './tool/arrowBT'
import backBT from './tool/backBT'
import drawLineBT from './tool/drawLineBT'
import rectBT from './tool/rectBT'
import ellipseBT from './tool/ellipseBT'
import colorBT from './tool/colorBT'
import textBT from './tool/textBT'

import toolbarMiddleArea from './toolbarMiddleArea'
import toolbarPosition from './toolbarPosition'

const toolConfig = [
    {
        component: completeBT,
        show: 'complete',
        width: 40
    },
    {
        component: quitBT,
        show: 'quit',
        width: 30
    },
    {
        component: backBT,
        show: 'back',
        width: 30
    },
    {
        component: arrowBT,
        show: 'arrow',
        width: 30
    },
    {
        component: drawLineBT,
        show: 'drawLine',
        width: 30
    },
    {
        component: rectBT,
        show: 'rect',
        width: 30
    },
    {
        component: ellipseBT,
        show: 'ellipse',
        width: 30
    },
    {
        component: textBT,
        show: 'text',
        width: 30
    },
    {
        component: colorBT,
        show: 'color',
        width: 30
    }
]

export default function createToolbar (me) {
    let toolbar = document.createElement('div')
    toolbar.id = 'kssToolbar'
    
    if (typeChecking(me.toolShow) !== '[object Object]') {
        me.toolShow = {}
    }
    let toolbarWidth = 0
    
    toolConfig.forEach((it) => {
        if (me.toolShow[it.show] !== false) {
            toolbar.appendChild(it.component(me))
            toolbarWidth += it.width
        }
    })

    toolbarWidth += 10
    me.toolbarWidth = toolbarWidth
    css(toolbar, {
        top: me.height + me.toolbarMarginTop + 'px',
        width: toolbarWidth + 'px',
        height: me.toolbarHeight + 'px'
    })

    toolbarPosition(me, me.width, me.height, me.startY, me.startX, toolbar)

    // me.toolShow.complete !== false && toolbar.appendChild(completeBT(me))
    // me.toolShow.back !== false && toolbar.appendChild(backBT(me))
    // me.toolShow.arrow !== false && toolbar.appendChild(arrowBT(me))
    // me.toolShow.drawLine !== false && toolbar.appendChild(drawLineBT(me))
    // me.toolShow.rect !== false && toolbar.appendChild(rectBT(me))
    // me.toolShow.ellipse !== false && toolbar.appendChild(ellipseBT(me))
    // me.toolShow.text !== false && toolbar.appendChild(textBT(me))
    // me.toolShow.color !== false && toolbar.appendChild(colorBT(me))
    
    toolbar.appendChild(toolbarMiddleArea(me))

    me.kssScreenShotWrapper.appendChild(toolbar)

    return toolbar
}