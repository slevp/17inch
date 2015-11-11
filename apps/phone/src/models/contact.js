/**
 * Created by wangyuhao on 14-9-26.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    module.exports = Backbone.Model.extend({
        defaults: {
            name: '',
            attribution: 'Unknown',
            avatar: 'img/kuaizixiongdi.jpg'
        },
        initialize: function() {

        }
    });
});