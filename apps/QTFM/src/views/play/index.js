/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = require('jquery');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');
    var util = require('../../util');
    var Template = require('../../templates/play/main.tpl');
    var ChannelModel = require('../../models/channel');
    var Settings = require('../../settings.json');
    var localKeys = Settings.STORAGE_KEYS;

    module.exports = Backbone.View.extend({
        className: 'page play',
        template: _.template(Template),
        events: {
            'tap .back-btn': 'backBtnClickEvent',
            'tap .play-btn': 'playBtnClickEvent',
            'tap .add-favorite': 'addFavoriteBtnClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.player = options.player;
            this.pageName = options.fromPage;
            this.day = '1,2,3,4,5,6,7';
            this.channelId = options.channelId;
            this.model = new ChannelModel();
        },
        render: function () {
            var self = this;
            this.$el.empty();
            var channel = store.get(localKeys.last_played_channel);
            this.model.clear();
            this.model.set(channel);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            this.$el.html(this.template({
                pageName: this.pageName,
                channel: this.model.attributes,
                isPlaying: true,
                isFavorite: favoriteChannel ? true : false,
                defaultThumbnail: Settings.defaults.thumbnail_url
            }));
            var el = this.$el.find('.play-progress');
            this.playProgress = new topivi.progress.line(el, {
                onEnd: function () {
                    console.log('end');
                }
            });
            this.player.cut(this.model.get('mediaSrc'));
            this.player.addRunnable({
                name: 'play-page',
                fn: function () {
                    self.progressRunnable();
                }
            });
            this.player.play();
            this.progressRunnable();
            var programs = this.model.getTodayPrograms();
            if (!programs || programs.length <= 0) {
                this.fetchPrograms(this.renderProgram);
            } else {
                this.renderProgram();
            }
            return this;
        },
        fetchPrograms: function (callback) {
            var self = this;
            this.model.fetch({
                timeout: Settings.request_timeout,
                data: {
                    id: this.channelId,
                    day: this.day
                },
                success: function (model, res, options) {
                    if (res.status === 'ok') {
                        storeChannel(model.toJSON());
                        callback.call(self);
                    }
                }
            });
        },
        renderProgram: function () {
            var nowProgram = this.model.getNowProgram();
            var currentProgramName = nowProgram && ! _.isEmpty(nowProgram) ? nowProgram.name : '暂无节目';
            this.$el.find('>.content .current-program').text(currentProgramName);
        },
        progressRunnable: function () {
            var progress = this.model.getNowProgramProgress();
            this.playProgress.options.max = progress.max;
            this.playProgress.setProgress(progress.current);
            var max = util.parseTime(progress.max);
            var current = util.parseTime(progress.current);
            this.$el.find('>.content .text .played').text(current.h + ':' + (current.m > 9 ? current.m : '0' + current.m) + ':' + (current.s > 9 ? current.s : '0' + current.s));
            this.$el.find('>.content .text .account').text(max.h + ':' + (max.m > 9 ? max.m : '0' + max.m) + ':' + (max.s > 9 ? max.s : '0' + max.s));
        },
        backBtnClickEvent: function (e) {
            this.trigger('back');
        },
        playBtnClickEvent: function (e) {
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass('playing')) {
                this.player.pause();
            } else {
                this.player.play();
            }
            el.toggleClass('playing');
        },
        addFavoriteBtnClickEvent: function (e) {
            var el = $(e.currentTarget);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            if (favoriteChannel) {
                removeFromFavoriteChannel(this.channelId);
                el.removeClass('added');
            } else {
                storeIntoFavoriteChannel(this.model.toJSON());
                el.addClass('added');
            }
        }
    });
    var storeChannel = function (channel) {
        store.set(localKeys.last_played_channel, channel);
        var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
        latelyPlayedChannels = latelyPlayedChannels || {};
        channel.listenDate = new Date().getTime();
        latelyPlayedChannels[channel.id] = channel;
        store.set(localKeys.lately_played_channels, latelyPlayedChannels);
    };
    var searchInFavoriteChannels = function (channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        return channels[channelId];
    };
    var storeIntoFavoriteChannel = function (channel) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channel.favoriteDate = new Date().getTime();
        channels[channel.id] = channel;
        store.set(localKeys.favorite_channels, channels);
    };
    var removeFromFavoriteChannel = function (channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channels[channelId] = undefined;
        store.set(localKeys.favorite_channels, channels);
    };
});