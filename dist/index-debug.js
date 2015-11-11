/**
 * @Description: the main entrance of home app.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/main-debug", [ "backbone-debug", "ekai/seventeen-inch/1.0.0/routers/index-debug", "underscore-debug", "store-debug", "ekai/seventeen-inch/1.0.0/views/home-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/data/home-info-debug.json", "ekai/seventeen-inch/1.0.0/data/apps-debug.json", "ekai/seventeen-inch/1.0.0/collections/app-debug", "ekai/seventeen-inch/1.0.0/models/app-debug", "ekai/seventeen-inch/1.0.0/views/header-debug", "jquery-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug", "iscroll-debug", "ekai/seventeen-inch/1.0.0/views/app-debug", "ekai/seventeen-inch/1.0.0/views/footer-debug", "ekai/seventeen-inch/1.0.0/views/nav-debug", "ekai/seventeen-inch/1.0.0/views/nav-item-debug", "ekai/seventeen-inch/1.0.0/views/footer-apps-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = Backbone.$;
    var Router = require("ekai/seventeen-inch/1.0.0/routers/index-debug");
    var router = new Router();
    Backbone.history.start();
    $(document).ready(function(event) {
        $("#exit-btn").click(function() {
            var app = tizen.application.getCurrentApplication();
            app.exit();
        });
    });
});

/**
 * @Description: the index router for home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/routers/index-debug", [ "backbone-debug", "underscore-debug", "store-debug", "ekai/seventeen-inch/1.0.0/views/home-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/data/home-info-debug.json", "ekai/seventeen-inch/1.0.0/data/apps-debug.json", "ekai/seventeen-inch/1.0.0/collections/app-debug", "ekai/seventeen-inch/1.0.0/models/app-debug", "ekai/seventeen-inch/1.0.0/views/header-debug", "jquery-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug", "iscroll-debug", "ekai/seventeen-inch/1.0.0/views/app-debug", "ekai/seventeen-inch/1.0.0/views/footer-debug", "ekai/seventeen-inch/1.0.0/views/nav-debug", "ekai/seventeen-inch/1.0.0/views/nav-item-debug", "ekai/seventeen-inch/1.0.0/views/footer-apps-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = Backbone.$;
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var HomeView = require("ekai/seventeen-inch/1.0.0/views/home-debug");
    var homeView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "main",
            ":page": "main"
        },
        main: function(page) {
            page = page || "home";
            if (!homeView) {
                this.initPage();
            }
            if (page === "home") {
                homeView.trigger("backToHome");
            } else {
                homeView.trigger("displayApp", {
                    app: page
                });
            }
        },
        initPage: function() {
            homeView = new HomeView();
            $("body").prepend(homeView.render().el);
            this.listenTo(homeView, "backToHome", this.changeHash);
            this.listenTo(homeView, "displayApp", this.changeHash);
        },
        changeHash: function(options) {
            if (options && options.navigate) {
                options.hash = options.hash || "home";
                this.navigate(options.hash, {
                    trigger: false
                });
            }
        }
    });
});

/**
 * @Description: the index router for home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/home-debug", [ "backbone-debug", "underscore-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/data/home-info-debug.json", "ekai/seventeen-inch/1.0.0/data/apps-debug.json", "ekai/seventeen-inch/1.0.0/collections/app-debug", "ekai/seventeen-inch/1.0.0/models/app-debug", "ekai/seventeen-inch/1.0.0/views/header-debug", "jquery-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug", "iscroll-debug", "ekai/seventeen-inch/1.0.0/views/app-debug", "ekai/seventeen-inch/1.0.0/views/footer-debug", "ekai/seventeen-inch/1.0.0/views/nav-debug", "ekai/seventeen-inch/1.0.0/views/nav-item-debug", "ekai/seventeen-inch/1.0.0/views/footer-apps-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var storageKeys = require("ekai/seventeen-inch/1.0.0/settings-debug.json").STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        homeInfo = require("ekai/seventeen-inch/1.0.0/data/home-info-debug.json");
        store.set(storageKeys.home_info, homeInfo);
    }
    var apps = store.get(storageKeys.apps);
    if (!apps) {
        apps = require("ekai/seventeen-inch/1.0.0/data/apps-debug.json");
    }
    var AppCollection = require("ekai/seventeen-inch/1.0.0/collections/app-debug");
    var appCollection = new AppCollection(apps);
    store.set(storageKeys.apps, appCollection.toJSON());
    var HomeTemplate = require("ekai/seventeen-inch/1.0.0/templates/home-debug.tpl");
    var HeaderView = require("ekai/seventeen-inch/1.0.0/views/header-debug");
    var AppView = require("ekai/seventeen-inch/1.0.0/views/app-debug");
    var FooterView = require("ekai/seventeen-inch/1.0.0/views/footer-debug");
    module.exports = Backbone.View.extend({
        id: "home-container",
        className: "no-app",
        template: _.template(HomeTemplate),
        events: {
            "swipeup #header-container": "swipeUpEvent",
            "swipedown #header-container": "swipeDownEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var self = this;
            this.atHomePage = true;
            this.headerView = new HeaderView();
            this.appView = new AppView({
                appCollection: appCollection
            });
            this.footerView = new FooterView({
                appManager: this.appView.appManager,
                appCollection: appCollection
            });
            this.on("backToHome", this.backToHome);
            this.on("displayApp", this.displayApp);
            this.listenTo(appCollection, "updateHomeApps", this.updateStoreApps);
            Backbone.$(document).on("openApp", function(event, app) {
                if (!appCollection.findWhere({
                    name: app
                })) {
                    return console.error("App: " + app + " has not been installed.");
                }
                self.trigger("displayApp", {
                    app: app,
                    navigate: true,
                    hash: app
                });
            });
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template({}));
            this.$el.append(this.headerView.render().el);
            this.$el.append(this.appView.render().el);
            this.$el.append(this.footerView.render().el);
            this.footerView.navView.activeItem("home");
            return this;
        },
        backToHome: function(options) {
            var self = this;
            if (this.atHomePage) return;
            var currentApp = this.appView.currentApp;
            var leftAppName = this.footerView.appsView.leftAppName;
            var rightAppName = this.footerView.appsView.rightAppName;
            var mode;
            var callback = function() {
                self.headerView.trigger("changeMode", {
                    mode: "big"
                });
                self.footerView.navView.activeItem("home");
                self.$el.addClass("no-app");
                self.atHomePage = true;
                if (currentApp === rightAppName || currentApp === leftAppName) {
                    mode = currentApp === leftAppName ? "left" : "right";
                    self.footerView.appsView.trigger("resetApp", mode);
                }
            };
            if (options && options.from && options.from == "swipe-down") {
                // swipe down
                this.showHomeAnimation(callback, {
                    ease: "easeInQuint"
                });
            } else {
                // click home
                this.showHomeAnimation(callback, {
                    ease: "easeInBack"
                });
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
                    self.headerView.trigger("changeMode", {
                        mode: "small"
                    });
                    self.headerView.$el.hide().fadeIn(200);
                }
                self.footerView.navView.activeItem(app);
                self.appView.trigger("switchApp", app);
                self.$el.removeClass("no-app");
                self.atHomePage = false;
            };
            var showApp = function(cb) {
                cb = cb || callback;
                if (self.atHomePage) {
                    self.showAppAnimation(cb);
                } else {
                    self.switchAppAnimation(cb, app);
                }
            };
            if (app === leftAppName || app === rightAppName) {
                mode = app === leftAppName ? "left" : "right";
                this.footerView.appsView.trigger("switchApp", mode, showApp);
            } else {
                mode = currentApp === leftAppName ? "left" : "right";
                if (currentApp === rightAppName || currentApp === leftAppName) {
                    showApp(function() {
                        callback.apply(this, arguments);
                        self.footerView.appsView.trigger("resetApp", mode);
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
            this.trigger("backToHome", {
                navigate: true,
                hash: "home",
                from: "swipe-down"
            });
        },
        swipeUpEvent: function() {
            if (!this.atHomePage || this.swippingUp) {
                return;
            }
            var currentApp = this.appView.currentApp;
            if (currentApp) {
                this.trigger("displayApp", {
                    app: currentApp,
                    navigate: true,
                    hash: currentApp
                });
            } else {
                var self = this;
                var el = this.headerView.$el;
                this.swippingUp = true;
                el.animate({
                    top: "-20%"
                }, "normal", "easeOutCirc", function() {
                    el.animate({
                        top: "0"
                    }, "normal", "easeOutBounce", function() {
                        self.swippingUp = false;
                    });
                });
            }
        },
        showAppAnimation: function(callback) {
            var el = this.headerView.$el;
            el.animate({
                top: "-100%",
                opacity: 0
            }, 350, "easeInQuint", function() {
                callback({
                    resetHeader: true
                });
                el.css({
                    top: "0",
                    opacity: 1
                });
            });
        },
        switchAppAnimation: function(callback, app) {
            var activeIndex = this.footerView.navView.$el.find("li.active").index();
            var appIndex = this.footerView.navView.$el.find("li[data-name='" + app + "']").index();
            var self = this;
            var el = this.appView.getCurrentAppEl();
            if (parseInt(appIndex) > parseInt(activeIndex)) {
                el.animate({
                    right: "100%"
                }, 200, "easeInQuint", function() {
                    el.css("right", "0");
                    callback();
                });
            } else {
                el.animate({
                    left: "100%"
                }, 200, "easeInQuint", function() {
                    el.css("left", "0");
                    callback();
                });
            }
        },
        showHomeAnimation: function(callback, options) {
            var ease = options ? options.ease : "easeInBack";
            var self = this;
            var el = this.appView.$el;
            if (!this.isSetAppHeight) {
                var selfHeight = el.height();
                el.css("height", selfHeight + "px");
                el.css("bottom", "auto");
                this.isSetAppHeight = true;
            }
            el.animate({
                opacity: 0,
                marginTop: "100%"
            }, 350, ease, function() {
                el.css({
                    "margin-top": "0",
                    opacity: 1
                });
                callback();
            });
        },
        updateStoreApps: function() {
            store.set(storageKeys.apps, appCollection.toJSON());
        }
    });
});

define("ekai/seventeen-inch/1.0.0/settings-debug.json", [], {
    API_URL: "http://www.topivi.com:3001/api",
    APP_KEY: "d7c7ce69d618446d6a84081d62682018",
    STORAGE_KEYS: {
        apps: "home_apps",
        home_info: "home_info",
        today_weather: "home_today_weather",
        all_weather: "home_all_weather",
        today_oil: "home_today_city_oil"
    },
    SOCKET_HOST: "localhost"
});

define("ekai/seventeen-inch/1.0.0/data/home-info-debug.json", [], {
    header: {},
    footer: {
        "nav-item-count": 9,
        "left-app": "acn",
        "right-app": "player"
    },
    location: "上海市",
    short_location: "上海",
    weather: {
        "default": {
            iconPath: "img/dialog-apps/weather/brighter-icon/cloud.png",
            temperature: {
                from: 23,
                to: 28
            },
            status: "多云转晴"
        }
    }
});

define("ekai/seventeen-inch/1.0.0/data/apps-debug.json", [], [ {
    _id: 1,
    name: "home",
    order: 1,
    life_cycle: "*"
}, {
    _id: 2,
    name: "navi",
    order: 2,
    life_cycle: "*"
}, {
    _id: 3,
    name: "phone",
    order: 3
}, {
    _id: 4,
    name: "acn",
    order: 4,
    life_cycle: "*"
}, {
    _id: 5,
    name: "player",
    order: 5,
    life_cycle: "*"
}, {
    _id: 6,
    name: "app-store",
    order: 6,
    life_cycle: "*"
}, {
    _id: 7,
    name: "QTFM",
    order: 7,
    life_cycle: "*"
} ]);

/**
 * @Description: a collection to describe app used in home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/collections/app-debug", [ "backbone-debug", "ekai/seventeen-inch/1.0.0/models/app-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var AppModel = require("ekai/seventeen-inch/1.0.0/models/app-debug");
    module.exports = Backbone.Collection.extend({
        model: AppModel,
        comparator: "order",
        initialize: function() {},
        getInNavLength: function() {
            var count = 0;
            for (var i = 0; i < this.length; i++) {
                if (this.at(i).get("in_nav")) count++;
            }
            return count;
        }
    });
});

/**
 * @Description: a model to describe app used in home.
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/models/app-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    module.exports = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            in_nav: true,
            is_native: false,
            is_cache: false,
            // it means if keeping the app in dom.
            mode: "normal",
            // 'normal' means that app is shown in middle area, widget means that app is shown in widget area, such as dialog.
            life_cycle: 10 * 1e3
        },
        initialize: function() {
            var name = this.get("name");
            var iconPath = name === "home" ? "img/nav-apps/home_normal.png" : "apps/" + name + "/icon.png";
            this.set("icon_path", iconPath);
        }
    });
});

define("ekai/seventeen-inch/1.0.0/templates/home-debug.tpl", [], "<div id='home-mask'></div>\n<div id='home-mask-darker'></div>");

/**
 * @Description: header v3.
 * @Author: fuwensong
 * @Date: 14-9-26
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/header-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug", "iscroll-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Settings = require("ekai/seventeen-inch/1.0.0/settings-debug.json");
    var storageKeys = Settings.STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    var BigTemplate = require("ekai/seventeen-inch/1.0.0/templates/header-big-debug.tpl");
    var SmallTemplate = require("ekai/seventeen-inch/1.0.0/templates/header-small-debug.tpl");
    var WheelPressApp = require("ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug");
    var WeatherApp = require("ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug");
    var OilApp = require("ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug");
    var vrTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/index-debug.tpl");
    var wheelPressApp, wheelPressDialog, weatherApp, weatherDialog, oilApp, oilDialog, voiceDialog;
    var objConnect = {
        appid: "siriAppID",
        type: "4",
        test: "siri"
    };
    voiceDialog = new topivi.dialog.normal("", {
        content: _.template(vrTemplate),
        //        useMask: true,
        closeGesture: "swiperight clickmask"
    });
    var onMessage = require("ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug");
    var topiviSocket = new topivi.socket("ws://" + Settings.SOCKET_HOST + ":2001", "dumb-increment-protocol", onMessage.fn);
    var linkSockert = new topivi.socket("ws://" + Settings.SOCKET_HOST + ":2002", "dumb-increment-protocol");
    var vrStatus = false;
    onMessage.init({
        dialog: voiceDialog,
        socket: topiviSocket,
        status: vrStatus
    });
    topiviSocket.int();
    linkSockert.int();
    setTimeout(function() {
        linkSockert.send(JSON.stringify(objConnect));
    }, 2e3);
    module.exports = Backbone.View.extend({
        id: "header-container",
        bigTemplate: _.template(BigTemplate),
        smallTemplate: _.template(SmallTemplate),
        events: {
            "tap .voice-btn": "voiceBtnClickEvent",
            "tap .big-info .weather": "weatherClickEvent",
            "tap .big-info .maintain": "maintainClickEvent",
            "tap .big-info .drive": "driveClickEvent",
            //            'tap .small-info .press': 'wheelPressClickEvent',
            "tap .alarms .icon": "alarmIconClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var self = this;
            this.mode = "big";
            this.on("changeMode", this.changeMode);
            $(document).on("updateHomeWeather", function() {
                self.updateHomeWeather();
            });
            $(document).on("showOilDialog", function() {
                self.showOilDialog();
            });
            $(document).on("getLocationWeather", function(e, location, callback) {
                self.weatherClickEvent(e, location, callback);
            });
        },
        render: function() {
            this.$el.empty();
            if (this.mode === "big") {
                this.$el.html(this.bigTemplate({
                    weather: getHeaderWeather()
                }));
            } else {
                this.$el.html(this.smallTemplate());
            }
            this.clockRunnable();
            this.safeDistanceRunnable();
            return this;
        },
        changeMode: function(options) {
            options = options || {};
            this.mode = options.mode;
            this.render();
        },
        voiceBtnClickEvent: function() {
            if (onMessage.status()) {
                objConnect.type = "1";
                topiviSocket.send(JSON.stringify(objConnect));
                voiceDialog.open();
                vrStatus = true;
                onMessage.init({
                    status: vrStatus
                });
            }
        },
        weatherClickEvent: function(e, location, callback) {
            if (!weatherDialog) {
                weatherDialog = new topivi.dialog.normal("", {
                    useMask: true,
                    closeGesture: "swiperight clickmask"
                });
                weatherDialog.el.addClass("home-weather");
            }
            if (!weatherApp) {
                weatherApp = new WeatherApp({
                    $parent: weatherDialog.el
                });
            }
            if (location) {
                weatherApp.fetchData(function() {
                    weatherApp.renderWeather();
                    callback(weatherApp.collection.toJSON());
                }, {
                    location: location,
                    doNotStore: true
                });
                weatherDialog.setContent(weatherApp.el);
            } else {
                weatherDialog.setContent(weatherApp.render().el);
            }
            weatherDialog.open();
        },
        maintainClickEvent: function() {
            $(document).trigger("openApp", "Maintenance");
        },
        driveClickEvent: function() {
            $(document).trigger("openApp", "Driving Habits Analysis");
        },
        showOilDialog: function() {
            if (!oilDialog) {
                oilDialog = new topivi.dialog.normal("", {
                    useMask: true,
                    closeGesture: "swiperight clickmask"
                });
                oilDialog.el.addClass("home-oil");
            }
            if (!oilApp) {
                oilApp = new OilApp({
                    $parent: oilDialog.el
                });
            }
            oilDialog.setContent(oilApp.render().el);
            oilDialog.open();
        },
        wheelPressClickEvent: function() {
            if (!wheelPressApp) {
                wheelPressApp = new WheelPressApp();
            }
            if (!wheelPressDialog) {
                wheelPressDialog = new topivi.dialog.normal("", {
                    useMask: true,
                    closeGesture: "swiperight clickmask",
                    content: wheelPressApp.render().el
                });
            }
            wheelPressDialog.open();
        },
        alarmIconClickEvent: function(e) {
            var el = $(e.currentTarget);
            if (el.hasClass("active")) {
                return;
            }
            el.addClass("active");
            var content = "";
            if (el.hasClass("front-fog")) {
                content = "前雾灯";
            } else if (el.hasClass("stop")) {
                content = "手刹";
            } else if (el.hasClass("big-light")) {
                content = "远光灯";
            } else if (el.hasClass("key")) {
                content = "钥匙门";
            } else if (el.hasClass("abs")) {
                content = "防抱死";
            } else if (el.hasClass("back-fog")) {
                content = "后雾灯";
            }
            var tips = new topivi.tips.normal("", {
                removeAfterHide: true,
                dependEl: el,
                content: content,
                direction: "top",
                autoHide: true,
                beforeHide: function() {
                    el.removeClass("active");
                }
            });
            tips.el.addClass("alarm-tips");
            tips.show();
        },
        clockRunnable: function() {
            var self = this;
            var runnable = function() {
                var el = self.$el.find(".header-clock");
                var date = new Date();
                var hourTen;
                var hourBit;
                var minTen;
                var minBit;
                var hours = date.getHours();
                hours = hours < 0 ? 24 + hours : hours;
                var mins = date.getMinutes();
                if (hours >= 10) {
                    hourTen = parseInt(hours / 10);
                    hourBit = hours % 10;
                } else {
                    hourTen = 0;
                    hourBit = hours;
                }
                if (mins >= 10) {
                    minTen = parseInt(mins / 10);
                    minBit = mins % 10;
                } else {
                    minTen = 0;
                    minBit = mins;
                }
                el.find(".dot").toggleClass("invisible");
                el.find(".hour-ten").attr("class", "hour-ten number" + hourTen);
                el.find(".hour-bit").attr("class", "hour-bit number" + hourBit);
                el.find(".min-ten").attr("class", "min-ten number" + minTen);
                el.find(".min-bit").attr("class", "min-bit number" + minBit);
            };
            runnable();
            if (!this.clockInteval) {
                this.clockInteval = setInterval(runnable, 1e3);
            }
        },
        safeDistanceRunnable: function() {
            var mode = this.mode;
            var el = this.$el.find(".header-safe-distance");
            var timeout = 900;
            var runnableBottom = function() {
                if (mode === "big") {
                    el.find(".bottom").addClass("brighter");
                    setTimeout(runnableMiddle, timeout);
                }
            };
            var runnableMiddle = function() {
                if (mode === "big") {
                    el.find(".middle").addClass("brighter");
                    setTimeout(runnableTop, timeout);
                }
            };
            var runnableTop = function() {
                if (mode === "big") {
                    el.find(".top").addClass("brighter");
                    setTimeout(runnableReset, timeout);
                }
            };
            var runnableReset = function() {
                if (mode === "big") {
                    el.find(".bottom, .middle, .top").removeClass("brighter");
                    setTimeout(runnableBottom, timeout);
                }
            };
            if (mode === "big") {
                setTimeout(runnableBottom, timeout);
            }
        },
        updateHomeWeather: function() {
            if (this.mode === "big") {
                var weather = getHeaderWeather();
                var weatherEl = this.$el.find(".weather");
                weatherEl.find(".icon").attr({
                    src: weather.iconPath
                });
                weatherEl.find(".temperature .value").text(weather.temperature.from);
                weatherEl.find(".status").text(weather.status);
            }
        }
    });
    var getHeaderWeather = function() {
        var todayWeather = store.get(storageKeys.today_weather);
        if (!todayWeather) {
            return homeInfo["weather"]["default"];
        }
        return todayWeather;
    };
});

define("ekai/seventeen-inch/1.0.0/templates/header-big-debug.tpl", [], '<div class="top-veins"><p>上海億凯信息技术有限公司</p></div>\n<div class="voice-btn"></div>\n<div class="header-clock">\n    <div class="hour-ten"></div>\n    <div class="hour-bit"></div>\n    <div class="dot"></div>\n    <div class="min-ten"></div>\n    <div class="min-bit"></div>\n</div>\n<div class="header-safe-distance">\n    <div class="top left-top"></div>\n    <div class="middle left-middle"></div>\n    <div class="bottom left-bottom"></div>\n\n    <div class="top center-top"></div>\n    <div class="middle center-middle"></div>\n    <div class="bottom center-bottom"></div>\n\n    <div class="top right-top"></div>\n    <div class="middle right-middle"></div>\n    <div class="bottom right-bottom"></div>\n</div>\n<div class="car-container">\n    <div class="car"></div>\n</div>\n<div class="wheel-press"></div>\n<div class="big-info">\n    <div class="maintain">\n        <div class="thousand number6"></div>\n        <div class="hundred number5"></div>\n        <div class="ten number3"></div>\n        <div class="bit number7"></div>\n        <div class="dot"></div>\n        <div class="decimal number5"></div>\n    </div>\n    <div class="drive">\n        <div class="ten-thousand number2"></div>\n        <div class="thousand number3"></div>\n        <div class="hundred number5"></div>\n        <div class="ten number7"></div>\n        <div class="bit number2"></div>\n        <div class="dot"></div>\n        <div class="decimal number5"></div>\n    </div>\n    <div class="weather">\n        <img class="icon" src="{{=weather.iconPath}}"/>\n        <div class="data">\n            <p class="temperature"><span class="value">{{=weather.temperature.from}}</span><span class="unit">℃</span></p>\n            <p class="status">{{=weather.status}}</p>\n        </div>\n    </div>\n</div>\n<div class="alarms">\n    <div class="left">\n        <div class="icon front-fog"></div>\n        <div class="icon stop"></div>\n        <div class="icon big-light"></div>\n    </div>\n    <div class="right">\n        <div class="icon key"></div>\n        <div class="icon abs"></div>\n        <div class="icon back-fog"></div>\n    </div>\n</div>');

define("ekai/seventeen-inch/1.0.0/templates/header-small-debug.tpl", [], '<div class="bg">\n    <div class="top-veins"><p>上海億凯信息技术有限公司</p></div>\n    <div class="voice-btn"></div>\n    <div class="header-clock">\n        <div class="hour-ten"></div>\n        <div class="hour-bit"></div>\n        <div class="dot"></div>\n        <div class="min-ten"></div>\n        <div class="min-bit"></div>\n    </div>\n    <div class="small-info">\n        <div class="tips"></div>\n        <div class="press">\n            <div class="wheel"></div>\n        </div>\n    </div>\n</div>');

/**
 * @Description: wheel press index view.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/wheel-press/index-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/seventeen-inch/1.0.0/views/apps/wheel-press/templates/index-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "dialog-apps wheel-press",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            this.$el.empty();
            this.$el.html(this.template({
                frontLeft: 240,
                frontRight: 240,
                backLeft: 180,
                backRight: 240
            }));
            return this;
        }
    });
});

define("ekai/seventeen-inch/1.0.0/views/apps/wheel-press/templates/index-debug.tpl", [], '<div id="front-left-wheel" class="tip front left">\n    <div class="data"><span class="value">{{=frontLeft}}</span><span class="unit">Kpa</span></div>\n    <div class="line"></div>\n</div>\n<div id="front-right-wheel" class="tip front right">\n    <div class="data"><span class="value">{{=frontRight}}</span><span class="unit">Kpa</span></div>\n    <div class="line"></div>\n</div>\n<div id="back-left-wheel" class="tip back left">\n    <div class="data"><span class="value">{{=backLeft}}</span><span class="unit">Kpa</span></div>\n    <div class="line"></div>\n</div>\n<div id="back-right-wheel" class="tip back right">\n    <div class="data"><span class="value">{{=backRight}}</span><span class="unit">Kpa</span></div>\n    <div class="line"></div>\n</div>');

/**
 * @Description: Weather index view.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/weather/index-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var store = require("store-debug");
    var storageKeys = require("ekai/seventeen-inch/1.0.0/settings-debug.json").STORAGE_KEYS;
    var WeatherCollection = require("ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug");
    var ItemView = require("ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug");
    var LoadingTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/weather/templates/loading-debug.tpl");
    var defaultLocation = store.get(storageKeys.home_info).location;
    module.exports = Backbone.View.extend({
        tagName: "ul",
        className: "dialog-apps weather",
        events: {
            "tap .item": "itemClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.current = 0;
            this.$parent = options.$parent;
            this.collection = new WeatherCollection();
        },
        render: function() {
            var storedWeather = store.get(storageKeys.all_weather);
            if (!storedWeather) {
                this.createLoadingWidget();
                this.fetchData(this.renderWeather);
            } else {
                if (!isWeatherNew()) {
                    this.createLoadingWidget();
                    this.fetchData(this.renderWeather);
                } else {
                    this.collection.reset(storedWeather);
                    this.renderWeather();
                }
            }
            return this;
        },
        fetchData: function(callback, options) {
            var self = this;
            options = options || {};
            var location = options.location || defaultLocation;
            var doNotStore = options.doNotStore;
            this.collection.fetch({
                timeout: 5e3,
                data: {
                    location: location
                },
                success: function(collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === "ok") {
                        if (collection.length > 0) {
                            if (!doNotStore) {
                                store.set(storageKeys.today_weather, collection.at(0).toJSON());
                            }
                            // update home weather
                            Backbone.$(document).trigger("updateHomeWeather");
                        }
                        store.set(storageKeys.all_weather, collection.toJSON());
                        callback.apply(self, arguments);
                    } else {
                        self.createErrorDialog(res.msg);
                    }
                },
                error: function(collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorDialog();
                }
            });
        },
        createLoadingWidget: function() {
            this.loadingWidget = new topivi.loading.normal("", {
                $parent: this.$parent,
                noticeContent: LoadingTemplate,
                iconDirection: "center",
                removeAfterHide: true,
                autoShow: true
            });
        },
        hideLoadingWidget: function() {
            if (this.loadingWidget) {
                if (!this.loadingWidget.shown) {
                    this.loadingWidget.shown = true;
                }
                this.loadingWidget.hide();
            }
        },
        createErrorDialog: function(msg) {
            var self = this;
            msg = msg || "获取天气数据失败，请稍后再试...";
            setTimeout(function() {
                var tips = new topivi.tips.normal("", {
                    $parent: self.$el,
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: "auto"
                });
                tips.el.addClass("error-tips");
                tips.show();
            }, 300);
        },
        renderWeather: function() {
            var self = this;
            this.$el.empty();
            this.delegateEvents();
            this.collection.each(function(model, list) {
                var itemView = new ItemView({
                    model: model
                });
                self.$el.append(itemView.render().el);
            });
            this.$el.find("li.item:lt(" + this.current + ")").addClass("left");
            this.$el.find("li.item:eq(" + this.current + ")").addClass("active");
            this.$el.find("li.item:gt(" + this.current + ")").addClass("right");
        },
        itemClickEvent: function(e) {
            var el = Backbone.$(e.currentTarget);
            var index = el.index();
            if (el.hasClass("active") || index === this.current) {
                return;
            }
            this.current = index;
            this.renderWeather();
        }
    });
    var isWeatherNew = function() {
        var storedTodayWeather = store.get(storageKeys.today_weather);
        if (!storedTodayWeather) {
            console.error("No today weather.");
            return false;
        }
        var storedToday = topivi.util.stringToDate(storedTodayWeather.date);
        var today = new Date();
        return storedToday.getFullYear() === today.getFullYear() && storedToday.getMonth() === today.getMonth() && storedToday.getDate() === today.getDate();
    };
});

/**
 * @Description: Weather collection.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/weather/collections/weather-debug", [ "backbone-debug", "underscore-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", "store-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Model = require("ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug");
    var store = require("store-debug");
    var util = require("topivi-debug").util;
    var Settings = require("ekai/seventeen-inch/1.0.0/settings-debug.json");
    var days = [ "日", "一", "二", "三", "四", "五", "六" ];
    module.exports = Backbone.Collection.extend({
        model: Model,
        url: function(location) {
            return Settings.API_URL + "/weather/today?app_key=" + Settings.APP_KEY;
        },
        initialize: function() {},
        parse: function(res, options) {
            var results = [];
            if (res.status === "ok") {
                var date = util.stringToDate(res.date);
                var data = res.data;
                var city = data.currentCity;
                var weatherData = data.weather_data;
                var oneDayTimes = 24 * 60 * 60 * 1e3;
                for (var i = 0; i < weatherData.length; i++) {
                    var item = {};
                    item.date = new Date(date.getTime() + oneDayTimes * i);
                    item.day = days[item.date.getDay()];
                    item.date = util.dateToString(item.date);
                    item.status = weatherData[i].weather;
                    item.wind = weatherData[i].wind;
                    item.temperature = parseTemperature(weatherData[i].temperature);
                    item.city = city;
                    results.push(item);
                }
            }
            return results;
        }
    });
    var parseTemperature = function(temperature) {
        var strs = temperature.split(" ~ ");
        var from, to;
        if (strs.length !== 2) {
            from = to = parseInt(strs[0].substr(0, 2));
        } else {
            from = parseInt(strs[0]);
            to = parseInt(strs[1].substr(0, 2));
        }
        if (_.isNaN(from)) {
            console.error("Parse from temperature error.");
            from = 0;
        }
        if (_.isNaN(to)) {
            console.error("Parse to temperature error.");
            to = 0;
        }
        return {
            from: _.min([ from, to ]),
            to: _.max([ from, to ])
        };
    };
});

/**
 * @Description: Weather model.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/weather/models/weather-debug", [ "backbone-debug", "ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var statusMap = require("ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json").status_map;
    var basePath = "img/dialog-apps/weather/";
    module.exports = Backbone.Model.extend({
        idAttribute: "date",
        defaults: {},
        initialize: function() {
            var status = this.get("status");
            if (!statusMap[status]) {
                status = "多云";
                console.error("Unknown weather status.");
            }
            var iconName = statusMap[status]["icon"];
            this.set("iconPath", basePath + "brighter-icon/" + iconName + ".png");
            this.set("iconPathDarker", basePath + "darker-icon/" + iconName + ".png");
        }
    });
});

define("ekai/seventeen-inch/1.0.0/views/apps/weather/settings-debug.json", [], {
    status_map: {
        "晴": {
            icon: "sun"
        },
        "多云转晴": {
            icon: "sun"
        },
        "多云": {
            icon: "cloud"
        },
        "晴转多云": {
            icon: "cloud"
        },
        "阴转多云": {
            icon: "cloud"
        },
        "阴": {
            icon: "shade"
        },
        "多云转阴": {
            icon: "shade"
        },
        "小雨转阴": {
            icon: "shade"
        },
        "阵雨": {
            icon: "shower"
        },
        "雷阵雨": {
            icon: "thundershower"
        },
        "雷阵雨伴有冰雹": {
            icon: "thundershower"
        },
        "雨夹雪": {
            icon: "rain and snow"
        },
        "小雨": {
            icon: "light rain"
        },
        "阴转小雨": {
            icon: "light rain"
        },
        "中雨": {
            icon: "moderate rain"
        },
        "大雨": {
            icon: "heavy rain"
        },
        "暴雨": {
            icon: "hard rain"
        },
        "大暴雨": {
            icon: "downpour"
        },
        "特大暴雨": {
            icon: "torrential rain"
        },
        "阵雪": {
            icon: "snow shower"
        },
        "小雪": {
            icon: "light snow"
        },
        "中雪": {
            icon: "moderate snow"
        },
        "大雪": {
            icon: "heavy snow"
        },
        "暴雪": {
            icon: "snowstorm"
        },
        "雾": {
            icon: "fog"
        },
        "冻雨": {
            icon: "snow ice"
        },
        "沙尘暴": {
            icon: "sand"
        },
        "小雨转中雨": {
            icon: "moderate rain"
        },
        "中雨转大雨": {
            icon: "heavy rain"
        },
        "大雨转暴雨": {
            icon: "hard rain"
        },
        "暴雨转大暴雨": {
            icon: "downpour"
        },
        "大暴雨转特大暴雨": {
            icon: "torrential rain"
        },
        "小雪转中雪": {
            icon: "moderate snow"
        },
        "中雪转大雪": {
            icon: "heavy snow"
        },
        "大雪转暴雪": {
            icon: "snowstorm"
        },
        "浮尘": {
            icon: "sand"
        },
        "扬沙": {
            icon: "sand"
        },
        "强沙尘暴": {
            icon: "sand"
        },
        "霾": {
            icon: "fog"
        }
    }
});

/**
 * @Description: Weather item view.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/weather/weather-item-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/seventeen-inch/1.0.0/views/apps/weather/templates/weather-item-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "item",
        tagName: "li",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
});

define("ekai/seventeen-inch/1.0.0/views/apps/weather/templates/weather-item-debug.tpl", [], '<div class="small">\n    <div class="top-info">\n        <span class="month-date">{{=date.substring(5, date.length)}}</span>\n        <span class="day">{{=day}}</span>\n    </div>\n    <img class="weather-icon" src="{{=iconPathDarker}}"/>\n</div>\n<div class="big">\n    <div class="top-info">\n        <div class="left-part">\n            <span class="city-icon"></span>\n            <span class="city">{{=city}}</span>\n        </div>\n        <div class="right-part">\n            <span class="date">{{=date}}</span>\n            <span class="day">周{{=day}}</span>\n        </div>\n    </div>\n    <p class="status">{{=status}}</p>\n    <div class="temperature">\n        <span class="value">{{=temperature.from}}</span>\n        <span class="unit">℃</span>\n    </div>\n    <img class="weather-icon" src="{{=iconPath}}"/>\n    <p class="temperature-interval">\n        <span class="temperature-icon"></span>\n        {{\n            if (temperature.from === temperature.to) {\n        }}\n            <span class="from">{{=temperature.from}}</span>\n            <span class="unit">℃</span>\n        {{\n            } else {\n        }}\n            <span class="from">{{=temperature.from}}</span>\n            <span class="unit">℃</span>\n            <span class="delimiter">/</span>\n            <span class="to">{{=temperature.to}}</span>\n            <span class="unit">℃</span>\n        {{\n            }\n        }}\n    </p>\n</div>');

define("ekai/seventeen-inch/1.0.0/views/apps/weather/templates/loading-debug.tpl", [], '<div class="icon"></div>\n<div class="text">加载中</div>');

/**
 * @Description: City oil index view.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/oil/index-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json", "ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var store = require("store-debug");
    var storageKeys = require("ekai/seventeen-inch/1.0.0/settings-debug.json").STORAGE_KEYS;
    var CityOilCollection = require("ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug");
    var TodayOilModel = require("ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug");
    var LoadingTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/loading-debug.tpl");
    var CityOilTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/city-oil-debug.tpl");
    var OilTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/oil-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "dialog-apps oil",
        template: _.template(CityOilTemplate),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.current = 0;
            this.$parent = options.$parent;
            this.model = new TodayOilModel();
        },
        render: function() {
            var storedTodayOil = store.get(storageKeys.today_oil);
            if (!storedTodayOil) {
                this.createLoadingWidget();
                this.fetchData(this.renderOil);
            } else {
                if (!isOilNew()) {
                    this.createLoadingWidget();
                    this.fetchData(this.renderOil);
                } else {
                    this.model.set(storedTodayOil);
                    this.renderOil();
                }
            }
            return this;
        },
        fetchData: function(callback) {
            var self = this;
            this.model.fetch({
                timeout: 5e3,
                success: function(model, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === "ok") {
                        store.set(storageKeys.today_oil, model.toJSON());
                        callback.apply(self, arguments);
                    } else {
                        self.createErrorTips(res.msg);
                    }
                },
                error: function(collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorTips();
                }
            });
        },
        createLoadingWidget: function() {
            this.loadingWidget = new topivi.loading.normal("", {
                $parent: this.$parent,
                noticeContent: LoadingTemplate,
                iconDirection: "center",
                removeAfterHide: true,
                autoShow: true
            });
        },
        hideLoadingWidget: function() {
            if (this.loadingWidget) {
                if (!this.loadingWidget.shown) {
                    this.loadingWidget.shown = true;
                }
                this.loadingWidget.hide();
            }
        },
        createErrorTips: function(msg) {
            var self = this;
            msg = msg || "获取油价数据失败，请稍后再试...";
            setTimeout(function() {
                var tips = new topivi.tips.normal("", {
                    $parent: self.$el,
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: "auto"
                });
                tips.el.addClass("error-tips");
                tips.show();
            }, 300);
        },
        renderOil: function() {
            var self = this;
            this.$el.empty();
            var cityOilCollection = new CityOilCollection(this.model.get("cities"));
            var currentCity = cityOilCollection.getCurrentCityData();
            this.$el.html(this.template({
                date: this.model.get("date")
            }));
            var items = [ {
                key: "90",
                value: currentCity.get("b90") + "",
                name: "汽油"
            }, {
                key: "93",
                value: currentCity.get("b93") + "",
                name: "汽油"
            }, {
                key: "97",
                value: currentCity.get("b97") + "",
                name: "汽油"
            }, {
                key: "0",
                value: currentCity.get("b0") + "",
                name: "柴油"
            } ];
            "".split();
            for (var i = 0; i < items.length; i++) {
                this.$el.find(".main").append(_.template(OilTemplate)(items[i]));
            }
        }
    });
    var isOilNew = function() {
        var storedTodayOil = store.get(storageKeys.today_oil);
        if (!storedTodayOil) {
            console.error("No today oil data.");
            return false;
        }
        var storedToday = topivi.util.stringToDate(storedTodayOil.date);
        var today = new Date();
        return storedToday.getFullYear() === today.getFullYear() && storedToday.getMonth() === today.getMonth() && storedToday.getDate() === today.getDate();
    };
});

/**
 * @Description: City oil collection.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/oil/collections/city-oil-debug", [ "backbone-debug", "underscore-debug", "ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Model = require("ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug");
    var store = require("store-debug");
    var Settings = require("ekai/seventeen-inch/1.0.0/settings-debug.json");
    var storageKeys = Settings.STORAGE_KEYS;
    var location = store.get(storageKeys.home_info).short_location;
    module.exports = Backbone.Collection.extend({
        model: Model,
        initialize: function() {},
        getCurrentCityData: function() {
            return this.find(function(model) {
                return model.get("city").indexOf(location) >= 0;
            });
        }
    });
});

/**
 * @Description: City oil model.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/oil/models/city-oil-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    module.exports = Backbone.Model.extend({
        idAttribute: "_id",
        initialize: function() {}
    });
});

/**
 * @Description: City oil model.
 * @Author: fuwensong
 * @Date: 14-10-9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/apps/oil/models/today-oil-debug", [ "backbone-debug", "store-debug", "topivi-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var store = require("store-debug");
    var util = require("topivi-debug").util;
    var Settings = require("ekai/seventeen-inch/1.0.0/settings-debug.json");
    var storageKeys = Settings.STORAGE_KEYS;
    var location = store.get(storageKeys.home_info).short_location;
    module.exports = Backbone.Model.extend({
        idAttribute: "_id",
        url: function() {
            return Settings.API_URL + "/oil-city/today?app_key=" + Settings.APP_KEY;
        },
        initialize: function() {},
        parse: function(res, options) {
            var results = {};
            if (res.status === "ok") {
                results = {
                    date: util.dateToString(util.stringToDate(res.date), "-"),
                    cities: res.cities
                };
            }
            return results;
        }
    });
});

define("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/loading-debug.tpl", [], '<div class="icon"></div>\n<div class="text">加载中</div>');

define("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/city-oil-debug.tpl", [], '<div class="wrapper">\n    <div class="header">\n        <h1 class="title">油价<span class="unit">（元/升）</span></h1>\n        <span class="date">{{=date}}</span>\n    </div>\n    <div class="main">\n    </div>\n    <div class="cb"></div>\n    <p class="desc">*实际价格请以当地加油站的报价为准</p>\n</div>');

define("ekai/seventeen-inch/1.0.0/views/apps/oil/templates/oil-debug.tpl", [], '<div class="item">\n    <div class="label">\n        <h2 class="flag">{{=key}}<span class="jinhao">#</span></h2>\n        <p class="name">{{=name}}</p>\n    </div>\n    {{\n        var parts = value.split(\'.\');\n        if (parts.length !== 2) {\n            parts = [\'00\', \'00\'];\n        }\n        var ten, bit, ten_, bit_;\n        if (parts[0].length === 2) {\n            ten = parts[0].substr(0, 1);\n            bit = parts[0].substr(1, 1);\n        } else {\n            ten = 0;\n            bit = parts[0];\n        }\n        if (parts[1].length === 2) {\n            bit_ = parts[1].substr(0, 1);\n            ten_ = parts[1].substr(1, 1);\n        } else {\n            ten_ = 0;\n            bit_ = parts[1];\n        }\n    }}\n    <div class="value">\n        <div class="number" data-value="{{=parseInt(ten) > 0 ? ten : \'none\'}}"></div>\n        <div class="number" data-value="{{=bit}}"></div>\n        <div class="dot"></div>\n        <div class="number" data-value="{{=bit_}}"></div>\n        <div class="number" data-value="{{=ten_}}"></div>\n    </div>\n</div>');

define("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/index-debug.tpl", [], '\n<div class="VR">\n    <div class="title">倾听您的指令</div>\n    <div class="content"></div>\n    <div class="bg-bottom">\n        <div class="VR-animation1"></div>\n        <div class="VR-animation2"></div>\n        <div class="machine-words"></div>\n    </div>\n</div>\n');

/**
 * Created by caiyidi on 14/10/08.
 */
