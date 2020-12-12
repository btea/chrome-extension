const common = require("./webpack.common");
const obj = Object.assign(
    {},
    {
        mode: "development",
        watch: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    common
);

module.exports = obj;
