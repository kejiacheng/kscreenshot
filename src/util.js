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

export function hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(obj, cls) {
    if (!hasClass(obj,cls)) {
        obj.className += " " + cls
    } 
}

export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {  
	    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	}
}

export function computed(obj, baseProperty, changeProperty, cb) {
    Object.defineProperty(obj, baseProperty, {
            set: function (val) {
                changeProperty.forEach((it, index) => {
                    cb[index](obj, val, changeProperty[index])
                })
            }
        })
}

export function typeChecking (val) {
    return Object.prototype.toString.call(val)
}