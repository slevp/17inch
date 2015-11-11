/**
 * @Description: footer v3.
 * @Author: fuwensong
 * @Date: 14-9-26
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');

    var NavView = require('./nav');
    var AppsView = require('./footer-apps');
    module.exports = Backbone.View.extend({
        id: 'footer-container',
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.navView = new NavView({
                collection: options.appCollection
            });
            this.appsView = new AppsView({
                appManager: options.appManager
            });
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.$el.append(this.appsView.render().el);
            return this;
        }
    });
});