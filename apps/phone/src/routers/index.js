/**
 * Created by wangyuhao on 14-9-26.
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var HomeView = require('../views/index');
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