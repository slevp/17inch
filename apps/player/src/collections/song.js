/**
 * @Description: App category collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var Song = require('../models/song');

    module.exports = Backbone.Collection.extend({
        model: Song
    });
});