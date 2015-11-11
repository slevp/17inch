/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Channel = require('./channel');
    var Settings = require('../settings.json');

    module.exports = Channel.extend({
        comparator: function (m1, m2) {
            return m1.get('favoriteDate') < m2.get('favoriteDate')
        },
        initialize: function () {

        }
    });
});   
