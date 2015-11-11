/**
 * @Description: the index router for home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var storageKeys = require('../settings.json').STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        homeInfo = require('../data/home-info.json');
        store.set(storageKeys.home_info, homeInfo);
    }
    var apps = store.get(storageKeys.apps);
    if (!apps) {
        apps = require('../data/apps.json');
    }
    var AppCollection = require('../collections/app');
    var appCollection = new AppCollection(apps);
    store.set(storageKeys.apps, appCollection.toJSON());

    var HomeTemplate = require('../templates/home.tpl');
    var HeaderView = require('./header');
    var AppView = require('./app');
    var FooterView = require('./footer');

    module.exports = Backbone.View.extend({
        id: 'home-container',
        className: 'no-app',
        template: _.template(HomeTemplate),
        events: {
            'swipeup #header-container': 'swipeUpEvent',
            'swipedown #header-container': 'swipeDownEvent'
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var self = this;
            this.atHomePage = true;
            this.headerView = new HeaderView();
            this.appView = new AppView({appCollection: appCollection});
            this.footerView = new FooterView({appManager: this.appView.appManager, appCollection: appCollection});

            this.on('backToHome', this.backToHome);
            this.on('displayApp', this.displayApp);
            this.listenTo(appCollection, 'updateHomeApps', this.updateStoreApps);

            Backbone.$(document).on('openApp', function (event, app) {
                if (!appCollection.findWhere({name: app})) {
                    return console.error('App: ' + app + ' has not been installed.');
                }
                self.trigger('displayApp', {app: app, navigate: true, hash: app});
            });
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template({}));
            this.$el.append(this.headerView.render().el);
            this.$el.append(this.appView.render().el);
            this.$el.append(this.footerView.render().el);
            this.footerView.navView.activeItem('home');
            return this;
        },
        backToHome: function(options) {
            var self = this;
            if (this.atHomePage)
                return;
            var currentApp = this.appView.currentApp;
            var leftAppName = this.footerView.appsView.leftAppName;
            var rightAppName = this.footerView.appsView.rightAppName;
            var mode;
            var callback = function () {
                self.headerView.trigger('changeMode', {mode: 'big'});
                self.footerView.navView.activeItem('home');
                self.$el.addClass('no-app');
                self.atHomePage = true;
                if (currentApp === rightAppName || currentApp === leftAppName) {
                    mode = (currentApp === leftAppName) ? 'left' : 'right';
                    self.footerView.appsView.trigger('resetApp', mode);
                }
            };
            if (options && options.from && options.from == 'swipe-down') {
                // swipe down
                this.showHomeAnimation(callback, {ease: 'easeInQuint'});
            } else {
                // click home
                this.showHomeAnimation(callback, {ease: 'easeInBack'});
            }
        },
        displayApp: function(options) {
            var self = this;
            var app = options.app;
            var leftAppName = this.footerView.appsView.leftAppName;
            var rightAppName = this.footerView.appsView.rightAppName;
            var currentApp = this.appView.currentApp;
            var mode;
            var callback = function(options) {
                options = options || {};
                var resetHeader = options.resetHeader;
                if (resetHeader) {
                    self.headerView.trigger('changeMode', {mode: 'small'});
                    self.headerView.$el.hide().fadeIn(200);
                }
                self.footerView.navView.activeItem(app);
                self.appView.trigger('switchApp', app);
                self.$el.removeClass('no-app');
                self.atHomePage = false;
            };
            var showApp = function (cb) {
                cb = cb || callback;
                if (self.atHomePage) {
                    self.showAppAnimation(cb);
                } else {
                    self.switchAppAnimation(cb, app);
                }
            };
            if (app === leftAppName || app === rightAppName) {
                mode = (app === leftAppName) ? 'left' : 'right';
                this.footerView.appsView.trigger('switchApp', mode, showApp);
            } else {
                mode = (currentApp === leftAppName) ? 'left' : 'right';
                if (currentApp === rightAppName || currentApp === leftAppName) {
                    showApp(function () {
                        callback.apply(this, arguments);
                        self.footerView.appsView.trigger('resetApp', mode);
                    });
                } else {
                    showApp();
                }
            }
        },
        swipeDownEvent: function() {
            if (this.atHomePage) {
                return;
            }
            this.trigger('backToHome', {navigate: true, hash: 'home', from: 'swipe-down'});
        },
        swipeUpEvent: function() {
            if (!this.atHomePage || this.swippingUp) {
                return;
            }
            var currentApp = this.appView.currentApp;
            if (currentApp) {
                this.trigger('displayApp', {app: currentApp, navigate: true, hash: currentApp});
            } else {
                var self = this;
                var el = this.headerView.$el;
                this.swippingUp = true;
                el.animate({
                    top: '-20%'
                }, 'normal', 'easeOutCirc', function () {
                    el.animate({
                        top: '0'
                    }, 'normal', 'easeOutBounce', function () {
                        self.swippingUp = false;
                    });
                });
            }
        },
        showAppAnimation: function(callback) {
            var el = this.headerView.$el;
            el.animate({
                top: '-100%',
                opacity: 0
            }, 350, 'easeInQuint', function() {
                callback({resetHeader: true});
                el.css({
                    'top': '0',
                    'opacity': 1
                });
            });
        },
        switchAppAnimation: function(callback, app) {
            var activeIndex = this.footerView.navView.$el.find('li.active').index();
            var appIndex = this.footerView.navView.$el.find("li[data-name='" + app + "']").index();
            var self = this;
            var el = this.appView.getCurrentAppEl();
            if (parseInt(appIndex) > parseInt(activeIndex)) {
                el.animate({
                    right: '100%'
                }, 200, 'easeInQuint', function() {
                    el.css('right', '0');
                    callback();
                });
            } else {
                el.animate({
                    left: '100%'
                }, 200, 'easeInQuint', function() {
                    el.css('left', '0');
                    callback();
                });
            }
        },
        showHomeAnimation: function(callback, options) {
            var ease = options ? options.ease : 'easeInBack';
            var self = this;
            var el = this.appView.$el;
            if (!this.isSetAppHeight) {
                var selfHeight = el.height();
                el.css('height', selfHeight + 'px');
                el.css('bottom', 'auto');
                this.isSetAppHeight = true;
            }
            el.animate({
                opacity: 0,
                marginTop: '100%'
            }, 350, ease, function() {
                el.css({
                    'margin-top': '0',
                    opacity: 1
                });
                callback();
            });
        },
        updateStoreApps: function () {
            store.set(storageKeys.apps, appCollection.toJSON());
        }
    });
});