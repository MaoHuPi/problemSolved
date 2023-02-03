/* 
 * 2023 © MaoHuPi
 * ig 現實動態自動按讚
 */

(() => {
    function wait(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve();}, ms);
        });
    }
    async function autoHeart(){
        let heart = document.querySelector("div > div > div > div > div > div > div > div > div > div:nth-child(1) > section > div > div > div:nth-child(5) > section > div > div > div > div > div > span > button");
        let next = document.querySelector("div > div > div > div > div > div > div > div > div > div:nth-child(1) > section > div > div > div:nth-child(5) > section > div > button:nth-of-type(2)");

        console.log(heart, next);
        if(heart.childElementCount > 1){
            heart.click();
        }
        await wait(1e3);
        next.click();
        setTimeout(autoHeart, 3e3);
    }
    autoHeart();
})();

// (async () => {
//     let regex = /"csrf_token":"(.[^\"]*)"/g;
//     let json = JSON.stringify($$('script[type="application/json"]').map(e => JSON.parse(e.textContent)));
//     let csrf_token = regex.exec(json)[1];
//     let hrefSplited = location.href.split('/').filter(s => s != '');
//     let media_id = hrefSplited[hrefSplited.length-1];
//     await fetch('https://www.instagram.com/api/v1/story_interactions/send_story_like', {
//         method: 'POST', 
//         body: {
//             media_id: media_id, 
//             csrf_token: csrf_token, 
//         }
//     })
//         .then(t => t.json())
//         .catch(e => console.log(e))
//         .then(j => console.log(j))
// })();
