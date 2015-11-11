/**
 * @Description: Weather index view.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var topivi = require('topivi');
    var store = require('store');
    var storageKeys = require('../../../settings.json').STORAGE_KEYS;
    var WeatherCollection = require('./collections/weather');
    var ItemView = require('./weather-item');
    var LoadingTemplate = require('./templates/loading.tpl');
    var defaultLocation = store.get(storageKeys.home_info).location;

    module.exports = Backbone.View.extend({
        tagName: 'ul',
        className: 'dialog-apps weather',
        events: {
            'tap .item': 'itemClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.current = 0;
            this.$parent = options.$parent;
            this.collection = new WeatherCollection();
        },
        render: function () {
            var storedWeather = store.get(storageKeys.all_weather);
            if (!storedWeather) {
                this.createLoadingWidget();
                this.fetchData(this.renderWeather);
            } else {
                if (!isWeatherNew()) {
                    this.createLoadingWidget();
                    this.fetchData(this.renderWeather);
                } else {
                    this.collection.reset(storedWeather);
                    this.renderWeather();
                }
            }
            return this;
        },
        fetchData: function (callback, options) {
            var self = this;
            options = options || {};
            var location = options.location || defaultLocation;
            var doNotStore = options.doNotStore;
            this.collection.fetch({
                timeout: 5000,
                data: {
                    location: location
                },
                success: function (collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === 'ok') {
                        if (collection.length > 0) {
                            if (!doNotStore) {
                                store.set(storageKeys.today_weather, collection.at(0).toJSON());
                            }
                            // update home weather
                            Backbone.$(document).trigger('updateHomeWeather');
                        }
                        store.set(storageKeys.all_weather, collection.toJSON());
                        callback.apply(self, arguments);
                    } else {
                        self.createErrorDialog(res.msg);
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
                $parent: this.$parent,
                noticeContent: LoadingTemplate,
                iconDirection: 'center',
                removeAfterHide: true,
                autoShow: true
            });
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
            msg = msg || '获取天气数据失败，请稍后再试...';
            setTimeout(function () {
                var tips = new topivi.tips.normal('', {
                    $parent: self.$el,
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: 'auto'
                });
                tips.el.addClass('error-tips');
                tips.show();
            }, 300);
        },
        renderWeather: function () {
            var self = this;
            this.$el.empty();
            this.delegateEvents();
            this.collection.each(function (model, list) {
                var itemView = new ItemView({model: model});
                self.$el.append(itemView.render().el);
            });
            this.$el.find('li.item:lt(' + this.current + ')').addClass('left');
            this.$el.find('li.item:eq(' + this.current + ')').addClass('active');
            this.$el.find('li.item:gt(' + this.current + ')').addClass('right');
        },
        itemClickEvent: function (e) {
            var el = Backbone.$(e.currentTarget);
            var index = el.index();
            if (el.hasClass('active') || index === this.current) {
                return;
            }
            this.current = index;
            this.renderWeather();
//            var timeout = 250;
//            var ease = 'easeOutQuint';
//            var activeEl = this.$el.find('.item.active');
//            var activeWidth = activeEl.width();
//            var width = el.width();
//            activeEl.animate({width: width}, timeout, ease);
//            el.animate({width: activeWidth}, timeout, ease, function() {
//            });
        }
    });

    var isWeatherNew = function () {
        var storedTodayWeather = store.get(storageKeys.today_weather);
        if (!storedTodayWeather) {
            console.error('No today weather.');
            return false;
        }
        var storedToday = topivi.util.stringToDate(storedTodayWeather.date);
        var today = new Date();
        return (storedToday.getFullYear() === today.getFullYear())
                && (storedToday.getMonth() === today.getMonth())
                && (storedToday.getDate() === today.getDate());
    };
});