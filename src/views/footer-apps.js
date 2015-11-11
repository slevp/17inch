/**
 * @Description: footer app container view, includes left and right.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Template = require('../templates/footer-apps.tpl');
    var store = require('store');
    var storageKeys = require('../settings.json').STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        console.error('Not found home_info storage');
    }

    module.exports = Backbone.View.extend({
        id: 'footer-apps',
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.mode = 'both';
            this.leftAppName = homeInfo['footer']['left-app'];
            this.rightAppName = homeInfo['footer']['right-app'];
            this.appManager = options.appManager;

            this.on('switchApp', this.switchApp);
            this.on('resetApp', this.resetApp);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template());
            this.changeAppsStyle();
            return this;
        },
        changeAppsStyle: function () {
            var leftFrame = this.appManager[this.leftAppName].iframe();
            var rightFrame = this.appManager[this.rightAppName].iframe();
            if (!leftFrame || !rightFrame) {
                console.error('Foot app left or right not existed.');
            }
            var leftContainer = this.$el.find('#left-container');
            var rightContainer = this.$el.find('#right-container');
            switch(this.mode) {
                case 'left': {
                    //rightContainer.empty();
                    leftFrame.src = getAppSrcByName(this.leftAppName, 'footer-expanded');
                    if (leftContainer.find('iframe').length <= 0) {
                        leftContainer.append(leftFrame);
                    }
                    break;
                }
                case 'right': {
                    //leftContainer.empty();
                    rightFrame.src = getAppSrcByName(this.rightAppName, 'footer-expanded');
                    if (rightContainer.find('iframe').length <= 0) {
                        rightContainer.append(rightFrame);
                    }
                    break;
                }
                case 'both': {
                    leftFrame.src = getAppSrcByName(this.leftAppName, 'footer');
                    if (leftContainer.find('iframe').length <= 0) {
                        leftContainer.append(leftFrame);
                    }
                    rightFrame.src = getAppSrcByName(this.rightAppName, 'footer');
                    if (rightContainer.find('iframe').length <= 0) {
                        rightContainer.append(rightFrame);
                    }
                    break;
                }
            }
        },
        hideEl: function (el) {
            el.removeClass('expanded').addClass('hide');
        },
        expandEl: function (el) {
            el.removeClass('hide').addClass('expanded');
        },
        resetEl: function (el) {
            el.removeClass('hide').removeClass('expanded');
        },
        switchApp: function(type, callback) {
            this.mode = type === 'left' ? 'right' : 'left';
            var leftEl = this.$el.find('#left-container');
            var rightEl = this.$el.find('#right-container');
            if (this.mode === 'left') {
                this.decreaseAnimation(rightEl, 'all', function() {
                    this.hideEl(rightEl);
                    this.changeAppsStyle();
                    callback();
                });
                this.expandAnimation(leftEl, 'all', function() {
                    this.expandEl(leftEl);
                });
            } else {
                this.decreaseAnimation(leftEl, 'all', function() {
                    this.hideEl(leftEl);
                    this.changeAppsStyle();
                    callback();
                });
                this.expandAnimation(rightEl, 'all', function() {
                    this.expandEl(rightEl);
                });
            }
        },
        resetApp: function(type) {
            this.mode = 'both';
            var leftEl = this.$el.find('#left-container');
            var rightEl = this.$el.find('#right-container');
            if (type == 'right') {
                // right expanded
                this.decreaseAnimation(rightEl, 'right',function() {
                    this.resetEl(rightEl);
                    this.changeAppsStyle();
                });
                this.expandAnimation(leftEl, 'left', function() {
                    this.resetEl(leftEl);
                });
            } else {
                // left expanded
                this.decreaseAnimation(leftEl, 'left',function() {
                    this.resetEl(leftEl);
                    this.changeAppsStyle();
                });
                this.expandAnimation(rightEl, 'right', function() {
                    this.resetEl(rightEl);
                });
            }
        },
        expandAnimation: function (el, type, callback) {
            var timeout = 200;
            var ease = 'easeInQuint';
            var self = this;
            var width;
            if (type == 'right') {
                width = '33%';
            } else if (type == 'left') {
                width = '65.5%';
            } else {
                width = '100%';
            }
            el.animate({
                width: width
            }, timeout, ease, function() {
                callback.call(self);
            });
        },
        decreaseAnimation: function (el, type, callback) {
            var timeout = 200;
            var ease = 'easeInQuint';
            var self = this;
            var width;
            if (type == 'right') {
                width = '33%';
            } else if (type == 'left') {
                width = '65.5%';
            } else {
                width = '0';
            }
            el.animate({
                width: width
            }, timeout, ease, function() {
                callback.call(self);
            });
        }
    });

    var getAppSrcByName = function (name, mode) {
        var src = 'apps/' + name + '/index.html';
        if (mode) {
            src += '#$mode/' + mode;
        }
        return src;
    };
});