import { css, remove } from '../util'

export default function endAndClear (me) {
    css(document.body, {
        cursor: 'default',
        'user-select': 'text'
    })
    me.kss && remove(me.kss)
    me.kssScreenShotWrapper && remove(me.kssScreenShotWrapper)
    me.kss = null
    me.rectangleCanvas = null
    me.kssScreenShotWrapper = null
    me.drawingStatus = null
    me.toolbar = null
    me.currentToolType = null
    me.snapshootList = []
    me.isScreenshot = false
    me.isEdit = false
    document.removeEventListener('keydown', me.endScreenShot)
    setTimeout(function () {
        document.removeEventListener('contextmenu', me.preventContextMenu)
    }, 0)
    
    document.removeEventListener('mouseup', me.cancelDrawingStatus)
}