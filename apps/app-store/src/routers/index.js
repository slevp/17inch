/**
 * @Description: the index router for app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var HomeView = require('../views/home');
    var homeView = null;

    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage"
        },
        homePage: function (page) {
            page = page || 'all';
            if (!homeView) {
                homeView = new HomeView();
            }
            Backbone.$('body').prepend(homeView.render().el);
        }
    });
});