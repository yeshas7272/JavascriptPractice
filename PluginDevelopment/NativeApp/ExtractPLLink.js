console.log("I give you the link to play watch later automatically")
//console.log(document.querySelector('.yt-simple-endpoint.ytd-playlist-video-renderer').getAttribute("href"))

/*var port = browser.runtime.connectNative("native_app")
console.log(port)
port.postMessage({"key": "Hello"})*/

function onError(response){
    console.error("Error: ", response)
}

function onResponse(response){
    console.log("Received: ", response)
}

/*var sending = browser.runtime.sendNativeMessage(
    "native_app",
    "Hello");
  sending.then(onResponse, onError);*/

/*port.onMessage.addListener(function(response){
    console.log("Received: ", response)
    response["key"] = "javascript"
    port.postMessage("response")
})*/



/*var sending = browser.runtime.sendNativeMessage(
    "native_app",
    {"msg":"Hello"});
sending.then(onResponse, onError);*/

browser.runtime.onMessage.addListener(function(message){
    console.log("Message from content script: " + message)
    var sending = browser.runtime.sendNativeMessage(
        "native_app",
        message);
    sending.then(onResponse, onError);
    port.postMessage(message)
})
