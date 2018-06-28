import { css, remove, removeClass } from '../util'

export default function endAndClear (me) {
    removeClass(document.body, 'kssBody')
    console.log('jici')
    me.kss && remove(me.kss)
    me.kssScreenShotWrapper && remove(me.kssScreenShotWrapper)
    me.style && remove(me.style)
    me.kss = null
    me.rectangleCanvas = null
    me.kssScreenShotWrapper = null
    me.drawingStatus = null
    me.toolbar = null
    me.currentToolType = null
    me.snapshootList = []
    me.isScreenshot = false
    me.isEdit = false
    me.toolmousedown = null
    me.toolmousemove = null
    me.toolmouseup = null
    document.removeEventListener('keydown', me.endScreenShot)
    setTimeout(function () {
        document.removeEventListener('contextmenu', me.preventContextMenu)
    }, 0)
    
    document.removeEventListener('mouseup', me.cancelDrawingStatus)
}