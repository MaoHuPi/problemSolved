/*
2022 © MaoHuPi
printColab.js

建議列印配置如下
紙張大小：A4
邊界：預設值
縮放比例：預設
選項：
    [ ] 頁首及頁尾
    [v] 背景圖形
*/
(function(){
    let style = document.createElement('style');
    let scroller = document.querySelectorAll('colab-shaded-scroller')[0];
    style.innerHTML = `
    colab-shaded-scroller {
        position: fixed;
        top: 0px;
        left: 0px;
        height: auto;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .notebook-scrolling-horizontal {
        padding-bottom: 0px;
    }
    colab-status-bar {
        opacity: 0;
    }
    colab-shaded-scroller .notebook-content {
        margin: 0px;
    }
    colab-shaded-scroller :where(.footer-links, .add-cell) {
        display: none !important;
    }
    .output_subarea.output_text > pre { /* in iframe */
        width: 100% !important;
        white-space: unset !important;
        overflow-wrap: normal !important;
    }
    @page{
        margin: auto;
        size: A4 portrait;
        marks: none;
        bleed: 0in;
    }
    `;
    scroller.remove();
    document.body.innerHTML = '';
    document.body.appendChild(scroller);
    document.body.appendChild(style);
    for(let element of document.querySelectorAll('style[media="screen"]')){
        element.setAttribute('media', 'all');
    }
    setTimeout(() => {
        print();
    }, 1e2);
})();
