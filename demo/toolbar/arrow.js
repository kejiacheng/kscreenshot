export default function arrow (startPos, endPos, me) {
    let startX = startPos.x
    let startY = startPos.y
    let endX = endPos.x
    let endY = endPos.y

    let twoSide = 20
    let bottomSide = 16
    let crossWidth = 12
    
    let h = Math.sqrt(Math.pow(twoSide, 2)  - Math.pow(bottomSide / 2, 2))
    let x = Math.sqrt(Math.pow(h, 2) + Math.pow(crossWidth / 2, 2))

    let angle = Math.atan(bottomSide / 2 / h) * 180 / Math.PI
    let angle1 = Math.atan(crossWidth / 2 / h) * 180 / Math.PI
    //当左上和右下时为一种情况，左下和右上为一种情况
    if ((startX > endX && startY > endY) || (startX < endX && startY < endY)) {
        let angle2 = Math.atan(Math.abs(startX - endX) / Math.abs(startY - endY)) * 180 / Math.PI

        let y1 = Math.cos((angle1 + angle2) * 2 * Math.PI / 360) * x
        let x1 = Math.sin((angle1 + angle2) * 2 * Math.PI / 360) * x

        let symbol = 1

        if ((startX < endX && startY < endY)) {
            symbol = -1
        }

        let rightX = endX + x1 * symbol
        let rightY = endY + y1 * symbol

        let y2 = Math.cos((angle + angle2) * 2 * Math.PI / 360) * twoSide
        let x2 = Math.sin((angle + angle2) * 2 * Math.PI / 360) * twoSide

        let hX = endX + x2 * symbol
        let hY = endY + y2 * symbol

        let y3 = Math.cos((angle2) * 2 * Math.PI / 360) * h
        let x3 = Math.sin((angle2) * 2 * Math.PI / 360) * h

        let zX = endX + x3 * symbol
        let zY = endY + y3 * symbol

        let bX = 2 * zX - rightX
        let bY = 2 * zY - rightY

        let cX = 2 * zX - hX
        let cY = 2 * zY - hY 
   
        let context = me.rectangleCanvas.getContext("2d")
        context.beginPath()
        context.moveTo(startX, startY)
        context.lineTo(rightX, rightY)
        context.lineTo(hX, hY)
        context.lineTo(endX, endY)
        context.lineTo(cX, cY)
        context.lineTo(bX, bY)
        context.lineTo(startX, startY)
        context.fillStyle = me.toolbarColor
        context.fill();
        context.closePath()
    } else if ((startX < endX && startY > endY) || (startX > endX && startY < endY)) {
        let angle2 = Math.atan(Math.abs(startY - endY) / Math.abs(startX - endX)) * 180 / Math.PI
        
        let x1 = Math.cos((angle1 + angle2) * 2 * Math.PI / 360) * x
        let y1 = Math.sin((angle1 + angle2) * 2 * Math.PI / 360) * x
 
        let symbol = 1

        if ((startX < endX && startY > endY)) {
            symbol = -1
        }

        let rightX = endX + x1 * symbol
        let rightY = endY - y1 * symbol
        
        let x2 = Math.cos((angle + angle2) * 2 * Math.PI / 360) * twoSide
        let y2 = Math.sin((angle + angle2) * 2 * Math.PI / 360) * twoSide
   
        let hX = endX + x2 * symbol
        let hY = endY - y2 * symbol

        let x3 = Math.cos((angle2) * 2 * Math.PI / 360) * h
        let y3 = Math.sin((angle2) * 2 * Math.PI / 360) * h

        let zX = endX + x3 * symbol
        let zY = endY - y3 * symbol

        let bX = 2 * zX - rightX
        let bY = 2 * zY - rightY

        let cX = 2 * zX - hX
        let cY = 2 * zY - hY

        let context = me.rectangleCanvas.getContext("2d")
        context.beginPath()
        context.lineWidth = 1
        context.moveTo(startX, startY)
        context.lineTo(rightX, rightY)
        context.lineTo(hX, hY)
        context.lineTo(endX, endY)
        context.lineTo(cX, cY)
        context.lineTo(bX, bY)
        context.lineTo(startX, startY)
        context.fillStyle = me.toolbarColor
        context.fill();
        context.closePath()
    } else if (startX === endX) {
        let symbol = 1

        if (startY < endY) {
            symbol = -1
        }

        let zX = endX
        let zY = endY + h * symbol

        let rightX = zX + crossWidth / 2 * symbol
        let rightY = zY

        let hX = zX + bottomSide / 2 * symbol
        let hY = zY

        let bX = zX - crossWidth / 2 * symbol
        let bY = zY

        let cX = zX - bottomSide / 2 * symbol
        let cY = zY

        let context = me.rectangleCanvas.getContext("2d")
        context.beginPath()
        context.lineWidth = 1
        context.moveTo(startX, startY)
        context.lineTo(rightX, rightY)
        context.lineTo(hX, hY)
        context.lineTo(endX, endY)
        context.lineTo(cX, cY)
        context.lineTo(bX, bY)
        context.lineTo(startX, startY)
        context.fillStyle = me.toolbarColor
        context.fill();
        context.closePath()
    } else if (startY === endY) {
        let symbol = 1

        if (startX < endX) {
            symbol = -1
        }

        let zX = endX + h * symbol
        let zY = endY

        let rightX = zX
        let rightY = zY + crossWidth / 2 * symbol

        let hX = zX
        let hY = zY + bottomSide / 2 * symbol

        let bX = zX
        let bY = zY - crossWidth / 2 * symbol

        let cX = zX
        let cY = zY - bottomSide / 2 * symbol

        let context = me.rectangleCanvas.getContext("2d")
        context.beginPath()
        context.lineWidth = 1
        context.moveTo(startX, startY)
        context.lineTo(rightX, rightY)
        context.lineTo(hX, hY)
        context.lineTo(endX, endY)
        context.lineTo(cX, cY)
        context.lineTo(bX, bY)
        context.lineTo(startX, startY)
        context.fillStyle = me.toolbarColor
        context.fill()
        context.closePath()
    }
}