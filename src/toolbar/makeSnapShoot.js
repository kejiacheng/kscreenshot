export default function makeSnapShoot(me) {
  let ctx = me.rectangleCanvas.getContext('2d')

  ctx.drawImage(
    me.rectangleCanvas,
    0,
    0,
    me.width * me.scale,
    me.height * me.scale,
    0,
    0,
    me.width * me.scale,
    me.height * me.scale
  )

  let dataURL = me.rectangleCanvas.toDataURL('image/png')

  me.snapshootList.push(dataURL)
  me.currentImgDom.src = dataURL
}
