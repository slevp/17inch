/**
 * @Description: Channel list view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var IScroll = require('iscroll');
    var ItemView = require('./channel-item');

    module.exports = Backbone.View.extend({
        tagName: 'ul',
        className: 'channel-list listview',
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.scrollSelector = options.scrollSelector;
            this.listenTo(this.collection, 'remove', this.removeItemEvent);
        },
        render: function () {
            var self = this;
            this.$el.empty();
            this.collection.each(function (model, list, options) {
                model.set('pageName', self.pageName);
                var view = new ItemView({model: model, parent: self});
                self.$el.append(view.render().el);
            });
            setTimeout(function () {
                self.listScroll = new IScroll(self.scrollSelector, {click: true});
            }, 250);
            return this;
        },
        removeItemEvent: function (model) {
            this.listScroll.refresh();
        }
    });
});