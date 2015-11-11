/**
 * Created by wangyuhao on 14-9-26.
 */
define(function(require, exports, module) {
    var ContactModel = require('../models/contact');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    module.exports = Backbone.Collection.extend({
        model: ContactModel,
        initialize: function() {

        }
    });
});