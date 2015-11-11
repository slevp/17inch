/**
 * @Description: topivi index package
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var topivi = {};
    topivi.util = require('./util');

    topivi.progress = require('./progress/index');

    topivi.dialog = require('./dialog/index');

    topivi.card = require('./card/index');

    topivi.scroll = require('./scroll/index');

    topivi.slider = require('./slider/index');

    topivi.tips = require('./tips/index');

    topivi.loading = require('./loading/index');

    topivi.socket = require('./socket/index');
	
    module.exports = topivi;
});