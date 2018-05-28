import { css } from './util'

export default function createDragDom (dom, canvas, dotSize, lineSize, bg, me) {
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
    bindCornerEvent('swkssDot', dom, canvas, me)
    bindCornerEvent('sekssDot', dom, canvas, me)
    bindCornerEvent('nwkssDot', dom, canvas, me)
    bindCornerEvent('nekssDot', dom, canvas, me)

    bindSurroundEvent('horizontal', 'ekssDot', dom, canvas, me)
    bindSurroundEvent('horizontal', 'wkssDot', dom, canvas, me)
    bindSurroundEvent('horizontal', 'ekssLine', dom, canvas, me)
    bindSurroundEvent('horizontal', 'wkssLine', dom, canvas, me)
    bindSurroundEvent('vertical', 'nkssDot', dom, canvas, me)
    bindSurroundEvent('vertical', 'skssDot', dom, canvas, me)
    bindSurroundEvent('vertical', 'nkssLine', dom, canvas, me)
    bindSurroundEvent('vertical', 'skssLine', dom, canvas, me)
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

function bindCornerEvent (name, dom, canvas, me) {
    document.getElementById(name).addEventListener('mousedown', function (event) {
        document.addEventListener('mousemove', mousemoveEvent)

        let currentLeft = approximate(me.startX, me.width, event.clientX)
        let currentTop = approximate(me.startY, me.height, event.clientY)

        //将起始点设置为对角
        me.startX = 2 * (me.startX + me.width / 2) - currentLeft;
        me.startY = 2 * (me.startY + me.height /2 ) - currentTop;

        function mousemoveEvent (e) {
            let style = {
                height: Math.abs(e.clientY - me.startY) + 'px',
                width: Math.abs(e.clientX - me.startX) + 'px',
                top: Math.min(me.startY, e.clientY) + 'px',
                left: Math.min(me.startX, e.clientX) + 'px'
            }
            css(dom, style)
            css(canvas, style)
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
        }
    })
}

function bindSurroundEvent (type, name, dom, canvas, me) {
    document.getElementById(name).addEventListener('mousedown', function (event) {
        document.addEventListener('mousemove', mousemoveEvent)
        let currentLeft = approximate(me.startX, me.width, event.clientX)
        let currentTop = approximate(me.startY, me.height, event.clientY)
        //将起始点设置为对角
        if (type === 'horizontal') {
            me.startX = 2 * (me.startX + me.width / 2) - currentLeft;
        } else if (type === 'vertical') {
            me.startY = 2 * (me.startY + me.height /2 ) - currentTop;
        }
        function mousemoveEvent(e) {
            let style
            if (type === 'horizontal') {
                style = {
                    width: Math.abs(e.clientX - me.startX) + 'px',
                    left: Math.min(me.startX, e.clientX) + 'px'
                }
            } else if (type === 'vertical') {
                style = {
                    height: Math.abs(e.clientY - me.startY) + 'px',
                    top: Math.min(me.startY, e.clientY) + 'px',
                }
            }

            css(dom, style)
            css(canvas, style)
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
        }
    })
}

function approximate (start, thickness, current) {
    if (Math.abs(current - start) >= Math.abs(current - start - thickness)) {
        return start + thickness
    } else {
        return start
    }
}