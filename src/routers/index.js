/**
 * @Description: the index router for home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = Backbone.$;
    var _ = require('underscore');
    var store = require('store');
    var HomeView = require('../views/home');
    var homeView = null;

    module.exports = Backbone.Router.extend({
        routes: {
            "": "main",
            ":page": "main"
        },
        main: function (page) {
            page = page || 'home';
            if (!homeView) {
                this.initPage();
            }
            if (page === 'home') {
                homeView.trigger('backToHome');
            } else {
                homeView.trigger('displayApp', {app: page});
            }
        },
        initPage: function() {
            homeView = new HomeView();
            $('body').prepend(homeView.render().el);
            this.listenTo(homeView, 'backToHome', this.changeHash);
            this.listenTo(homeView, 'displayApp', this.changeHash);
        },
        changeHash: function(options) {
            if (options && options.navigate) {
                options.hash = options.hash || 'home';
                this.navigate(options.hash, {trigger: false});
            }
        }
    });
});