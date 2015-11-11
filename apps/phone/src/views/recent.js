/**
 * Created by wangyuhao on 14-9-26.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;

    module.exports = Backbone.View.extend({
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.on('hangUp', this.recent);
        },
        render: function() {
            var self = this;
            return this;
        },
        recent: function() {
        }
    });
});