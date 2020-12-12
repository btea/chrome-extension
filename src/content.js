// import './css/content.css';
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.value) {
        console.log(request);
        // console.log(sender);
        // 发送的信息似乎可以直接发送对象
        sendResponse("content-script已经接收到你的消息");
        if (request.cmd === "reload-page") {
            // 先把操作存起来,此时插件会刷新
            // localStorage.setItem('refresh', true);
            // 不需要保存起来，延时刷新即可
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }
});

let el = document.querySelector("#bili_report_douga");
let newEl = document.createElement("h1");
newEl.style = "text-align: center; color: #6cf;";
newEl.innerHTML = "哔哩哔哩干杯！！！[]~(￣▽￣)~*！";
el.parentNode.insertBefore(newEl, el);
console.log("这里是content");
