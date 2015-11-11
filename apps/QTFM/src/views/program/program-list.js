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
    var ItemView = require('./program-item');

    module.exports = Backbone.View.extend({
        tagName: 'ul',
        className: 'program-list listview',
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.channelModel = options.currentChannel;
            this.scrollSelector = options.scrollSelector;
        },
        render: function () {
            var self = this;
            this.$el.empty();
            var nowProgram = this.channelModel.getNowProgram();
            var nowProgramView = null;
            this.collection.each(function (model, list, options) {
                model.set('pageName', self.pageName);
                var view = new ItemView({model: model});
                self.$el.append(view.render().el);
                if (nowProgram.id === model.id) {
                    nowProgramView = view;
                }
            });
            setTimeout(function () {
                self.listScroll = new IScroll(self.scrollSelector, {click: true});
                if (nowProgramView) {
                    self.listScroll.scrollToElement(nowProgramView.el, 800);
                    nowProgramView.$el.addClass('current');
                }
            }, 250);
            return this;
        }
    });
});