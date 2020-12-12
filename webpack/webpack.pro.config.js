const common = require("./webpack.common");
const obj = Object.assign(
    {},
    {
        mode: "production",
    },
    common
);
module.exports = obj;
