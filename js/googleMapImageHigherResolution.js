/*
 * 2022 © MaoHuPi
 * 提高 GoogleMap 圖像解析度
 * googleMapImageHigherResolution.js
 */

href = location.href.split('=');
href[1] = href[1].replaceAll(/(w|h|s)([0-9]*)-/g, (...args) => {
    return(args[1] + (args[2]*2).toString() + '-');
});
location.href = href.join('=');
