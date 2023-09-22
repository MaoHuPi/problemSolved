/* 
 * MaoHuPi (c) 2023
 * 字母序總和 (letter sum)
 */

const letterSum = s => s.toLowerCase().split('').map(c => c.charCodeAt() - 96).map(i => i > 0 && i <= 26 ? i : 0).reduce((s, n) => s+n);
function letterSumFilter(words, targetValue){
	let result = [];
	words = words.filter(w => w != '').filter(w => letterSum(w) == targetValue);
	for(let word of words){
		if(!result.includes(word)){
			result.push(word);
		}
	}
	return result;
}

// (() => {
// 	let words = document.body.innerHTML.replace(/ +/g, ' ').split(' ');
// 	console.log(letterSumFilter(words, 100));
// })();

// copy(letterSumFilter("attitude".split(' '), 100).join('\n'));

// therefore, culture, excellent, thirty, variety, grumpy, hospital, personal, surely, innovate, restore, attitude, whenever, pumpkin, pursue, lightning, prevent, printer, session
