import { css } from './util'
import drawMiddleImage from './toolbar/middleImage/drawMiddleImage'
import clearMiddleImage from './toolbar/middleImage/clearMiddleImage'
import backRightClient from './backRightClient'
import toolbarPosition from  './toolbar/toolbarPosition'

export default function createDragDom (dom, dotSize, lineSize, me) {
    const lineList = [
        {name: 'n',style: {top: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}},
        {name: 's',style: {bottom: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}},
        {name: 'w',style: {top: 0, left: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}},
        {name: 'e',style: {top: 0, right: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}}
    ]
    lineList.forEach((it) => {
        dom.appendChild(createLine(it.name, it.style, lineSize))
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
        dom.appendChild(createDot(it.name, it.style, dotSize, it.id))
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

function createDot (type, style, size) {
    let dom = document.createElement('div')
    dom.id = type + 'kssDot'
    dom.className = 'kssDot'
    css(dom, {
        width: size + 'px',
        height: size + 'px',
        cursor: type + '-resize'
    })

    css(dom, style)

    return dom
}

function createLine (type, style, size) {
    let dom = document.createElement('div')
    dom.id = type + 'kssLine'
    dom.className = 'kssLine'
    css(dom, {
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
            let client = backRightClient(e)
            let clientX = client[0]
            let clientY = client[1]

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
     
            toolbarPosition(me, width, height, top, left, me.toolbar)
        }
        document.addEventListener('mouseup', mouseupEvent)

        function mouseupEvent(e) {
            let client = backRightClient(e)
            let clientX = client[0]
            let clientY = client[1]

            me.width = Math.abs(clientX - me.startX)
            me.height = Math.abs(clientY - me.startY)
            //起始点返回至左上角
            me.startX = Math.min(clientX, me.startX)
            me.startY = Math.min(me.startY, clientY)

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
            let client = backRightClient(e)
            let clientX = client[0]
            let clientY = client[1]

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

            toolbarPosition(me, width, height, top, left, me.toolbar)
            if (type === 'horizontal') {
                toolbarPosition(me, width, me.height, me.startY, left, me.toolbar)
            } else if (type === 'vertical') {
                toolbarPosition(me, me.width, height, top, me.left, me.toolbar)
            }
        }

        document.addEventListener('mouseup', mouseupEvent)

        function mouseupEvent(e) {
            let client = backRightClient(e)
            let clientX = client[0]
            let clientY = client[1]

            if (type === 'horizontal') {
                me.width = Math.abs(clientX - me.startX)
                me.startX = Math.min(clientX, me.startX)
            } else if (type === 'vertical') {
                me.height = Math.abs(clientY - me.startY)
                me.startY = Math.min(me.startY, clientY)
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