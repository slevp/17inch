/**
 * @Description:
 * @Author: fuwensong
 * @Date: 14-10-16
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var _ = require('underscore');

    function Player (options) {
        options = options || {};
        var defaults = {
            onEnd: function () {
            }
        };
        _.extend(this, defaults, options);
        this.init();
    }

    Player.prototype.init = function () {
        var self = this;
        this.audio = document.createElement('audio');
        this.audio.addEventListener('ended', function(e) {
            self.onEnd.apply(self, arguments);
        });
        this.isPlaying = false;
        this.interval = null;
        this.runnables = {};
    };
    Player.prototype.play = function () {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.audio.play();
        this.startInterval();
    };
    Player.prototype.pause = function () {
        if (!this.isPlaying) {
            return;
        }
        this.isPlaying = false;
        this.audio.pause();
        this.clearInterval();
    };
    Player.prototype.stop = function () {
        if (this.src) {
            this.audio.currentTime = 0.0;
        }
        this.pause();
    };
    Player.prototype.cut = function (src) {
        if (src === this.src) {
            return;
        }
        this.src = src;
        this.audio.src = src;
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    };
    Player.prototype.addRunnable = function (runnable) {
        var name = runnable.name;
        this.disableRunnable(name);
        this.runnables[name] = runnable.fn;
    };
    Player.prototype.disableRunnable = function (name) {
        if (this.runnables[name]) {
            this.runnables[name] = undefined;
        }
    };
    Player.prototype.startInterval = function () {
        var self = this;
        var seconds = 1000;
        this.interval = setInterval(function () {
            for (var name in self.runnables) {
                var fn = self.runnables[name];
                fn();
            }
        }, seconds);
    };
    Player.prototype.clearInterval = function () {
        clearInterval(this.interval);
    };
    module.exports = Player;
});