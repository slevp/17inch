/**
 * @Description: Slider widget.
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

    function Slider (selector, options) {
        this.defaults = {

        };
        Widget.apply(this, arguments);

        var self = this;

        var el = this.el.find("li");


        for(var i = 0,length = el.length;i < length;i++) {
            var El = el.eq(i);
            El.drag('options', {
                axis:  'x',
                min: {left: -self.options.width},
                max: {left: 0},
                ondragbefore: function (el,event,instance) {
                },
                ondragstart: function (el,event,instance) {
                },
                ondrag: function (el,event,instance) {
                },

                ondragend: function (el, event, instance) {
                    if (-self.options.width - event.$element.css("left").slice(0,-2) < 0) {
                        event.$element.css("left", 0)
                    }
                }

            });
        }

    }
    util.inherits(Slider, Widget);
    Slider.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('slider');

    };
    module.exports = Slider;
});