define("ekai/seventeen-inch/1.0.0/views/apps/VR/callback-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "iscroll-debug", "store-debug", "topivi-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var iscroll = require("iscroll-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var commandTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/command-debug.tpl");
    var answerTemplate = require("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/answer-debug.tpl");
    var temp, responseType, onsTimer, findMusic;
    var dialog = null;
    var topiviSocket = null;
    var status = null;
    var songs = null;
    var weatherData = null;
    var Json = {
        appid: "siriAppID",
        type: "3",
        test: ""
    };
    exports.init = function(options) {
        options = options || {};
        if (options.dialog) {
            dialog = options.dialog;
        }
        if (options.socket) {
            topiviSocket = options.socket;
        }
        if (options.status != undefined && options.status != null) {
            status = options.status;
        }
    };
    exports.status = function() {
        return status == false;
    };
    exports.fn = function(e) {
        console.log(e.data);
        var result = eval("(" + e.data + ")");
        if (result.speaker == "machine" && result.speakContentExist == "yes") {
            $(".VR-animation1").addClass("select").show();
            if (Json.test == "") {
                $(".machine-words").text(result.speakContent).show();
            } else {
                $(".machine-words").text(Json.test).show();
                Json.test = "";
            }
        }
        if (result.speaker == "machine" && result.commandExist == "yes") {
            temp = _.template(commandTemplate);
            $(".VR .content").html(temp(result));
        }
        if (result.speaker == "record") {
            $(".VR-animation2").show();
            $(".VR-animation1").hide();
            $(".machine-words").hide();
        }
        if (result.speaker == "iat") {
            responseType = "";
            $(".VR-animation2").hide();
            $(".VR-animation1").removeClass(".select");
        }
        switch (result.opetype) {
          case "1":
            if (result.setappid == "5MA6VxmSYR.MediaP") {
                $(document).trigger("openApp", "player");
                $(document).trigger("getPlayerSongList", function(list) {
                    songs = {
                        command: _.pluck(list, "title")
                    };
                });
                temp = _.template(commandTemplate);
                $(".VR .content").empty().html(temp(songs));
            } else if (result.setappid == "pyQvMFdkMd.navi") {
                $(document).trigger("openApp", "navi");
            }
            break;

          case "3":
            responseType = "music";
            if (result.settype == 131073) {
                findMusic = _.find(songs.command, function(name) {
                    return $.trim(name) == $.trim(result.setinfoText);
                });
                if (findMusic) {
                    // play music
                    $(document).trigger("playSong", findMusic);
                } else {
                    Json.test = '未找到"' + result.setinfoText + '"，将为您随机播放';
                    topiviSocket.send(JSON.stringify(Json));
                    $(document).trigger("randomPlaySong");
                }
            } else if (result.settype == 131074) {
                switch (result.setinfoText) {
                  case "播放":
                    console.log("播放");
                    break;

                  case "暂停":
                    console.log("暂停");
                    break;

                  case "上一首":
                    console.log("上一首");
                    break;

                  case "下一首":
                    console.log("下一首");
                    break;

                  default:
                    break;
                }
            }
            break;

          case "7":
            status = false;
            switch (responseType) {
              case "":
                onsTimer = 1e3;
                break;

              case "music":
                onsTimer = 3e3;
                break;

              case "answer":
                onsTimer = false;
                break;

              case "query":
                onsTimer = false;
                break;

              case "weather":
                onsTimer = 100;
                break;

              case "oil":
                onsTimer = 1e3;
                break;

              default:
                break;
            }
            if (onsTimer) {
                setTimeout(function() {
                    dialog.close();
                }, onsTimer);
            }
            break;

          default:
            break;
        }
        if (result.rc != undefined && result.rc != null) {
            if (result.rc <= 3) {
                switch (result.operation) {
                  case "ANSWER":
                    responseType = "answer";
                    temp = _.template(answerTemplate);
                    $(".VR .content").empty().html(temp(result));
                    setTimeout(function() {
                        new iscroll(".VR .content .command-list");
                    }, 100);
                    Json.test = result.answer.text;
                    topiviSocket.send(JSON.stringify(Json));
                    Json.test = "";
                    break;

                  case "QUERY":
                    responseType = "query";
                    if (result.service == "weather") {
                        responseType = "weather";
                        var queryCity = result.semantic.slots.location.city;
                        if (queryCity == "CURRENT_CITY") {
                            queryCity = "上海";
                        }
                        $(document).trigger("getLocationWeather", [ queryCity, function(data) {
                            weatherData = data;
                            Json.test = "今天" + weatherData[0].date + "," + "星期" + weatherData[0].day + "," + weatherData[0].status + "," + weatherData[0].wind + "," + "最高温度" + weatherData[0].temperature.to + "度" + "," + "最低温度" + weatherData[0].temperature.from + "度";
                            topiviSocket.send(JSON.stringify(Json));
                            Json.test = "";
                        } ]);
                    }
                    break;

                  case "PLAY":
                    responseType = "music";
                    $(document).trigger("openApp", "player");
                    $(document).trigger("getPlayerSongList", function(list) {
                        songs = {
                            command: _.pluck(list, "title")
                        };
                    });
                    findMusic = _.find(songs.command, function(name) {
                        return $.trim(name) == $.trim(result.semantic.slots.song);
                    });
                    setTimeout(function() {
                        if (findMusic) {
                            // play music
                            $(document).trigger("playSong", findMusic);
                        } else {
                            Json.test = '未找到"' + result.semantic.slots.song + '"，将为您随机播放';
                            topiviSocket.send(JSON.stringify(Json));
                            $(".VR-animation1").show();
                            $(".machine-words").show().text(Json.test);
                            Json.test = "";
                            $(document).trigger("randomPlaySong");
                        }
                    }, 2e3);
                    break;

                  case "LAUNCH":
                    if (result.service == "radio") {
                        var playinfo = result.semantic.slots.name;
                        console.log("playinfo :" + playinfo);
                    }
                    break;

                  default:
                    break;
                }
            } else {
                if (result.text.indexOf("油价") != -1) {
                    responseType = "oil";
                    $(document).trigger("showOilDialog");
                }
            }
        }
    };
});

