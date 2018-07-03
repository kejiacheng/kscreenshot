import { css } from '../../util'
import img from '../../assets/imgs/color.png'

export default function colorBT (me) {
    let colorBT = document.createElement('span')
    colorBT.id = 'kssColorBT'
    colorBT.title = '颜色工具'

    css(colorBT, {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })

    let drawLineImg = document.createElement('img')
    drawLineImg.src = img
    me.colorBT = colorBT
    css(drawLineImg, {
        width: '20px',
        height: '20px',
        'margin-top': '5px'
    })

    colorBT.appendChild(drawLineImg)

    colorBT.addEventListener('click', function () {
        let clientHeight = document.documentElement.clientHeight
        let colorBoard = document.getElementById('kssColorBoard')
        let bottomSurplus = clientHeight - me.startY - me.height - me.toolbarMarginTop - me.toolbarHeight

        if (bottomSurplus < 0) {
            css(colorBoard, {
                top: '30px',
            })
        } else {
            css(colorBoard, {
                top: '-40px',
            })
        }
        console.log(colorBoard.style.display)
        if (colorBoard.style.display !== 'block') {
            colorBoard.style.display = 'block'
            colorBoard.focus()
        } else {
            colorBoard.blur()
        }
    })

    return colorBT
}