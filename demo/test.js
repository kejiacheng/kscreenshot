import kss from '../src/kss'

var a = new kss(65, function (base64) {
    console.log(base64)
    return 'https://www.baidu.com/img/bd_logo1.png'
})