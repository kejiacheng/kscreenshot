import { css } from '../util'
import colorBoard from './colorBoard'

export default function toolbarMiddleArea (me) {
    let clientHeight = document.documentElement.clientHeight
    let toolbarMiddleArea = document.createElement('span')
    
    css(toolbarMiddleArea, {
        position: 'position',
        top: 0,
        left: 0
    })

    toolbarMiddleArea.appendChild(colorBoard(me))

    return toolbarMiddleArea
}