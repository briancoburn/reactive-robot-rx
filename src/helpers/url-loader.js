/**
 * Created by brian on 5/25/16.
 */

export function getUrl(url, mimeTypeOverride, callback, errorCallback) {
    console.log('url-loader::getUrl()==>url:', url);
    let xobj = new XMLHttpRequest();
    //let promise;
    if(mimeTypeOverride && mimeTypeOverride.length > 0){
        xobj.overrideMimeType(mimeTypeOverride);
    }

    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function (evt) {
        console.log('onreadystatechange==>xobj.readyState:'+xobj.readyState+', xobj.status', xobj.status);
        if (xobj.readyState === 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }else if(xobj.status == "400"){
            errorCallback(evt);
        }
    };
    xobj.send(null);
    // promise = new Promise(function(callback,errorCallback){
    //
    // });
    // return promise;

}

export function postUrl(url, mimeTypeOverride,callback, errorCallback) {

    let xobj = new XMLHttpRequest();
    let promise;
    if(mimeTypeOverride && mimeTypeOverride.length > 0){
        xobj.overrideMimeType(mimeTypeOverride);
    }
    xobj.open('POST', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function (evt) {
        console.log('onreadystatechange==>xobj.readyState:'+xobj.readyState+', xobj.status', xobj.status);
        if (xobj.readyState === 4 && xobj.status === "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }else if(xobj.status === "400"){
            errorCallback(evt);
        }
    };
    xobj.send(null);
    // promise = new Promise(function(callback,errorCallback){
    //
    // });
    // return promise;

}