for(i = 0; i < $$('a').length;i++){
    $$('a')[i].setAttribute('onclick') = $$('a')[i].getAttribute('onclick') + 'showQ();';
}
function showQ(){
    console.log($('.test-content > h2')[0].innerText.split('\n')[1]);
}
