/**
 * @Description: Player model.
 * @Author: fuwensong
 * @Date: 14-9-25
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var _ = require('underscore');
    var store = require('store');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var songs = store.get(localKeys.songs);
    var lastPlayed = store.get(localKeys.last_played);
    lastPlayed = lastPlayed || 0;
    if (!songs) {
        songs = require('../data/songs.json');
        store.set(localKeys.songs, songs);
    }

    function Player (options) {
        options = options || {};
        var defaults = {
            isPlaying: false,
            current: lastPlayed,
            list: songs,
            onEnd: function () {
                console.log('song on auto complete.');
            }
        };
        _.extend(this, defaults, options);
        this.init();
    }

    Player.prototype.init = function () {
        var self = this;
        this.list = this.list || [];
        if (this.list.length <= 0) {
            return console.info('No songs');
        }
        this.audio = document.createElement("audio");
        if (!this.list[this.current]) {
            console.error('Invalid current param.');
            this.current = 0;
        }
        this.audio.src = this.list[this.current].contentURI;
        this.audio.addEventListener('ended', function() {
            self.nextSong();
            self.onEnd.apply(self, arguments);
        });
        this.previous = this.getPrevious();
        this.next = this.getNext();
    };

    Player.prototype.getPrevious = function () {
        return this.current <= 0
            ? this.list.length - 1 > 0
            ? this.list.length - 1
            : 0
            : this.current - 1;
    };

    Player.prototype.getNext = function () {
        return this.current < this.list.length - 1
            ? this.current + 1
            : 0;
    };

    Player.prototype.play = function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
        }
        this.audio.play();
    };

    Player.prototype.pause = function () {
        if (this.isPlaying) {
            this.isPlaying = false;
        }
        this.audio.pause();
    };

    Player.prototype.stop = function () {
        // TODO
    };

    Player.prototype.nextSong = function () {
        this.previous = this.current;
        this.current = this.next;
        this.next = this.getNext();

        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };

    Player.prototype.previousSong = function () {
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.getPrevious();

        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };

    Player.prototype.playSong = function (index) {
        if (index < 0 || index > this.list.length) {
            return console.error('Invalid song index.');
        }
        this.current = index;
        this.next = this.getNext();
        this.previous = this.getPrevious();

        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };

    Player.prototype.getRemainingTime = function () {
        var currentTime = Math.ceil(this.audio.currentTime);
        var durationTime = Math.ceil(this.audio.duration);
        return durationTime - currentTime;
    };

    Player.prototype.getDurationText = function () {
        var remainingTime = this.getRemainingTime();
        var durationTimeMin = parseInt(remainingTime / 60);
        var durationTimeSec = remainingTime % 60;
        durationTimeSec = durationTimeSec > 9 ? durationTimeSec + '' : '0' + durationTimeSec;
        return durationTimeMin + ':' + durationTimeSec;
    };

    module.exports = Player;
});