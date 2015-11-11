/**
 * @Description: City oil index view.
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
    var CityOilCollection = require('./collections/city-oil');
    var TodayOilModel = require('./models/today-oil');
    var LoadingTemplate = require('./templates/loading.tpl');
    var CityOilTemplate = require('./templates/city-oil.tpl');
    var OilTemplate = require('./templates/oil.tpl');

    module.exports = Backbone.View.extend({
        className: 'dialog-apps oil',
        template: _.template(CityOilTemplate),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.current = 0;
            this.$parent = options.$parent;
            this.model = new TodayOilModel();
        },
        render: function () {
            var storedTodayOil = store.get(storageKeys.today_oil);
            if (!storedTodayOil) {
                this.createLoadingWidget();
                this.fetchData(this.renderOil);
            } else {
                if (!isOilNew()) {
                    this.createLoadingWidget();
                    this.fetchData(this.renderOil);
                } else {
                    this.model.set(storedTodayOil);
                    this.renderOil();
                }
            }
            return this;
        },
        fetchData: function (callback) {
            var self = this;
            this.model.fetch({
                timeout: 5000,
                success: function (model, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === 'ok') {
                        store.set(storageKeys.today_oil, model.toJSON());
                        callback.apply(self, arguments);
                    } else {
                        self.createErrorTips(res.msg);
                    }
                },
                error: function (collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorTips();
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
        createErrorTips: function (msg) {
            var self = this;
            msg = msg || '获取油价数据失败，请稍后再试...';
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
        renderOil: function () {
            var self = this;
            this.$el.empty();
            var cityOilCollection = new CityOilCollection(this.model.get('cities'));
            var currentCity = cityOilCollection.getCurrentCityData();
            this.$el.html(this.template({
                date: this.model.get('date')
            }));
            var items = [
                {
                    key: '90',
                    value: currentCity.get('b90') + '',
                    name: '汽油'
                },
                {
                    key: '93',
                    value: currentCity.get('b93') + '',
                    name: '汽油'
                },
                {
                    key: '97',
                    value: currentCity.get('b97') + '',
                    name: '汽油'
                },
                {
                    key: '0',
                    value: currentCity.get('b0') + '',
                    name: '柴油'
                }
            ];
            ''.split()
            for (var i = 0; i < items.length; i++) {
                this.$el.find('.main').append(_.template(OilTemplate)(items[i]));
            }
        }
    });

    var isOilNew = function () {
        var storedTodayOil = store.get(storageKeys.today_oil);
        if (!storedTodayOil) {
            console.error('No today oil data.');
            return false;
        }
        var storedToday = topivi.util.stringToDate(storedTodayOil.date);
        var today = new Date();
        return (storedToday.getFullYear() === today.getFullYear())
                && (storedToday.getMonth() === today.getMonth())
                && (storedToday.getDate() === today.getDate());
    };
});