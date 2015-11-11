
/**
 * Created by wangyuhao on 14-10-10.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var RepairView = require('../templates/repair.tpl');
    module.exports = Backbone.View.extend({
        className: 'page shop',
        template: _.template(RepairView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {

        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.template({}));
            return this;
        }

    });
})