/*
 * 2022 © MaoHuPi
 * https://blockly.games/pond-duck
 * 策略：追蹤敵人。但與目標、邊緣保持距離，避免碰撞傷害。
 */
function duckRobot(scanNum = 360, tuggleDistance = 20, autoSwim = false) {
    let n = scanNum, 
        d = tuggleDistance, 
        position2middleDeg = {
        '1,1': 45,
        '0,1': 135,
        '0,0': 225,
        '1,0': 295
    };
    function autoSwimStart(){
        let basicDeg = position2middleDeg[
            `${getX() > 50 ? 1 : 0},${getY() > 50 ? 1 : 0}`
        ];
        let randomDeg = Math.random();
        for (let i = 0; i < 10; i++) {
            swim(basicDeg - 45/2 + randomDeg * 45 - 180);
        }
    }
    while (true) {
        let scanFlag = false;
        for (let i = 0; i < n; i++) {
            var x = getX(), 
                y = getY(), 
                padding = 5;
            if(x < padding || x > 100 - padding || y < padding || y > 100 - padding){
                stop();
                autoSwimStart();
            }
            let deg = 360 / n * i;
            let scanRequest = scan(deg);
            if (scanRequest < 70) {
                i -= 10;
                scanFlag = true;
                if (scanRequest > d) {
                    swim(deg);
                }
                else {
                    swim(deg - 180);
                }
                cannon(deg, scanRequest);
            }
        }
        if(autoSwim && !scanFlag){
            autoSwimStart();
        }
    }
}
duckRobot(360, 20, true);
