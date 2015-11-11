/**
 * @Description: widget abstract
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');

    var defaults = {
        $parent: $('body')
    };
    function Widget (selector, options) {
        this.options = {};
        this.defaults = this.defaults || {};
        _.extend(this.options, defaults, this.defaults, options);
        if (!this.init || typeof this.init !== 'function') {
            return console.error('Init function not found.');
        }
        if (_.isString(selector)) {
            this.el = $(selector);
            if (!this.el || this.el.length <= 0) {
                var id = 'widget-' + (new Date()).getTime();
                this.options.$parent.append("<div id='" + id +"'></div>");
                this.el = this.options.$parent.find('#' + id);
                this.id = id;
            }
        } else {
            this.el = selector;
        }
        this.id = this.id || this.el.attr('id');
        this.init();
    }
    Widget.prototype.init = function () {
        this.el.addClass('topivi-widget');
    };
    Widget.prototype.render = function () {

    };
    Widget.prototype.resetOptions = function (options) {
        _.extend(this.options, options)
    };
    module.exports = Widget;
});