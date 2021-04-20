const fs = require('fs');
const path = require('path');
const os = require('os');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const core = require('@babel/core');
const generate = require('@babel/generator').default;

let port = 2233;
function getIp() {
    let WLAN;
    try {
        WLAN = os.networkInterfaces().WLAN;
    } catch (error) {
        console.log('获取ip失败');
        throw Error(error);
    }
    if (WLAN) {
        for (let i = 0; i < WLAN.length; i++) {
            if (WLAN[i].family === 'IPv4') {
                return WLAN[i].address || '';
            }
        }
    }
}

const _path = path.resolve(__dirname, './src/background.js');
function editCode() {
    fs.readFile(_path, (err, chunk) => {
        chunk = chunk.toString();
        const ast = parser.parse(chunk, {
            sourceType: 'module'
        });
        let num = 1;
        ast.program.body.forEach(item => {
            if ('FunctionDeclaration' === item.type) {
                let id = item.id;
                if (id.name === 'link') {
                    let body = item.body.body[0];
                    let _id = body.declarations[0];
                    let v = `"http://${getIp()}:${port}"`;
                    _id.init.arguments[0].value = v;
                    _id.init.arguments[0].extra.raw = v;
                    _id.init.arguments[0].extra.rawValue = v;
                }
            }
        });
        let transSource = core.transformFromAstSync(ast, null, {
            configFile: false
        }).code;
        const output = generate(
            ast,
            {
                auxiliaryCommentBefore: '这是放在开头的注释',
                auxiliaryCommentAfter: '这是放在结尾的注释',
                compact: false
            },
            transSource
        );
        const code = output.code;
        let codes = code.split(/\n/g);
        codes = codes.map(c => {
            let reg = /^ +/;
            if (reg.test(c)) {
                const len = c.match(reg)[0].length;
                c = ' '.repeat(len) + c;
                return c;
            }
            return c;
        });
        const result = codes.join('\n');
        fs.writeFile(_path, result, err => {
            if (err) {
                console.log('写入失败');
                return;
            }
            console.log('写入成功');
        });
        // traverse(ast, {
        //     FunctionDeclaration: function (path) {
        //         console.log(`\r\n---------${num++}-----------\r\n`);
        //         console.log(path);
        //     }
        // });
    });
}
editCode();
module.exports = editCode;
