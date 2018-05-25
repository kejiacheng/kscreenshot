function createDragDom (dom, canvas, dotSize, lineSize, bg, me) {
    const lineList = [
        {name: 'n',style: {top: '-' + lineSize + 'px', left: 0, width: '100%', height: lineSize + 'px'}},
        {name: 's',style: {bottom: '-' + lineSize + 'px', left: 0, width: '100%', height: lineSize + 'px'}},
        {name: 'w',style: {top: 0, left: '-' + lineSize + 'px', width: lineSize + 'px', height: '100%'}},
        {name: 'e',style: {top: 0, right: '-' + lineSize + 'px', width: lineSize + 'px', height: '100%'}}
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
    bindEvent('swkssDot', dom, canvas, me)
    bindEvent('sekssDot', dom, canvas, me)
    bindEvent('nwkssDot', dom, canvas, me)
    bindEvent('nekssDot', dom, canvas, me)
}

function createDot (type, style, size, bg) {
    let dom = document.createElement('div')
    dom.id = type + 'kssDot'
    css(dom, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        cursor: type + '-resize',
        background: bg,
        'user-select': 'none'
    })

    css(dom, style)

    return dom
}

function createLine (type, style, size, bg) {
    let dom = document.createElement('div')

    css(dom, {
        position: 'absolute',
        background: bg,
        cursor: type + '-resize'
    })

    css(dom, style)

    return dom
}

function bindEvent (name, dom, canvas, me) {
    let dot = document.getElementById(name)

    dot.addEventListener('mousedown', function (event) {
        document.addEventListener('mousemove', mousemoveEvent)

        //将起始点设置为对角
        me.startX = 2*(me.startX+me.width/2)-event.clientX;
        me.startY = 2*(me.startY+me.height/2)-event.clientY;

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