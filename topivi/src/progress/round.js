/**
 * @Description: Round progress widget of topivi.
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
    var Progress = require('./progress');
    var Template = require('../templates/progress-round.tpl');

    function Round () {
        this.template = _.template(Template);
        Progress.apply(this, arguments);
    }
    util.inherits(Round, Progress);

    Round.prototype.init = function () {
        Progress.prototype.init.apply(this, arguments);
        this.el.addClass('round');
        this.el.html(this.template({}));
    };

    Round.prototype.render = function () {
        var options = this.options;
        var deg = Math.round(this.getProgressPercentage() * 360);
        this.el.find('.point').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        if (deg <= 180) {
            this.el.find('.right').css('-webkit-transform', 'rotate(' + deg + 'deg)');
            this.el.find('.left').css('-webkit-transform', 'rotate(0deg)');
        } else {
            this.el.find('.right').css('-webkit-transform', 'rotate(180deg)');
            this.el.find('.left').css('-webkit-transform', 'rotate(' + (deg - 180) + 'deg)');
        }
    };

    module.exports = Round;
});