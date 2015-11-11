/**
 * @Description: center app view
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var storageKeys = require('../settings.json').STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        console.error('Not found home_info storage');
    }

    module.exports = Backbone.View.extend({
        id: 'app-container',
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.appCollection = options.appCollection;
            this.appManager = {};
            // init footer apps
            var leftName = homeInfo['footer']['left-app'];
            var rightName = homeInfo['footer']['right-app'];
            this.createApp(leftName);
            this.createApp(rightName);

            this.currentApp = null;
            this.prevApp = null;
            this.on('switchApp', this.switchApp);
        },
        render: function() {
            if (this.currentApp) {
                var leftName = homeInfo['footer']['left-app'];
                var rightName = homeInfo['footer']['right-app'];
                var currentApp = this.searchApp(this.currentApp);
                var prevApp = this.searchApp(this.prevApp);
                var currentIFrame = currentApp.iframe();
                if (prevApp) {
                    $(prevApp.iframe()).removeClass('active');
                    prevApp.clearRunnable();
                }
                $(currentIFrame).addClass('active');
                var name = currentApp.model.get('name');
                if (!currentIFrame.src || name === leftName || name === rightName) {
                    currentIFrame.src = getAppSrcByName(this.currentApp);
                }
                if (this.$el.find('.active').length <= 0) {
                    this.$el.append(currentIFrame);
                }
                if (currentApp.runnable) {
                    clearTimeout(currentApp.runnable);
                }
            }
            return this;
        },
        createApp: function (name) {
            var self = this;
            var app = this.appCollection.findWhere({name: name});
            if (!app) {
                console.error('Not found app: ' + name);
                return;
            }
            var newApp = {
                iframe: function () {
                    var name = this.model.get('name');
                    var iframeEl = self.$el.find("iframe[data-name='" + name + "']");
                    if (!iframeEl || iframeEl.length <= 0) {
                        iframeEl = $('#footer-apps').find("iframe[data-name='" + name + "']");
                        if (!iframeEl || iframeEl.length <= 0) {
                            iframeEl = $(document.createElement("iframe"));
                            iframeEl.attr({
                                'data-name': name
                            });
                        }
                    }
                    return iframeEl[0];
                },
                model: app,
                clearRunnable: function () {
                    var lifeCycle = this.model.get('life_cycle');
                    var name = this.model.get('name');
                    if (lifeCycle !== '*') {
                        this.runnable = setTimeout(function () {
                            self.clearApp(name);
                        }, lifeCycle);
                    }
                }
            };
            this.appManager[name] = newApp;
            this.$el.append(newApp.iframe());
            return newApp;
        },
        clearApp: function (name) {
            var app = this.appManager[name];
            if (!app) {
                return console.error('App ' + name + 'has not exist.');
            }
            $(app.iframe()).remove();
            this.appManager[name] = undefined;
        },
        getCurrentAppEl: function () {
            var el = null;
            if (this.currentApp) {
                el = $(this.searchApp(this.currentApp).iframe());
            }
            return el;
        },
        searchApp: function(name) {
            return this.appManager[name];
        },
        switchApp: function(app) {
            var existedApp = this.searchApp(app);
            if (!existedApp) {
                this.createApp(app);
            }
            this.prevApp = this.currentApp;
            this.currentApp = app;
            this.render();
        }
    });


    var getAppSrcByName = function (name) {
        return 'apps/' + name + '/index.html#';
    };
});