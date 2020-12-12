import { createApp } from 'vue';
import Background from './Background.vue';

createApp(Background).mount('#background');

function link() {
    let es = new EventSource('http://192.168.124.7:2233');
    es.onmessage = dealRes;
}

function dealRes(e) {
    console.log(e);
    if (e.data !== 'refresh') {
        return;
    }
    // 发消息给content-script，让它刷新页面
    sendMessageToContentScript({ cmd: 'reload-page', value: '插件已经刷新，开始刷新页面!' }, response => {
        if (response) {
            console.log('收到来自content-script的回复：' + response);
        }
    });
    setTimeout(() => {
        chrome.runtime.reload();
    }, 1000);
}
link();

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.query({ active: true }, function (tabs) {
        // 暂时不考虑多个窗口应用组件的问题
        if (tabs && tabs.length) {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        }
    });
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId(tabId => {
        console.log(message);
        console.log(tabId);
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}
