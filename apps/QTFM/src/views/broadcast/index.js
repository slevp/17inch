/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');

    var NavView = require('../nav');
    var MainView = require('./main');

    module.exports = Backbone.View.extend({
        pageName: 'broadcast',
        className: 'page broadcast',
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.navView = new NavView();
            this.mainView = new MainView();
        },
        render: function () {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});