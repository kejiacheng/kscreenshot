import { css } from '../util'
import colorBoard from './colorBoard'
import setLineWidth from './setLineWidth'

export default function toolbarMiddleArea (me) {
    let clientHeight = document.documentElement.clientHeight
    let toolbarMiddleArea = document.createElement('span')
    toolbarMiddleArea.id = 'kssToolbarMiddleArea'

    toolbarMiddleArea.appendChild(colorBoard(me))
    toolbarMiddleArea.appendChild(setLineWidth(me))

    return toolbarMiddleArea
}