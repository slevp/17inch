/**
 * @Description: City oil collection.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Model = require('../models/city-oil');
    var store = require('store');
    var Settings = require('../../../../settings.json');
    var storageKeys = Settings.STORAGE_KEYS;
    var location = store.get(storageKeys.home_info).short_location;

    module.exports = Backbone.Collection.extend({
        model: Model,
        initialize: function () {

        },
        getCurrentCityData: function () {
            return this.find(function (model) {
                return model.get('city').indexOf(location) >= 0;
            });
        }
    });
});