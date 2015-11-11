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
    var store = require('store');
    var Template = require('../templates/channel-item.tpl');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;

    module.exports = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: _.template(Template),
        events: {
            'tap .link': 'linkClickEvent',
            'tap .delete-btn': 'deleteBtnClick'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.parentView = options.parent;
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        linkClickEvent: function () {
            var channel = this.model.toJSON();
            channel.pageName = undefined;
            store.set(localKeys.last_played_channel, channel);
            var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
            latelyPlayedChannels = latelyPlayedChannels || {};
            channel.listenDate = new Date().getTime();
            latelyPlayedChannels[channel.id] = channel;
            store.set(localKeys.lately_played_channels, latelyPlayedChannels);
            var hash = this.model.get('pageName') + '/play/' + this.model.id;
            this.parentView.trigger('navigate', hash);
        },
        deleteBtnClick: function (e) {
            this.remove();
            this.parentView.collection.remove(this.model);
        }
    });
});