/**
 * @Description: Abstract progress widget.
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

    function Progress () {
        this.defaults = {
            startAfterInit: true,
            min: 0,
            max: 100,
            current: 0,
            onStart: function () {
            },
            onChanged: function (current, pre) {
            },
            onEnd: function () {
            }
        };
        Widget.apply(this, arguments);
        if (this.options.startAfterInit) {
            this.options.onStart.call(this);
            this.render();
        }
    }
    util.inherits(Progress, Widget);

    Progress.prototype.init = function () {
        Widget.prototype.init.apply(this, arguments);
        this.el.addClass('progress');
    };

    Progress.prototype.getProgress = function () {
        return this.options.current;
    };

    Progress.prototype.getProgressPercentage = function () {
        return this.options.current / this.options.max;
    };

    Progress.prototype.plusProgress = function (count) {
        count = count || 1;
        this.setProgress(this.getProgress() + count);
    };

    Progress.prototype.reduceProgress = function (count) {
        count = count || 1;
        this.setProgress(this.getProgress() - count);
    };

    Progress.prototype.setProgress = function (progress) {
        var options = this.options;
        progress = parseInt(progress);
        var isOver = false;
        if (progress < options.min) {
            progress = options.min;
            isOver = true;
        }
        if (progress > options.max) {
            progress = options.max;
            isOver = true;
        }
        var pre = options.current;
        options.current = progress;
        if (!(progress === pre)) {
            options.onChanged.call(this, options.current, pre);
        }
        this.render();
        if (isOver) {
            options.onEnd.call(this);
        }
    };

    Progress.prototype.reset = function () {
        this.options.current = this.options.min;
        this.render();
    };

    module.exports = Progress;
});