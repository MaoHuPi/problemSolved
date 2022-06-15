/* 2022 © MaoHuPi */
function decode(code){
    code = code.split('%');
    newCode = code[0];
    for(let i = 1; i < code.length; i++){
        newCode += String.fromCharCode(parseInt([code[i]].slice(0, 1), 16));
        newCode += code[i].slice(2, code[i].length);
    }
    return({
        code: newCode, 
        length: newCode.length
    });
}
function toInt(code){
    code = code.split('');
    code = code.map(s => s.toString().charCodeAt(0));
    return(code);
}
// 27 => id=d%28l%3AnFO%3Cn%2D%2FPt%24O
// d(l:nFO<n-/Pt$O
// [100, 40, 108, 58, 110, 70, 79, 60, 110, 45, 47, 80, 116, 36, 79]
// 28 => id=q%2A%2A%3AnFO%3An%24%2A%3AnoN
// q**:nFO:n$*:noN
// [113, 42, 42, 58, 110, 70, 79, 58, 110, 36, 42, 58, 110, 111, 78]
