/*
 * 2022 © MaoHuPi
 * md2tips.js
 */

function md2tips(md){
    var html = '';
    let tipsRegexp = /\\tips{((.(?!(\\tips{)))*) *, *((.(?!(\\tips{)))*) *, *((.(?!(\\tips{)))*)}/;
    while(md.indexOf('\\tips{') > -1){
        var tipsArgs = tipsRegexp.exec(md);
        if(tipsArgs == null){
            md = html;
            break;
        }
        console.log(tipsArgs);
        html = md.slice(0, md.indexOf(tipsArgs[0]));
        html += `<tips data-c="${encodeURI(tipsArgs[4])}"${tipsArgs.length > 3 ? ` data-u="${encodeURI(tipsArgs[7])}"` : ''}>${tipsArgs[1]}</tips>`;
        html += md.slice(md.indexOf(tipsArgs[0]) + tipsArgs[0].length);
        md = html;
    }
    return(md);
}

md2tips('\\tips{很白癡, \\tips{指白癡, 罵人的話, red}, blue}')
