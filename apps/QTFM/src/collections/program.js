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
    var Model = require('../models/program');

    module.exports = Backbone.Collection.extend({
        model: Model,
        initialize: function () {
        }
    });
});   
