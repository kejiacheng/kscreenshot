import {css, remove} from '../util'

export default function copy (url) {
    let imgWrapper = document.createElement('span')
    css(imgWrapper, {
        opacity: '0'
    })

    let img = document.createElement('img')
    img.src = 'https://www.baidu.com/img/bd_logo1.png'
    imgWrapper.appendChild(img)
    document.body.appendChild(imgWrapper)

    let selection = window.getSelection();
    let range = document.createRange();

    range.selectNodeContents(imgWrapper);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('Copy')
    remove(imgWrapper)
}