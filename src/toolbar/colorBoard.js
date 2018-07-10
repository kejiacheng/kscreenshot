import { css } from '../util'

const colorList = ['#000', '#808080', '#800000', '#f7883a', '#308430', '#385ad3', '#800080', '#009999', '#fff', '#c0c0c0', '#fb3838', '#ffff00', '#99cc00', '#3894e4', '#f31af3', '#16dcdc']

export default function colorBoard (me) {
    let colorBoard = document.createElement('span')
    colorBoard.id = 'kssColorBoard'
    colorBoard.title = '颜色板'
    colorBoard.tabIndex = '-1'

    let currentColor = document.createElement('span')
    currentColor.id = 'kssCurrentColor'

    css(currentColor, {
        background: me.toolbarColor
    })

    colorBoard.appendChild(currentColor)
    
    let colorItemWrapper = document.createElement('div')
    colorItemWrapper.id = 'kssColorItemWrapper'

    colorList.forEach(function (it, index) {
        let dom = document.createElement('span')
        dom.className = `kssColorItem kss${it}`
        dom.dataset.color = it

        css(dom, {
            background: it
        })

        if (index <= colorList.length / 2 - 1) {
            css(dom, {
                'margin-bottom': '2px'
            })
        }

        dom.addEventListener('click', function (e) {
            let color = e.currentTarget.dataset.color
            
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