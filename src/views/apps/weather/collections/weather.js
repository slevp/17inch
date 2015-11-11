/**
 * @Description: Weather collection.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Model = require('../models/weather');
    var store = require('store');
    var util = require('topivi').util;
    var Settings = require('../../../../settings.json');
    var days = ['日', '一', '二', '三', '四', '五', '六'];

    module.exports = Backbone.Collection.extend({
        model: Model,
        url: function (location) {
            return Settings.API_URL + '/weather/today?app_key=' + Settings.APP_KEY;
        },
        initialize: function () {

        },
        parse: function (res, options) {
            var results = [];
            if (res.status === 'ok') {
                var date = util.stringToDate(res.date);
                var data = res.data;
                var city = data.currentCity;
                var weatherData =  data.weather_data;
                var oneDayTimes = 24 * 60 * 60 * 1000;
                for (var i = 0; i < weatherData.length; i++) {
                    var item = {};
                    item.date = new Date(date.getTime() + oneDayTimes * i);
                    item.day = days[item.date.getDay()];
                    item.date = util.dateToString(item.date);
                    item.status = weatherData[i].weather;
                    item.wind = weatherData[i].wind;
                    item.temperature = parseTemperature(weatherData[i].temperature);
                    item.city = city;
                    results.push(item);
                }
            }
            return results;
        }
    });
    var parseTemperature = function (temperature) {
        var strs = temperature.split(' ~ ');
        var from, to;
        if (strs.length !== 2) {
            from = to = parseInt(strs[0].substr(0, 2));
        } else {
            from = parseInt(strs[0]);
            to = parseInt(strs[1].substr(0, 2));
        }
        if (_.isNaN(from)) {
            console.error('Parse from temperature error.');
            from = 0;
        }
        if (_.isNaN(to)) {
            console.error('Parse to temperature error.');
            to = 0;
        }
        return {
            from: _.min([from, to]),
            to: _.max([from, to])
        }
    };
});