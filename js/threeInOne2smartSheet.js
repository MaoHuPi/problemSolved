/* 
 * 2023 © MaoHuPi
 * 
 * 使用步驟：
 * 1. 在google docs打開「三合一」
 * 2. 檔案 > 下載 > 網頁（.html，壓縮）
 * 3. 以新分頁打開下載的html
 * 4. 在console貼上此程式並執行
 * 5. 點擊頁面內任一處完成複製
 */

window.onclick = () => {
    sheet = [...document.querySelectorAll('tr')]
        .map(tr => [...tr.querySelectorAll('td')])
        .map(tds => {tds[0] = tds[0]?.querySelectorAll('.li-bullet-0')[0]?.innerText; return(tds);})
        .map(tds => {tds[1] = tds[1]?.querySelectorAll('p')[0]?.innerText; return(tds);})
        .filter(tds => tds.length > 1 && tds[0] && tds[1])
        .map(tds => {tds[1] = `${tds[1]}`.replace(decodeURI('%E2%96%BA'), '').replaceAll(decodeURI('%C2%A0'), ' ').split(' ').filter(text => text.length > 0); return(tds);})
        .map((tds, i) => `${tds[0]}    ${tds[1].join('    ')}`)
        .join('\n');
    navigator.clipboard.writeText(sheet);
    console.log('Sheet Coppied!');
};
