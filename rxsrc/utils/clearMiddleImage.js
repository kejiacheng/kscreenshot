export default function clearMiddleImage (me) {
  let ctx = me.drawCanvas.getContext("2d")
  ctx.clearRect(0, 0, me.width, me.height)
}