
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Router = require('./routers/index');
    var router = new Router();
    var store = require('store');
    var Settings = require('./settings.json');
    Backbone.history.start();
    var LocalMaintenance =store.get('maintenance');
    if (LocalMaintenance == undefined) {
        store.set('maintenance', Settings.Data);
    }
});