/* 
 * 2023 © MaoHuPi
 * 前端初步驗證信用卡號
 * 實作自：https://hackmd.io/@nssh/20191205#/4/8
 */

function hplCheck(cardId){
    function sum(list){
        var total = list
            .map(n => parseInt(n))
            .reduce((t, n) => t + n);
        return(total);
    }
    cardId = cardId?.toString();
    // isCardId
    if(!cardId){return {isCardId: false, type: []};}
    let cardIdSplited = cardId
        .split('')
        .map((n, i) => [n, i]);
    var checkNum = sum(
        cardIdSplited
            .filter(l => l[1] % 2 == 0)
            .map(l => l[0])
            .reverse()
            .map(n => n*2)
            .join('')
            .split('')
    ) + sum(
        cardIdSplited
            .filter(l => l[1] % 2 == 1)
            .map(l => l[0])
    );
    // type
    var cardTypes = [];
    var checkTypeFunctions = {
        'American Express': id => {
            var head = id[0] + id[1];
            return((head == '34' || head == '37') && id.length == 15);
        }, 
        'Mastercard': id => {
            var head = id[0] + id[1];
            head = parseInt(head);
            return((head >= 51 && head <= 55) && id.length == 16);
        }, 
        'Visa': id => {
            var head = id[0];
            return(head == '4' && (id.length == 13 || id.length == 16));
        }
    };
    for(let type in checkTypeFunctions){
        if(checkTypeFunctions[type](cardId)){
            cardTypes.push(type);
        }
    }
    return({isCardId: checkNum % 10 == 0, type: cardTypes});
}

console.log(`小明(4003600000000014) => ${JSON.stringify(hplCheck('4003600000000014'))}`);
