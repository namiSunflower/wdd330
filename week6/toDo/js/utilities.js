export {qs};
/**
 * do a querySelector lookup @param {string} selector The selector passed to querySelector
*@return {element} The matching element or null if not found /
function qs(selector) { }

*/
function qs(selector) { 
    let element = document.querySelectorAll(selector);
    if (element.length <= 0){
        return null;
    }
    else{
        return element;
    }
}