import html2canvas from 'html2canvas'
import { css, remove } from './utils'
import { from, of } from '../demo/package/index'

remove(document.getElementsByClassName('hehe'))
console.log(from)

// from(document.getElementsByClassName('hehe'))
//   .subscribe(x => x.parentNode.removeChild(x))
// of([1, 2, 3])
//   .subscribe(x => console.log(x))
const kss = (function () {
  let instance

  class kscreenshot {
    constructor (options) {
      console.log(options)
    }
  }

  let k = () => {
    if (instance) {
      return instance
    } else {
      return instance = kscreenshot
    }
  }

  return k()
})()