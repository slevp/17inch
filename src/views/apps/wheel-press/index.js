/**
 * @Description: wheel press index view.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Template = require('./templates/index.tpl');

    module.exports = Backbone.View.extend({
        className: 'dialog-apps wheel-press',
        template: _.template(Template),
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {

        },
        render: function () {
            this.$el.empty();
            this.$el.html(this.template({
                frontLeft: 240,
                frontRight: 240,
                backLeft: 180,
                backRight: 240
            }));
            return this;
        }
    });
});