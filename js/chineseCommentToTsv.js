((rows = '') => {
    let tsv = rows.split('\n').map(row => {
        row = row.split(' ');
        row.shift();
        row = row.join('');
        row = row.split(':').join('\t');
        row = row.split('：').join('\t');
        return(row);
    }).join('\n');
    copy(tsv);
    return(tsv);
})(`1. 民「瘼」：音ㄇㄛˋ`/* 國文注釋之多行字串 */);
