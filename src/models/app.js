/**
 * @Description: a model to describe app used in home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            in_nav: true,
            is_native: false,
            is_cache: false, // it means if keeping the app in dom.
            mode: 'normal', // 'normal' means that app is shown in middle area, widget means that app is shown in widget area, such as dialog.
            life_cycle: 10 * 1000 // how long to remove app dom, default is 30s.
        },
        initialize: function () {
            var name = this.get('name');
            var iconPath = (name === 'home')
                ? 'img/nav-apps/home_normal.png'
                : 'apps/' + name + '/icon.png';
            this.set('icon_path', iconPath);
        }
    });
});