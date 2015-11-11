/**
 * @Description: Song list view.
 * @Author: fuwensong
 * @Date: 14-10-7
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Template = require('../templates/song-list.tpl');
    var ItemView = require('./song-list-item');
    var IScroll = require('iscroll');

    module.exports = Backbone.View.extend({
        template: _.template(Template),
        events: {
            'tap .item': 'itemClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.player = options.player;
            this.mainView = options.mainView;
        },
        render: function () {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template({}));
            var currentModel = this.collection.at(this.player.current);
            var ulEl = this.$el.find('.listview ul');
            var currentItemEl = null;
            _.each(this.collection.models, function (model, list) {
                var itemView = new ItemView({model: model});
                itemView.render();
                if (currentModel.id === model.id) {
                    currentItemEl = itemView.el;
                    itemView.$el.addClass('current');
                }
                ulEl.append(itemView.el);
            });
            setTimeout(function () {
                self.scroll = new IScroll('.listview');
                self.scroll.scrollToElement(currentItemEl, 1000);
            }, 200);
            return this;
        },
        itemClickEvent: function (e) {
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass('current')) {
                return;
            }
            var id = el.attr('data-id');
            this.mainView.cutToSong(id);
        },
        activeItem: function (id) {
            var itemEl = this.$el.find(".item[data-id='" + id + "']");
            if (!itemEl || itemEl.length <= 0) {
                return console.error('Not found song by id.');
            }
            if (itemEl.hasClass('current')) {
                return;
            }
            this.$el.find('.item.current').removeClass('current');
            itemEl.addClass('current');
            this.scroll.scrollToElement(itemEl[0], 1000);
        }
    });
});