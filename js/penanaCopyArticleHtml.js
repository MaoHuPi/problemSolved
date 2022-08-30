((storyId, chapterId = 0) => {
    function sendXmlhttp(name = '', value = '', responseFunction = t => {console.log(t);}, type = 'get'){
        let xmlhttp = new XMLHttpRequest();
        let rf = function (){
            if (xmlhttp.readyState==4) {
                responseFunction(xmlhttp.responseText);
            }
        }
        type = type.toLowerCase();
        xmlhttp.addEventListener("load", rf);
        if(type == 'get'){
            xmlhttp.open("GET", name+value);
            xmlhttp.send();
        }
        else if(type == 'post'){
            xmlhttp.open("POST", name,true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send(value);
        }
    }
    sendXmlhttp('https://www.penana.com/tab1read', `?id=${storyId}&chapter=${chapterId}`, t => console.log(t), 'get');
})(97371/* 故事編號 */, 1/* 章節編號 */);
