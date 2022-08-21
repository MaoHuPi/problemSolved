/*
 * 2022 © MaoHuPi
 * penanaCopyArticle.js
 */
((num = 0, toLog = false, toCopy = false) => {
    const $ = function(e, f = document){return(f.querySelector(e));};
    const $$ = function(e, f = document){return(f.querySelectorAll(e));};
    String.prototype.sj = function(s = '', j = ''){return(this.split(s).join(j))};
    num = num.toString();
    let box = document.createElement('div'), 
        article = {};
    box.innerHTML = $(`#ch${num}`).innerHTML;
    article['id'] = $('div.chaptercount', box).innerText;
    article['title'] = $('h2.chaptername', box).innerText;
    article['author'] = $('.authorname', box).innerText.sj('\n', '');
    article['date'] = $('.readbar [aria-describedby="qtip-0"]', box).innerText.sj('\n', '');
    article['view'] = $('.readbar [aria-describedby="qtip-2"]', box).innerText.sj('\n', '');
    article['like'] = $('[class^="likecount"]', box).innerText.sj('\n', '');
    article['comment'] = $('[class*="cmtcount"]', box).innerText.sj('\n', '');
    article['spend'] = $('.readbar [aria-describedby="qtip-3"]', box).innerText.sj('\n', '');
    Array.from($$(`article *:where(span[class], span.displaynone, span[style^="display:none"], p[style^="display:none"])`, box))
    .forEach(element => element.remove());
    Array.from($$(`article *:where(br)`, box))
    .forEach(element => element.replaceWith('\n'));
    article['content'] = $('article', box).innerText.replace(/^\n*/g, '');
    output = 
`${article['title']}
* id: ${article['id']}
* author: ${article['author']}
* date: ${article['date']}
* view${article['view'] > 1 ? 's' : ''}: ${article['view']}
* like${article['like'] > 1 ? 's' : ''}: ${article['like']}
* comment${article['comment'] > 1 ? 's' : ''}: ${article['comment']}
* spend: ${article['spend']}
${article['content']}`;
    if(toLog && console && 'log' in console){console.log(output);}
    if(toCopy && copy){copy(output);} // 只在某些瀏覽器有效，而且必須在console執行
    return(output);
})(1/* 章節編號 */, true/*是否印出*/, true/*是否複製*/);
