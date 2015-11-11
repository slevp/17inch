/**
 * @Description: App category model.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            count: 0
        }
    });
});