// import {a} from './toolbar.js'
import html2canvas from './html2canvas.min.js'
import { css, remove, domType } from './util'
import createDragDom from './createDragDom.js'
import createToolbar from './toolbar/toolbar.js'
import drawMiddleImage from './toolbar/middleImage/drawMiddleImage'
import clearMiddleImage from './toolbar/middleImage/clearMiddleImage'
import endAndClear from './toolbar/endAndClear'

let kss = (function () {
    const me = this

    let instance
    //单例模式
    let kss = function (key) {
        if (instance) {
            return instance
        }

        this.kss = null
        this.kssScreenShotWrapper = null
        this.rectangleCanvas = null
        this.toolbar = null
        //截图状态
        this.isScreenshot = false
        /*
        * 1: 点下左键，开始状态
        * 2: 鼠标移动，进行状态
        * 3: 放开左键，结束状态
        * */
        this.drawingStatus = null
        this.imgBase64 = null
        this.isEdit = false
        this.startX = null
        this.startY = null
        this.width = null
        this.height = null
        this.dotSize = 6
        this.lineSize = 2
        this.toolbarWidth = 200
        this.toolbarHeight = 30
        this.toolbarMarginTop = 5
        
        this.startDrawDown = (e) => {
            const that = this
            //当不是鼠标左键时立即返回
            if (e.button !== 0) {
                return
            }
    
            if (that.drawingStatus !== null) {
                return
            }
            that.drawingStatus = 1
    
            that.startX = e.clientX
            that.startY = e.clientY
            //移除并添加
            remove(document.getElementById('kssScreenShotWrapper'))
            let kssScreenShotWrapper = document.createElement('div')
            kssScreenShotWrapper.id = 'kssScreenShotWrapper'
            css(kssScreenShotWrapper, {
                position: 'fixed',
                background: 'transparent',
                'box-shadow': '0 0 0 9999px rgba(0, 0, 0, 0.3)'
            })
            that.kssScreenShotWrapper = kssScreenShotWrapper
            let kssRectangle = document.createElement('div')
            css(kssRectangle, {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            })
            kssScreenShotWrapper.appendChild(kssRectangle)
            document.body.appendChild(kssScreenShotWrapper)
          
            document.addEventListener('mousemove', that.drawing)
            document.addEventListener('mouseup', that.endDraw)
        }

        this.drawing = (e) => {
            const that = this
            that.drawingStatus = 2
            let kssScreenShotWrapper = document.getElementById('kssScreenShotWrapper')
    
            css(kssScreenShotWrapper, {
                height: Math.abs(e.clientY - that.startY) + 'px',
                width: Math.abs(e.clientX - that.startX) + 'px',
                top: Math.min(that.startY, e.clientY) + 'px',
                left: Math.min(that.startX, e.clientX) + 'px'
            })
        }

        this.endDraw = (e) => {
            const that = this
            that.drawingStatus = 3
          
            document.removeEventListener('mousemove', that.drawing)
    
            document.addEventListener('mouseup', that.cancelDrawingStatus)
    
            let canvas = document.createElement('canvas')
            that.width = Math.abs(e.clientX - that.startX)
            that.height = Math.abs(e.clientY - that.startY)
            that.startX = Math.min(that.startX, e.clientX)
            that.startY = Math.min(that.startY, e.clientY)
            css(canvas, {
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                cursor: 'move',
                position: 'absolute'
            })
            canvas.id = 'rectangleCanvas'
            that.kssScreenShotWrapper.appendChild(canvas)
            that.rectangleCanvas = canvas
            canvas.addEventListener('mousedown', function (event) {
                if (that.isEdit) {
                    return
                }
                clearMiddleImage(that)
                let startX = event.clientX
                let startY = event.clientY
                document.addEventListener('mousemove', canvasMoveEvent)
                document.addEventListener('mouseup', canvasUpEvent)
    
                function canvasMoveEvent (e) {
                    css(that.kssScreenShotWrapper, {
                        top: that.startY + e.clientY - startY + 'px',
                        left: that.startX + e.clientX - startX + 'px'
                    })
    
                    // css(canvas, {
                    //     top: that.startY + e.clientY - startY + 'px',
                    //     left: that.startX + e.clientX - startX + 'px'
                    // })

                    let currentStartX = that.startX + e.clientX - startX
                    let currentStartY = that.startY + e.clientY - startY
                   
                    let exceed = that.toolbarWidth - that.width - currentStartX
           
                    if (exceed > 0) {
                        css(that.toolbar, {
                            right: '-' + exceed + 'px'
                        })
                    } else {
                        css(that.toolbar, {
                            right: 0 + 'px'
                        })
                    }

                    let clientHeight = document.documentElement.clientHeight

                    let bottomSurplus = clientHeight - currentStartY - that.height - that.toolbarMarginTop - that.toolbarHeight

                    if (bottomSurplus < 0) {
                        css(that.toolbar, {
                            top: '-' + (that.toolbarHeight + that.toolbarMarginTop) + 'px'
                        })
                    } else {
                        css(that.toolbar, {
                            top: that.height + that.toolbarMarginTop + 'px'
                        })
                    }
                }
    
                function canvasUpEvent (e) {
                    that.startY = that.startY + e.clientY - startY
                    that.startX = that.startX + e.clientX - startX
                    document.removeEventListener('mousemove', canvasMoveEvent)
                    document.removeEventListener('mouseup', canvasUpEvent)
                    drawMiddleImage(that)
                }
            })
            that.kss.removeEventListener('mousedown', that.startDrawDown)
            document.removeEventListener('mouseup', that.endDraw)
    
            createDragDom(
                that.kssScreenShotWrapper,
                that.dotSize,
                that.lineSize,
                '#488ff9',
                that
            )
            drawMiddleImage(that)
            that.toolbar = createToolbar(that.toolbarWidth, that.toolbarHeight, that.toolbarMarginTop, that)
        }

        this.preventContextMenu = (e) => {
            e.preventDefault()
        }

        this.cancelDrawingStatus = (e) => {
            const that = this
            if (e.button === 2) {
                
                remove(that.kssScreenShotWrapper)
                that.kssScreenShotWrapper = null
                that.rectangleCanvas = null
                that.drawingStatus = null
                that.isEdit = false
                that.kss.addEventListener('mousedown', that.startDrawDown)
                document.removeEventListener('contextmenu', that.preventContextMenu)
                document.addEventListener('contextmenu', that.preventContextMenu)
                document.removeEventListener('mouseup', that.cancelDrawingStatus)
            }
        }

        this.init(key)
        return instance = this
    }

    kss.prototype.init = function (key) {
        const that = this
   
        document.addEventListener('keydown', isRightKey.bind(null, key))

        function isRightKey (key, e) {
            if (e.keyCode === key && e.shiftKey && !that.isScreenshot) {
                that.isScreenshot = true
                css(document.body, {
                    cursor: 'url("./assets/imgs/cursor.ico"), auto',
                    'user-select': 'none'
                })
        
                that.start()
                that.end()
            }
        }
    }

    kss.prototype.start = function () {
        const that = this
        html2canvas(document.body, {useCORS:true})
            .then((canvas) => {
                that.kss = canvas
                css(canvas, {
                    position: 'fixed',
                    top: 0,
                    left: 0
                })
                canvas.id = 'kss'
     
                document.body.appendChild(canvas)

                canvas.addEventListener('mousedown', that.startDrawDown)
            })
    }

    kss.prototype.end = function () {
        const that = this
        document.addEventListener('keydown', endScreenShot)

        function endScreenShot (e) {
            if (e.keyCode === 27) {
                endAndClear(that)
            }
        }
    }

    return kss
})()

export default kss