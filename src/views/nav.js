/**
 * @Description: footer nav container view.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var IScroll = require('iscroll');
    var NavItemView = require('./nav-item');

    module.exports = Backbone.View.extend({
        id: 'footer-nav',
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var self = this;
            this.displayNum = 9;
            this.navItemViews = {};

            this.listenTo(this.collection, 'add', this.appendAppItem);
            Backbone.$(document).on('installApp', function () {
                self.installApp.apply(self, arguments);
            });
            Backbone.$(document).on('uninstallApp', function () {
                self.uninstallApp.apply(self, arguments);
            });
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.append("<ul id='nav-list'></ul>");
            var ulEl = this.$el.find('#nav-list');
            _.each(this.collection.models, function(model, index, list) {
                var name = model.get('name');
                var navItemView = new NavItemView({model: model});
                self.listenTo(model, 'remove', self.removeAppItem);
                self.navItemViews[name] = navItemView;
                ulEl.append(navItemView.render().el);
            });
            setTimeout(function() {
                self.resetScrollWidth();
                self.scroll = new IScroll('#footer-nav', {
                    scrollX: true,
                    scrollY: false,
                    click: true
                });
            }, 100);
            Backbone.$(window).resize(function () {
                self.resetScrollWidth();
            });
            return this;
        },
        installApp: function(event, options) {
            var self = this;
            var callback = options.callback;
            var app = options.app;
            var Model = this.collection.model;
            var lastModel = this.collection.at(this.collection.length - 1);
            app.order = lastModel.get('order') + 1;
            setTimeout(function () {
                var model = new Model(app);
                self.listenTo(model, 'remove', self.removeAppItem);
                self.collection.add(model);
                self.collection.trigger('updateHomeApps');
                callback();
            }, 2000);
        },
        uninstallApp: function (e,options ) {
            var self = this;
            var callback = options.callback;
            var app = options.app;
            var model = this.collection.get(app.id);
            setTimeout(function () {
                if (model) {
                    self.collection.remove(model);
                    self.collection.trigger('updateHomeApps');
                }
                callback();
            }, 1000);
        },
        appendAppItem: function (model, collection, options) {
            var ulEl = this.$el.find('#nav-list');
            var newItem = new NavItemView({model: model});
            ulEl.append(newItem.render().el);
            this.resetScrollWidth();
            this.scroll.refresh();
            this.scroll.scrollToElement(newItem.$el[0], 1000);
        },
        removeAppItem: function (model) {
            this.resetScrollWidth();
            this.scroll.refresh();
        },
        resetScrollWidth: function() {
            var ulEl = this.$el.find('#nav-list');
            var size = this.collection.length;
            this.$el.find('li.none').remove();
            for (var i = size; i < this.displayNum; i++) {
                ulEl.append("<li class='none' data-name='none_" + i +"'></li>");
            }
            size = size > this.displayNum ? size : this.displayNum;
            var navWidth = this.$el.width();
            var itemWidth = (navWidth - this.displayNum + 1) / this.displayNum;
            this.$el.find('li').css('width', itemWidth + 'px');
            var ulWidth = size * itemWidth + size;
            ulEl.css('width', ulWidth + 'px');
        },
        activeItem: function(name) {
            this.$el.find('li.active').removeClass('active');
            var itemEl = this.$el.find("li[data-name='" + name + "']");
            itemEl.addClass('active');
            this.scrollToEl(itemEl);
        },
        scrollToEl: function(itemEl) {
            if (this.scroll) {
                var timeout = 1000;
                var navWidth = this.$el.width();
                var itemWidth = itemEl.width();
                var offsetLeft = itemEl.offset().left;
                if (offsetLeft < itemWidth) {
                    // scroll to previous
                    var previousEl = itemEl.prev();
                    if (previousEl.length > 0) {
                        this.scroll.scrollToElement(previousEl[0], timeout);
                    } else {
                        this.scroll.scrollToElement(itemEl[0], timeout);
                    }
                } else if (offsetLeft > navWidth - itemWidth) {
                    // scroll to next
                    var nextEl = itemEl.next();
                    if (nextEl.length > 0) {
                        this.scroll.scrollToElement(nextEl[0], timeout);
                    } else {
                        this.scroll.scrollToElement(itemEl[0], timeout);
                    }
                } else {
                    this.scroll.scrollToElement(itemEl[0], timeout);
                }
            }
        }
    });
});