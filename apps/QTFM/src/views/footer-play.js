/**
 * @Description: Footer play view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var topivi = require('topivi');
    var store = require('store');
    var Template = require('../templates/footer-play.tpl');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var ChannelModel = require('../models/channel');

    module.exports = Backbone.View.extend({
        className: 'footer-play',
        template: _.template(Template),
        events: {
            'tap .play-btn': 'playBtnClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.pageName = options.fromPage;
            this.model = new ChannelModel();
        },
        render: function () {
            var self = this;
            var lastPlayedChannel = store.get(localKeys.last_played_channel);
            lastPlayedChannel = lastPlayedChannel || {};
            this.model.clear();
            this.model.set(lastPlayedChannel);
            this.$el.empty();
            this.$el.html(this.template({
                pageName: this.pageName,
                channel: this.model.attributes,
                isPlaying: this.player.isPlaying
            }));
            var el = this.$el.find('.play-progress');
            this.playProgress = new topivi.progress.line(el, {
                onEnd: function () {
                    console.log('end');
                }
            });
            if (this.model.id) {
                this.player.cut(this.model.get('mediaSrc'));
                this.player.addRunnable({
                    name: 'footer-play',
                    fn: function () {
                        self.progressRunnable();
                    }
                });
                this.progressRunnable();
            }
            return this;
        },
        progressRunnable: function () {
            var progress = this.model.getNowProgramProgress();
            this.playProgress.options.max = progress.max;
            this.playProgress.setProgress(progress.current);
        },
        playBtnClickEvent: function (e) {
            if (!this.model.id) {
                return;
            }
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass('playing')) {
                this.player.pause();
            } else {
                this.player.play();
            }
            el.toggleClass('playing');
        },
        stopPlay: function () {
            this.player.stop();
            this.$el.find('.play-btn').removeClass('playing');
        }
    });
});