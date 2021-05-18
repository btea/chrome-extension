// import './css/content.css';
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.value) {
        console.log(request);
        // console.log(sender);
        // 发送的信息似乎可以直接发送对象
        sendResponse('content-script已经接收到你的消息');
        if (request.cmd === 'reload-page') {
            // 先把操作存起来,此时插件会刷新
            // localStorage.setItem('refresh', true);
            // 不需要保存起来，延时刷新即可
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }
});

const one = {
    color: '#fff',
    background: 'aqua',
    padding: '5px 10px',
    'border-left-top-radius': '3px',
    'border-left-bottom-radius': '3px'
};
const two = {
    color: '#fff',
    background: '#6cf',
    padding: '5px 10px',
    'border-right-top-radius': '3px',
    'border-right-bottom-radius': '3px'
};

console.log(
    '%c link %c start ',
    Object.entries(one)
        .map(attr => {
            return attr[0] + ':' + attr[1];
        })
        .join(';'),
    Object.entries(two)
        .map(attr => {
            return attr[0] + ':' + attr[1];
        })
        .join(';')
);
console.log('(￢_￢)');