define("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/command-debug.tpl", [], '<ul class="command-list">\n    {{\n    for (var i = 0; i < command.length; i++) {\n    }}\n    <li class="command">{{=command[i]}}</li>\n    {{\n    }\n    }}\n</ul>');

define("ekai/seventeen-inch/1.0.0/views/apps/VR/templates/answer-debug.tpl", [], '<ul class="command-list">\n    <li class="answer">{{=answer.text}}</li>\n</ul>\n');

/**
 * @Description: center app view
 * @Author: fuwensong
 * @Date: 14-9-11
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/app-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var storageKeys = require("ekai/seventeen-inch/1.0.0/settings-debug.json").STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        console.error("Not found home_info storage");
    }
    module.exports = Backbone.View.extend({
        id: "app-container",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.appCollection = options.appCollection;
            this.appManager = {};
            // init footer apps
            var leftName = homeInfo["footer"]["left-app"];
            var rightName = homeInfo["footer"]["right-app"];
            this.createApp(leftName);
            this.createApp(rightName);
            this.currentApp = null;
            this.prevApp = null;
            this.on("switchApp", this.switchApp);
        },
        render: function() {
            if (this.currentApp) {
                var leftName = homeInfo["footer"]["left-app"];
                var rightName = homeInfo["footer"]["right-app"];
                var currentApp = this.searchApp(this.currentApp);
                var prevApp = this.searchApp(this.prevApp);
                var currentIFrame = currentApp.iframe();
                if (prevApp) {
                    $(prevApp.iframe()).removeClass("active");
                    prevApp.clearRunnable();
                }
                $(currentIFrame).addClass("active");
                var name = currentApp.model.get("name");
                if (!currentIFrame.src || name === leftName || name === rightName) {
                    currentIFrame.src = getAppSrcByName(this.currentApp);
                }
                if (this.$el.find(".active").length <= 0) {
                    this.$el.append(currentIFrame);
                }
                if (currentApp.runnable) {
                    clearTimeout(currentApp.runnable);
                }
            }
            return this;
        },
        createApp: function(name) {
            var self = this;
            var app = this.appCollection.findWhere({
                name: name
            });
            if (!app) {
                console.error("Not found app: " + name);
                return;
            }
            var newApp = {
                iframe: function() {
                    var name = this.model.get("name");
                    var iframeEl = self.$el.find("iframe[data-name='" + name + "']");
                    if (!iframeEl || iframeEl.length <= 0) {
                        iframeEl = $("#footer-apps").find("iframe[data-name='" + name + "']");
                        if (!iframeEl || iframeEl.length <= 0) {
                            iframeEl = $(document.createElement("iframe"));
                            iframeEl.attr({
                                "data-name": name
                            });
                        }
                    }
                    return iframeEl[0];
                },
                model: app,
                clearRunnable: function() {
                    var lifeCycle = this.model.get("life_cycle");
                    var name = this.model.get("name");
                    if (lifeCycle !== "*") {
                        this.runnable = setTimeout(function() {
                            self.clearApp(name);
                        }, lifeCycle);
                    }
                }
            };
            this.appManager[name] = newApp;
            this.$el.append(newApp.iframe());
            return newApp;
        },
        clearApp: function(name) {
            var app = this.appManager[name];
            if (!app) {
                return console.error("App " + name + "has not exist.");
            }
            $(app.iframe()).remove();
            this.appManager[name] = undefined;
        },
        getCurrentAppEl: function() {
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
    var getAppSrcByName = function(name) {
        return "apps/" + name + "/index.html#";
    };
});

/**
 * @Description: footer v3.
 * @Author: fuwensong
 * @Date: 14-9-26
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/footer-debug", [ "backbone-debug", "underscore-debug", "ekai/seventeen-inch/1.0.0/views/nav-debug", "iscroll-debug", "ekai/seventeen-inch/1.0.0/views/nav-item-debug", "ekai/seventeen-inch/1.0.0/views/footer-apps-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/seventeen-inch/1.0.0/views/nav-debug");
    var AppsView = require("ekai/seventeen-inch/1.0.0/views/footer-apps-debug");
    module.exports = Backbone.View.extend({
        id: "footer-container",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.navView = new NavView({
                collection: options.appCollection
            });
            this.appsView = new AppsView({
                appManager: options.appManager
            });
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.$el.append(this.appsView.render().el);
            return this;
        }
    });
});

/**
 * @Description: footer nav container view.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/nav-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "ekai/seventeen-inch/1.0.0/views/nav-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var IScroll = require("iscroll-debug");
    var NavItemView = require("ekai/seventeen-inch/1.0.0/views/nav-item-debug");
    module.exports = Backbone.View.extend({
        id: "footer-nav",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var self = this;
            this.displayNum = 9;
            this.navItemViews = {};
            this.listenTo(this.collection, "add", this.appendAppItem);
            Backbone.$(document).on("installApp", function() {
                self.installApp.apply(self, arguments);
            });
            Backbone.$(document).on("uninstallApp", function() {
                self.uninstallApp.apply(self, arguments);
            });
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.append("<ul id='nav-list'></ul>");
            var ulEl = this.$el.find("#nav-list");
            _.each(this.collection.models, function(model, index, list) {
                var name = model.get("name");
                var navItemView = new NavItemView({
                    model: model
                });
                self.listenTo(model, "remove", self.removeAppItem);
                self.navItemViews[name] = navItemView;
                ulEl.append(navItemView.render().el);
            });
            setTimeout(function() {
                self.resetScrollWidth();
                self.scroll = new IScroll("#footer-nav", {
                    scrollX: true,
                    scrollY: false
                });
            }, 100);
            Backbone.$(window).resize(function() {
                self.resetScrollWidth();
            });
            return this;
        },
        installApp: function(event, options) {
            var self = this;
            var callback = options.callback;
            var app = options.app;
            var Model = this.collection.model;
            var lastModel = this.collection.at(this.collection.length - 1);
            app.order = lastModel.get("order") + 1;
            setTimeout(function() {
                var model = new Model(app);
                self.listenTo(model, "remove", self.removeAppItem);
                self.collection.add(model);
                self.collection.trigger("updateHomeApps");
                callback();
            }, 2e3);
        },
        uninstallApp: function(e, options) {
            var self = this;
            var callback = options.callback;
            var app = options.app;
            var model = this.collection.get(app.id);
            setTimeout(function() {
                if (model) {
                    self.collection.remove(model);
                    self.collection.trigger("updateHomeApps");
                }
                callback();
            }, 1e3);
        },
        appendAppItem: function(model, collection, options) {
            var ulEl = this.$el.find("#nav-list");
            var newItem = new NavItemView({
                model: model
            });
            ulEl.append(newItem.render().el);
            this.resetScrollWidth();
            this.scroll.refresh();
            this.scroll.scrollToElement(newItem.$el[0], 1e3);
        },
        removeAppItem: function(model) {
            this.resetScrollWidth();
            this.scroll.refresh();
        },
        resetScrollWidth: function() {
            var ulEl = this.$el.find("#nav-list");
            var size = this.collection.length;
            this.$el.find("li.none").remove();
            for (var i = size; i < this.displayNum; i++) {
                ulEl.append("<li class='none' data-name='none_" + i + "'></li>");
            }
            size = size > this.displayNum ? size : this.displayNum;
            var navWidth = this.$el.width();
            var itemWidth = (navWidth - this.displayNum + 1) / this.displayNum;
            this.$el.find("li").css("width", itemWidth + "px");
            var ulWidth = size * itemWidth + size;
            ulEl.css("width", ulWidth + "px");
        },
        activeItem: function(name) {
            this.$el.find("li.active").removeClass("active");
            var itemEl = this.$el.find("li[data-name='" + name + "']");
            itemEl.addClass("active");
            this.scrollToEl(itemEl);
        },
        scrollToEl: function(itemEl) {
            if (this.scroll) {
                var timeout = 1e3;
                var navWidth = this.$el.width();
                var itemWidth = itemEl.width();
                var offsetLeft = itemEl.offset().left;
                if (offsetLeft < itemWidth) {
                    // scroll to previous
                    var previousEl = itemEl.prev();
                    if (previousEl.length > 0) {
                        this.scroll.scrollToElement(previousEl[0], timeout);
                    } else {
                        this.scroll.scrollToElement(itemEl[0], timeout);
                    }
                } else if (offsetLeft > navWidth - itemWidth) {
                    // scroll to next
                    var nextEl = itemEl.next();
                    if (nextEl.length > 0) {
                        this.scroll.scrollToElement(nextEl[0], timeout);
                    } else {
                        this.scroll.scrollToElement(itemEl[0], timeout);
                    }
                } else {
                    this.scroll.scrollToElement(itemEl[0], timeout);
                }
            }
        }
    });
});

/**
 * Created by fuwensong on 14-7-4.
 */
