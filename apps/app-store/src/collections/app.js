/**
 * @Description: App collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var App = require('../models/app');
    var Settings = require('../settings.json');

    module.exports = Backbone.Collection.extend({
        model: App,
        url: function () {
            return Settings.API_URL + '/app/unauth-list?app_key=' + Settings.APP_KEY;
        },
        parse: function (response) {
            return response.apps;
        }
    });
});