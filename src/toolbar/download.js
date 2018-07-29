export default function download (me) {
    return new Promise((resolve) => {
        let imgUrl = me.snapshootList[me.snapshootList.length - 1]
        let a = document.createElement('a')
        if ('download' in a) {
            a.href = imgUrl
            a.download = 'kss' + (new Date()).getTime() + '.png'

            let event = document.createEvent('MouseEvents')
            event.initEvent('click', false, false)
            a.dispatchEvent(event)
        } else {
            let newImgUrl = imgUrl.replace('image/png', 'image/octet-stream')
            window.location.href = newImgUrl
        }
        resolve()
    })
   
}