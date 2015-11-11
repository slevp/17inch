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
    var ContentTemplate = require('../templates/content.tpl');
    var AppCollection = require('../collections/app');
    var AppItemView = require('./app-item');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var apps = store.get(localKeys.apps);
    apps = apps || [];

    module.exports = Backbone.View.extend({
        id: 'app-store-content',
        className: 'content',
        template: _.template(ContentTemplate),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.currentCategory = 'all';
            this.collection = new AppCollection(apps);
        },
        render: function () {
            var self = this;
            if (this.collection.length <= 0) {
                this.fetchApps(this.renderApps);
            } else {
                this.renderApps();
            }
            return this;
        },
        fetchApps: function (callback) {
            var self = this;
            this.collection.fetch({
                timeout: 5000,
                success: function (collection, res, options) {
                    store.set(localKeys.apps, collection.toJSON());
                    callback.apply(self, arguments);
                },
                error: function (collection, res, options) {
                    new topivi.dialog.normal('', {
                        removeAfterClose: true,
                        content: '获取应用列表失败，请稍后再试...'
                    }).open();
                }
            });
        },
        renderApps: function () {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template({}));
            var ulEl = this.$el.find('#app-list');
            var models = null;
            if (this.currentCategory === 'all') {
                models = this.collection.models;
            } else {
                models = this.collection.where({category: this.currentCategory});
            }
            if (models.length <= 0) {
                ulEl.append("<li class='info'>该分类下没有应用</li>");
            } else {
                _.each(models, function(model, index, list) {
                    var itemView = new AppItemView({model: model});
                    ulEl.append(itemView.render().el);
                });
                setTimeout(function() {
                    self.scroll = new IScroll('#app-store-content');
                }, 100);
            }
        },
        changeCategory: function (category) {
            this.currentCategory = category;
            this.renderApps();
        }
    });
});