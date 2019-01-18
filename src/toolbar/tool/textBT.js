import { css, remove } from '../../util'
import makeSnapShoot from '../makeSnapShoot'
import activeToolbarItem from '../activeToolbarItem'
import layerSort from '../layerSort'
import img from '../../assets/imgs/text.png'

export default function textBT (me) {
    let textBT = document.createElement('span')
    textBT.id = 'kssTextBT'
    textBT.className = 'kssToolbarItemBT'
    textBT.title = '字体工具'

    let textImg = document.createElement('img')
    textImg.className = 'kssToolbarItemImg'
    textImg.src = img
    me.textBT = textBT

    textBT.appendChild(textImg)

    textBT.addEventListener('click', function () {
        me.isEdit = true
        
        if (me.currentToolType === 'text') {
            return
        }

        me.currentToolType = 'text'
        activeToolbarItem(textBT)
        layerSort(me, 'textLayer')

        if (me.toolmousedown) {
            me.rectangleCanvas.removeEventListener('mousedown', me.toolmousedown)
            document.removeEventListener('mousemove', me.toolmousemove)
            document.removeEventListener('mouseup', me.toolmouseup)
        }

        let isFocus = false
        let isInner = false

        if (!me.textClickEvent) {
            me.textClickEvent = textClickEvent

            function textClickEvent (e) {
                if (isFocus) {
                    return
                }
                let startX = e.clientX - me.startX
                let startY = e.clientY - me.startY
                let minWidth = 60
                let minHeight = 36
                
                let textarea = document.createElement('div')
                textarea.className = 'kssTextarea'
                textarea.contentEditable = true
                textarea.tabIndex = -1
                let offsetX = 0
                let offsetY = 0
                if (me.width - startX < minWidth) {
                    offsetX = minWidth - (me.width - startX)
                } else {
                    css(textarea, {
                        'min-width': minWidth + 'px'
                    })
                }

                if (me.height - startY < minHeight) {
                    offsetY = minHeight - (me.height - startY)
                } else {
                    css(textarea, {
                        'min-height': minHeight + 'px'
                    })
                }
            
                css(textarea, {
                    position: 'absolute',
                    top: startY - offsetY + 'px',
                    left: startX - offsetX + 'px',
                    'max-width': me.width - startX + 'px',
                    'max-height': me.height - startY + 'px'
                })

                me.kssTextLayer.appendChild(textarea)
                
                textarea.addEventListener('focus', function () {
                    isFocus = true
                    css(textarea, {
                        color: me.toolbarColor
                    })
                })

                textarea.addEventListener('blur', function (e) {
                    isFocus = false
                    if (textarea.innerHTML === '') {
                        remove(textarea)
                        return
                    }
                    var context = me.rectangleCanvas.getContext('2d')
                    context.font=`${16 * me.scale}px 宋体`
                    let textPerLine = textarea.innerHTML.split('<div>')
                    let newTextPerLine = []
                    textPerLine.forEach((it, index) => {
                        let val = it
                        if (index > 0) {
                            val = it.replace('</div>', '')
                        }
                        let reg = /&nbsp;|\<br\>/g
                        val = val.replace(reg, '  ')  
                        
                        let maxWidth = (me.width - startX) > 60 ? (me.width - startX) : 60 
                        let width = 0
                        let str = ''

                        Array.prototype.forEach.call(val, (obj, Index) => {
                            width += context.measureText(obj).width
                            if (width >= maxWidth) {
                                width = context.measureText(obj).width
                                newTextPerLine.push(str)
                                str = obj
                            } else {
                                str += obj
                            }
                        }) 
                        newTextPerLine.push(str)
                    })

                    context.fillStyle = me.toolbarColor
                    newTextPerLine.forEach((it, index) => {
                          
                        context.fillText(it, (startX - offsetX) * me.scale, (startY - offsetY + 15 + (index * 18)) * me.scale)
                    })
                    
                    makeSnapShoot(me)
                    remove(textarea)
                })

                setTimeout(function () {
                    textarea.focus()
                }, 0)
            }
        }
        
        me.kssTextLayer.removeEventListener('mousedown', me.textClickEvent)
        me.kssTextLayer.addEventListener('mousedown', me.textClickEvent)
    })

    return textBT
}