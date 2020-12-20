const fs = require("fs");
const path = require("path");
const http = require("http");

const name = "ReloadPlugin";
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
    constructor(options = {}) {
        let url = options.url || "https://github.com/";
        this.matches = [url];
    }
    apply(compiler) {
        compiler.hooks.afterPlugins.tap(name, (compiler) => {
            let _path = path.resolve(__dirname, "./public/manifest.json");
            fs.readFile(_path, (err, chunk) => {
                if (err) {
                    return;
                }
                chunk = chunk.toString();
                chunk = JSON.parse(chunk);
                chunk["content_scripts"][0].matches = this.matches;
                chunk = JSON.stringify(chunk, null, " ".repeat(4));
                fs.writeFile(_path, chunk, "utf-8", (err) => {
                    if (err) {
                        console.log("matches url 修改失败");
                        return;
                    }
                    console.log("matches url 修改成功");
                });
            });
        });

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
