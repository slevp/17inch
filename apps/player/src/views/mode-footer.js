/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var topivi = require('topivi');
    var Template = require('../templates/mode-footer.tpl');
    var SongCollection = require('../collections/song');

    function Constructor () {
        Backbone.View.apply(this, arguments);
    }
    module.exports = Backbone.View.extend({
        className: 'page',
        template: _.template(Template),
        events: {
            'tap .play-btn': 'playBtnClick',
            'tap .previous': 'previousBtnClick',
            'tap .next': 'nextBtnClick',
            'swiperight .content': 'previousBtnClick',
            'swipeleft .content': 'nextBtnClick'
        },
        constructor: Constructor,
        initialize: function (options) {
            var self = this;
            this.player = options.player;
            this.player.onEnd = function () {
                self.render();
            };
            this.collection = new SongCollection(this.player.list);
            this.$el.attr('data-mode', 'footer');
            this.isExpaneded = options.expanded;
            if (this.isExpaneded) {
                this.$el.addClass('expanded');
            }
        },
        render: function () {
            this.$el.empty();
            this.$el.html(this.template({
                isPlaying: this.player.isPlaying,
                current: this.collection.at(this.player.current).attributes
            }));
            this.playProgress = new topivi.progress.round(this.$el.find('.playing-progress'), {
                max: 1000
            });
            if (this.player.isPlaying) {
                this.createPlayRunnable();
            }
            return this;
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
            this.player.nextSong();
            this.render();
        },
        previousBtnClick: function () {
            this.player.previousSong();
            this.render();
        },
        remove: function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            Constructor.__super__.remove.call(this);
        }
    });
});