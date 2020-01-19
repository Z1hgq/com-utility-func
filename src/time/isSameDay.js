/**
 * @desc   判断是否为同一天
 * @param  {Date} date1
 * @param  {Date} date2 可选／默认值：当天
 * @return {Boolean}
 */
export default function (date1, date2) {
    if (!date2) {
        date2 = new Date();
    }
    const date1Year = date1.getFullYear();
    const date1Month = date1.getMonth() + 1;
    const date1Date = date1.getDate();
    const date2Year = date2.getFullYear();
    const date2Month = date2.getMonth() + 1;
    const date2Date = date2.getDate();

    return date1Date === date2Date && date1Month === date2Month && date1Year === date2Year;
};
