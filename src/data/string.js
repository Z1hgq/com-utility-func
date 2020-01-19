exports.str = {
    /**
     * @desc 把parent中的所有str1替换为str2
     * @param {String} parent
     * @param {String} str1
     * @param {String} str2
     * @return {String}
     */
    replaceAll: function (parent, str1, str2) {
        const reg = new RegExp(str1, "gm");
        return parent.replace(reg, str2);
    },
    /**
     * @desc 去除字符串两边空格
     * @param {String} str
     * @return {String}
     */
    trim: function (str) {
        return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    },
    /**
     * @desc 去除字符串左边空格
     * @param {String} str
     * @return {String}
     */
    ltrim: function (str) {
        return str.replace(/^(\s*|　*)/, "");
    },
    /**
     * @desc 去除字符串右边空格
     * @param {String} str
     * @return {String}
     */
    rtrim: function (str) {
        return str.replace(/(\s*|　*)$/, "");
    },
    /**
     *
     * @desc   现金额转大写
     * @param  {Number} n
     * @return {String}
     */
    digitUppercase: function (n) {
        const fraction = ["角", "分"];
        const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        const unit = [
            ["元", "万", "亿"],
            ["", "拾", "佰", "仟"]
        ];
        const head = n < 0 ? "欠" : "";
        n = Math.abs(n);
        let s = "";
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(
                /零./,
                ""
            );
        }
        s = s || "整";
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = "";
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
        }
        return (
            head +
            s
                .replace(/(零.)*零元/, "元")
                .replace(/(零.)+/g, "零")
                .replace(/^整$/, "零元整")
        );
    }
};
