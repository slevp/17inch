/**
 * @Description: Normal dialog.
 * @Author: fuwensong
 * @Date: 14-9-18
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var util = require('../util');
    var Dialog = require('./dialog');

    function Normal (selector, options) {
        var defaults = {
        };
        options = _.extend(defaults, options);
        Dialog.apply(this, arguments);
    }
    util.inherits(Normal, Dialog);

    Normal.prototype.init = function () {
        Dialog.prototype.init.apply(this, arguments);
        var self = this;
        var options = this.options;

        this.el.addClass('normal');
    };

    Normal.prototype.render = function () {
        var self = this;
        var options = this.options;
        this.el.append(options.content).wrapInner("<div class='content'></div>");
    };
    module.exports = Normal;
});