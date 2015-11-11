/**
 * Created by caiyidi on 14/08/21.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;

    var phoneContactItemTemplate = require('../templates/contact-page-item.tpl');
    module.exports = Backbone.View.extend({
        tagName: 'li',
        template: _.template(phoneContactItemTemplate),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {

        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
});