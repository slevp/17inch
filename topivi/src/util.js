/**
 * @Description: An util module of topivi.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    exports.inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    };
    exports.fileSizeString = function(size, precision) {
        if (size <= 1024) {
            return '1K';
        }
        var units = ['K', 'M', 'G', 'T'];
        var times = 0;
        while(size > 1024) {
            times++;
            size = size / 1024;
        }
        size = size + '';
        precision = precision || 2;
        var dotIndex = size.indexOf('.');
        if (dotIndex > 0 && dotIndex + precision + 1 <= size.length) {
            var integer = size.substring(0, dotIndex);
            var float = size.substr(dotIndex + 1, precision);
            size = integer + '.' + float;
        }
        return size + units[times - 1];
    };
    exports.dateToString = function(date, delimiter) {
        delimiter = delimiter || '-';
        return date.getFullYear() + delimiter + (date.getMonth() + 1) + delimiter + date.getDate();
    };
    exports.stringToDate = function(str, delimiter) {
        delimiter = delimiter || '-';
        var strs;
        if (str.indexOf(delimiter) < 0) {
            strs = [str.substr(0, 4), str.substr(4, 2), str.substr(6, 2)];
        } else {
            strs = str.split('-');
        }
        if (strs.length != 3) {
            return console.error('Param date string is invalid.');
        }
        return new Date(parseInt(strs[0]), parseInt(strs[1]) - 1, parseInt(strs[2]));
    };
});