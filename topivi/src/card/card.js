/**
 * @Description: Abstract Card widget.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var util = require('../util');
    var Widget = require('../widget');
    var JQTouch = require('jquery-touch');

    function Card () {
        this.defaults = {
            num: 4,
            expandAnimation: function (callback) {
            },
            shrinkAnimation: function (callback) {
            }
        };
        Widget.apply(this, arguments);
    }
    util.inherits(Card, Widget);
    Card.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('card');

    };
    Card.prototype.init.show = function (index) {
        index = index || 0;
    };
    module.exports = Card;
});