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
    var Template = require('../../templates/broadcast/main.tpl');
    var LoadingTemplate = require('../../templates/loading.tpl');
    var RadioCollection = require('../../collections/radio-category');
    var subCategoryView = require('./sub-category');
    var Settings = require('../../settings.json');

    var localKeys = Settings.STORAGE_KEYS;
    var allCategories = store.get(localKeys.all_categories);
    allCategories = allCategories || [];
    var civilCategories = store.get(localKeys.civil_categories);
    civilCategories = civilCategories || [];
    var internationalCategories = store.get(localKeys.international_categories);
    internationalCategories = internationalCategories || [];

    module.exports = Backbone.View.extend({
        className: 'main no-footer',
        template: _.template(Template),
        events: {
            'tap .categories li': 'catClickEvent',
            'tap .search-bar': 'searchBarClickEvent',
            'tap .cancel-btn': 'headerSearchCancelBtnClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.currentCat = 'all';
            this.allCollection = new RadioCollection(allCategories);
            this.allCollection.url += '&id=100002';
            this.civilCollection = new RadioCollection(civilCategories);
            this.civilCollection.url += '&id=9';
            this.internationalCollection = new RadioCollection(internationalCategories);
            this.internationalCollection.url += '&id=96';
        },
        render: function () {
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template());
            this.prepareData();
            return this;
        },
        prepareData: function () {
            var localKey, collection;
            switch (this.currentCat) {
                case 'all': {
                    localKey = localKeys.all_categories;
                    collection = this.allCollection;
                    break;
                }
                case 'civil': {
                    localKey = localKeys.civil_categories;
                    collection = this.civilCollection;
                    break;
                }
                case 'international': {
                    localKey = localKeys.international_categories;
                    collection = this.internationalCollection;
                    break;
                }
            }
            if (collection.length <= 0) {
                this.createLoadingWidget();
                this.fetchSubCategories(localKey, collection, this.renderSubCategories);
            } else {
                this.renderSubCategories(collection);
            }
        },
        catClickEvent: function (e) {
            var el = $(e.currentTarget);
            if (el.hasClass(this.currentCat)) {
                return;
            }
            if (el.hasClass('all')) {
                this.currentCat = 'all';
            } else if (el.hasClass('civil')) {
                this.currentCat = 'civil';
            } else if (el.hasClass('international')) {
                this.currentCat = 'international';
            }
            var ulEl = this.$el.find('.sub-categories ul');
            ulEl.empty();
            this.prepareData();
        },
        searchBarClickEvent: function () {
            var maskEl = $('body>.mask');
            if (maskEl.length <= 0) {
                $('body').append('<div class="mask"></div>');
                maskEl = $('body>.mask');
            }
            this.$el.find('.header .title').hide();
            var headerSearchBar = this.$el.find('.header-search-bar');
            maskEl.fadeIn(150, function () {
                headerSearchBar.show();
            });
        },
        headerSearchCancelBtnClickEvent: function () {
            var self = this;
            var maskEl = $('body>.mask');
            var headerSearchBar = this.$el.find('.header-search-bar');
            maskEl.fadeOut(150, function () {
                headerSearchBar.hide();
                self.$el.find('.header .title').show();
            });
        },
        fetchSubCategories: function (localKey, collection, callback) {
            var self = this;
            collection.fetch({
                timeout: Settings.request_timeout,
                success: function (collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === 'ok') {
                        store.set(localKey, collection.toJSON());
                        callback.call(self, collection);
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
        createLoadingWidget: function () {
            this.loadingWidget = new topivi.loading.normal('', {
                $parent: this.$el.find('.sub-categories'),
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
            msg = msg || '获取电台数据失败，请稍后再试...';
            setTimeout(function () {
                var tips = new topivi.tips.normal('', {
                    $parent: self.$el.find('.sub-categories'),
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: 'auto',
                    autoHide: true
                });
                tips.el.addClass('error-tips');
                tips.show();
            }, 300);
        },
        renderSubCategories: function (collection) {
            var self = this;
            var ulEl = this.$el.find('.sub-categories ul');
            collection.each(function (model, collection, options) {
                var view = new subCategoryView({model: model});
                ulEl.append(view.render().el);
            });
            setTimeout(function() {
                self.subCategoriesScroll = new IScroll('.page.broadcast .sub-categories', {click: true});
            }, 100);
        }
    });
});