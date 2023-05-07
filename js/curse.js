/* 
 * MaoHuPi © 2023
 * curse.js
 * 將文字加上混亂的音讀記號
 */

function curse(text, times = 10){
    var target = text.split('');
    var charArray = new Array(879 - 768).fill(0).map((n, i) => String.fromCharCode(768+i));
    target = target.map(t => t + (new Array(times).fill(0).map(c => charArray[Math.floor(Math.random()*charArray.length)])).join(''));
    return(target.join(''));
}
