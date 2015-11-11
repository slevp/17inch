/**
 * Created by fuwensong on 14-7-4.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var topivi = require('topivi');


    var dialTemplate = require('../templates/dial-page.tpl');
    var DialingView = require('./dialing');

    module.exports = Backbone.View.extend({
        template: _.template(dialTemplate),
        events: {
            'click .dial-btns .numbers>div': 'numberClickEvent',
            'click .dial-top .dial-delete': 'dialDeleteClickEvent',
            'click .dialing': 'dialingClickEvent',
            'taphold .dial-delete': 'dialDeleteHoldEvent'
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.dialingView = new DialingView();

            this.listenTo(this.dialingView, 'hangUp', this.hangUpEvent);
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template());
            this.dialingView.$el = this.$el.find('.dialing-pad');
            if (this.cursorInterval) {
                clearInterval(this.cursorInterval);
            }
            this.cursorInterval = setInterval(function() {
                self.$el.find('.dial-cursor').toggleClass('hide');
            }, 500);
            return this;
        },
        numberClickEvent: function(event) {
            var value = $(event.target).attr('data-value');
            var dialNumberEl = this.$el.find('.dial-top .dial-number');
            var text = dialNumberEl.text();
            text += value;
            dialNumberEl.text(text);
        },
        dialDeleteClickEvent: function() {
            var dialNumberEl = this.$el.find('.dial-top .dial-number');
            var text = dialNumberEl.text();
            if (text) {
                text = text.substring(0, text.length - 1);
            }
            dialNumberEl.text(text);
        },
        dialingClickEvent: function() {
            var dialog = new topivi.dialog.normal('', {
                removeAfterClose: true,
                content: '未接入模块，请稍后再试...',
                useMask: true,
                closeGesture: 'clickmask swiperight'
            });
            dialog.el.addClass('phone');
            dialog.open();
        },
        dialDeleteHoldEvent: function() {
            this.$el.find('.dial-top .dial-number').text('');
        },
        hangUpEvent: function() {
            this.dialingView.$el.hide();
            this.$el.find('.dial-pad').show();
        }
    });
});