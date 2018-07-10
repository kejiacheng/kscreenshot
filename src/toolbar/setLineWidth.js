import { css } from '../util'

export default function setLineWidth (me) {
    let setLineWidth = document.createElement('span')
    setLineWidth.id = 'kssSetLineWidth'
    setLineWidth.tabIndex = '-1'

    let numInputWrapper = document.createElement('div')
    numInputWrapper.id = 'kssNumInputWrapper'

    let numInput = document.createElement('input')
    numInput.id = 'kssNumInput'
    numInput.value = me.toolbarLineWidth
    numInputWrapper.appendChild(numInput)
    numInput.addEventListener('input', (e) => {
        let val = parseInt(e.currentTarget.value)

        if (val > 20) {
            val = 20
        } else if (val <= 0) {
            val = 1
        }
        numInput.value = val
        me.toolbarLineWidth = val
        css(showLineWidth, {
            width: me.toolbarLineWidth + 'px'
        })
    })
    let arrowNumWrapper = document.createElement('span')
    arrowNumWrapper.id = 'kssArrowNumWrapper'
 
    let upNum = document.createElement('div')
    upNum.id = 'kssUpNum'
    upNum.innerHTML = '▲'
    let downNum = document.createElement('div')
    downNum.id = 'kssDownNum'
    downNum.innerHTML = '▼'

    upNum.addEventListener('click', () => {
        if (numInput.value < 20) {
            numInput.value = parseInt(numInput.value) + 1
            me.toolbarLineWidth = numInput.value
            css(showLineWidth, {
                width: me.toolbarLineWidth + 'px'
            })
        }
    })

    downNum.addEventListener('click', () => {
        if (numInput.value > 1) {
            numInput.value = parseInt(numInput.value) - 1
            me.toolbarLineWidth = numInput.value
            css(showLineWidth, {
                width: me.toolbarLineWidth + 'px'
            })
        }
    })

    arrowNumWrapper.appendChild(upNum)
    arrowNumWrapper.appendChild(downNum)

    numInputWrapper.appendChild(arrowNumWrapper)

    setLineWidth.appendChild(numInputWrapper)

    let showLineWidthWrapper = document.createElement('div')
    showLineWidthWrapper.id = 'kssShowLineWidthWrapper'

    let showLineWidth = document.createElement('span')
    showLineWidth.id = 'kssShowLineWidth'
    css(showLineWidth, {
        width: me.toolbarLineWidth + 'px',
        background: '#fb3838'
    })

    showLineWidthWrapper.appendChild(showLineWidth)

    setLineWidth.appendChild(showLineWidthWrapper)

    setLineWidth.addEventListener('focus', (e) => {
        e.currentTarget.style.display = 'block'
    })

    setLineWidth.addEventListener('blur', () => {
        setTimeout(() => {
             if (numInput !== document.activeElement) {
                setLineWidth.style.display = 'none'
            }
        }, 0)
    })

    numInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (setLineWidth !== document.activeElement) {
                setLineWidth.style.display = 'none'
           }
       }, 0)
    })

    return setLineWidth
}