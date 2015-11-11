/**
 * Created by fuwensong on 14-7-4.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var IScroll = require('iscroll');
    var phoneContactTemplate = require('../templates/contact-page.tpl');
    var contactItemView = require('./contact-item');

    module.exports = Backbone.View.extend({
        template: _.template(phoneContactTemplate),
        events: {
            'click .off-hook': 'offHookClick'
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
            this.$el.html(this.template());
            var listEl = this.$el.find('#contact-list ul');

            var models = this.collection.sortBy('sorter');
            _.each(models, function(model, index, list) {
                if (index > 0) {
                    var previous = list[index - 1];
                    var sorter = model.get('sorter');
                    var previousSorter = previous.get('sorter');
                    model.set('is_show_index', !(sorter == previousSorter));
                } else {
                    model.set('is_show_index', true);
                }
                var item = new contactItemView({model: model});
                listEl.append(item.render().el);
            });
            setTimeout(function() {
                self.scroll = new IScroll ('#contact-list', {
                    hScroll: false,
                    vScrollbar: false
                });
                self.letterScroll = new IScroll ('#letter-list', {
                    hScroll: false,
                    vScrollbar: false
                })
            }, 100);
            return this;
        },
        offHookClick: function(event) {
            var el = $(event.target);
            this.indexView.trigger('switchPage', {
                page: 'dial',
                fn: 'dialingClickEvent',
                number: el.prev('.number').text()
            });
            this.indexView.trigger('saveToRecent', {

            })
        }

    });
});