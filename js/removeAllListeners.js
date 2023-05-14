/* 
 * 2023 © MaoHuPi
 * removeAllListeners.js
 * 移除所有事件監聽器
 */
(() => {
    function removeAllListeners(element){
        let eventListeners = getEventListeners(element);
        for(let type in eventListeners){
            eventListeners[type].forEach(event => {
                element.removeEventListener(type, event.listener, event.useCapture);
            });
        }
    }
    removeAllListeners(window);
    removeAllListeners(document);
    [...document.querySelectorAll('*')].forEach(element => removeAllListeners(element));
})();
