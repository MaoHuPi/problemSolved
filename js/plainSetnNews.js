/*
 * 2022 © MaoHuPi
 * plainSetnNews.js
 */
(() => {
    var dq = document.querySelector.bind(document);
    var dqa = document.querySelectorAll.bind(document);
    var bd = document.body;
    var aspnetForm = dq('#aspnetForm');
    aspnetForm.remove();
    bd.replaceWith(aspnetForm);
    [
        dq('.clearfix'), 
        dq("#aspnetForm > div.container-fluid.maintop-area.hidden-print"), 
        ...dqa('.page-text > *:not(#ckuse)'), 
        ...dqa('.page-text ~ *'), 
        dq('#coniBox'), 
        dq('#donateBtn'), 
        dq("#contFix > div > div.col-lg-3.col-md-4.hidden-sm.hidden-xs.hidden-print.contRight")
    ].forEach(ele => ele.remove());
    dq('.newsBreadcrumb').style.marginTop = '60px';
    `display: flex;
justify-content: center;
align-content: center;
align-items: center;
flex-direction: column;`.split('\n').forEach(styleRow => {
    let styleSetting = /(.[^:]*):(.[^;]*);/.exec(styleRow);
    dq('#contFix > .row').style[styleSetting[1].replaceAll(/-(.)/g, (...args) => args[1].toUpperCase())] = styleSetting[2];
});
})();
