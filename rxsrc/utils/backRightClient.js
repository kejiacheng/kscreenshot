export default function backRightClient (me, e) {
  let clientHeight = me.clientHeight
  let clientWidth = me.clientWidth
  let clientX = e.clientX
  let clientY = e.clientY

  if (clientX < 0) {
    clientX = 0
  }

  if (clientX > clientWidth) {
    clientX = clientWidth
  }

  if (clientY < 0) {
    clientY = 0
  }

  if (clientY > clientHeight) {
    clientY = clientHeight
  }

  return [clientX, clientY]
}