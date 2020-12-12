### 代码修改之后，插件自动更新

**重要的步骤两步**  
1、代码修改编译完成之后，通知插件进行更新
2、插件更新完成之后，通知应用插件的页面进行更新

**需要解决的问题**
1、代码编译完成之后，如何通知插件进行更新？  
2、插件更新之后，如何通知相应的页面进行更新？

**_解决思路_**  
1、如何在编译完成之后，通知插件更新？
首先，要确定每次编译完成之后做相应的操作，最简单粗暴的解决方法，编写一个 webpack 插件，然后监听 done hook。
在 hook 的 callback 里面，可以进行通知插件更新的操作。

如何通知插件？经过查找一些资料，以及参考别人的文章，最终决定采用 SSE。在插件里面，创建一个 server 服务。
然后在 callback 里面进行服务端推送信息，告知插件执行更新的操作。

经测试，`background.js`、`popup.js`都能进行更新插件的操作(`chrome.runtime.reload()`)。
于是，第一次尝试，把 SSE 连接的逻辑写在`popup.js`里面，经过实践，发现`popup.js`里面的逻辑，只有在`popup.html`显示的时候才会执行，这明显不是很符合要求。

随即，把 SSE 连接的逻辑写在`background.js`里面，经过尝试可行。

至此，编译完成之后，通知插件更新流程可以走通了。

按照正常逻辑，插件更新之后，再通知 `content.js` 对 `tab` 页进行更新。但这样，有个问题，如果在插件更新之后，`background.js` 也会更新，那么通知 `content.js` 的操作就发送不出去。若在更新之前，通知`content.js`更新，这样倒是可以更新，但是插件没更新，页面更新也没意义。

经过思考，实现了一个简单的解决方法，通过延时处理，先把通知发送给`content.js`，收到之后，进行一定时间延时操作。此时，插件紧接着更新，等到延时开始执行，插件已经刷新，再执行延时的操作，刷新页面！


[Chrome 插件 攻略文档](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
