import { css } from '../util'

export default function toolbarPosition (me, width, height, top, left, toolbar) {
    let clientHeight = document.documentElement.clientHeight
    let exceed = me.toolbarWidth - width - left
       
    if (exceed > 0) {
        css(toolbar, {
            right: '-' + exceed + 'px'
        })
    } else {
        css(toolbar, {
            right: 0 + 'px'
        })
    }

    let bottomSurplus = clientHeight - top - height - me.toolbarMarginTop - me.toolbarHeight

    if (bottomSurplus < 0) {
        if (top >= 35) {
            css(toolbar, {
                top: '-' + (me.toolbarHeight + me.toolbarMarginTop) + 'px'
            })
        } else {
            css(toolbar, {
                top: me.toolbarMarginTop + 'px'
            })
        }
    } else {
        css(toolbar, {
            top: height + me.toolbarMarginTop + 'px'
        })
    }
}