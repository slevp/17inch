/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $p = parent.seajs.require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var topivi = require('topivi');
    var Template = require('../templates/mode-normal.tpl');
    var ContentTemplate = require('../templates/mode-normal-content.tpl');
    var SongCollection = require('../collections/song');
    var SongListView = require('./song-list');

    function Constructor () {
        Backbone.View.apply(this, arguments);
    }
    module.exports = Backbone.View.extend({
        className: 'page',
        template: _.template(Template),
        contentTemplate: _.template(ContentTemplate),
        events: {
            'tap .play-btn': 'playBtnClick',
            'tap .previous': 'previousBtnClick',
            'tap .next': 'nextBtnClick',
            'swiperight .content': 'previousBtnClick',
            'swipeleft .content': 'nextBtnClick',
            'tap .show-list-btn': 'showListBtnClick'
        },
        constructor: Constructor,
        initialize: function (options) {
            var self = this;
            this.player = options.player;
            this.player.onEnd = function () {
                self.cutSongOutAnimation(function () {
                    this.render();
                    this.cutSongInAnimation();
                });
            };
            this.collection = new SongCollection(this.player.list);
            this.$el.attr('data-mode', 'normal');
            $p(parent.document).on('playSong', function (e, name) {
                var id = self.collection.findWhere({
                    title: name
                }).id;
                self.cutToSong(id);
                if (!self.player.isPlaying) {
                    self.$el.find('.play-btn').trigger('tap');
                }
            });
            $p(parent.document).on('randomPlaySong', function (e) {
                var index = parseInt(Math.random() * self.collection.length);
                self.cutToSong(self.collection.at(index).id);
                if (!self.player.isPlaying) {
                    self.$el.find('.play-btn').trigger('tap');
                }
            });
        },
        render: function () {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template());
            this.renderContent();
            this.$el.find('.volume-progress .dot').drag({
                axis: 'x',
                ondrag: function () {
                    var el = Backbone.$(this);
                    var elWidth = el.width();
                    var bgEl = self.$el.find('.volume-progress .bg');
                    var runningEl = self.$el.find('.volume-progress .running');
                    var bgWidth = bgEl.width();
                    var minOffset = bgEl.offset().left - elWidth / 2;
                    var maxOffset = bgEl.offset().left + bgWidth + elWidth / 2;
                    if (el.offset().left > maxOffset) {
                        el.css('left', '100%');
                        runningEl.css('width', '100%');
                    } else if (el.offset().left < minOffset) {
                        el.css('left', '0');
                        runningEl.css('width', '0');
                    } else {
                        var elLeftSize = el.css('left');
                        elLeftSize = parseFloat(elLeftSize.substr(0, elLeftSize.length - 2));
                        runningEl.css('width', (elLeftSize / bgWidth * 100) + '%');
                    }
                }
            });
            if (this.player.isPlaying) {
                this.createPlayRunnable();
            }
            return this;
        },
        renderContent: function () {
            var el = this.$el.find('.content');
            var currentModel = this.collection.at(this.player.current);
            el.html(this.contentTemplate({
                isPlaying: this.player.isPlaying,
                current: currentModel.attributes,
                previous: this.collection.at(this.player.previous).attributes,
                next: this.collection.at(this.player.next).attributes
            }));
            this.$el.find('.header .title .name').text(currentModel.get('title'));
            this.$el.find('.header .title .artists .value').text(currentModel.get('artists'));
            this.$el.find('.footer .lyric-sound .lyric').text(currentModel.get('lyrics')[0]);
            this.playProgress = new topivi.progress.round(this.$el.find('.playing-progress'), {
                max: 1000
            });
            if (this.songListView) {
                this.songListView.activeItem(currentModel.id);
            }
        },
        playBtnClick: function (e) {
            var el = Backbone.$(e.currentTarget);
            if (!this.player.isPlaying) {
                this.player.play();
                el.addClass('playing');
                this.createPlayRunnable();
            } else {
                this.player.pause();
                el.removeClass('playing');
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }
        },
        createPlayRunnable: function () {
            var self = this;
            var runnable = function() {
                var durationEl = self.$el.find('.current .duration');
                var durationText = self.player.getDurationText();
                durationEl.text('-' + durationText);
                var process = parseInt(self.player.audio.currentTime / self.player.audio.duration * 1000);
                if (_.isNaN(process)) {
                    process = 0;
                }
                self.playProgress.setProgress(process);
            };
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(runnable, 1000);
        },
        nextBtnClick: function () {
            this.cutSongOutAnimation(function () {
                this.player.nextSong();
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        previousBtnClick: function () {
            this.cutSongOutAnimation(function () {
                this.player.previousSong();
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        cutToSong: function (id) {
            var model = this.collection.get(id);
            var index = this.collection.indexOf(model);
            this.cutSongOutAnimation(function () {
                this.player.playSong(index);
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        cutSongOutAnimation: function (callback) {
            var self = this;
            var timeout = 100;
            this.$el.find('.content').fadeOut(timeout, function() {
                if (callback) callback.call(self);
            });
        },
        cutSongInAnimation: function (callback) {
            var self = this;
            var timeout = 200;
            this.$el.find('.content').fadeIn(timeout, function() {
                if (callback) callback.call(self);
            });
        },
        remove: function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            Constructor.__super__.remove.call(this);
        },
        showListBtnClick: function (e) {
            var dependEl = Backbone.$(e.currentTarget);
            if (!this.listTips) {
                this.listTips = new topivi.tips.normal('', {
                    dependEl: dependEl,
                    direction: 'right'
                });
                this.listTips.el.addClass('song-list-tips');
            }
            if (!this.songListView) {
                this.songListView = new SongListView({
                    player: this.player,
                    collection: this.collection,
                    mainView: this
                });
            }
            if (!dependEl.hasClass('active')) {
                this.listTips.setContent(this.songListView.render().el);
                this.listTips.show();
            } else {
                this.listTips.hide();
            }
            dependEl.toggleClass('active');
        }
    });
});