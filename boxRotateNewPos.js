/*
 * 2023 © MaoHuPi
 * spline > snap cube like object(or group) to border
 */

rotateZ = 22.42; // 旋轉角度(deg)
width = 15; // 從旋轉軸看過去的物件原寬
height = 137; // 從旋轉軸看過去的物件原高
/* ----- */
hD = Math.sin((90-rotateZ)/180*Math.PI)*137; // 旋轉後形成的三角形的高
wD = Math.cos((90-rotateZ)/180*Math.PI)*137; // 旋轉後形成的三角形的底
// line1: y = (-hD/wD)*x + hD; // 旋轉後形成的三角形的斜邊線函式
// k = hD/2 - (1/(-hD/wD))*wD/2; // 旋轉後形成的三角形的斜邊的法向線的線函式的k
// line2: y = (1/(-hD/wD))*x + k; // 旋轉後形成的三角形的斜邊的法向線的線函式
x = wD/2 + Math.cos(rotateZ/180*Math.PI)*(width/2); // 相對旋轉軸看去之座標原點的x
y = (x => (1/(-hD/wD))*x + hD/2 - (1/(-hD/wD))*wD/2)(x); // 相對旋轉軸看去之座標原點的y
dX = x + width/2; // 物體選轉後欲貼其邊線所需的相對水平方向之改變值
dY = ((hD + Math.sin(rotateZ/180*Math.PI)*width) - height)/2; // 物體選轉後欲貼其邊線所需的相對垂直方向之改變值
console.log(`x: ${dX >= 0 ? '+' : ''}${dX}, y: ${dY >= 0 ? '+' : ''}${dY}`);
