/**
 * @Description:
 * @Author: fuwensong
 * @Date: 14-10-16
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {

    exports.parseTimeDiff = function (time) {
        var nowTime = new Date().getTime();
        var diff = parseInt(nowTime / 1000) - time;
        var temp = diff; // seconds
        if (temp < 60) {
            return {num: temp, unit: 's'};
        }
        temp = parseInt(temp / 60); // mins
        if (temp < 60) {
            return {num: temp, unit: 'm'};
        }
        temp = parseInt(temp / 60); // hours
        if (temp < 24) {
            return {num: temp, unit: 'h'};
        }
        temp = parseInt(temp / 24); // days
        if (temp < 7) {
            return {num: temp, unit: 'd'};
        }
        var week = parseInt(temp / 7);// week
        if (week < 4) {
            return {num: week, unit: 'w'};
        }
        temp = parseInt(temp / 30);// month
        if (temp < 12) {
            return {num: temp, unit: 'mon'};
        }
        temp = parseInt(temp / 12);// year
        return {num: temp, unit: 'y'};
    };

    exports.parseTime = function (seconds) {
        var hours = seconds / 3600;
        var str = '';
        if (hours > 0) {
            hours = parseInt(hours);
            seconds = seconds % 3600;
        }
        var mins = seconds / 60;
        if (mins > 0) {
            mins = parseInt(mins);
            seconds = seconds % 60;
        }
        return {
            h: hours,
            m: mins,
            s: seconds
        };
    };
});