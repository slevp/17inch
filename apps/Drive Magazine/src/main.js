
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Router = require('./routers/index');
    var router = new Router();
    Backbone.history.start();
});