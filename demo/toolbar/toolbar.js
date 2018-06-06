import { css } from '../util'
import complete from './tool/complete'
import arrow from './tool/arrow'

export default function createToolbar (toolbarWidth, toolbarHeight, toolbarMarginTop, me) {
    let toolbar = document.createElement('div')
    toolbar.id = 'kssToolbar'

    css(toolbar, {
        position: 'absolute',
        right: 0,
        top: me.height + toolbarMarginTop + 'px',
        width: toolbarWidth + 'px',
        height: toolbarHeight + 'px',
        background: '#f1f1f1',
        'font-size': '14px'
    })

    if (toolbarWidth > me.width) {
        let exceed = toolbarWidth - me.width - me.startX
        if (exceed) {
            css(toolbar, {
                right: '-' + exceed + 'px'
            })
        }
    }

    let clientHeight = document.documentElement.clientHeight

    let bottomSurplus = clientHeight - me.startY - me.height - toolbarMarginTop - toolbarHeight

    if (bottomSurplus < 0) {
        css(toolbar, {
            top: '-' + (toolbarHeight + toolbarMarginTop) + 'px'
        })
    }

    toolbar.appendChild(complete(me))
    toolbar.appendChild(arrow(me))
    
    me.kssScreenShotWrapper.appendChild(toolbar)

    return toolbar
}