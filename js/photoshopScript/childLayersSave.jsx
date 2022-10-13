/* 
 * 2022 © MaoHuPi
 * childLayersSave.jsx
 * 
 * 註：
 * path如果以.或..作為開頭，
 * 則可能在使用功能不完善的zip解壓縮工具或WindowsExplorer解壓縮時，
 * 出現解壓縮失敗的問題，
 * 此時可以透過WinRAR將其正確地解壓縮。
 */

function childLayersSave(parentLayerName, saveAsType, path){
    // 基本變數
    let layers = app.activeDocument.layers;
    // let path = app.activeDocument.path;
    let path = path != undefined ? path : '';
    let parentLayer = undefined;
    console.log(path);
    let originalLayerSettings = {};
    let originalSubLayerSettings = {};
    
    // 儲存成指定類型
    function saveAs(name, type) {
        var saveFile = new File(path + name + '.' + type);
        console.log(saveFile);
        var saveOptions = new ExportOptionsSaveForWeb;
        // saveOptions.format = SaveDocumentType.PNG;
        saveOptions.format = type;
        app.activeDocument.saveAs(saveFile, saveOptions, true);
    }
    
    // 隱藏最外層圖層
    for(var i = 0; i < layers.length; i++){
        var layer = layers[i];
        originalLayerSettings[layer.name] = {
            visible: layer.visible, 
            opacity: layer.opacity
        };
        layer.visible = false;
        if(layer.name == parentLayerName){
            parentLayer = layer;
        }
    }
    parentLayer.visible = true;
    
    // 隱藏向量字圖層
    for(var i = 0; i < parentLayer.layers.length; i++){
        var layer = parentLayer.layers[i];
        originalSubLayerSettings[layer.name] = {
            visible: layer.visible, 
            opacity: layer.opacity
        };
        layer.visible = false;
    }
    
    // 處理向量字圖層
    for(var i = 0; i < parentLayer.layers.length; i++){
        var layer = parentLayer.layers[i];
        layer.visible = true;
        saveAs(layer.name, saveAsType);
        layer.visible = false;
    }
    
    // 恢復向量字圖層
    for(var i = 0; i < parentLayer.layers.length; i++){
        var layer = parentLayer.layers[i];
        var settings = originalSubLayerSettings[layer.name];
        layer.visible = settings.visible;
        layer.opacity = settings.opacity;
    }
    
    // 恢復最外層圖層
    for(var i = 0; i < layers.length; i++){
        var layer = layers[i];
        var settings = originalLayerSettings[layer.name];
        layer.visible = settings.visible;
        layer.opacity = settings.opacity;
    }
    alert('done');
}

// childLayersSave('frames', 'png');
childLayersSave('words', 'svg');
