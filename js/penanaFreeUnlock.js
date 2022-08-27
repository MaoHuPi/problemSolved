/*
 * 2022 © MaoHuPi
 * fileName: penanaFreeUnlock.js
 * createTime: 2022/08/27-22:04
 * notes: 已於2022/08/27-21:39向Penana官方回報此錯誤
 */
(() => {
function setFreeBtn(){
    document.querySelectorAll('.pay_content').forEach(btn => {
        if(btn.getAttribute('freeisset') == undefined){
            let smallBtn = document.createElement('button');
            smallBtn.innerText = '免費解鎖';
            smallBtn.style.fontFamily = 'sans-serif';
            smallBtn.style.fontSize = '100%';
            smallBtn.style.lineHeight = '1.15';
            smallBtn.style.margin = '0';
            smallBtn.addEventListener('click', function(event, parentBtn = btn){
                event.stopPropagation();
                event.preventDefault();
                parentBtn.setAttribute('data-coin', '-0.1');
                parentBtn.click();
            });
            btn.append(smallBtn);
            btn.setAttribute('freeisset', 'true');
        }
    });
    setTimeout(setFreeBtn, 1000);
}
setFreeBtn();
})();
