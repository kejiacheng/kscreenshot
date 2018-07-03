import { css } from '../util'

const colorList = ['#000', '#808080', '#800000', '#f7883a', '#308430', '#385ad3', '#800080', '#009999', '#fff', '#c0c0c0', '#fb3838', '#ffff00', '#99cc00', '#3894e4', '#f31af3', '#16dcdc']

export default function colorBoard (me) {
    let colorBoard = document.createElement('span')
    colorBoard.id = 'kssColorBoard'
    colorBoard.title = '颜色板'
    colorBoard.tabIndex = '-1'

    css(colorBoard, {
        position: 'absolute',
        width: '180px',
        height: '40px',
        right: 0,
        background: '#fff',
        border: '1px solid #bbb',
        'border-radius': '4px',
        display: 'none',
        outline: 'none',
        transition: 'all 1s ease',
        cursor: 'default'
    })

    let currentColor = document.createElement('span')
    currentColor.id = 'kssCurrentColor'

    css(currentColor, {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        background: me.toolbarColor,
        'margin': '5px 8px 0 8px',
        'box-sizing': 'border-box',
        border: '1px solid #333'
    })

    colorBoard.appendChild(currentColor)
    
    let colorItemWrapper = document.createElement('div')
    colorItemWrapper.id = 'kssColorItemWrapper'

    css(colorItemWrapper, {
        display: 'inline-block',
        'vertical-align': 'top',
        width: '130px',
        'margin-top': '5px',
        'font-size': 0
    })

    colorList.forEach(function (it, index) {
        let dom = document.createElement('span')
        dom.className = `kssColorItem kss${it}`
        dom.dataset.color = it

        css(dom, {
            display: 'inline-block',
            width: '14px',
            height: '14px',
            background: it,
            'margin-right': '2px',
            'box-sizing': 'border-box',
            border: '1px solid #333',
            cursor: 'pointer'
        })

        if (index <= 7) {
            css(dom, {
                'margin-bottom': '2px'
            })
        }

        dom.addEventListener('click', function (e) {
            let color = e.currentTarget.dataset.color
            console.log(e.currentTarget.dataset.color)
            me.toolbarColor = color
            currentColor.style.background = color
        })

        colorItemWrapper.appendChild(dom)
    })

    colorBoard.appendChild(colorItemWrapper)

    colorBoard.addEventListener('focus', (e) => {
        e.currentTarget.style.display = 'block'
    })

    colorBoard.addEventListener('blur', (e) => {
        e.currentTarget.style.display = 'none'
    })

    return colorBoard
}