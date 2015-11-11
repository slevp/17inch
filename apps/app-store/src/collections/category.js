/**
 * @Description: App category collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var Category = require('../models/category');
    var Settings = require('../settings.json');

    module.exports = Backbone.Collection.extend({
        model: Category,
        url: function () {
            return Settings.API_URL + '/app-category/list?app_key=' + Settings.APP_KEY;
        },
        parse: function (response) {
            return response.categories;
        }
    });
});