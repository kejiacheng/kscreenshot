import { css } from "../../utils";
import { from, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import backRightClient from "../../utils/backRightClient"
import drawMiddleImage from '../../utils/drawMiddleImage'
import clearMiddleImage from '../../utils/clearMiddleImage'

export default function createDragDom (me) {
  const dotSize = 6
  const lineSize = 2

  const lineList = [
    {name: 'n',style: {top: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}, type: 'vertical'},
    {name: 's',style: {bottom: '-' + (lineSize / 2) + 'px', left: 0, width: '100%', height: (lineSize / 2) + 'px'}, type: 'vertical'},
    {name: 'w',style: {top: 0, left: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}, type: 'horizontal'},
    {name: 'e',style: {top: 0, right: '-' + (lineSize / 2) + 'px', width: (lineSize / 2) + 'px', height: '100%'}, type: 'horizontal'}
  ]

  const dotList = [
    {name: 'nw',style: {top: '-' + (dotSize / 2 + 'px'), left: '-' + (dotSize / 2) + 'px'}, type: null},
    {name: 'ne',style: {top: '-' + (dotSize / 2 + 'px'), right: '-' + (dotSize / 2) + 'px'}, type: null},
    {name: 'se',style: {bottom: '-' + (dotSize / 2 + 'px'), right: '-' + (dotSize / 2) + 'px'}, type: null},
    {name: 'e',style: {top: `calc(50% - ${dotSize / 2 + 'px'})`, right: '-' + (dotSize / 2) + 'px'}, type: 'horizontal'},
    {name: 'w',style: {top: `calc(50% - ${dotSize / 2 + 'px'})`, left: '-' + (dotSize / 2) + 'px'}, type: 'horizontal'},
    {name: 'n',style: {top: '-' + (dotSize / 2 + 'px'), left: `calc(50% - ${dotSize / 2 + 'px'})`}, type: 'vertical'},
    {name: 's',style: {bottom: '-' + (dotSize / 2 + 'px'), left: `calc(50% - ${dotSize / 2 + 'px'})`}, type: 'vertical'},
    {name: 'sw',style: {bottom: '-' + (dotSize / 2 + 'px'), left: '-' + (dotSize / 2) + 'px'}, type: null},
  ]

  from(lineList)
    .pipe(
      map(it => {
        me.kscreenshotBox.appendChild(createLine(it.name, it.style, lineSize))
        dragEvent(me, `${it.name}kssLine`, it.type)
      })
    )
    .subscribe()
    .unsubscribe()

  from(dotList)
    .pipe(
      map(it => {
        me.kscreenshotBox.appendChild(createDot(it.name, it.style, dotSize, it.id))
        dragEvent(me, `${it.name}kssDot`, it.type)
      })
    )
    .subscribe()
    .unsubscribe()
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

function dragEvent (me, name, type = null) {
  const mousedown = fromEvent(document.getElementById(name), 'mousedown')
  const mousemove = fromEvent(document, 'mousemove')
  const mouseup = fromEvent(document, 'mouseup')

  mousedown
    .subscribe(e => {
      if (me.isEdit) {
        return
      }
      clearMiddleImage(me)

      let currentLeft = approximate(me.startX, me.width, event.clientX)
      let currentTop = approximate(me.startY, me.height, event.clientY)

      //将当前拖拽点的对角点设为起始点
      if (type === 'horizontal') {
        me.startX = 2 * (me.startX + me.width / 2) - currentLeft
      } else if (type === 'vertical') {
        me.startY = 2 * (me.startY + me.height /2 ) - currentTop
      } else if (type === null) {
        me.startX = 2 * (me.startX + me.width / 2) - currentLeft
        me.startY = 2 * (me.startY + me.height /2 ) - currentTop
      }

      const mousemoveSub = mousemove.subscribe(e => {
        const [clientX, clientY] = backRightClient(me, e)
        const height = Math.abs(clientY - me.startY)
        const width = Math.abs(clientX - me.startX)
        const top = Math.min(me.startY, clientY)
        const left = Math.min(me.startX, clientX)
        let style = {}

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
        } else if (type === null) {
          style = {
            height: height + 'px',
            width: width + 'px',
            top: top + 'px',
            left: left + 'px'
          }
        }

        css(me.kscreenshotBox, style)

        // if (type === 'horizontal') {
        //   toolbarPosition(me, width, me.height, me.startY, left, me.toolbar)
        // } else if (type === 'vertical') {
        //   toolbarPosition(me, me.width, height, top, me.left, me.toolbar)
        // } else if (type === null) {
        //   toolbarPosition(me, width, height, top, left, me.toolbar)
        // }
      })

      const mouseupSub = mouseup.subscribe(e => {
        const [clientX, clientY] = backRightClient(me, e)

        if (type === 'horizontal') {
          me.width = Math.abs(clientX - me.startX)
          //起始点返回至左上角
          me.startX = Math.min(clientX, me.startX)
        } else if (type === 'vertical') {
          me.height = Math.abs(clientY - me.startY)
          //起始点返回至左上角
          me.startY = Math.min(me.startY, clientY)
        } else if (type === null) {
          me.width = Math.abs(clientX - me.startX)
          me.height = Math.abs(clientY - me.startY)
          //起始点返回至左上角
          me.startX = Math.min(clientX, me.startX)
          me.startY = Math.min(me.startY, clientY)
        }

        drawMiddleImage(me)
        mousemoveSub.unsubscribe()
        mouseupSub.unsubscribe()
      })
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