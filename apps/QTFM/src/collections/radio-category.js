/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Model = require('../models/radio-category');
    var Settings = require('../settings.json');


    module.exports = Backbone.Collection.extend({
        model: Model,
        url: Settings.API_URL + Settings.URLs.radio_category + '?app_key=' + Settings.APP_KEY,
        initialize: function () {
        },
        parse: function (res, options) {
            var result = [];
            if (res.status === 'ok') {
                result = _.map(res.categories, function (category) {
                    return {id: category.id, name: category.name};
                });
            }
            return result;
        }
    });
});   
