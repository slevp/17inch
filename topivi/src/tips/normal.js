/**
 * @Description: Normal tips.
 * @Author: fuwensong
 * @Date: 14-9-18
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var util = require('../util');
    var Tips = require('./tips');

    function Normal (selector, options) {
        Tips.apply(this, arguments);
    }
    util.inherits(Normal, Tips);

    Normal.prototype.init = function () {
        Tips.prototype.init.apply(this, arguments);
        this.el.addClass('normal');
    };

    Normal.prototype.render = function () {
        Tips.prototype.render.apply(this, arguments);
    };
    module.exports = Normal;
});