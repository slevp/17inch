/**
 * @Description: Progress index package.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Progress = {};
    Progress.round = require('./round');
    Progress.horizontal = require('./horizontal');
    Progress.line = require('./line');

    module.exports = Progress;
});