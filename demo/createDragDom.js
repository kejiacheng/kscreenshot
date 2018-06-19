import { css } from './util'
import drawMiddleImage from './toolbar/middleImage/drawMiddleImage'
import clearMiddleImage from './toolbar/middleImage/clearMiddleImage'

export default function createDragDom (dom, dotSize, lineSize, bg, me) {
    const lineList = [
        {name: 'n',style: {top: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}},
        {name: 's',style: {bottom: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}},
        {name: 'w',style: {top: 0, left: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}},
        {name: 'e',style: {top: 0, right: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}}
    ]
    lineList.forEach((it) => {
        dom.appendChild(createLine(it.name, it.style, lineSize, bg))
    })

    const dotList = [
        {name: 'nw',style: {top: '-' + (dotSize / 2 + 'px'), left: '-' + (dotSize / 2) + 'px'}},
        {name: 'ne',style: {top: '-' + (dotSize / 2 + 'px'), right: '-' + (dotSize / 2) + 'px'}},
        {name: 'se',style: {bottom: '-' + (dotSize / 2 + 'px'), right: '-' + (dotSize / 2) + 'px'}},
        {name: 'e',style: {top: `calc(50% - ${dotSize / 2 + 'px'})`, right: '-' + (dotSize / 2) + 'px'}},
        {name: 'w',style: {top: `calc(50% - ${dotSize / 2 + 'px'})`, left: '-' + (dotSize / 2) + 'px'}},
        {name: 'n',style: {top: '-' + (dotSize / 2 + 'px'), left: `calc(50% - ${dotSize / 2 + 'px'})`}},
        {name: 's',style: {bottom: '-' + (dotSize / 2 + 'px'), left: `calc(50% - ${dotSize / 2 + 'px'})`}},
        {name: 'sw',style: {bottom: '-' + (dotSize / 2 + 'px'), left: '-' + (dotSize / 2) + 'px'}},
    ]
    dotList.forEach((it) => {
        dom.appendChild(createDot(it.name, it.style, dotSize, bg, it.id))
    })
    bindCornerEvent('swkssDot', dom, me)
    bindCornerEvent('sekssDot', dom, me)
    bindCornerEvent('nwkssDot', dom, me)
    bindCornerEvent('nekssDot', dom, me)

    bindSurroundEvent('horizontal', 'ekssDot', dom, me)
    bindSurroundEvent('horizontal', 'wkssDot', dom, me)
    bindSurroundEvent('horizontal', 'ekssLine', dom, me)
    bindSurroundEvent('horizontal', 'wkssLine', dom, me)
    bindSurroundEvent('vertical', 'nkssDot', dom, me)
    bindSurroundEvent('vertical', 'skssDot', dom, me)
    bindSurroundEvent('vertical', 'nkssLine', dom, me)
    bindSurroundEvent('vertical', 'skssLine', dom, me)
}

function createDot (type, style, size, bg) {
    let dom = document.createElement('div')
    dom.id = type + 'kssDot'
    css(dom, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        cursor: type + '-resize',
        background: bg
    })

    css(dom, style)

    return dom
}

function createLine (type, style, size, bg) {
    let dom = document.createElement('div')
    dom.id = type + 'kssLine'
    css(dom, {
        position: 'absolute',
        background: bg,
        cursor: type + '-resize'
    })

    css(dom, style)

    return dom
}

