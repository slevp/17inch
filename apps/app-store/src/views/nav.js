/**
 * @Description: Nav view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');
    var IScroll = require('iscroll');
    var NavTemplate = require('../templates/nav.tpl');
    var CategoryCollection = require('../collections/category');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var categories = store.get(localKeys.categories);
    categories = categories || [];

    module.exports = Backbone.View.extend({
        id: 'category-list-wrapper',
        className: 'nav',
        template: _.template(NavTemplate),
        events: {
            'tap .item': 'navItemClick'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.currentCategory = 'all';
            this.collection = new CategoryCollection(categories);
        },
        render: function () {
            var self = this;
            if (this.collection.length <= 0) {
                this.fetchCategories(this.renderCategories);
            } else {
                this.renderCategories();
            }
            return this;
        },
        fetchCategories: function (callback) {
            var self = this;
            this.collection.fetch({
                timeout: 5000,
                success: function (collection, res, options) {
                    store.set(localKeys.categories, collection.toJSON());
                    callback.apply(self, arguments);
                },
                error: function (collection, res, options) {
                    new topivi.dialog.normal('', {
                        removeAfterClose: true,
                        content: '获取分类失败，请稍后再试...'
                    }).open();
                }
            });
        },
        renderCategories: function () {
            this.$el.empty();
            this.$el.html(this.template({
                categories: this.collection,
                current: this.currentCategory
            }));
            this.$el.wrapInner("<ul id='category-list'></ul>");
            setTimeout(function() {
                self.scroll = new IScroll('#category-list-wrapper');
            }, 100);
        },
        navItemClick: function (e) {
            var el = Backbone.$(e.currentTarget);
            var key = el.attr('data-key');
            this.currentCategory = key;
            this.$el.find('li.active').removeClass('active');
            el.addClass('active');
            this.trigger('changeCategory', key);
        }
    });
});