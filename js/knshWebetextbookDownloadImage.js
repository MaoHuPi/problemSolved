if(KSDL_get('id') != null){KSDL_name = KSDL_get('id');}
else{KSDL_name = '康軒電子書';}
SetScreenScale(document.querySelector("#menuTools > div:nth-child(8) > div:nth-child(2) > div"))
LoadPage(0);
i = 0;
KSDL_atdi();
function KSDL_atdi(){
    if(i < NowPage+1){
        KSDL_dcfi(1);
        turnRightPage();
        setTimeout(KSDL_atdi, 10000);
        i += 1;
    }
    else{
        alert('「'+KSDL_name+'」下載完成！')
    }
};
function KSDL_dcfi(DCFInum=0, DCFItype="jpeg"){
    DCFItype = DCFItype.toLowerCase();
    DCFIcvss = document.getElementsByTagName('canvas')
    if (DCFInum != 0){
        var DCFIcvs = DCFIcvss[DCFInum-1];
        var DCFIlink = document.createElement('a');
        if (DCFItype == "png"){
            DCFIlink.download = KSDL_name+"("+(i+1)+").png";
            DCFIlink.href = DCFIcvs.toDataURL('image/png');
        }
        else {
            DCFIlink.download = KSDL_name+"("+(i+1)+").jpg";
            DCFIlink.href = DCFIcvs.toDataURL('image/jpeg');
        }
        DCFIlink.click();
    }
    else {
        for (i=0;i<DCFIcvss.length;i++){
            var DCFIcvs = DCFIcvss[i];
            var DCFIlink = document.createElement('a');
            if (DCFItype == "png"){
                DCFIlink.download = KSDL_name+"("+(i+1)+").png";
                DCFIlink.href = DCFIcvs.toDataURL('image/png');
            }
            else {
                DCFIlink.download = KSDL_name+"("+(i+1)+").jpg";
                DCFIlink.href = DCFIcvs.toDataURL('image/jpeg');
            }
            DCFIlink.click();
        }
    }
};
function KSDL_get(t = '\\url\\'){
    var getUrlString = location.href;
    var url = new URL(getUrlString);
    if(t == '\\url\\'){
        return(url)
    }
    else{
        return(url.searchParams.get(t));
    }
}
