// import {a} from './toolbar.js'
import html2canvas from './html2canvas.min.js'
import { css, remove, domType } from './util'
import createDragDom from './createDragDom.js'
let kss = (function () {
    const me = this

    let instance
    //单例模式
    let kss = function (key) {
        if (instance) {
            return instance
        }

        this.kss = null
        this.kssRectangle = null
        this.rectangleCanvas = null
        //截图状态
        this.isScreenshot = false
        /*
        * 1: 点下左键，开始状态
        * 2: 鼠标移动，进行状态
        * 3: 放开左键，结束状态
        * */
        this.drawingStatus = null
        this.startX = null
        this.startY = null
        this.width = null
        this.height = null
        this.dotSize = 8
        this.lineSize = 4
        
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
            remove(document.getElementById('kssRectangle'))
            let kssRectangle = document.createElement('div')
            css(kssRectangle, {
                position: 'fixed',
                background: 'transparent',
                'box-shadow': '0 0 0 9999px rgba(0,0,0,0.3)'
            })
            kssRectangle.id = 'kssRectangle'
            that.kssRectangle = kssRectangle
            document.body.appendChild(kssRectangle)
          
            document.addEventListener('mousemove', that.drawing)
            document.addEventListener('mouseup', that.endDraw)
        }

        this.drawing = (e) => {
            const that = this
            that.drawingStatus = 2
            let kssRectangle = document.getElementById('kssRectangle')
    
            css(kssRectangle, {
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
                height: that.height + 'px',
                width: that.width + 'px',
                top: that.startY + 'px',
                left: that.startX + 'px',
                cursor: 'move',
                position: 'fixed'
            })
            canvas.id = 'rectangleCanvas'
            document.body.appendChild(canvas)
            that.rectangleCanvas = canvas
            canvas.addEventListener('mousedown', function (event) {
                let startX = event.clientX
                let startY = event.clientY
                document.addEventListener('mousemove', canvasMoveEvent)
                document.addEventListener('mouseup', canvasUpEvent)
    
                function canvasMoveEvent (e) {
                    css(that.kssRectangle, {
                        top: that.startY + e.clientY - startY + 'px',
                        left: that.startX + e.clientX - startX + 'px'
                    })
    
                    css(canvas, {
                        top: that.startY + e.clientY - startY + 'px',
                        left: that.startX + e.clientX - startX + 'px'
                    })
                }
    
                function canvasUpEvent (e) {
                    that.startY = that.startY + e.clientY - startY
                    that.startX = that.startX + e.clientX - startX
                    document.removeEventListener('mousemove', canvasMoveEvent)
                    document.removeEventListener('mouseup', canvasUpEvent)
                }
            })
            that.kss.removeEventListener('mousedown', that.startDrawDown)
            document.removeEventListener('mouseup', that.endDraw)
    
            createDragDom(
                that.kssRectangle,
                canvas,
                that.dotSize,
                that.lineSize,
                '#488ff9',
                that
            )
        }

        this.preventContextMenu = (e) => {
            e.preventDefault()
        }

        this.cancelDrawingStatus = (e) => {
            const that = this
            if (e.button === 2) {
        
                remove(that.kssRectangle)
                remove(that.rectangleCanvas)
                that.kssRectangle = null
                that.rectangleCanvas = null
                that.drawingStatus = null
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
        html2canvas(document.body)
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
                css(document.body, {
                    cursor: 'default',
                    'user-select': 'text'
                })
             
                that.kss && remove(that.kss)
                that.kssRectangle && remove(that.kssRectangle)
                that.rectangleCanvas && remove(that.rectangleCanvas)
                that.kss = null 
                that.kssRectangle = null
                that.rectangleCanvas = null
                that.drawingStatus = null 
                that.isScreenshot = false
                document.removeEventListener('keydown', that.endScreenShot)
                document.removeEventListener('contextmenu', that.preventContextMenu)
                document.removeEventListener('mouseup', that.cancelDrawingStatus)
            }
        }
    }

    return kss
})()

export default kss