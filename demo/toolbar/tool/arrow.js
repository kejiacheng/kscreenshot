import { css } from '../../util'

export default function arrow (me) {
    let arrowBT = document.createElement('span')
    arrowBT.id = 'kssArrowBT'
    css(arrowBT, {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        'text-align': 'center',
        float: 'right',
        cursor: 'pointer'
    })
    let arrowImg = document.createElement('img')
    arrowImg.src = '../../assets/imgs/arrow.png'

    css(arrowImg, {
        width: '20px',
        height: '20px',
        'margin-top': '5px'
    })

    arrowBT.appendChild(arrowImg)

    arrowBT.addEventListener('click', function () {
        me.isEdit = true

        css(document.body, {
            cursor: 'url("../../assets/imgs/40.40.png"), auto!important'
        })
        console.log('321312321')
    })

    return arrowBT
}