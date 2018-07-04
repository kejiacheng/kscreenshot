import { css } from '../util'
import colorBoard from './colorBoard'

export default function toolbarMiddleArea (me) {
    let clientHeight = document.documentElement.clientHeight
    let toolbarMiddleArea = document.createElement('span')
    toolbarMiddleArea.id = 'kssToolbarMiddleArea'

    toolbarMiddleArea.appendChild(colorBoard(me))

    return toolbarMiddleArea
}