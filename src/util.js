export function css (dom, obj) {
    for (let i in obj) {
        dom.style[i] = obj[i]
    }
}

export function remove(dom) {
    if (dom instanceof HTMLElement) {
        dom.parentNode.removeChild(dom)
    } else if (dom instanceof HTMLCollection) {
        Array.prototype.forEach.call(dom, function (obj) {
            obj.parentNode.removeChild(obj)
        })
    }
}

export function domType(dom) {
    return Object.prototype.toString.call(dom)
}