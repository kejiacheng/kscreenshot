let kss = (function () {
    const me = this
    let instance
    //单例模式
    let kss = function (key) {
        if (instance) {
            return instance
        }
        this.init(key)
        return this
    }
    me.kss = null
    me.kssRectangle = null
    //截图状态
    me.isScreenshot = false
    /*
    * 1: 点下左键，开始状态
    * 2: 鼠标移动，进行状态
    * 3: 放开左键，结束状态
    * */
    me.drawingStatus = null
    me.startX = null
    me.startY = null
    me.width = null
    me.height = null
    me.dotSize = 6
    me.lineSize = 1

    kss.prototype.init = function (key) {
        const that = this
        document.addEventListener('keydown', isRightKey.bind(null, key))

        function isRightKey (key, e) {
            if (e.keyCode === key && e.shiftKey && !me.isScreenshot) {
                me.isScreenshot = true
                document.body.style.cursor = 'url("./cursor.ico"), auto'
                that.start()
            }
        }
    }

    kss.prototype.start = function () {
        html2canvas(document.body)
            .then((canvas) => {
                me.kss = canvas
                css(canvas, {
                    position: 'fixed',
                    top: 0,
                    left: 0
                })
                canvas.id = 'kss'

                document.body.appendChild(canvas)

                canvas.addEventListener('mousedown', startDrawDown)
            })

        function startDrawDown (e) {
            //当不是鼠标左键时立即返回
            if (e.button !== 0) {
                return
            }

            if (me.drawingStatus !== null) {
                return
            }
            me.drawingStatus = 1

            me.startX = e.clientX
            me.startY = e.clientY
            //移除并添加
            remove(document.getElementById('kssRectangle'))
            let kssRectangle = document.createElement('div')
            css(kssRectangle, {
                position: 'fixed',
                background: 'transparent',
                'box-shadow': '0 0 0 9999px rgba(0,0,0,0.3)'
            })
            kssRectangle.id = 'kssRectangle'
            me.kssRectangle = kssRectangle
            document.body.appendChild(kssRectangle)

            document.addEventListener('mousemove', drawing)
            document.addEventListener('mouseup', endDraw)
        }

        function drawing (e) {
            me.drawingStatus = 2
            let kssRectangle = document.getElementById('kssRectangle')

            css(kssRectangle, {
                height: Math.abs(e.clientY - me.startY) + 'px',
                width: Math.abs(e.clientX - me.startX) + 'px',
                top: Math.min(me.startY, e.clientY) + 'px',
                left: Math.min(me.startX, e.clientX) + 'px'
            })
        }

        function endDraw (e) {
            console.log(e.button)
            document.removeEventListener('mousemove', drawing)

            document.addEventListener('mouseup', cancelDrawingStatus)

            let canvas = document.createElement('canvas')
            me.width = Math.abs(e.clientX - me.startX)
            me.height = Math.abs(e.clientY - me.startY)
            me.startX = Math.min(me.startX, e.clientX)
            me.startY = Math.min(me.startY, e.clientY)
            css(canvas, {
                height: me.height + 'px',
                width: me.width + 'px',
                top: me.startY + 'px',
                left: me.startX + 'px',
                cursor: 'move',
                position: 'fixed'
            })
            canvas.id = 'rectangleCanvas'
            document.body.appendChild(canvas)
            canvas.addEventListener('mousedown', function () {
                console.log(12321)
            })
            me.kss.removeEventListener('mousedown', startDrawDown)
            document.removeEventListener('mouseup', endDraw)

            createDragDom(
                me.kssRectangle,
                canvas,
                me.dotSize,
                me.lineSize,
                '#488ff9',
                me
            )
        }

        function cancelDrawingStatus (e) {
            if (e.button === 2) {
                remove(document.getElementById('kssRectangle'))
                remove(document.getElementById('rectangleCanvas'))
                me.drawingStatus = null
                me.kss.addEventListener('mousedown', startDrawDown)
                document.removeEventListener('contextmenu', preventContextMenu)
                document.addEventListener('contextmenu', preventContextMenu)
                document.removeEventListener('mouseup', cancelDrawingStatus)
            }
        }

        function preventContextMenu (e) {
            console.log(e.button)
            e.preventDefault()
        }
    }

    return kss
})()