const formatRemainTime = require("./formatRemainTime");
const isLeapYear = require("./isLeapYear");
const isSameDay = require("./isSameDay");
const monthDays = require("./monthDays");
const timeLeft = require("./timeLeft");
const formatPassTime = require("./formatPassTime");

exports.time = {
    formatPassTime,
    formatRemainTime,
    isLeapYear,
    isSameDay,
    monthDays,
    timeLeft
};
