import { addClass, removeClass } from '../util'

export default function activeToolbarItem (obj) {
    let kssToolbarItemBT = document.getElementsByClassName('kssToolbarItemBT')

    Array.prototype.forEach.call(kssToolbarItemBT, (it) => {
        removeClass(it, 'kssToolbarActiveItemBT')
    })

    if (obj) {
        addClass(obj, 'kssToolbarActiveItemBT')
        document.getElementById('kssRectangleCanvas').style.cursor = 'crosshair'
    } else {
        document.getElementById('kssRectangleCanvas').style.cursor = 'move'
    }
}