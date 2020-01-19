exports.obj = {
    /**
     * @desc 深拷贝，支持常见类型
     * @param {Any} values
     * @return {Any}
     */
    deepClone: function (values) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == values || "object" != typeof values) return values;

        // Handle Date
        if (values instanceof Date) {
            copy = new Date();
            copy.setTime(values.getTime());
            return copy;
        }

        // Handle Array
        if (values instanceof Array) {
            copy = [];
            for (let i = 0, len = values.length; i < len; i++) {
                copy[i] = deepClone(values[i]);
            }
            return copy;
        }

        // Handle Object
        if (values instanceof Object) {
            copy = {};
            for (const attr in values) {
                if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy values! Its type isn't supported.");
    },
    /**
     *
     * @desc   判断`obj`是否为空
     * @param  {Object} obj
     * @return {Boolean}
     */
    isEmptyObject: function (obj) {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
        return !Object.keys(obj).length;
    },
    /**
     *
     * @desc   对象序列化
     * @param  {Object} obj
     * @return {String}
     */
    stringfyQueryString: function (obj) {
        if (!obj) return "";
        const pairs = [];

        for (const key in obj) {
            const value = obj[key];

            if (value instanceof Array) {
                for (let i = 0; i < value.length; ++i) {
                    pairs.push(
                        encodeURIComponent(key + "[" + i + "]") + "=" + encodeURIComponent(value[i])
                    );
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }

        return pairs.join("&");
    }
};
