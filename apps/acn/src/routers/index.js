/**
 * @Description: the index router for app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var ModeNormalView = require('../views/mode-normal');
    var mainView = null;

    module.exports = Backbone.Router.extend({
        routes: {
            "": "modePage",
            "$mode/:mode": "modePage"
        },
        modePage: function (mode) {
            mode = mode || 'middle';
            if (!mainView) {
                mainView = new ModeNormalView();
                Backbone.$('body').prepend(mainView.render().el);
            }
            mainView.changeMode(mode);
        }
    });
});