define("ekai/seventeen-inch/1.0.0/views/nav-item-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var navItemTemplate = require("ekai/seventeen-inch/1.0.0/templates/nav-item-debug.tpl");
    module.exports = Backbone.View.extend({
        tagName: "li",
        template: _.template(navItemTemplate),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            var name = this.model.get("name");
            this.$el.attr("data-name", name);
            this.listenTo(this.model, "remove", this.appUninstalled);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        appUninstalled: function(model, collection) {
            this.remove();
        }
    });
});

define("ekai/seventeen-inch/1.0.0/templates/nav-item-debug.tpl", [], '<a href="#{{=name}}">\n    <img alt="{{=name}}" class="icon" src="{{=icon_path}}"/>\n</a>');

/**
 * @Description: footer app container view, includes left and right.
 * @Author: fuwensong
 * @Date: 14-9-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/seventeen-inch/1.0.0/views/footer-apps-debug", [ "underscore-debug", "backbone-debug", "store-debug", "ekai/seventeen-inch/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var Template = require("ekai/seventeen-inch/1.0.0/templates/footer-apps-debug.tpl");
    var store = require("store-debug");
    var storageKeys = require("ekai/seventeen-inch/1.0.0/settings-debug.json").STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);
    if (!homeInfo) {
        console.error("Not found home_info storage");
    }
    module.exports = Backbone.View.extend({
        id: "footer-apps",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.mode = "both";
            this.leftAppName = homeInfo["footer"]["left-app"];
            this.rightAppName = homeInfo["footer"]["right-app"];
            this.appManager = options.appManager;
            this.on("switchApp", this.switchApp);
            this.on("resetApp", this.resetApp);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template());
            this.changeAppsStyle();
            return this;
        },
        changeAppsStyle: function() {
            var leftFrame = this.appManager[this.leftAppName].iframe();
            var rightFrame = this.appManager[this.rightAppName].iframe();
            if (!leftFrame || !rightFrame) {
                console.error("Foot app left or right not existed.");
            }
            var leftContainer = this.$el.find("#left-container");
            var rightContainer = this.$el.find("#right-container");
            switch (this.mode) {
              case "left":
                {
                    //rightContainer.empty();
                    leftFrame.src = getAppSrcByName(this.leftAppName, "footer-expanded");
                    if (leftContainer.find("iframe").length <= 0) {
                        leftContainer.append(leftFrame);
                    }
                    break;
                }

              case "right":
                {
                    //leftContainer.empty();
                    rightFrame.src = getAppSrcByName(this.rightAppName, "footer-expanded");
                    if (rightContainer.find("iframe").length <= 0) {
                        rightContainer.append(rightFrame);
                    }
                    break;
                }

              case "both":
                {
                    leftFrame.src = getAppSrcByName(this.leftAppName, "footer");
                    if (leftContainer.find("iframe").length <= 0) {
                        leftContainer.append(leftFrame);
                    }
                    rightFrame.src = getAppSrcByName(this.rightAppName, "footer");
                    if (rightContainer.find("iframe").length <= 0) {
                        rightContainer.append(rightFrame);
                    }
                    break;
                }
            }
        },
        hideEl: function(el) {
            el.removeClass("expanded").addClass("hide");
        },
        expandEl: function(el) {
            el.removeClass("hide").addClass("expanded");
        },
        resetEl: function(el) {
            el.removeClass("hide").removeClass("expanded");
        },
        switchApp: function(type, callback) {
            this.mode = type === "left" ? "right" : "left";
            var leftEl = this.$el.find("#left-container");
            var rightEl = this.$el.find("#right-container");
            if (this.mode === "left") {
                this.decreaseAnimation(rightEl, "all", function() {
                    this.hideEl(rightEl);
                    this.changeAppsStyle();
                    callback();
                });
                this.expandAnimation(leftEl, "all", function() {
                    this.expandEl(leftEl);
                });
            } else {
                this.decreaseAnimation(leftEl, "all", function() {
                    this.hideEl(leftEl);
                    this.changeAppsStyle();
                    callback();
                });
                this.expandAnimation(rightEl, "all", function() {
                    this.expandEl(rightEl);
                });
            }
        },
        resetApp: function(type) {
            this.mode = "both";
            var leftEl = this.$el.find("#left-container");
            var rightEl = this.$el.find("#right-container");
            if (type == "right") {
                // right expanded
                this.decreaseAnimation(rightEl, "right", function() {
                    this.resetEl(rightEl);
                    this.changeAppsStyle();
                });
                this.expandAnimation(leftEl, "left", function() {
                    this.resetEl(leftEl);
                });
            } else {
                // left expanded
                this.decreaseAnimation(leftEl, "left", function() {
                    this.resetEl(leftEl);
                    this.changeAppsStyle();
                });
                this.expandAnimation(rightEl, "right", function() {
                    this.resetEl(rightEl);
                });
            }
        },
        expandAnimation: function(el, type, callback) {
            var timeout = 200;
            var ease = "easeInQuint";
            var self = this;
            var width;
            if (type == "right") {
                width = "33%";
            } else if (type == "left") {
                width = "65.5%";
            } else {
                width = "100%";
            }
            el.animate({
                width: width
            }, timeout, ease, function() {
                callback.call(self);
            });
        },
        decreaseAnimation: function(el, type, callback) {
            var timeout = 200;
            var ease = "easeInQuint";
            var self = this;
            var width;
            if (type == "right") {
                width = "33%";
            } else if (type == "left") {
                width = "65.5%";
            } else {
                width = "0";
            }
            el.animate({
                width: width
            }, timeout, ease, function() {
                callback.call(self);
            });
        }
    });
    var getAppSrcByName = function(name, mode) {
        var src = "apps/" + name + "/index.html";
        if (mode) {
            src += "#$mode/" + mode;
        }
        return src;
    };
});

define("ekai/seventeen-inch/1.0.0/templates/footer-apps-debug.tpl", [], '<div id="left-container"></div>\n<div id="right-container"></div>');
