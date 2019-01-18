export default function clearMiddleImage (me) {
    me.rectangleCanvas.width = me.width * me.scale
    me.rectangleCanvas.height = me.height * me.scale
    let ctx = me.rectangleCanvas.getContext("2d")
    ctx.clearRect(0, 0, me.width, me.height)
}