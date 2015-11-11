/**
 * Created by fuwensong on 14-7-4.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var phoneDialingTemplate = require('../templates/dial-page-dialing.tpl');

    module.exports = Backbone.View.extend({
        className: 'app-phone',
        template: _.template(phoneDialingTemplate),
        events: {
            'click .hang-up-btn': 'hangUpClickEvent'
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            this.$el.find('.outer').addClass('diffusion');
            this.$el.find('.outer-bigger').addClass('diffusion');
            return this;
        },
        hangUpClickEvent: function() {
            this.$el.find('.outer').removeClass('diffusion');
            this.trigger('hangUp');
        }
    });
});