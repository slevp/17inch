/**
 * Created by wangyuhao on 14-10-10.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var IScroll = require('iscroll');
    var store = require('store');
    var detailsView = require('../templates/details.tpl');
    var imageColl = require('../collections/images');
    var books = store.get('books');
    var IScrollProbe = require('iscroll/5.1.2/iscroll-probe');
    var isDragging = false;
    var isScrolling = false;

    module.exports = Backbone.View.extend({
        className: 'page read ',
        template: _.template(detailsView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            var bookId = options.bookId;
            this.bookId = bookId;
            this.collection = new imageColl(books[this.bookId].img);
        },
        events: {
            'click .content .imgs': 'showHead'
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.append(this.template({
                title: books[this.bookId].name,
                imageData: this.collection.models
            }));
            var progressEl = this.$el.find('.content .progress-line');
            var progressTop = progressEl.offset().top;
            var circleEl = this.$el.find('.content .circle');
            setTimeout(function() {
                self.resetScrollWidth();
                self.scroll = new IScrollProbe('.content', {
                    scrollX: true,
                    scrollY: false,
                    probeType: 3,
                    zoom: true,
                    wheelAction: 'zoom'
                });
                var progressLength = progressEl.height();

                self.$el.find('.circle').drag('options', {
                    axis: 'y',
                    min: {top: -10},
                    max: {top: progressLength},
                    ondrag: function(e) {
                        isDragging = true;
                        var circleTop = circleEl.offset().top;
                        var diff = circleTop - progressTop;
                        var percentage = diff / progressLength;
                        var index = Math.floor(percentage * (self.collection.length));
                        var el = self.$el.find('.content ul li:eq(' + (index - 2) + ')');
                        self.scroll.scrollToElement(el[0], 500);
                        self.$el.find('.head').hide();
                    },
                    ondragend: function() {
                        isDragging = false;
                        self.$el.find('.head').hide();
                    }
                });
                self.scroll.on('scroll',function() {
                    isScrolling = true;
                    if (isDragging)
                        return;
                    var changeWidth = Math.abs(this.x);
                    var changeProportion = changeWidth/ Math.abs(this.maxScrollX);
                    var diffHeight = progressLength * changeProportion;
                    var newTop = progressTop + diffHeight;
                    self.$el.find('.content .progress .circle').css("top", newTop);
                    self.$el.find('.head').hide();
                });
                self.scroll.on('scrollEnd',function() {
                    isScrolling = false;
                })
            }, 200);
            this.setHideHeaderTimeout();
            return this;
        },
        setHideHeaderTimeout: function () {
            var self = this;
            this.headerTimeout = setTimeout(function(){
                self.$el.find('.head').fadeOut(1000);
            }, 5000);
        },
        resetScrollWidth: function () {
            var contentEl = this.$el.find('.content');
            var liWidth = contentEl.width();
            var ulWidth = this.collection.length * liWidth;
            contentEl.find('ul.imgs').css("width", ulWidth);
            contentEl.find('ul.imgs>li').css("width", liWidth);
        },
        showHead: function () {
            if (isScrolling) {
                return;
            }
            if (this.headerTimeout) {
                clearTimeout(this.headerTimeout);
            }
            this.$el.find('.head').fadeIn(600);
            this.setHideHeaderTimeout();
        }
    });
})