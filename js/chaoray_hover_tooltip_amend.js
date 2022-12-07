/*
original: hover_tooltip.js
amend: 2022/12/07 by MaoHuPi
*/

/*
拔掉以下css: 
body {
    line-height: 1.6em;
}

.tooltip .tooltip-text {
    visibility: hidden;
    opacity: 0;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
*/

style = document.createElement('style');
style.innerHTML = `
p {
    padding: 2vw;
}
tips {
    --color: white;
    display: inline-block;
    padding: 0px 0px 2px 0px;
    position: relative;
    border-style: solid;
    border-color: var(--color);
    border-width: 0px 0px 0.1px 0px;
    transition: 0.5s;
}
.tooltip-text {
    opacity: 0;
    padding: 1px 5px;
    width: auto;
    position: absolute;
    bottom: 0px;
    left: 0px;
    color: #112;
    background-color: #9b9c9d;
    border-style: solid;
    border-color: var(--color);
    border-width: 0.1px;
    border-radius: 0.5vw;
    white-space: nowrap;
    pointer-events: none;
    transition: 0.5s;
}
tips[tipHover] > .tooltip-text, .tooltip-text:hover {
    opacity: 1;
    pointer-events: auto;
}
tips[tipHover] > .tooltip-text, .tooltip-text:hover {
    opacity: 1;
    pointer-events: auto;
}
`;
document.body.appendChild(style);

let tips = document.getElementsByTagName('tips');

for (let i = 0; i < tips.length; i++) {
    let tip = tips[i];
    tip.classList.add('tooltip');

    let span = document.createElement('span');
    span.className = 'tooltip-text';
    span.innerHTML = tip.dataset.c;

    if (tip.dataset.u) {
        tip.style.setProperty('--color', tip.dataset.u);
    }

    tip.appendChild(span);

    tip.addEventListener('mouseover', event => {
        event.stopPropagation();
        console.log(tip);
        document.querySelectorAll('tips[tipHover]').forEach(tip => tip.removeAttribute('tipHover'));
        tip.setAttribute('tipHover', '');
    });

    tip.addEventListener('mouseleave', event => {
        tip.removeAttribute('tipHover');
    });
}
