/**
 * @Description: Line progress widget of topivi.
 * @Author: fuwensong
 * @Date: 14-9-17
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var _ = require('underscore');
    var util = require('../util');
    var Progress = require('./progress');
    var Template = require('../templates/progress-line.tpl');

    function Line () {
        this.template = _.template(Template);
        Progress.apply(this, arguments);
    }
    util.inherits(Line, Progress);

    Line.prototype.init = function () {
        Progress.prototype.init.apply(this, arguments);
        this.el.addClass('line');
        this.el.html(this.template({}));
    };

    Line.prototype.render = function () {
        var process = this.getProgressPercentage() * 100;
        this.el.find('.bar').css({
            width: process + '%'
        });
        this.el.find('.dot').css({
            left: process + '%'
        });
    };

    module.exports = Line;
});