/**
 * @Description: a collection to describe app used in home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var AppModel = require('../models/app');

    module.exports = Backbone.Collection.extend({
        model: AppModel,
        comparator: 'order',
        initialize: function () {

        },
        getInNavLength: function() {
            var count = 0;
            for (var i = 0; i < this.length; i++) {
                if (this.at(i).get('in_nav')) count++;
            }
            return count;
        }
    });
});