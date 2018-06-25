import {css, remove} from '../util'

export default function copy (me, url) {
    let imgWrapper = document.createElement('span')
    css(imgWrapper, {
        opacity: '0'
    })

    let img = document.createElement('img')
    img.src = me.getAbsolutePath(url)
    imgWrapper.appendChild(img)
    document.body.appendChild(imgWrapper)

    setTimeout(function () {
        let selection = window.getSelection()
        let range = document.createRange()

        range.selectNodeContents(imgWrapper)
 
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('Copy')
  
        remove(imgWrapper)
    }, 0)
}