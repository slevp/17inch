/**
 * @Description: the index router for app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var BroadcastView = require('../views/broadcast/index');
    var LatelyView = require('../views/lately/index');
    var FavoritesView = require('../views/favorites/index');
    var ChannelView = require('../views/channel/index');
    var ProgramView = require('../views/program/index');
    var PlayView = require('../views/play/index');
    var Player = require('../player');
    var broadcastView, channelView, programView, playView, latelyView, favoritesView;
    var player = new Player();
    var preHash = '';
    var currentHash = '';
    module.exports = Backbone.Router.extend({
        routes: {
            "": "broadcastPage",
            "lately": "latelyPage",
            "broadcast": "broadcastPage",
            "favorites": "favoritesPage",
            ":fromPage/channel-list/:catId": "channelPage",
            ":fromPage/program-list/:channelId": "programPage",
            ":fromPage/play/:channelId": "playPage"
        },
        execute: function (callback, args) {
            preHash = currentHash;
            currentHash = window.location.hash;
            if (callback)
                callback.apply(this, args);
        },
        navigateTo: function (hash) {
            this.navigate(hash, {trigger: true, replace: true});
        },
        backTo: function () {
            if (preHash) {
                this.navigateTo(preHash.substring(1, preHash.length));
            }
        },
        latelyPage: function () {
            if (latelyView) {
                latelyView.remove();
            }
            latelyView = new LatelyView();
            latelyView.mainView.footerView.player = player;
            this.listenTo(latelyView.mainView.channelListView, 'navigate', this.navigateTo);
            $('body').prepend(latelyView.render().el);
            changePage(latelyView.$el);
        },
        broadcastPage: function () {
            if (!broadcastView) {
                broadcastView = new BroadcastView();
                $('body').prepend(broadcastView.render().el);
            }
            changePage(broadcastView.$el);
        },
        favoritesPage: function () {
            if (favoritesView) {
                favoritesView.remove();
            }
            favoritesView = new FavoritesView();
            favoritesView.mainView.footerView.player = player;
            this.listenTo(favoritesView.mainView.channelListView, 'navigate', this.navigateTo);
            $('body').prepend(favoritesView.render().el);
            changePage(favoritesView.$el);
        },
        channelPage: function (fromPage, catId) {
            if (channelView) {
                channelView.remove();
            }
            channelView = new ChannelView({
                fromPage: fromPage,
                catId: catId
            });
            channelView.mainView.footerView.player = player;
            this.listenTo(channelView.mainView.channelListView, 'navigate', this.navigateTo);
            $('body').prepend(channelView.render().el);
            changePage(channelView.$el);
        },
        programPage: function (fromPage, channelId) {
            if (programView) {
                programView.remove();
            }
            programView = new ProgramView({
                fromPage: fromPage,
                channelId: channelId
            });
            this.listenTo(programView.mainView, 'back', this.backTo);
            $('body').prepend(programView.render().el);
            changePage(programView.$el);
        },
        playPage: function (fromPage, channelId) {
            if (playView) {
                playView.remove();
            }
            playView = new PlayView({
                fromPage: fromPage,
                channelId: channelId,
                player: player
            });
            this.listenTo(playView, 'back', this.backTo);
            $('body').prepend(playView.render().el);
            changePage(playView.$el);
        }
    });

    var changePage = function (to, direction) {
        var from = $('.page.active');
        if (from.length <= 0) {
            from = null;
        }
        direction = direction || 'right';
        var callback = function () {
            to.fadeIn(200, function () {
                to.css('display', 'none');
                to.addClass('active');
            });
        };
        switch (direction) {
            case 'left': {
                if (from) {
                    from.fadeOut(200, function() {
                        from.removeClass('active');
                    });
                }
                callback();
                break;
            }
            case 'right': {
                if (from) {
                    from.fadeOut(200, function() {
                        from.removeClass('active');
                    });
                }
                callback();
                break;
            }
        }
    };
});