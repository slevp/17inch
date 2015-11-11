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
    var IScroll = require('iscroll');

    var Template = require('../../templates/channel/main.tpl');
    var LoadingTemplate = require('../../templates/loading.tpl');
    var ChannelCollection = require('../../collections/channel');
    var FooterPlayView = require('../footer-play');
    var ChannelListView = require('../channel-list');
    var Settings = require('../../settings.json');
    var localKeys = Settings.STORAGE_KEYS;

    module.exports = Backbone.View.extend({
        className: 'main',
        template: _.template(Template),
        events: {
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.catId = options.catId;
            this.pageName = options.fromPage;
            this.currentPage = 1;
            this.pageSize = 50;
            this.collection = new ChannelCollection();
            this.channelListView = new ChannelListView({
                collection: this.collection,
                scrollSelector: '.page.channel>.main>.content'
            });
            this.footerView = new FooterPlayView({
                fromPage: this.pageName
            });
        },
        render: function () {
            this.delegateEvents();
            this.$el.empty();
            var currentCategory = searchById(this.catId);
            this.$el.html(this.template({
                title: currentCategory.name,
                pageName: this.pageName
            }));
            var storedChannels = store.get(localKeys.all_channels);
            storedChannels = storedChannels || {};
            if (!storedChannels[this.catId]) {
                this.createLoadingWidget();
                this.fetchChannels(this.renderChannels);
            } else {
                this.collection.reset(storedChannels[this.catId]);
                this.renderChannels();
            }
            this.$el.find('>.footer').append(this.footerView.render().el);
            return this;
        },
        fetchChannels: function (callback) {
            var self = this;
            this.collection.fetch({
                timeout: Settings.request_timeout,
                data: {
                    id: this.catId,
                    curpage: this.currentPage,
                    pagesize: this.pageSize
                },
                success: function (collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === 'ok') {
                        var storedChannels = store.get(localKeys.all_channels);
                        storedChannels = storedChannels || {};
                        storedChannels[self.catId] = collection.toJSON();
                        store.set(localKeys.all_channels, storedChannels);
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
        renderChannels: function () {
            var self = this;
            this.channelListView.pageName = this.pageName;
            this.$el.find('>.content').append(this.channelListView.render().el);
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
    var searchById = function (catId) {
        catId = parseInt(catId);
        var result = null;
        var allCategories = store.get(localKeys.all_categories);
        allCategories = allCategories || [];
        result = _.findWhere(allCategories, {id: catId});
        if (result) return result;
        var civilCategories = store.get(localKeys.civil_categories);
        civilCategories = civilCategories || [];
        result = _.findWhere(civilCategories, {id: catId});
        if (result) return result;
        var internationalCategories = store.get(localKeys.international_categories);
        internationalCategories = internationalCategories || [];
        result = _.findWhere(internationalCategories, {id: catId});
        if (result) return result;
        return '';
    };
});