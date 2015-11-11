/**
 * Created by wangyuhao on 14-10-10.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var IScroll = require('iscroll');
    var store = require('store');
    var Settings = require('../settings.json');
    var detailsView = require('../templates/details.tpl');
    var TagData =['engine','fuel','cartridge', 'tyre', 'cell', 'break','brush','refrigerator','brake-oil','transmission-oil','service','filtration'];
    var LocalMaintenance =store.get('maintenance');
    module.exports = Backbone.View.extend({
        className: 'page information',
        template: _.template(detailsView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            var tagId = options.tagId;
            this.tagId = tagId;
        },
        events: {
            'swipeleft .content': 'swipeLeftTag',
            'swiperight .content': 'swipeRightTag',
            'click .tag': 'changeTag'
        },
        render: function() {
            var LocalMaintenance =store.get('maintenance');
            var self = this;
            this.$el.empty();
            switch (parseInt(self.tagId)) {
                case 1:
                    var uptwo = 11;
                    var upone = 12;
                    var nextone = 2;
                    var nexttwo = 3;
                    break;
                case 2:
                    var uptwo = 12;
                    var upone = 1;
                    var nextone = 3;
                    var nexttwo = 4;
                    break;
                case 11:
                    var uptwo = 9;
                    var upone = 10;
                    var nextone = 12;
                    var nexttwo = 1;
                    break;
                case 12:
                    var uptwo = 10;
                    var upone = 11;
                    var nextone = 1;
                    var nexttwo = 2;
                    break;
                default :
                    var uptwo = parseInt(self.tagId) - 2;
                    var upone = parseInt(self.tagId) - 1;
                    var nextone = parseInt(self.tagId) + 1;
                    var nexttwo = parseInt(self.tagId) + 2;
            };
            var localKey = TagData[self.tagId - 1];

            this.$el.append(this.template({
                uptwo: {
                    "className":  TagData[uptwo-1],
                    "tagId": uptwo
                },
                upone: {
                    "className":TagData[upone- 1],
                    "tagId": upone
                },
                now: {
                    "className": TagData[self.tagId - 1],
                    "tagId": self.tagId
                },
                nextone: {
                    "className":TagData[nextone- 1],
                    "tagId": nextone
                },
                nexttwo: {
                    "className":TagData[nexttwo- 1],
                    "tagId": nexttwo
                },

                data : LocalMaintenance[localKey]
            }));
            return this;
        },
        swipeLeftTag: function(e) {
            var el = $(e.currentTarget);
            var dataKey = el.find('li:eq(2)').attr('data-key');
            var key = parseInt(dataKey) + 1;
            if (key == 13) {
                this.tagId = 1;
            } else {
                this.tagId = key;
            }
            this.render();
        },
        swipeRightTag: function(e) {
            var el = $(e.currentTarget);
            var dataKey = el.find('li:eq(2)').attr('data-key');
            var key = parseInt(dataKey) - 1;
            if (key == 0) {
                this.tagId = 12;
            } else {
                this.tagId = key;
            }
            this.render();
        },
        changeTag: function (e) {
            var el = $(e.currentTarget);
            var dataKey =el.attr('data-key');
            this.tagId = dataKey;
            this.render();
        }
    });

})