/**
 * @Description: City oil model.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var store = require('store');
    var util = require('topivi').util;
    var Settings = require('../../../../settings.json');
    var storageKeys = Settings.STORAGE_KEYS;
    var location = store.get(storageKeys.home_info).short_location;

    module.exports = Backbone.Model.extend({
        idAttribute: '_id',
        url: function () {
            return Settings.API_URL + '/oil-city/today?app_key=' + Settings.APP_KEY;
        },
        initialize: function () {
        },
        parse: function (res, options) {
            var results = {};
            if (res.status === 'ok') {
                results = {
                    date: util.dateToString(util.stringToDate(res.date), '-'),
                    cities: res.cities
                };
            }
            return results;
        }
    });
});