export default {
    /**
     * @desc 数组去重
     * @param {Array} arr
     * @return {Array}
     */
    unique: function (arr) {
        return Array.from(new Set(arr));
    },
    /**
     *
     * @desc 判断两个数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Boolean}
     */
    arrayEqual: function (arr1, arr2) {
        if (arr1 === arr2) return true;
        if (arr1.length != arr2.length) return false;
        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
};
