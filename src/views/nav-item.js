/**
 * Created by fuwensong on 14-7-4.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');

    var navItemTemplate = require('../templates/nav-item.tpl');

    module.exports = Backbone.View.extend({
        tagName: 'li',
        template: _.template(navItemTemplate),
        events: {
            'click a': 'itemClickEvent'
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var name = this.model.get('name');
            this.$el.attr('data-name', name);
            this.listenTo(this.model, 'remove', this.appUninstalled);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        appUninstalled: function(model, collection) {
            this.remove();
        },
        itemClickEvent: function (e) {
            var $el = Backbone.$(e.currentTarget);
            var name = $el.attr('data-name');

            myrouter.navigate(name, {trigger: true, replace: true});
        }
    });
});