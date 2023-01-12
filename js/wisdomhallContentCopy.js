/* 
 * 2023 © MaoHuPi
 * 品學堂閱讀測驗 - 文章及題目內容複製快捷鍵
 * 
 * 品學堂閱讀測驗：https://learning.wisdomhall.com.tw/
 */

window.addEventListener('keydown', event => {
    if (event.key == 'a'){
        let text = document.querySelector('.pages-posts-id__viewer--show').innerText;
        navigator.clipboard.writeText(text);
    }
    if (event.key == 'q'){
        let text = '';
        text += document.querySelector('.components-question-take__body').innerText;
        text += [...document.querySelectorAll('[class*="components-question-take__"]')]
            .filter(element => /components-question-take__(matching|option)-wrapper/g.test(element.class))
            .map(element => element.innerText)
            .join('\n');
        navigator.clipboard.writeText(text);
    }
    if (event.key == 'c'){
        let text = document.getSelection().toString();
        navigator.clipboard.writeText(text);
    }
});
