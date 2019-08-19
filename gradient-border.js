
/* 
* Gradient border JS
* Author: Prasanna Mestha
* twitter: https://twitter.com/mesthabro
*/

(function() {
    let boxes = document.querySelectorAll('[gradient-border]')
    boxes.forEach(box => {
        let values = box.getAttribute('gradient-border')
        if (values) {
            values = values.split(',')
            let borderWidth = values.shift()
            let gradientVal = values.toString().trim()
            let borderRadius = getComputedStyle(box).borderRadius
            
            let brValue = parseInt(borderRadius.substr(0, borderRadius.length - 2))
            let bwValue = parseInt(borderWidth.substr(0, borderWidth.length - 2))
            let maxOffset = brValue - bwValue + 1
            let minOffset = brValue - bwValue - 1
            
            box.style.border = `${borderWidth} solid transparent`
            box.style.background = `linear-gradient(to right, ${gradientVal}) border-box`

            mask = `
                radial-gradient(circle at bottom left ,transparent ${minOffset}px,#fff ${maxOffset}px) top right/${borderRadius} ${borderRadius} no-repeat,
                radial-gradient(circle at top right   ,transparent ${minOffset}px,#fff ${maxOffset}px) bottom left/${borderRadius} ${borderRadius} no-repeat,
                radial-gradient(circle at top left    ,transparent ${minOffset}px,#fff ${maxOffset}px) bottom right/${borderRadius} ${borderRadius} no-repeat,
                radial-gradient(circle at bottom right,transparent ${minOffset}px,#fff ${maxOffset}px) top left/${borderRadius} ${borderRadius} no-repeat,
                linear-gradient(to bottom,#fff ${borderWidth},transparent ${borderWidth}) top   /100% 50% no-repeat,
                linear-gradient(to top   ,#fff ${borderWidth},transparent ${borderWidth}) bottom/100% 50% no-repeat,
                linear-gradient(to right ,#fff ${borderWidth},transparent ${borderWidth}) left  /50% 100% no-repeat,
                linear-gradient(to left  ,#fff ${borderWidth},transparent ${borderWidth}) right /50% 100% no-repeat
            `.replace(/\n/g, " ")

            box.setAttribute('mask', mask)

            let value = box.getAttribute('style');
            value += `-webkit-mask: ${mask}`;
            box.setAttribute('style', value);
        }
    })
})()