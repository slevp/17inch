/**
 * @Description: Confirm dialog.
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
    var Loading = require('./loading');
    var Template = require('../templates/loading-normal.tpl');

    function Normal (selector, options) {
        this.template = _.template(Template);
        var defaults = {
        };
        options = _.extend(defaults, options);
        Loading.apply(this, arguments);
    }
    util.inherits(Normal, Loading);

    Normal.prototype.init = function () {
        Loading.prototype.init.apply(this, arguments);
        this.el.addClass('normal');

    };

    Normal.prototype.render = function () {
        this.el.empty();
        this.el.html(this.template());
    };
    module.exports = Normal;
});