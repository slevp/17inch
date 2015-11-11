/**
 * @Description: Abstract Dialog widget.
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
    var JQDrag = require('jquery-drag');
    JQDrag($);
    var JQTouch = require('jquery-touch');

    function Dialog () {
        this.defaults = {
            useMask: false,
            removeAfterClose: false,
            autoOpen: false,
            draggable: false,
            dragOptions: {},
            closeGesture: 'swiperight', // includes swipeup swiperight swipedown swipeleft taphold,
            beforeOpen: function (e) {
            },
            onOpen: function (e) {
            },
            beforeClose: function (e) {
            },
            onClose: function (e) {
            },
            content: 'This is dialog content.',
            inAnimation: function (callback) {
                var timeout = 200;
                var ease = 'easeOutBack';
                this.el.css('left', '-50%');
                this.el.animate({
                    left: "50%"
                }, timeout, ease, function() {
                    callback();
                });
            },
            outAnimation: function (callback) {
                var timeout = 200;
                var ease = 'easeInBack';
                this.el.animate({
                    left: "100%"
                }, timeout, ease, function() {
                    callback();
                });
            }
        };
        Widget.apply(this, arguments);
    }
    util.inherits(Dialog, Widget);
    Dialog.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('dialog');

        var self = this;
        var options = this.options;
        if (options.draggable) {
            this.el.drag('options', options.dragOptions);
        }
        var gestures = options.closeGesture.split(' ');
        if (!gestures || gestures.length <= 0) {
            gestures = ['swipe'];
        }
        options.gestures = gestures;
        for (var i = 0; i < gestures.length; i++) {
            this.el.on(gestures[i], function () {
                self.close.call(self, {from: 'gesture'});
            });
        }
        if (options.autoOpen) {
            this.open();
        }
    };
    Dialog.prototype.open = function () {
        if (this.opening || this.opened) {
            return;
        }
        this.opening = true;
        var self = this;
        var options = this.options;
        var args = arguments;
        options.beforeOpen.apply(this, args);
        // add mask
        if (options.useMask) {
            var maskId = 'mask-' + (new Date()).getTime();
            options.$parent.append("<div id='" + maskId + "' class='dialog-mask'></div>");
            this.maskId = maskId;
            if (_.contains(options.gestures, 'clickmask')) {
                $('#' + maskId).on('tap', function () {
                    self.close.call(self, {from: 'gesture'});
                });
            }
        }
        this.render();
        this.el.addClass('opening');
        options.inAnimation.call(this, function () {
            options.onOpen.apply(self, args);
            self.el.addClass('opened').removeClass('opening');
            self.opening = false;
            self.opened = true;
        });
    };
    Dialog.prototype.close = function () {
        if (this.closing || !this.opened) {
            return;
        }
        this.closing = true;
        var self = this;
        var options = this.options;
        var args = arguments;
        options.beforeClose.apply(this, args);
        // remove mask
        if (options.useMask) {
            options.$parent.find('#' + this.maskId).remove();
        }
        options.outAnimation.call(this, function () {
            options.onClose.apply(self, args);
            self.el.empty().removeClass('opened');
            self.closing = false;
            self.opened = false;
            if (options.removeAfterClose) {
                self.el.remove();
                self = undefined;
            }
        });
    };
    Dialog.prototype.setContent = function (content) {
        this.options.content = content;
    };
    module.exports = Dialog;
});