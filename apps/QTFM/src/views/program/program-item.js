/**
 * @Description: Channel item view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Template = require('../../templates/program/program-item.tpl');
    var util = require('../../util');

    module.exports = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: _.template(Template),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template({
                program: this.model.attributes,
                util: util
            }));
            return this;
        }
    });
});