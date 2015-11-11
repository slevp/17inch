/**
 * @Description: Dialog index package.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Dialog = {};
    Dialog.normal = require('./normal');
    Dialog.confirm = require('./confirm');

    module.exports = Dialog;
});