/**
 * @Description: Weather model.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var statusMap = require('../settings.json').status_map;
    var basePath = 'img/dialog-apps/weather/';

    module.exports = Backbone.Model.extend({
        idAttribute: 'date',
        defaults: {
        },
        initialize: function () {
            var status = this.get('status');
            if (!statusMap[status]) {
                status = '多云';
                console.error('Unknown weather status.');
            }
            var iconName = statusMap[status]['icon'];
            this.set('iconPath', basePath + 'brighter-icon/' + iconName + '.png');
            this.set('iconPathDarker', basePath + 'darker-icon/' + iconName + '.png');
        }
    });
});