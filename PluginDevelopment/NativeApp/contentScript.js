console.log("Content script says Hello To The World")
console.log(document.querySelector('.yt-simple-endpoint.ytd-playlist-video-renderer').getAttribute("href"))

function sendMessage(){
    browser.runtime.sendMessage(document.querySelector('.yt-simple-endpoint.ytd-playlist-video-renderer').getAttribute("href"))
}
for(var i =0; i < 10; i++){
    sendMessage()
}

browser.runtime.onMessage.addListener(function(message){
    console.log(message)
})