function bindCornerEvent (name, dom, me) {
    document.getElementById(name).addEventListener('mousedown', function (event) {
        if (me.isEdit) {
            return
        }
        clearMiddleImage(me)
        document.addEventListener('mousemove', mousemoveEvent)

        let currentLeft = approximate(me.startX, me.width, event.clientX)
        let currentTop = approximate(me.startY, me.height, event.clientY)

        //将起始点设置为对角
        me.startX = 2 * (me.startX + me.width / 2) - currentLeft;
        me.startY = 2 * (me.startY + me.height /2 ) - currentTop;
        let startX = event.clientX
        let startY = event.clientY
        function mousemoveEvent (e) {
            let clientHeight = document.documentElement.clientHeight
            let clientWidth = document.documentElement.clientWidth
            let clientX = e.clientX
            let clientY = e.clientY
            
            if (clientX < 0) {
                clientX = 0
            }

            if (clientX > clientWidth) {
                clientX = clientWidth
            }

            if (clientY < 0) {
                clientY = 0
            }

            if (clientY > clientHeight) {
                clientY = clientHeight
            }

            let height = Math.abs(clientY - me.startY)
            let width = Math.abs(clientX - me.startX)
            let top = Math.min(me.startY, clientY)
            let left = Math.min(me.startX, clientX)

            let style = {
                height: height + 'px',
                width: width + 'px',
                top: top + 'px',
                left: left + 'px'
            }
            css(dom, style)
  
            let currentStartX = left
            let currentStartY = top
     
            let exceed = me.toolbarWidth - width - currentStartX
       
            if (exceed > 0) {
                css(me.toolbar, {
                    right: '-' + exceed + 'px'
                })
            } else {
                css(me.toolbar, {
                    right: 0 + 'px'
                })
            }

            let bottomSurplus = clientHeight - currentStartY - height - me.toolbarMarginTop - me.toolbarHeight

            if (bottomSurplus < 0) {
                css(me.toolbar, {
                    top: '-' + (me.toolbarHeight + me.toolbarMarginTop) + 'px'
                })
            } else {
                css(me.toolbar, {
                    top: height + me.toolbarMarginTop + 'px'
                })
            }
        }
        document.addEventListener('mouseup', mouseupEvent)

        function mouseupEvent(e) {
            me.width = Math.abs(e.clientX - me.startX)
            me.height = Math.abs(e.clientY - me.startY)
            //起始点返回至左上角
            me.startX = Math.min(e.clientX, me.startX)
            me.startY = Math.min(me.startY, e.clientY)

            document.removeEventListener('mousemove', mousemoveEvent)
            document.removeEventListener('mouseup', mouseupEvent)
            drawMiddleImage(me)
        }
    })
}

function bindSurroundEvent (type, name, dom, me) {
    document.getElementById(name).addEventListener('mousedown', function (event) {
        if (me.isEdit) {
            return
        }
        clearMiddleImage(me)
        document.addEventListener('mousemove', mousemoveEvent)
        let currentLeft = approximate(me.startX, me.width, event.clientX)
        let currentTop = approximate(me.startY, me.height, event.clientY)
        //将起始点设置为对角
        if (type === 'horizontal') {
            me.startX = 2 * (me.startX + me.width / 2) - currentLeft;
        } else if (type === 'vertical') {
            me.startY = 2 * (me.startY + me.height /2 ) - currentTop;
        }
        let startX = event.clientX
        let startY = event.clientY
        function mousemoveEvent(e) {
            let clientHeight = document.documentElement.clientHeight
            let clientWidth = document.documentElement.clientWidth
            let clientX = e.clientX
            let clientY = e.clientY
            
            if (clientX < 0) {
                clientX = 0
            }

            if (clientX > clientWidth) {
                clientX = clientWidth
            }

            if (clientY < 0) {
                clientY = 0
            }

            if (clientY > clientHeight) {
                clientY = clientHeight
            }

            let height = Math.abs(clientY - me.startY)
            let width = Math.abs(clientX - me.startX)
            let top = Math.min(me.startY, clientY)
            let left = Math.min(me.startX, clientX)
            let style
            if (type === 'horizontal') {
                style = {
                    width: width + 'px',
                    left: left + 'px'
                }
            } else if (type === 'vertical') {
                style = {
                    height: height + 'px',
                    top: top + 'px',
                }
            }

            css(dom, style)
            let currentStartX = left
            let currentStartY = top
     
            if (type === 'horizontal') {
                let exceed = me.toolbarWidth - width - currentStartX
           
                if (exceed > 0) {
                    css(me.toolbar, {
                        right: '-' + exceed + 'px'
                    })
                } else {
                    css(me.toolbar, {
                        right: 0 + 'px'
                    })
                }
            } else if (type === 'vertical') {
                let clientHeight = document.documentElement.clientHeight

                let bottomSurplus = clientHeight - currentStartY - height - me.toolbarMarginTop - me.toolbarHeight

                if (bottomSurplus < 0) {
                    css(me.toolbar, {
                        top: '-' + (me.toolbarHeight + me.toolbarMarginTop) + 'px'
                    })
                } else {
                    css(me.toolbar, {
                        top: height + me.toolbarMarginTop + 'px'
                    })
                }
            }
        }

        document.addEventListener('mouseup', mouseupEvent)

        function mouseupEvent(e) {
            if (type === 'horizontal') {
                me.width = Math.abs(e.clientX - me.startX)
                me.startX = Math.min(e.clientX, me.startX)
            } else if (type === 'vertical') {
                me.height = Math.abs(e.clientY - me.startY)
                me.startY = Math.min(me.startY, e.clientY)
            }

            document.removeEventListener('mousemove', mousemoveEvent)
            document.removeEventListener('mouseup', mouseupEvent)
            drawMiddleImage(me)
        }
    })
}

//获取鼠标位置最近坐标点
function approximate (start, thickness, current) {
    if (Math.abs(current - start) >= Math.abs(current - start - thickness)) {
        return start + thickness
    } else {
        return start
    }
}