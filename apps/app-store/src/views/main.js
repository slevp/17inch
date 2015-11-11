/**
 * @Description: Main view of app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var ContentView = require('./content');

    module.exports = Backbone.View.extend({
        className: 'main',
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.contentView = new ContentView();
        },
        render: function () {
            this.$el.empty();
            this.$el.append(this.contentView.render().el);
            return this;
        },
        changePage: function (page) {
            this.contentView.changePage(page);
        }
    });
});