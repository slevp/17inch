/**
 * @Description: Broadcast main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');

    var Template = require('../../templates/program/main.tpl');
    var LoadingTemplate = require('../../templates/loading.tpl');
    var ChannelModel = require('../../models/channel');
    var ProgramCollection = require('../../collections/program');
    var ProgramListView = require('./program-list');
    var Settings = require('../../settings.json');
    var localKeys = Settings.STORAGE_KEYS;

    module.exports = Backbone.View.extend({
        className: 'main no-footer',
        template: _.template(Template),
        events: {
            'tap .add-favorite': 'addFavoriteBtnClickEvent',
            'tap .back-btn': 'backBtnClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.channelId = options.channelId;
            this.pageName = options.fromPage;
            this.day = '1,2,3,4,5,6,7';
            this.model = new ChannelModel();
            this.collection = new ProgramCollection();
            this.programListView = new ProgramListView({
                currentChannel: this.model,
                scrollSelector: '.page.program .listview-wrapper'
            });
        },
        render: function () {
            this.delegateEvents();
            this.$el.empty();
            var currentChannel = searchChannelById(this.channelId);
            currentChannel = currentChannel || {};
            this.model.clear();
            this.model.set(currentChannel);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            this.$el.html(this.template({
                title: this.model.get('name'),
                isFavorite: favoriteChannel ? true : false
            }));
            var programs = this.model.getTodayPrograms();
            if (!programs || programs.length <= 0) {
                this.createLoadingWidget();
                this.fetchPrograms(this.renderPrograms);
            } else {
                this.renderPrograms();
            }
            return this;
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
        },
        backBtnClickEvent: function () {
            this.trigger('back');
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
                    self.hideLoadingWidget();
                    if (res.status === 'ok') {
                        storeChannel(model.toJSON());
                        callback.call(self);
                    } else {
                        self.createErrorDialog();
                    }
                },
                error: function (collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorDialog();
                }
            });
        },
        renderPrograms: function () {
            var self = this;
            var programs = this.model.getTodayPrograms();
            this.collection.reset(programs);
            this.programListView.collection = this.collection;
            this.programListView.pageName = this.pageName;
            this.$el.find('>.content .count-label .value').text(this.collection.length);
            this.$el.find('>.content .listview-wrapper').append(this.programListView.render().el);
        },
        createLoadingWidget: function () {
            this.loadingWidget = new topivi.loading.normal('', {
                $parent: this.$el.find('>.content'),
                noticeContent: LoadingTemplate,
                iconDirection: 'center',
                removeAfterHide: true,
                autoShow: true
            });
            this.loadingWidget.el.addClass('qtfm');
        },
        hideLoadingWidget: function () {
            if (this.loadingWidget) {
                if (!this.loadingWidget.shown) {
                    this.loadingWidget.shown = true;
                }
                this.loadingWidget.hide();
            }
        },
        createErrorDialog: function (msg) {
            var self = this;
            msg = msg || '获取频道数据失败，请稍后再试...';
            setTimeout(function () {
                var tips = new topivi.tips.normal('', {
                    $parent: self.$el.find('>.content'),
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: 'auto',
                    autoHide: true
                });
                tips.el.addClass('error-tips');
                tips.show();
            }, 300);
        }
    });
    var searchChannelById = function (channelId) {
        var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
        latelyPlayedChannels = latelyPlayedChannels || {};
       return latelyPlayedChannels[channelId];
    };
    var storeChannel = function (channel) {
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