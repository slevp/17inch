/**
 * @Description: Abstract Loading widget.
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

    function Loading () {
        this.defaults = {
            noticeContent: '',
            iconDirection: 'center',
            autoShow: false,
            removeAfterHide: false,
            beforeShow: function (e) {
            },
            onShow: function (e) {
            },
            beforeHide: function (e) {
            },
            onHide: function (e) {
            },
            inAnimation: function (callback) {
                this.el.fadeIn(100, callback);
            },
            outAnimation: function (callback) {
                this.el.fadeOut(100, callback);
            }
        };
        Widget.apply(this, arguments);
    }
    util.inherits(Loading, Widget);
    Loading.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('loading');

        if (this.options.autoShow) {
            this.show();
        }
    };
    Loading.prototype.show = function () {
        if (this.showing || this.shown) {
            return;
        }
        this.showing = true;
        var self = this;
        var options = this.options;
        var args = arguments;
        options.beforeShow.apply(this, args);
        this.render();
        this.el.addClass('showing');
        this.el.find('.notice').addClass(options.iconDirection).append(options.noticeContent);

        options.inAnimation.call(this, function () {
            options.onShow.apply(self, args);
            self.el.addClass('shown').removeClass('showing');
            self.showing = false;
            self.shown = true;
        });
    };
    Loading.prototype.hide = function (index) {
        if (this.hiding || !this.shown) {
            return;
        }
        this.hiding = true;
        var self = this;
        var options = this.options;
        var args = arguments;
        options.beforeHide.apply(this, args);
        options.outAnimation.call(this, function () {
            options.onHide.apply(self, args);
            self.el.empty().removeClass('shown');
            self.hiding = false;
            self.shown = false;
            if (options.removeAfterHide) {
                self.el.remove();
                self = undefined;
            }
        });
    };
    module.exports = Loading;
});