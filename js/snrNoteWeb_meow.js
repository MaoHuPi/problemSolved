/*
 * 2022 © MaoHuPi
 * snrNoteWeb_meow.js
 */

/* basic */
const MeowJS = {};
MeowJS.mouse = {x: 0, y: 0, moveTime: 0};
MeowJS.time = function time(){
    return(performance.now());
}
MeowJS.vw = function vw(){
    return(window.innerWidth / 100);
}
MeowJS.vh = function vh(){
    return(window.innerHeight / 100);
}
MeowJS.radToDeg = function radToDeg(rad = 0){
    return(rad*180/Math.PI);
}
MeowJS.degToRad = function degToRad(deg = 0){
    return(deg/180*Math.PI);
}
MeowJS.mouse.moveing = function moveing(){
    return((MeowJS.time() - this.moveTime) < 50);
}
MeowJS.addStyleElement = function addStyleElement(text){
    var s = document.createElement('style');
    s.innerHTML = text;
    document.body.appendChild(s);
}
MeowJS.addClass = function addClass(element, className){
    var classInitFunction = {
        linkTag: function linkTag(element){
            // element.addEventListener('mouseover', event => {
            //     if(MeowJS.mouse.moveing()){
            //         element.setAttribute('meowHover', '');
            //     }
            // });
            // element.addEventListener('mouseleave', event => {
            //     if(MeowJS.mouse.moveing()){
            //         element.removeAttribute('meowHover');
            //     }
            // });
            element.addEventListener('click', event => {
                event.preventDefault();
                element.style.opacity = 0;
                element.style.pointerEvent = 'none';
                
                var a = document.createElement('a');
                a.className = element.className;
                a.innerHTML = element.innerHTML;
                a.setAttribute('meowClick', '');
                a.style.setProperty('--rotateZ', `${MeowJS.radToDeg(Math.atan(MeowJS.vh()/MeowJS.vw()))}deg`);
                var scale = 10;
                a.style.setProperty('--translateX', `${((100*MeowJS.vw()**2) + (100*MeowJS.vh()**2)**0.5)/scale}px`);
                a.style.setProperty('--scale', scale);
                var animationDuration = 3;
                a.style.setProperty('--animationDuration', `${animationDuration}s`);
                document.body.appendChild(a);
                setTimeout(() => {
                    element.style.opacity = 1;
                    element.style.pointerEvent = 'auto';
                    a.remove();
                    location.href = element.getAttribute('href');
                }, animationDuration * 1e3);
            });
        }
    };
    element.className += ` ${className}`;
    if(className in classInitFunction){
        classInitFunction[className](element);
    }
}
let ot = 0;
MeowJS.init = function init(){
    /* listener */
    window.addEventListener('mousemove', event => {
        this.mouse.x = event.screenX;
        this.mouse.y = event.screenY;
        this.mouse.moveTime = this.time();
    });

    /* style */
    this.addStyleElement(`
        a.linkTag {
            --marginTB: 0.1vw;
            --paddingTB: 0.1vw;
            --paddingLR: 0.5vw;
            --paddingTriangle: 1vw;
            --defaultBackground: #b57d00;
            --hoveredBackground: #ffc74b;
            display: inline-block;
            margin: var(--marginTB) 0px;
            padding: var(--paddingTB) calc(var(--paddingTriangle) + var(--paddingLR)) var(--paddingTB) var(--paddingLR);
            color: white !important;
            background-color: var(--defaultBackground);
            border: none;
            clip-path: polygon(0% 0%, 0% 100%, calc(100% - var(--paddingTriangle)) 100%, 100% 50%, calc(100% - var(--paddingTriangle)) 0%);
            box-sizing: border-box;
            transition: 0.5s;
        }
        a.linkTag:hover {
        /* a.linkTag[meowHover] { */
            padding: var(--paddingTB) calc(var(--paddingTriangle) + var(--paddingLR) * 2) var(--paddingTB) var(--paddingLR);
            color: black !important;
            background-color: var(--hoveredBackground);
            transform: rotate(360deg);
        }
        @keyframes linkTag_click{
            0% {
                transform: rotateZ(0deg) translateX(0px) scale(1) translateZ(10px);
            }
            10% {
                transform: rotateZ(var(--rotateZ)) translateX(0px) scale(1) translateZ(10px);
            }
            50% {
                transform: rotateZ(var(--rotateZ)) translateX(0px) scale(var(--scale)) translateZ(10px);
            }
            100% {
                transform: rotateZ(var(--rotateZ)) translateX(var(--translateX)) scale(var(--scale)) translateZ(10px);
            }
        }
        a.linkTag[meowClick] {
            --rotateZ: 45deg;
            --translateX: 100vw;
            --scale: 10;
            --animationDuration: 3s;
            animation-name: linkTag_click;
            animation-duration: var(--animationDuration);
            animation-iteration-count: 1;
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 999;
        }
        a.linkTag.githubLink {
            --defaultBackground: #8b8b8b;
            --hoveredBackground: #d0d0d0;
        }
        a.linkTag.discordLink {
            --defaultBackground: #404eed;
            --hoveredBackground: #5865f2;
        }
    `);

    /* attribute */
    document.querySelectorAll('a[href]').forEach(a => {
        if([null, undefined, 'false'].indexOf(a.getAttribute('meowInit')) > -1){
            a.setAttribute('meowContent', a.innerText);
            if(a.innerText == 'Github'){
                this.addClass(a, 'linkTag');
                this.addClass(a, 'githubLink');
            }
            else if(a.innerText == 'Discord'){
                this.addClass(a, 'linkTag');
                this.addClass(a, 'discordLink');
            }
            a.setAttribute('meowInit', 'true');
        }
    });
}

/* init */
MeowJS.init();
