/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
const requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}());
exports.web = {
    /**
     * @desc 获取请求路径中的参数
     * @param {string} name 获取的参数名
     * @return {String}
     */
    getQueryString: function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const uri = window.decodeURI(window.location.search);
        const r = uri.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /**
     *
     * @desc   url参数转对象
     * @param  {String} url  default: window.location.href
     * @return {Object}
     */
    parseQueryString: function (url) {
        url = !url ? window.location.href : url;
        if (url.indexOf("?") === -1) {
            return {};
        }
        let search = url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
        if (search === "") {
            return {};
        }
        search = search.split("&");
        const query = {};
        for (let i = 0; i < search.length; i++) {
            const pair = search[i].split("=");
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
        }
        return query;
    },
    /**
     * @desc 下载url中的文件
     * @param {string} url
     */
    downloadFile: function (url) {
        if (/msie|firefox|trident[\s\S]*rv/.test(navigator.userAgent.toLowerCase())) {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    },
    /**
     * @desc 阻止冒泡
     * @param {event} e
     */
    stopBubble: function (e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation(); // W3C阻止冒泡方法
        } else {
            e.cancelBubble = true; // IE阻止冒泡方法
        }
    },
    /**
     *
     * @desc 获取操作系统类型
     * @return {String}
     */
    getOS: function () {
        const userAgent =
            ("navigator" in window &&
                "userAgent" in navigator &&
                navigator.userAgent.toLowerCase()) ||
            "";
        const vendor =
            ("navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase()) ||
            "";
        const appVersion =
            ("navigator" in window &&
                "appVersion" in navigator &&
                navigator.appVersion.toLowerCase()) ||
            "";

        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return "ios";
        if (/android/i.test(userAgent)) return "android";
        if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
        if (/mac/i.test(appVersion)) return "MacOSX";
        if (/win/i.test(appVersion)) return "windows";
        if (/linux/i.test(appVersion)) return "linux";
    },
    /**
     *
     * @desc 获取浏览器类型和版本
     * @return {String}
     */
    getExplore: function () {
        const sys = {};
        const ua = navigator.userAgent.toLowerCase();
        let s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/))
            ? (sys.ie = s[1])
            : (s = ua.match(/msie ([\d\.]+)/))
                ? (sys.ie = s[1])
                : (s = ua.match(/edge\/([\d\.]+)/))
                    ? (sys.edge = s[1])
                    : (s = ua.match(/firefox\/([\d\.]+)/))
                        ? (sys.firefox = s[1])
                        : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
                            ? (sys.opera = s[1])
                            : (s = ua.match(/chrome\/([\d\.]+)/))
                                ? (sys.chrome = s[1])
                                : (s = ua.match(/version\/([\d\.]+).*safari/))
                                    ? (sys.safari = s[1])
                                    : 0;
        // 根据关系进行判断
        if (sys.ie) return "IE: " + sys.ie;
        if (sys.edge) return "EDGE: " + sys.edge;
        if (sys.firefox) return "Firefox: " + sys.firefox;
        if (sys.chrome) return "Chrome: " + sys.chrome;
        if (sys.opera) return "Opera: " + sys.opera;
        if (sys.safari) return "Safari: " + sys.safari;
        return "Unkonwn";
    },
    /**
     *
     * @desc 判断浏览器是否支持webP格式图片
     * @return {Boolean}
     */
    isSupportWebP: function () {
        return (
            !![].map &&
            document
                .createElement("canvas")
                .toDataURL("image/webp")
                .indexOf("data:image/webp") == 0
        );
    },
    /**
     *
     * @desc 判断元素是否有某个class
     * @param {HTMLElement} ele
     * @param {String} cls
     * @return {Boolean}
     */
    hasClass: function (ele, cls) {
        return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(ele.className);
    },
    /**
     *
     * @desc 为元素移除class
     * @param {HTMLElement} ele
     * @param {String} cls
     */
    removeClass: function (ele, cls) {
        if (this.hasClass(ele, cls)) {
            const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            ele.className = ele.className.replace(reg, " ");
        }
    },
    /**
     *
     * @desc   为元素添加class
     * @param  {HTMLElement} ele
     * @param  {String} cls
     */
    addClass: function (ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.className += " " + cls;
        }
    },
    /**
     * @desc 为网页加载样式文件
     * @param {String} url
     */
    LoadStyle: function (url) {
        try {
            document.createStyleSheet(url);
        } catch (e) {
            const cssLink = document.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
            cssLink.href = url;
            const head = document.getElementsByTagName("head")[0];
            head.appendChild(cssLink);
        }
    },
    /**
     *
     * @desc 根据name读取cookie
     * @param  {String} name
     * @return {String}
     */
    getCookie: function (name) {
        const arr = document.cookie.replace(/\s/g, "").split(";");
        for (let i = 0; i < arr.length; i++) {
            const tempArr = arr[i].split("=");
            if (tempArr[0] == name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return "";
    },
    /**
     *
     * @desc  设置Cookie
     * @param {String} name
     * @param {String} value
     * @param {Number} days
     */
    setCookie: function (name, value, days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = name + "=" + value + ";expires=" + date;
    },
    /**
     *
     * @desc 根据name删除cookie
     * @param  {String} name
     */
    removeCookie: function (name) {
        // 设置已过期，系统会立刻删除cookie
        this.setCookie(name, "1", -1);
    },
    /**
     *
     * @desc 获取滚动条距顶部的距离
     */
    getScrollTop: function () {
        return (
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        );
    },
    /**
     *
     * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
     * @param {HTMLElement} ele
     * @returns { {left: number, top: number} }
     */
    offset: function (ele) {
        const pos = {
            left: 0,
            top: 0
        };
        while (ele) {
            pos.left += ele.offsetLeft;
            pos.top += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return pos;
    },
    /**
     *
     * @desc 设置滚动条距顶部的距离
     * @param {Number} value
     */
    setScrollTop: function (value) {
        window.scrollTo(0, value);
        return value;
    },
    /**
     *
     * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
     * @param {Number} to
     * @param {Number} duration
     */
    scrollTo: function (to, duration) {
        const that = this;
        if (duration < 0) {
            this.setScrollTop(to);
            return;
        }
        const diff = to - this.getScrollTop();
        if (diff === 0) return;
        const step = (diff / duration) * 10;
        requestAnimFrame(function () {
            if (Math.abs(step) > Math.abs(diff)) {
                that.setScrollTop(that.getScrollTop() + diff);
                return;
            }
            that.setScrollTop(that.getScrollTop() + step);
            if (
                (diff > 0 && that.getScrollTop() >= to) ||
                (diff < 0 && that.getScrollTop() <= to)
            ) {
                return;
            }
            that.scrollTo(to, duration - 16);
        });
    },
    /**
     *
     * @desc H5软键盘缩回、弹起回调
     * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
     * @param {Function} downCb 当软键盘弹起后，缩回的回调
     * @param {Function} upCb 当软键盘弹起的回调
     */
    windowResize: function (downCb, upCb) {
        const clientHeight = window.innerHeight;
        downCb = typeof downCb === "function" ? downCb : function () {};
        upCb = typeof upCb === "function" ? upCb : function () {};
        window.addEventListener("resize", () => {
            const height = window.innerHeight;
            if (height === clientHeight) {
                downCb();
            }
            if (height < clientHeight) {
                upCb();
            }
        });
    }
    // HtmlEncode: function (text) {
    //     return text
    //         .replace(/&/g, "&")
    //         .replace(/\"/g, '"')
    //         .replace(/</g, "<")
    //         .replace(/>/g, ">");
    // }
};
