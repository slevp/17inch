/**
 * @Description: the index router for app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $p = parent.seajs.require('jquery');
    var Backbone = require('backbone');
    var ModeNormalView = require('../views/mode-normal');
    var ModeFooterView = require('../views/mode-footer');
    var Player = require('../models/player');
    var player = new Player();
    var mainView = null;

    $p(parent.document).on('getPlayerSongList', function (e, callback) {
        callback(player.list);
    });

    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "$mode/:mode": "modePage"
        },
        homePage: function () {
            if (mainView) {
                mainView.remove();
            }
            mainView = new ModeNormalView({player: player});
            Backbone.$('body').prepend(mainView.render().el);
        },
        modePage: function (mode) {
            mode = mode || 'footer';
            switch (mode) {
                case 'middle': {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeNormalView({player: player});
                    Backbone.$('body').prepend(mainView.render().el);
                    break;
                }
                case 'footer': {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeFooterView({player: player, expanded: false});
                    Backbone.$('body').prepend(mainView.render().el);
                    break;
                }
                case 'footer-expanded': {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeFooterView({player: player, expanded: true});
                    Backbone.$('body').prepend(mainView.render().el);
                }
            }
        }
    });
});