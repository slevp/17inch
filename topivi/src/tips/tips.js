/**
 * @Description: Abstract Tips widget.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var util = require('../util');
    var Widget = require('../widget');

    function Tips () {
        this.defaults = {
            content: '',
            dependEl: null,
            autoShow: false,
            removeAfterHide: false,
            direction: 'top',
            autoHide: false,
            timeout: 3000,
            hideMode: function () {
                var self = this;
                var timeout = this.options.timeout;
                setTimeout(function () {
                    self.hide();
                }, timeout);
            },
            inAnimation: function (callback) {
                this.el.fadeIn(500, function () {
                    callback();
                });
            },
            outAnimation: function (callback) {
                this.el.fadeOut(500, function () {
                    callback();
                });
            },
            beforeShow: function (e) {
            },
            onShow: function (e) {
            },
            beforeHide: function (e) {
            },
            onHide: function (e) {
            }
        };
        Widget.apply(this, arguments);
    }
    util.inherits(Tips, Widget);
    Tips.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('tips');

        var options = this.options;
        if (!options.dependEl || options.dependEl.length <= 0) {
            return console.error('Depend el is not set.');
        }
        if (options.autoShow) {
            this.show();
        }
    };
    Tips.prototype.show = function () {
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
        options.inAnimation.call(this, function () {
            options.onShow.apply(self, args);
            self.el.addClass('shown').removeClass('showing');
            self.showing = false;
            self.shown = true;
            if (options.autoHide) {
                options.hideMode.apply(self, args);
            }
        });
    };
    Tips.prototype.hide = function () {
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
    Tips.prototype.render = function () {
        var options = this.options;
        var offset = options.dependEl.offset();
        var dependElWidth = options.dependEl.width();
        var dependElHeight = options.dependEl.height();
        var elWidth = this.el.width();
        var elHeight = this.el.height();
        switch (options.direction) {
            case 'top': {
                this.el.css({
                    top: offset.top - elHeight,
                    left: offset.left
                });
                break;
            }
            case 'inner-top': {
                this.el.css({
                    top: offset.top,
                    left: offset.left
                });
                break;
            }
            case 'top-center': {
                this.el.css({
                    top: offset.top - elHeight,
                    left: offset.left + ((dependElWidth - elWidth) / 2)
                });
                break;
            }
            case 'inner-top-center': {
                this.el.css({
                    top: offset.top,
                    left: offset.left + ((dependElWidth - elWidth) / 2)
                });
                break;
            }
            case 'bottom': {
                this.el.css({
                    top: offset.top + dependElHeight,
                    left: offset.left
                });
                break;
            }
            case 'inner-bottom': {
                this.el.css({
                    top: offset.top + dependElHeight - elHeight,
                    left: offset.left
                });
                break;
            }
            case 'bottom-center': {
                this.el.css({
                    top: offset.top + dependElHeight,
                    left: offset.left + ((dependElWidth - elWidth) / 2)
                });
                break;
            }
            case 'inner-bottom-center': {
                this.el.css({
                    top: offset.top + dependElHeight - elHeight,
                    left: offset.left + ((dependElWidth - elWidth) / 2)
                });
                break;
            }
            case 'left': {
                this.el.css({
                    top: offset.top,
                    left: offset.left - elWidth
                });
                break;
            }
            case 'inner-left': {
                this.el.css({
                    top: offset.top,
                    left: offset.left
                });
                break;
            }
            case 'left-center': {
                this.el.css({
                    top: offset.top + ((dependElHeight - elHeight) / 2),
                    left: offset.left - elWidth
                });
                break;
            }
            case 'inner-left-center': {
                this.el.css({
                    top: offset.top + ((dependElHeight - elHeight) / 2),
                    left: offset.left
                });
                break;
            }
            case 'right': {
                this.el.css({
                    top: offset.top,
                    left: offset.left + dependElWidth
                });
                break;
            }
            case 'inner-right': {
                this.el.css({
                    top: offset.top,
                    left: offset.left + dependElWidth - elWidth
                });
                break;
            }
            case 'right-center': {
                this.el.css({
                    top: offset.top + ((dependElHeight - elHeight) / 2),
                    left: offset.left + dependElWidth
                });
                break;
            }
            case 'inner-right-center': {
                this.el.css({
                    top: offset.top + ((dependElHeight - elHeight) / 2),
                    left: offset.left + dependElWidth - elWidth
                });
                break;
            }
        }
        this.el.append(options.content);
    };
    Tips.prototype.setContent = function (content) {
        this.options.content = content;
    };
    module.exports = Tips;
});