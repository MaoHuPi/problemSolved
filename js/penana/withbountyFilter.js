/*
 * 2022 © MaoHuPi
 * penana/withbountyFilter.js
 */
(() => {
    for(let box of document.querySelectorAll('.xbox')){
        if(!box.querySelector('.withbounty')){
            box.remove();
        }
    }
})();
