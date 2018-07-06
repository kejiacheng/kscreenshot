import { css } from '../util'

export default function layerSort (me, layer) {
    if (layer === 'textLayer') {
        css(me.kssTextLayer, {
            'z-index': 99
        })

        css(me.rectangleCanvas, {
            'z-index': 98
        })
    } else if (layer === 'canvasLayer') {
        css(me.rectangleCanvas, {
            'z-index': 99
        })

        css(me.kssTextLayer, {
            'z-index': 98
        })
    }
}