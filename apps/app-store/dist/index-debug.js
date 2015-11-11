/**
 * @Description: Build index folder.
 * @Author: fuwensong
 * @Date: 14-10-10
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/index-debug", [ "./main-debug", "backbone-debug", "./routers/index-debug", "./views/home-debug", "underscore-debug", "./views/nav-debug", "store-debug", "topivi-debug", "iscroll-debug", "./templates/nav-debug.tpl", "./collections/category-debug", "./models/category-debug", "./settings-debug.json", "./views/main-debug", "./views/content-debug", "./templates/content-debug.tpl", "./collections/app-debug", "./models/app-debug", "./views/app-item-debug", "./templates/app-item-debug.tpl", "./views/app-detail-debug", "./templates/app-detail-debug.tpl" ], function(require, exports, module) {
    module.exports = require("./main-debug");
});

/**
 * @Description: the main entrance of app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/main-debug", [ "backbone-debug", "ekai/app-store/1.0.0/routers/index-debug", "ekai/app-store/1.0.0/views/home-debug", "underscore-debug", "ekai/app-store/1.0.0/views/nav-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/category-debug", "ekai/app-store/1.0.0/models/category-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/views/main-debug", "ekai/app-store/1.0.0/views/content-debug", "ekai/app-store/1.0.0/collections/app-debug", "ekai/app-store/1.0.0/models/app-debug", "ekai/app-store/1.0.0/views/app-item-debug", "ekai/app-store/1.0.0/views/app-detail-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/app-store/1.0.0/routers/index-debug");
    var router = new Router();
    Backbone.history.start();
});

/**
 * @Description: the index router for app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/app-store/1.0.0/views/home-debug", "underscore-debug", "ekai/app-store/1.0.0/views/nav-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/category-debug", "ekai/app-store/1.0.0/models/category-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/views/main-debug", "ekai/app-store/1.0.0/views/content-debug", "ekai/app-store/1.0.0/collections/app-debug", "ekai/app-store/1.0.0/models/app-debug", "ekai/app-store/1.0.0/views/app-item-debug", "ekai/app-store/1.0.0/views/app-detail-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var HomeView = require("ekai/app-store/1.0.0/views/home-debug");
    var homeView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage"
        },
        homePage: function(page) {
            page = page || "all";
            if (!homeView) {
                homeView = new HomeView();
            }
            Backbone.$("body").prepend(homeView.render().el);
        }
    });
});

/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/home-debug", [ "backbone-debug", "underscore-debug", "ekai/app-store/1.0.0/views/nav-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/category-debug", "ekai/app-store/1.0.0/models/category-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/views/main-debug", "ekai/app-store/1.0.0/views/content-debug", "ekai/app-store/1.0.0/collections/app-debug", "ekai/app-store/1.0.0/models/app-debug", "ekai/app-store/1.0.0/views/app-item-debug", "ekai/app-store/1.0.0/views/app-detail-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/app-store/1.0.0/views/nav-debug");
    var MainView = require("ekai/app-store/1.0.0/views/main-debug");
    module.exports = Backbone.View.extend({
        className: "page",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.navView = new NavView();
            this.mainView = new MainView();
            this.mainView.contentView.listenTo(this.navView, "changeCategory", this.mainView.contentView.changeCategory);
        },
        render: function() {
            this.$el.empty();
            this.$el.append("<div id='app-detail-dialog'></div>");
            this.$el.append(this.mainView.render().el);
            this.$el.append("<div id='bottom-mask'></div>");
            this.$el.append(this.navView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Nav view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/nav-debug", [ "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/category-debug", "ekai/app-store/1.0.0/models/category-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var IScroll = require("iscroll-debug");
    var NavTemplate = require("ekai/app-store/1.0.0/templates/nav-debug.tpl");
    var CategoryCollection = require("ekai/app-store/1.0.0/collections/category-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var categories = store.get(localKeys.categories);
    categories = categories || [];
    module.exports = Backbone.View.extend({
        id: "category-list-wrapper",
        className: "nav",
        template: _.template(NavTemplate),
        events: {
            "tap .item": "navItemClick"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.currentCategory = "all";
            this.collection = new CategoryCollection(categories);
        },
        render: function() {
            var self = this;
            if (this.collection.length <= 0) {
                this.fetchCategories(this.renderCategories);
            } else {
                this.renderCategories();
            }
            return this;
        },
        fetchCategories: function(callback) {
            var self = this;
            this.collection.fetch({
                timeout: 5e3,
                success: function(collection, res, options) {
                    store.set(localKeys.categories, collection.toJSON());
                    callback.apply(self, arguments);
                },
                error: function(collection, res, options) {
                    new topivi.dialog.normal("", {
                        removeAfterClose: true,
                        content: "获取分类失败，请稍后再试..."
                    }).open();
                }
            });
        },
        renderCategories: function() {
            this.$el.empty();
            this.$el.html(this.template({
                categories: this.collection,
                current: this.currentCategory
            }));
            this.$el.wrapInner("<ul id='category-list'></ul>");
            setTimeout(function() {
                self.scroll = new IScroll("#category-list-wrapper");
            }, 100);
        },
        navItemClick: function(e) {
            var el = Backbone.$(e.currentTarget);
            var key = el.attr("data-key");
            this.currentCategory = key;
            this.$el.find("li.active").removeClass("active");
            el.addClass("active");
            this.trigger("changeCategory", key);
        }
    });
});

define("ekai/app-store/1.0.0/templates/nav-debug.tpl", [], "<li data-key=\"all\" class=\"item {{=(current === 'all') ? 'active' : ''}}\">全部</li>\n{{\n    categories.each(function (category) {\n}}\n<li data-key=\"{{=category.id}}\" class=\"item {{=(current === category.id) ? 'active' : ''}}\">{{=category.get('name')}}</li>\n{{\n    });\n}}");

/**
 * @Description: App category collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/collections/category-debug", [ "backbone-debug", "ekai/app-store/1.0.0/models/category-debug", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Category = require("ekai/app-store/1.0.0/models/category-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    module.exports = Backbone.Collection.extend({
        model: Category,
        url: function() {
            return Settings.API_URL + "/app-category/list?app_key=" + Settings.APP_KEY;
        },
        parse: function(response) {
            return response.categories;
        }
    });
});

/**
 * @Description: App category model.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/models/category-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    module.exports = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            count: 0
        }
    });
});

define("ekai/app-store/1.0.0/settings-debug.json", [], {
    API_URL: "http://www.topivi.com:3001/api",
    APP_KEY: "d7c7ce69d618446d6a84081d62682018",
    STORAGE_KEYS: {
        categories: "app-store_categories",
        apps: "app-store_apps",
        home_apps: "home_apps"
    },
    enabled_apps: [ "DLNA", "APP Link", "Driving Habits Analysis", "Drive Magazine", "Maintenance" ]
});

/**
 * @Description: Main view of app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/main-debug", [ "backbone-debug", "ekai/app-store/1.0.0/views/content-debug", "underscore-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/app-debug", "ekai/app-store/1.0.0/models/app-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/views/app-item-debug", "ekai/app-store/1.0.0/views/app-detail-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var ContentView = require("ekai/app-store/1.0.0/views/content-debug");
    module.exports = Backbone.View.extend({
        className: "main",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.contentView = new ContentView();
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.contentView.render().el);
            return this;
        },
        changePage: function(page) {
            this.contentView.changePage(page);
        }
    });
});

/**
 * @Description: Nav view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/content-debug", [ "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/app-store/1.0.0/collections/app-debug", "ekai/app-store/1.0.0/models/app-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/views/app-item-debug", "ekai/app-store/1.0.0/views/app-detail-debug", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var IScroll = require("iscroll-debug");
    var ContentTemplate = require("ekai/app-store/1.0.0/templates/content-debug.tpl");
    var AppCollection = require("ekai/app-store/1.0.0/collections/app-debug");
    var AppItemView = require("ekai/app-store/1.0.0/views/app-item-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var apps = store.get(localKeys.apps);
    apps = apps || [];
    module.exports = Backbone.View.extend({
        id: "app-store-content",
        className: "content",
        template: _.template(ContentTemplate),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.currentCategory = "all";
            this.collection = new AppCollection(apps);
        },
        render: function() {
            var self = this;
            if (this.collection.length <= 0) {
                this.fetchApps(this.renderApps);
            } else {
                this.renderApps();
            }
            return this;
        },
        fetchApps: function(callback) {
            var self = this;
            this.collection.fetch({
                timeout: 5e3,
                success: function(collection, res, options) {
                    store.set(localKeys.apps, collection.toJSON());
                    callback.apply(self, arguments);
                },
                error: function(collection, res, options) {
                    new topivi.dialog.normal("", {
                        removeAfterClose: true,
                        content: "获取应用列表失败，请稍后再试..."
                    }).open();
                }
            });
        },
        renderApps: function() {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template({}));
            var ulEl = this.$el.find("#app-list");
            var models = null;
            if (this.currentCategory === "all") {
                models = this.collection.models;
            } else {
                models = this.collection.where({
                    category: this.currentCategory
                });
            }
            if (models.length <= 0) {
                ulEl.append("<li class='info'>该分类下没有应用</li>");
            } else {
                _.each(models, function(model, index, list) {
                    var itemView = new AppItemView({
                        model: model
                    });
                    ulEl.append(itemView.render().el);
                });
                setTimeout(function() {
                    self.scroll = new IScroll("#app-store-content");
                }, 100);
            }
        },
        changeCategory: function(category) {
            this.currentCategory = category;
            this.renderApps();
        }
    });
});

define("ekai/app-store/1.0.0/templates/content-debug.tpl", [], '<ul id="app-list" class="listview"></ul>');

/**
 * @Description: App collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/collections/app-debug", [ "backbone-debug", "ekai/app-store/1.0.0/models/app-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/app-store/1.0.0/settings-debug.json", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var App = require("ekai/app-store/1.0.0/models/app-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    module.exports = Backbone.Collection.extend({
        model: App,
        url: function() {
            return Settings.API_URL + "/app/unauth-list?app_key=" + Settings.APP_KEY;
        },
        parse: function(response) {
            return response.apps;
        }
    });
});

/**
 * @Description: App model.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/models/app-debug", [ "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var installedApps = store.get(localKeys.home_apps);
    installedApps = installedApps || [];
    var enabledApps = Settings.enabled_apps;
    module.exports = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            charge: 0,
            rating: "4",
            previews: [],
            installed: false,
            install_status: "none",
            is_enabled: false
        },
        initialize: function() {
            this.initSizeName();
            this.checkInstalled();
            this.checkEnabled();
        },
        checkInstalled: function() {
            var name = this.get("name");
            if (_.findWhere(installedApps, {
                name: name
            })) {
                this.set("installed", true);
            }
            return this.get("installed");
        },
        initSizeName: function() {
            var size = this.get("size");
            this.set("size_name", topivi.util.fileSizeString(size, 1));
        },
        checkEnabled: function() {
            var name = this.get("name");
            if (_.contains(enabledApps, name)) {
                this.set("is_enabled", true);
            }
        }
    });
});

/**
 * @Description: App item of app list.
 * @Author: fuwensong
 * @Date: 14-9-23
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/app-item-debug", [ "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/app-store/1.0.0/views/app-detail-debug", "iscroll-debug", "ekai/app-store/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $p = parent.seajs.require("jquery");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/app-store/1.0.0/templates/app-item-debug.tpl");
    var AppDetailView = require("ekai/app-store/1.0.0/views/app-detail-debug");
    var Settings = require("ekai/app-store/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        tagName: "li",
        className: "item",
        template: _.template(Template),
        events: {
            "tap .install": "installBtnClick",
            "tap .uninstall": "uninstallBtnClick",
            "tap .link": "showDetailDialog",
            "tap .pause": "pauseDownloadBtnClick",
            "tap .stop": "stopDownloadBtnClick"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.listenTo(this.model, "change:installed", this.installedStatusChanged);
            this.listenTo(this.model, "change", this.updateStoreApp);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        updateStoreApp: function(model, value, options) {
            var apps = store.get(localKeys.apps);
            for (var i = 0; i < apps.length; i++) {
                if (model.id === apps[i]._id) {
                    apps[i] = model.toJSON();
                    break;
                }
            }
            store.set(localKeys.apps, apps);
        },
        installedStatusChanged: function(model, value, options) {
            var installBtnEl = this.$el.find(".install");
            if (value) {
                installBtnEl.text("打开");
                this.$el.prepend("<div class='uninstall'></div>");
            } else {
                var charge = model.get("charge");
                installBtnEl.text(charge > 0 ? "￥" + charge : "免费");
                this.$el.find(".uninstall").remove();
            }
        },
        installBtnClick: function(e) {
            e.stopPropagation();
            var self = this;
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass("installing") || el.hasClass("disabled")) {
                return;
            }
            var loadingEl = this.$el.find(".loading");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            var isInstalled = this.model.get("installed");
            if (isInstalled) {
                console.log("Open app -> " + this.model.get("name"));
                return this.noticeHomeOpenApp();
            }
            var success = function() {
                loadingEl.hide();
                btnsEl.show();
                progressEl.show();
                self.startDownload();
            };
            var error = function() {
                loadingEl.hide();
                el.show();
            };
            el.hide();
            var charge = this.model.get("charge");
            if (charge > 0) {
                var dialog = new topivi.dialog.confirm("", {
                    useMask: true,
                    closeGesture: "clickmask",
                    removeAfterClose: true,
                    content: "下载该应用需要收费，金额：￥" + charge,
                    onOkClick: function() {
                        loadingEl.show();
                        el.addClass("installing");
                        self.checkDownload({
                            success: success,
                            error: error
                        });
                    },
                    onClose: function(options) {
                        options = options || {};
                        if (options.from && options.from !== "ok") {
                            el.show();
                        }
                    }
                });
                dialog.el.addClass("app-store");
                dialog.open();
            } else {
                loadingEl.show();
                el.addClass("installing");
                this.checkDownload({
                    success: success,
                    error: error
                });
            }
        },
        uninstallBtnClick: function(e) {
            var self = this;
            e.stopPropagation();
            var isInstalled = this.model.get("installed");
            if (!isInstalled) {
                return;
            }
            $p(parent.document).trigger("uninstallApp", {
                app: {
                    id: this.model.id
                },
                callback: function() {
                    self.model.set("installed", false);
                }
            });
        },
        checkDownload: function(options) {
            setTimeout(options.success, 1e3);
        },
        startDownload: function() {
            var self = this;
            var progressEl = this.$el.find(".download-progress");
            this.downloadProgress = new topivi.progress.line(progressEl, {
                onEnd: function() {
                    clearInterval(self.downloadInterval);
                    self.startInstall();
                }
            });
            this.createDownloadRunnable();
        },
        pauseDownloadBtnClick: function(e) {
            e.stopPropagation();
            var el = Backbone.$(e.currentTarget);
            if (!el.hasClass("paused")) {
                if (this.downloadInterval) {
                    clearInterval(this.downloadInterval);
                }
            } else {
                this.createDownloadRunnable();
            }
            el.toggleClass("paused");
        },
        createDownloadRunnable: function() {
            var self = this;
            this.downloadInterval = setInterval(function() {
                var random = Math.random() * 40;
                self.downloadProgress.plusProgress(random);
            }, 1e3);
        },
        stopDownloadBtnClick: function(e) {
            e.stopPropagation();
            var installBtnEl = this.$el.find(".install");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            var pauseBtnEl = this.$el.find(".pause");
            if (this.downloadInterval) {
                clearInterval(this.downloadInterval);
            }
            this.downloadProgress = undefined;
            btnsEl.hide();
            progressEl.hide();
            installBtnEl.show();
            installBtnEl.removeClass("installing");
            pauseBtnEl.removeClass("paused");
        },
        startInstall: function() {
            var self = this;
            var installBtnEl = this.$el.find(".install");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            installBtnEl.text("安装中...");
            installBtnEl.show();
            btnsEl.hide();
            progressEl.hide();
            this.noticeHomeInstallApp(function() {
                self.model.set("installed", true);
                installBtnEl.removeClass("installing");
            });
        },
        noticeHomeInstallApp: function(callback) {
            $p(parent.document).trigger("installApp", {
                callback: callback,
                app: {
                    _id: this.model.id,
                    name: this.model.get("name")
                }
            });
        },
        noticeHomeOpenApp: function() {
            var name = this.model.get("name");
            $p(parent.document).trigger("openApp", name);
        },
        showDetailDialog: function(e) {
            var el = Backbone.$(e.currentTarget);
            var offset = el.offset();
            var width, height;
            var elWidth = el.width();
            var elHeight = el.height();
            var appDetailView = new AppDetailView({
                model: this.model
            });
            var dialog = new topivi.dialog.normal("#app-detail-dialog", {
                useMask: true,
                closeGesture: "clickmask",
                content: appDetailView.render().el,
                beforeOpen: function() {
                    el.hide();
                },
                onOpen: function() {
                    appDetailView.initScrolls();
                },
                onClose: function() {
                    el.show();
                    appDetailView.remove();
                },
                inAnimation: function(callback) {
                    var timeout = 200;
                    var ease = "easeOutBack";
                    this.el.animate({
                        top: "50%",
                        left: "50%",
                        width: width,
                        height: height,
                        marginTop: -height / 2,
                        marginLeft: -width / 2
                    }, timeout, ease, function() {
                        callback();
                    });
                },
                outAnimation: function(callback) {
                    var self = this;
                    var timeout = 200;
                    var ease = "easeInBack";
                    this.el.animate({
                        top: offset.top,
                        left: offset.left,
                        width: elWidth,
                        height: elHeight,
                        marginTop: "0",
                        marginLeft: "0"
                    }, timeout, ease, function() {
                        self.el.css({
                            width: width,
                            height: height,
                            "margin-top": 0,
                            "margin-left": 0
                        });
                        callback();
                    });
                }
            });
            width = dialog.el.width();
            height = dialog.el.height();
            dialog.el.css({
                width: el.width(),
                height: el.height(),
                top: offset.top,
                left: offset.left,
                "margin-top": 0,
                "margin-left": 0
            });
            dialog.open();
        }
    });
});

define("ekai/app-store/1.0.0/templates/app-item-debug.tpl", [], '{{\nif (installed) {\n}}\n<div class="uninstall"></div>\n{{\n}\n}}\n<a class="link">\n    <div class="download-progress"></div>\n    <div class="left">\n        <img alt="{{=name}}" class="thumbnail" src="{{=thumbnail}}"/>\n        <ul class="rating stars">\n          {{\n            for (var i = 0; i < rating; i++) {\n          }}\n            <li class="star active"></li>\n          {{\n            }\n          }}\n            {{\n            for (var i = rating; i < 5; i++) {\n            }}\n            <li class="star"></li>\n            {{\n            }\n            }}\n        </ul>\n    </div>\n    <div class="right">\n        <h1 class="name">{{=name}}</h1>\n        <p class="version-number">版本：<span class="value">{{=version_number}}</span></p>\n        <p class="size">大小：<span class="value">{{=size_name}}</span></p>\n        <div class="install {{=!is_enabled ? \'disabled\' : \'\'}}">{{=installed ? \'打开\' : (charge > 0 ? \'￥\' + charge : \'免费\')}}</div>\n        <div class="btns">\n            <div class="small-btn pause"></div>\n            <div class="small-btn stop"></div>\n        </div>\n        <div class="loading"></div>\n    </div>\n</a>');

/**
 * @Description: App dtail view.
 * @Author: fuwensong
 * @Date: 14-9-24
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/app-store/1.0.0/views/app-detail-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "iscroll-debug" ], function(require, exports, module) {
    var $p = parent.seajs.require("jquery");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var IScroll = require("iscroll-debug");
    var Template = require("ekai/app-store/1.0.0/templates/app-detail-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "scroller",
        template: _.template(Template),
        events: {
            "tap .install": "installBtnClick",
            "tap .pause": "pauseDownloadBtnClick",
            "tap .stop": "stopDownloadBtnClick"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.listenTo(this.model, "change:installed", this.installedStatusChanged);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        installedStatusChanged: function(model, value, options) {
            var installBtnEl = this.$el.find(".install");
            if (value) {
                installBtnEl.text("打开");
            } else {
                var charge = model.get("charge");
                installBtnEl.text(charge > 0 ? "￥" + charge : "免费");
            }
        },
        initScrolls: function() {
            var self = this;
            setTimeout(function() {
                self.contentScroll = new IScroll("#app-detail-dialog .content");
                var previewsUlEl = self.$el.find(".wrapper>ul");
                if (previewsUlEl.length > 0) {
                    self.resetPreviewWidth();
                    self.previewsScroll = new IScroll("#app-detail-dialog .wrapper", {
                        scrollX: true,
                        scrollY: false,
                        click: true
                    });
                }
            }, 100);
        },
        resetPreviewWidth: function() {
            var previewsUlEl = this.$el.find(".wrapper ul");
            var previewLength = this.model.get("previews").length;
            var itemWidth = previewsUlEl.find(".item").outerWidth(true);
            previewsUlEl.css("width", previewLength * itemWidth);
        },
        installBtnClick: function(e) {
            e.stopPropagation();
            var self = this;
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass("installing") || el.hasClass("disabled")) {
                return;
            }
            var loadingEl = this.$el.find(".loading");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            var isInstalled = this.model.get("installed");
            if (isInstalled) {
                console.log("Open app -> " + this.model.get("name"));
                return this.noticeHomeOpenApp();
            }
            var success = function() {
                loadingEl.hide();
                btnsEl.show();
                progressEl.show();
                self.startDownload();
            };
            var error = function() {
                loadingEl.hide();
                el.show();
            };
            el.hide();
            var charge = this.model.get("charge");
            if (charge > 0) {
                var dialog = new topivi.dialog.confirm("", {
                    useMask: true,
                    closeGesture: "clickmask",
                    removeAfterClose: true,
                    content: "下载该应用需要收费，金额：￥" + charge,
                    onOkClick: function() {
                        loadingEl.show();
                        el.addClass("installing");
                        self.checkDownload({
                            success: success,
                            error: error
                        });
                    },
                    onClose: function(options) {
                        options = options || {};
                        if (options.from && options.from !== "ok") {
                            el.show();
                        }
                    }
                });
                dialog.el.addClass("app-store");
                dialog.open();
            } else {
                loadingEl.show();
                el.addClass("installing");
                this.checkDownload({
                    success: success,
                    error: error
                });
            }
        },
        checkDownload: function(options) {
            setTimeout(options.success, 1e3);
        },
        startDownload: function() {
            var self = this;
            var progressEl = this.$el.find(".download-progress");
            this.downloadProgress = new topivi.progress.line(progressEl, {
                onEnd: function() {
                    clearInterval(self.downloadInterval);
                    self.startInstall();
                }
            });
            this.createDownloadRunnable();
        },
        pauseDownloadBtnClick: function(e) {
            e.stopPropagation();
            var el = Backbone.$(e.currentTarget);
            if (!el.hasClass("paused")) {
                if (this.downloadInterval) {
                    clearInterval(this.downloadInterval);
                }
            } else {
                this.createDownloadRunnable();
            }
            el.toggleClass("paused");
        },
        createDownloadRunnable: function() {
            var self = this;
            this.downloadInterval = setInterval(function() {
                var random = Math.random() * 40;
                self.downloadProgress.plusProgress(random);
            }, 1e3);
        },
        stopDownloadBtnClick: function(e) {
            e.stopPropagation();
            var installBtnEl = this.$el.find(".install");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            var pauseBtnEl = this.$el.find(".pause");
            if (this.downloadInterval) {
                clearInterval(this.downloadInterval);
            }
            this.downloadProgress = undefined;
            btnsEl.hide();
            progressEl.hide();
            installBtnEl.show();
            installBtnEl.removeClass("installing");
            pauseBtnEl.removeClass("paused");
        },
        startInstall: function() {
            var self = this;
            var installBtnEl = this.$el.find(".install");
            var btnsEl = this.$el.find(".btns");
            var progressEl = this.$el.find(".download-progress");
            installBtnEl.text("安装中...");
            installBtnEl.show();
            btnsEl.hide();
            progressEl.hide();
            this.noticeHomeInstallApp(function() {
                self.model.set("installed", true);
                installBtnEl.removeClass("installing");
            });
        },
        noticeHomeInstallApp: function(callback) {
            $p(parent.document).trigger("installApp", {
                callback: callback,
                app: {
                    _id: this.model.id,
                    name: this.model.get("name")
                }
            });
        },
        noticeHomeOpenApp: function() {
            var name = this.model.get("name");
            $p(parent.document).trigger("openApp", name);
        }
    });
});

define("ekai/app-store/1.0.0/templates/app-detail-debug.tpl", [], '<div class="basic-info part">\n    <div class="left"><img alt="{{=name}}" class="thumbnail" src="{{=thumbnail}}"/></div>\n    <div class="right">\n        <h1 class="name">{{=name}}</h1>\n        <p class="developer">{{=developer}}</p>\n        <ul class="rating stars">\n            {{\n            for (var i = 0; i < rating; i++) {\n            }}\n            <li class="star active"></li>\n            {{\n            }\n            }}\n            {{\n            for (var i = rating; i < 5; i++) {\n            }}\n            <li class="star"></li>\n            {{\n            }\n            }}\n        </ul>\n        <div class="install {{=!is_enabled ? \'disabled\' : \'\'}}">{{=installed ? \'打开\' : (charge > 0 ? \'￥\' + charge : \'免费\')}}</div>\n        <div class="loading"></div>\n        <div class="btns">\n            <div class="download-progress"></div>\n            <div class="small-btn pause"></div>\n            <div class="small-btn stop"></div>\n        </div>\n    </div>\n</div>\n<div class="previews part">\n    {{\n    if (previews.length <= 0) {\n    }}\n        <p class="info">没有预览图</p>\n    {{\n        } else {\n    }}\n    <div class="wrapper">\n        <ul>\n    {{\n            for (var i = 0; i < previews.length; i++) {\n    }}\n            <li class="item"><img alt="预览图{{=i}}" class="preview" src="{{=previews[i]}}"/></li>\n    {{\n            }\n    }}\n        </ul>\n    </div>\n    {{\n        }\n    }}\n</div>\n<div class="description part">\n    <h2 class="title">内容提要</h2>\n    <p class="text">{{=description}}</p>\n</div>\n<div class="new-feature part">\n    <h2 class="title">新功能</h2>\n    <p class="text">{{=change_log}}</p>\n</div>');
