/*
 * 2022 © MaoHuPi
 * snrNoteWeb_meow.js
 * v3.0.1
 */

/* basic */
const request = {};
request.livingElement = () => {
    /*
     * Copyright © 2022 by MaoHuPi
     * v1.0.0
     */

    'use strict';
    String.prototype.sj = function(s, j){
        return(this.split(s).join(j));
    }
    function $(e, f = document){return(f.querySelector(e));}
    function $$(e, f = document){return(f.querySelectorAll(e));}
    function vw(){return(window.innerWidth/100);}
    function vh(){return(window.innerHeight/100);}
    function randint(a, b){return(Math.min(a, b) + Math.floor(Math.random()*Math.max(a, b)));};
    let mode = 'rebound';
    Object.prototype.offset = function (type = 'all'){
        var element = this;
        var data = {
            height:this.offsetHeight, 
            width:this.offsetWidth , 
            top:0, 
            left:0
        };
        while(element !== document.body && element.offsetParent){
            data.left += element.offsetLeft;
            data.top += element.offsetTop;
            element = element.offsetParent;
        }
        return(type in data ? data[type] : data);
    }
    Object.prototype.LEInit = function (){
        this.LEInited == true;
    };
    Object.prototype.LEUpdate = function (){
        if(!('LEInited' in this && this.LEInited == true) && 'LEInit' in this){
            this.LEInit();
        }
        let nowTime = new Date().getTime();
        let deltaTime = 'lastAniTime' in this ? (nowTime - this.lastAniTime)/1e3 : 0;
        this.lastAniTime = nowTime;
        switch(mode){
            case 'rebound':
                let elementWidth = this.offsetWidth/vw(), 
                    elementHeight = this.offsetHeight/vh(), 
                    elementLeft = 0, 
                    elementTop = 0;
                try{
                    elementLeft = this.offset('left')/vh();
                    elementTop = this.offset('top')/vw();
                }
                catch(error){}
                if(!('LEPosition' in this)){
                    try{
                        this.LEPosition = {x: this.offset('left')/vw(), y: this.offset('top')/vh()};
                    }
                    catch(error){
                        this.LEPosition = {x: randint(0, 100 - elementWidth), y: randint(0, 100 - elementHeight)};
                    }
                }
                if(!('LEForce' in this)){
                    this.LEForce = {x: randint(-1*100, 1*100)/100, y: 0};
                    this.LEForce.y = (a => (1/* r */ - a**2)**0.5)(this.LEForce.x)*randint(-1, 1);
                }
                this.LEPosition.x += this.LEForce.x/vw()*deltaTime*vw()*5;
                this.LEPosition.y += this.LEForce.y/vh()*deltaTime*vw()*5;
                if(this.LEPosition.x < 0){
                    this.LEPosition.x  = 0;
                    this.LEForce.x *= -1;
                }
                if(this.LEPosition.x > 100 - elementWidth){
                    this.LEPosition.x  = 100 - elementWidth;
                    this.LEForce.x *= -1;
                }
                if(this.LEPosition.y < 0){
                    this.LEPosition.y  = 0;
                    this.LEForce.y *= -1;
                }
                if(this.LEPosition.y > 100 - elementHeight){
                    this.LEPosition.y  = 100 - elementHeight;
                    this.LEForce.y *= -1;
                }

                if(this.style.position != 'fixed'){
                    this.style.position = 'fixed';
                }
                var transition = 0.1;
                if(this.style.transition != `left ${transition}s, top ${transition}s`){
                    this.style.transition = `left ${transition}s, top ${transition}s`;
                }
                this.style.left = `${Math.floor(this.LEPosition.x*vw())}px`;
                this.style.top = `${Math.floor(this.LEPosition.y*vh())}px`;
                // this.style.transform = `translateX(${Math.floor((this.LEPosition.x - elementLeft)*vw())}px) translateY(${Math.floor((this.LEPosition.y - elementTop)*vh())}px)`;
                // $('body').computedStyleMap().get('background-color').toString()
                break;
        }
    };
    function update(){
        $$('.livingElement:not(html, body)').forEach(element => {
            if('LEUpdate' in element){
                element.LEUpdate();
            }
        });
        setTimeout(update, 30);
    }
    function main(){
        update();
        // $$('html, body').forEach(element => {
        //     if(element.style.overflow != 'hidden'){
        //         element.style.overflow = 'hidden';
        //     }
        // });
    }
    main();
}

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
MeowJS.offset = function offset(element, type){
    var elementData = {
        height: element.offsetHeight, 
        width: element.offsetWidth, 
        top: 0, 
        left: 0
    };
    if(!(type in ['width', 'height'])){
        while(element !== document.body){
            if(type == 'left'){
                elementData.left += element.offsetLeft;
            }
            if(type == 'top'){
                elementData.top += element.offsetTop;
            }
            element = element.offsetParent;
        }
    }
    return(elementData[type]);
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
                element.setAttribute('meowClick', '');
                
                var a = document.createElement('a');
                a.className = element.className;
                a.innerHTML = element.innerHTML;
                a.className += ' linkTag_aniEle';
                a.style.setProperty('--rotateZ', `${MeowJS.radToDeg(Math.atan(MeowJS.vh()/MeowJS.vw()))}deg`);
                var scale = 10;
                a.style.setProperty('--translateX', `${((100*MeowJS.vw()**2) + (100*MeowJS.vh()**2)**0.5)/scale}px`);
                a.style.setProperty('--scale', scale);
                var animationDuration = 3;
                a.style.setProperty('--animationDuration', `${animationDuration}s`);
                document.body.appendChild(a);
                setTimeout(() => {
                    element.removeAttribute('meowClick');
                    a.remove();
                    location.href = element.getAttribute('href');
                }, animationDuration * 1e3 - 0.5e3);
            });
        }, 
        linkBox: function linkBox(element){
            element.addEventListener('click', event => {
                event.preventDefault();
                element.setAttribute('meowClick', '');
                
                var a = document.createElement('a');
                a.className = element.className;
                a.innerHTML = element.innerHTML;
                a.className += ' linkBox_aniEle';
                a.style.setProperty('--top', `${MeowJS.offset(element, 'top') - document.querySelector('html').scrollTop}px`);
                a.style.setProperty('--left', `${MeowJS.offset(element, 'left')}px`);
                a.style.setProperty('--width', `${MeowJS.offset(element, 'width')}px`);
                a.style.setProperty('--height', `${MeowJS.offset(element, 'height')}px`);
                document.body.appendChild(a);
                var animationDuration = 3;
                setTimeout(() => {
                    a.setAttribute('linkBox_aniEle_2', '');
                    a.style.setProperty('--animationDuration', `${animationDuration}s`);
                }, 100);
                setTimeout(() => {
                    // element.removeAttribute('meowClick');
                    // a.remove();
                    location.href = element.getAttribute('href');
                }, animationDuration * 1e3 - 0.5e3);
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
    /* lib */
    request.livingElement();

    /* listener */
    window.addEventListener('mousemove', event => {
        this.mouse.x = event.screenX;
        this.mouse.y = event.screenY;
        this.mouse.moveTime = this.time();
    });

    /* style */
    this.addStyleElement(`
        html {
            --pinImage: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="white"><path d="m31.7 25.6 4.3 3.85v3H25.5V44.5L24 46l-1.5-1.5V32.45H12v-3l4-3.85V9h-2.5V6h20.7v3h-2.5Zm-15.65 3.85h15.6L28.7 26.7V9H19v17.7Zm7.8 0Z"/></svg>');
            --pumpkinImage: url('https://maohupi.github.io/problemSolved/image/pumpkin.png');
        }
    `);
    this.addStyleElement(`
        [meowTheme] .post-entry {
            transition: 0.5s;
        }
        [meowTheme] .post-entry * {
            color: var(--entry-content);
        }
        [meowTheme] .post-entry:hover {
            box-shadow: 0px 0px 1vw orange;
        }
        body[meowTheme], [meowTheme] body {
            background-color: var(--theme) !important;
            background-image: var(--backgroundImage) !important;
            background-size: 50vmin !important;
            background-position: right bottom !important;
            background-repeat: no-repeat !important;
            background-blend-mode: luminosity !important;
            background-attachment: fixed !important;
        }
        body[meowTheme].dark, [meowTheme] body.dark {
            background-blend-mode: hard-light !important;
        }

        [meowTheme="halloween"] {
            --theme: #ffeccc;
            --entry: #0008;
            --primary: #7c3400;
            --primary-dim: #bababa;
            --secondary: #be6500;
            --tertiary: #7b7c7c;
            --tertiary-bg: #ffd3a9;
            --content: black;
            --code-bg: var(--theme);
            --border: #ffb100;
            --link-background-color: #ffa5006d;
            --link-color: var(--primary);
            --link-hover-color: #ffd26c;
            --link-underline-shadow: 0 1px 0var( --link-color);
            --link-hover-underline-color: var(--link-hover-color);
            --link-hover-underline-shadow: 0 2px 0 var(--link-hover-underline-color);
            --backgroundImage: var(--pumpkinImage);
        }
        [meowTheme="halloween"].dark {
            --theme: #13041f;
            --entry: #0008;
            --primary: #fff2e0;
            --primary-dim: #bababa;
            --secondary: #d9b0ff;
            --tertiary: #7b7c7c;
            --tertiary-bg: #51298a;
            --content: white;
            --code-bg: var(--theme);
            --border: #ffb100;
            --link-background-color: #51298a;
            --link-color: var(--primary);
            --link-hover-color: #ffd26c;
            --link-underline-shadow: 0 1px 0var(--link-color);
            --link-hover-underline-color: var(--link-hover-color);
            --link-hover-underline-shadow: 0 2px 0 var(--link-hover-underline-color);
            --backgroundImage: var(--pumpkinImage);
        }
    `);
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
        a.linkTag[meowClick] {
            opacity: 0;
            pointer-event: none;
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
        a.linkTag_aniEle {
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
        a.linkBox[meowClick] {
            opacity: 0;
            pointer-event: none;
        }
        a.linkBox_aniEle {
            --top: 0px;
            --left: 0px;
            --width: 0px;
            --height: 0px;
            --animationDuration: 3s;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            width: var(--width);
            height: var(--height);
            position: fixed;
            top: var(--top);
            left: var(--left);
            transition: var(--animationDuration);
            z-index: 999;
        }
        a.linkBox_aniEle > * {
            transition: var(--animationDuration);
            transform: scale(1);
        }
        a.linkBox_aniEle[linkBox_aniEle_2] {
            top: 0px;
            left: 0px;
            width: 100vw;
            height: 100vh;
        }
        a.linkBox_aniEle[linkBox_aniEle_2] > * {
            transform: scale(5);
        }
        :where(span, a).pinned {
            color: transparent !important;
            background-image: var(--pinImage);
            background-size: contain;
            background-position: left center;
            background-repeat: no-repeat;
        }
    `);

    /* attribute */
    document.body.setAttribute('meowTheme', 'halloween');
    document.querySelectorAll('a[href]').forEach(a => {
        if([null, undefined, 'false'].indexOf(a.getAttribute('meowInit')) > -1){
            if(['Github', 'Discord'].indexOf(a.innerText) > -1){
                a.setAttribute('meowContent', a.innerText);
                MeowJS.addClass(a, 'linkTag');
                MeowJS.addClass(a, `${a.innerText.toLowerCase()}Link`);
                a.setAttribute('meowInit', 'true');
            }
        }
    });
    document.querySelectorAll('.buttons > a.button[href]').forEach(a => {
        if([null, undefined, 'false'].indexOf(a.getAttribute('meowInit')) > -1){
            a.setAttribute('meowContent', a.innerText);
            MeowJS.addClass(a, 'linkBox');
            a.setAttribute('meowInit', 'true');
        }
    });
    document.querySelectorAll(':where(span, a).entry-isdraft').forEach(span => {
        if([null, undefined, 'false'].indexOf(span.getAttribute('meowInit')) > -1){
            if(['[Pinned]', '  [Pinned]', '  [Pinned]', '&nbsp;&nbsp;[Pinned]'].indexOf(span.innerText) > -1){
                span.setAttribute('meowContent', span.innerText);
                MeowJS.addClass(span, 'pinned');
                span.setAttribute('meowInit', 'true');
            }
        }
    });
    document.querySelectorAll('[alt="跪拜"]').forEach(img => {
        if([null, undefined, 'false'].indexOf(img.getAttribute('meowInit')) > -1){
            MeowJS.addClass(img, 'livingElement');
            img.setAttribute('meowInit', 'true');
        }
    });
}

/* init */
MeowJS.init();
