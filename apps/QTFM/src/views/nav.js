/**
 * @Description: Nav view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Template = require('../templates/nav.tpl');
    module.exports = Backbone.View.extend({
        tagName: 'ul',
        className: 'nav',
        template: _.template(Template),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        activeItem: function (name) {
            this.$el.find('.item.active').removeClass('active');
            this.$el.find('.item.' + name).addClass('active');
        }
    });
});