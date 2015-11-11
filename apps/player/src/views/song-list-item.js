/**
 * @Description: Song list item view.
 * @Author: fuwensong
 * @Date: 14-10-7
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Template = require('../templates/song-list-item.tpl');

    module.exports = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: _.template(Template),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.$el.attr('data-id', this.model.id);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
});