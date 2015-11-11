/**
 * @Description: the main entrance of home app.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = Backbone.$;

    var Router = require('./routers/index');
    window.myrouter = new Router();
    Backbone.history.start();

    $(document).ready(function (event) {
        $('#exit-btn').click(function () {
            var app = tizen.application.getCurrentApplication();
            app.exit();
        });
    });
});