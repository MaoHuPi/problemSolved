// question
(() => {
    /*
    ** a, b, c 是三個 request 的 callback function，
    ** 分別會延遲 500, 200 300 毫秒回來
    ** 執行 doByOrder 之後會後依序印出 b, c, a
    ** 希望能改成印出 a, b, c
    */ 
    
    // Don't change a, b, c function
    const a = callback => {
        setTimeout(() => { callback('a'); }, 500);
    };
    const b = callback => {
        setTimeout(() => { callback('b'); }, 200);
    };
    const c = callback => {
        setTimeout(() => { callback('c'); }, 300);
    };
    const tasks = [a, b, c];
    const doByOrder = (tasks, callback) => {
        tasks.forEach(item => {
            item(callback);
        });
    }
    doByOrder(tasks, console.log.bind(console));
})();

// MaoHuPi's answer
(() => {
    /* 2023 © MaoHuPi */
    const a = callback => {
        setTimeout(() => { callback('a'); }, 500);
    };
    const b = callback => {
        setTimeout(() => { callback('b'); }, 200);
    };
    const c = callback => {
        setTimeout(() => { callback('c'); }, 300);
    };
    const tasks = [a, b, c];
    const doByOrder = (tasks, callback) => {
        function linkFunctions(...functions){
            return((...args) => {
                for(let func of functions){
                    func(...args);
                }
            });
        }
        let funcAll = callback;
        for(let item of tasks.reverse()){
            let lastAll = funcAll;
            funcAll = linkFunctions(callback, function(){item(lastAll);});
        }
        funcAll();
    }
    doByOrder(tasks, console.log.bind(console));
})();

// regular answer
(() => {
    const a = callback => {
        setTimeout(() => { callback('a'); }, 500);
    };
    const b = callback => {
        setTimeout(() => { callback('b'); }, 200);
    };
    const c = callback => {
        setTimeout(() => { callback('c'); }, 300);
    };
    const tasks = [a, b, c];
        const doByOrder = (tasks, callback) => {
            let i = 0;
            const next = () => {
                if (i >= tasks.length) return;
                    tasks[i++]((val) => {
                    callback(val);
                    next();
                });
            };
            next();
        };
    doByOrder(tasks, console.log.bind(console));
})();
