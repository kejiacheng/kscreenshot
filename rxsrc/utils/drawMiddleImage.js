export default function drawMiddleImage (me) {
  me.drawCanvas.width = me.width
  me.drawCanvas.height = me.height

  const ctx = me.drawCanvas.getContext('2d')
  ctx.drawImage(me.html2canvas, me.startX, me.startY, me.width, me.height, 0, 0, me.width, me.height)
}