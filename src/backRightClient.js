export default function backRightClient (e) {
    let clientHeight = document.documentElement.clientHeight
    let clientWidth = document.documentElement.clientWidth
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