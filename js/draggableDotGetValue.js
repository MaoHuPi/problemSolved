/*
 * 2023 © MaoHuPi
 * 判斷可拖曳元素之位置所代表的值
 * 原問題：https://ithelp.ithome.com.tw/questions/10212564
 */

/*
 * 如果要使用原code而不改為其他做法的話，您可以使用以下函式：
 * ```js
 */
function draggableDot_getValue(element/*draggable element*/, num/*index num*/ = 4, dragDirection/*drag direction*/ = 'horizontal'){
    num = parseInt(num);
    var dDIndex = ['horizontal', 'vertical'].indexOf(dragDirection), value = 0;
    if(dDIndex === undefined){return;}
    value = element[['offsetLeft', 'offsetTop'][dDIndex]] + element[['offsetWidth', 'offsetHeight'][dDIndex]]/2;
    // console.log(value, element.offsetParent[['offsetWidth', 'offsetHeight'][dDIndex]]);
    value /= element.offsetParent[['offsetWidth', 'offsetHeight'][dDIndex]];
    value *= (num-1);
    return(Math.round(value));
}
/*
 * ```
 * 此函式須傳入「可拖曳元素本身」、「有幾個直」、「移動方向」三個參數，
 * 且其將回傳值為該可拖曳元素位置髓對應到的index，
 * 而dragDirection參數下錯時則會回傳undefined。
 * 
 * 因為無法直接看到您的程式碼，所以只能盡我所能去猜測您所需要的功能。
 * 希望有幫助到您=^w^=
 */
