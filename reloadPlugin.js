const fs = require("fs");
const path = require("path");
const http = require("http");

const name = "ReloadPlugin";
let num = 1;
let response;
http.createServer((req, res) => {
    response = res;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
    });
    res.write("data: init" + "\n\n");
}).listen(2233);

class ReloadPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(name, (stats) => {
            console.log("\r\n   开始更新插件   \r\n");
            try {
                //     // postMsg();
                //     // fireCustomEvent();
                if (response) {
                    response.write("data:" + "refresh" + "\n\n");
                }
            } catch (error) {
                console.log(error);
                process.exit();
            }
        });
    }
}

module.exports = ReloadPlugin;
