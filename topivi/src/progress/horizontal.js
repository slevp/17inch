
define(function(require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Widget = require('../widget');
    var util = require('../util');
    var Progress = require('./progress');
    var Template = require('../templates/progress-horizontal.tpl');

    function Horizontal (selector, options) {
        var self = this;
        this.template = _.template(Template);
        Progress.apply(this, arguments);
        if (options.touch){
            this.addEvents(options)
        }

    }

    util.inherits(Horizontal, Progress);

    Horizontal.prototype.init = function () {
        Progress.prototype.init.apply(this, arguments);
        this.el.addClass('horizontal');
        this.el.html(this.template({}));

    };

    Horizontal.prototype.addEvents = function (options) {
        var self= this;
        var el = this.el.find('.progress-bg');
        this.isProgressBarPressDwon = false;

        this.pressDown = function (e) {
            self.progressBarChangeX = e.pageX - el.offset().left;
            //相?位置修正
            if (self.progressBarChangeX < 0) {
                self.progressBarChangeX = 0;
            }
            else if (self.progressBarChangeX > self.progressBarTopTotalSize) {
                self.progressBarChangeX = self.progressBarTopTotalSize;
            }

            //???度条被?下
            self.isProgressBarPressDwon = true;

            self.el.find('.progressBar').css("width",  self.progressBarChangeX);
            self.el.find('.progress-control').css("left", self.progressBarChangeX);
        };
        this.move = function (e) {
            if (false === self.isProgressBarPressDwon) {
                return;
            }
            self.pressDown(e);
        };
        this.pressUp = function (e) {

            if (false === self.isProgressBarPressDwon) {
                return;
            }

            //改??度条?度
            self.el.find('.progressBar').css("width",  self.progressBarChangeX);
            self.el.find('.progress-control').css("left", self.progressBarChangeX);

            //???度条未被?下
            self.isProgressBarPressDwon = false;


        };
        this.el.find('.panel').bind({
            mousedown: this.pressDown,
            mousemove: this.move,
            mouseup: this.pressUp,
            mouseout: this.pressUp
        })
    };


    Horizontal.prototype.render = function () {
        var options = this.options;
        var length = Math.round(this.getProgressPercentage() * options.progressBarTopTotalSize);

        this.el.find('.progressBar').css("width", length);
        this.el.find('.progress-control').css("left", length);
    };

    module.exports = Horizontal;
});












