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
    var Card = require('./card');
    //var Template = require('../templates/xxx.tpl');

    function Normal (selector, options) {
        this.template = _.template(Template);
        var defaults = {
        };
        options = _.extend(defaults, options);
        Card.apply(this, arguments);
    }
    util.inherits(Normal, Card);

    Normal.prototype.init = function () {
        Card.prototype.init.apply(this, arguments);
        var self = this;
        var options = this.options;
        this.el.addClass('confirm');

    };

    Normal.prototype.render = function () {
        var self = this;
    };
    module.exports = Normal;
});