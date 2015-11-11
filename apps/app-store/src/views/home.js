/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var NavView = require('./nav');
    var MainView = require('./main');

    module.exports = Backbone.View.extend({
        className: 'page',
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.navView = new NavView();
            this.mainView = new MainView();
            this.mainView.contentView.listenTo(this.navView, 'changeCategory', this.mainView.contentView.changeCategory);
        },
        render: function () {
            this.$el.empty();
            this.$el.append("<div id='app-detail-dialog'></div>");
            this.$el.append(this.mainView.render().el);
            this.$el.append("<div id='bottom-mask'></div>");
            this.$el.append(this.navView.render().el);
            return this;
        }
    });
});