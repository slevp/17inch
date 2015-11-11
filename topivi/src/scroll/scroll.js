/**
 * Created by caiyidi on 14/09/22.
 */
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
    var Iscroll = require('./iscroll');

    function Scroll (selector, options) {
        var self = this;
        var pullDownEl = $('#pullDown');
        var pullDownOffset = pullDownEl.outerHeight();

        options = {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.hasClass('loading')) {
                    pullDownEl.attr("class","");
                    pullDownEl.find('.pullDownLabel').text('Pull down to refresh...');
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !(pullDownEl.hasClass('flip'))) {
                    pullDownEl.attr("class","flip");
                    pullDownEl.find('.pullDownLabel').text('Release to refresh...');
                    this.minScrollY = 0;
                } else if (this.y < 5 && (pullDownEl.hasClass('flip'))) {
                    pullDownEl.attr("class",'');
                    pullDownEl.find('.pullDownLabel').text('Pull down to refresh...');
                    this.minScrollY = - pullDownOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.hasClass('flip')) {
                    pullDownEl.attr("class",'loading');
                    pullDownEl.find('.pullDownLabel').text('Loading...');

//                                   this.refresh()
                }
            }
        };

        Widget.apply(this, arguments);
        Iscroll.call(this, selector, options);



    }
    util.inherits(Scroll, Iscroll);

    Scroll.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('Scroll');
    };





    module.exports = Scroll;
});