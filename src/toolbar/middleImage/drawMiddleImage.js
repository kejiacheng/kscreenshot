export default function drawMiddleImage (me) {
    me.rectangleCanvas.width = me.width
    me.rectangleCanvas.height = me.height
    let ctx = me.rectangleCanvas.getContext("2d")
    ctx.drawImage(me.kss, me.startX, me.startY, me.width, me.height, 0, 0, me.width, me.height)
    
    let dataURL = me.rectangleCanvas.toDataURL("image/png")

    me.imgBase64 = dataURL
    me.snapshootList[0] = dataURL
    me.currentImgDom.src = me.imgBase64
} 