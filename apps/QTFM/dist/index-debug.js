/**
 * @Description: Build index folder.
 * @Author: fuwensong
 * @Date: 14-10-10
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/index-debug", [ "./main-debug", "backbone-debug", "./routers/index-debug", "jquery-debug", "./views/broadcast/index-debug", "underscore-debug", "./views/nav-debug", "./templates/nav-debug.tpl", "./views/broadcast/main-debug", "store-debug", "topivi-debug", "iscroll-debug", "./templates/broadcast/main-debug.tpl", "./templates/loading-debug.tpl", "./collections/radio-category-debug", "./models/radio-category-debug", "./settings-debug.json", "./views/broadcast/sub-category-debug", "./templates/broadcast/sub-category-debug.tpl", "./views/lately/index-debug", "./views/lately/main-debug", "./templates/lately/main-debug.tpl", "./collections/lately-channel-debug", "./collections/channel-debug", "./models/channel-debug", "./views/footer-play-debug", "./templates/footer-play-debug.tpl", "./views/channel-list-debug", "./views/channel-item-debug", "./templates/channel-item-debug.tpl", "./views/favorites/index-debug", "./views/favorites/main-debug", "./templates/favorites/main-debug.tpl", "./collections/favorites-channel-debug", "./views/channel/index-debug", "./views/channel/main-debug", "./templates/channel/main-debug.tpl", "./views/program/index-debug", "./views/program/main-debug", "./templates/program/main-debug.tpl", "./collections/program-debug", "./models/program-debug", "./views/program/program-list-debug", "./views/program/program-item-debug", "./templates/program/program-item-debug.tpl", "./util-debug", "./views/play/index-debug", "./templates/play/main-debug.tpl", "./player-debug" ], function(require, exports, module) {
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
define("ekai/qtfm/1.0.0/main-debug", [ "backbone-debug", "ekai/qtfm/1.0.0/routers/index-debug", "jquery-debug", "ekai/qtfm/1.0.0/views/broadcast/index-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/broadcast/main-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/radio-category-debug", "ekai/qtfm/1.0.0/models/radio-category-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/broadcast/sub-category-debug", "ekai/qtfm/1.0.0/views/lately/index-debug", "ekai/qtfm/1.0.0/views/lately/main-debug", "ekai/qtfm/1.0.0/collections/lately-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "ekai/qtfm/1.0.0/views/favorites/index-debug", "ekai/qtfm/1.0.0/views/favorites/main-debug", "ekai/qtfm/1.0.0/collections/favorites-channel-debug", "ekai/qtfm/1.0.0/views/channel/index-debug", "ekai/qtfm/1.0.0/views/channel/main-debug", "ekai/qtfm/1.0.0/views/program/index-debug", "ekai/qtfm/1.0.0/views/program/main-debug", "ekai/qtfm/1.0.0/collections/program-debug", "ekai/qtfm/1.0.0/models/program-debug", "ekai/qtfm/1.0.0/views/program/program-list-debug", "ekai/qtfm/1.0.0/views/program/program-item-debug", "ekai/qtfm/1.0.0/util-debug", "ekai/qtfm/1.0.0/views/play/index-debug", "ekai/qtfm/1.0.0/player-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/qtfm/1.0.0/routers/index-debug");
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
define("ekai/qtfm/1.0.0/routers/index-debug", [ "jquery-debug", "backbone-debug", "ekai/qtfm/1.0.0/views/broadcast/index-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/broadcast/main-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/radio-category-debug", "ekai/qtfm/1.0.0/models/radio-category-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/broadcast/sub-category-debug", "ekai/qtfm/1.0.0/views/lately/index-debug", "ekai/qtfm/1.0.0/views/lately/main-debug", "ekai/qtfm/1.0.0/collections/lately-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "ekai/qtfm/1.0.0/views/favorites/index-debug", "ekai/qtfm/1.0.0/views/favorites/main-debug", "ekai/qtfm/1.0.0/collections/favorites-channel-debug", "ekai/qtfm/1.0.0/views/channel/index-debug", "ekai/qtfm/1.0.0/views/channel/main-debug", "ekai/qtfm/1.0.0/views/program/index-debug", "ekai/qtfm/1.0.0/views/program/main-debug", "ekai/qtfm/1.0.0/collections/program-debug", "ekai/qtfm/1.0.0/models/program-debug", "ekai/qtfm/1.0.0/views/program/program-list-debug", "ekai/qtfm/1.0.0/views/program/program-item-debug", "ekai/qtfm/1.0.0/util-debug", "ekai/qtfm/1.0.0/views/play/index-debug", "ekai/qtfm/1.0.0/player-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var BroadcastView = require("ekai/qtfm/1.0.0/views/broadcast/index-debug");
    var LatelyView = require("ekai/qtfm/1.0.0/views/lately/index-debug");
    var FavoritesView = require("ekai/qtfm/1.0.0/views/favorites/index-debug");
    var ChannelView = require("ekai/qtfm/1.0.0/views/channel/index-debug");
    var ProgramView = require("ekai/qtfm/1.0.0/views/program/index-debug");
    var PlayView = require("ekai/qtfm/1.0.0/views/play/index-debug");
    var Player = require("ekai/qtfm/1.0.0/player-debug");
    var broadcastView, channelView, programView, playView, latelyView, favoritesView;
    var player = new Player();
    var preHash = "";
    var currentHash = "";
    module.exports = Backbone.Router.extend({
        routes: {
            "": "broadcastPage",
            lately: "latelyPage",
            broadcast: "broadcastPage",
            favorites: "favoritesPage",
            ":fromPage/channel-list/:catId": "channelPage",
            ":fromPage/program-list/:channelId": "programPage",
            ":fromPage/play/:channelId": "playPage"
        },
        execute: function(callback, args) {
            preHash = currentHash;
            currentHash = window.location.hash;
            if (callback) callback.apply(this, args);
        },
        navigateTo: function(hash) {
            this.navigate(hash, {
                trigger: true,
                replace: true
            });
        },
        backTo: function() {
            if (preHash) {
                this.navigateTo(preHash.substring(1, preHash.length));
            }
        },
        latelyPage: function() {
            if (latelyView) {
                latelyView.remove();
            }
            latelyView = new LatelyView();
            latelyView.mainView.footerView.player = player;
            this.listenTo(latelyView.mainView.channelListView, "navigate", this.navigateTo);
            $("body").prepend(latelyView.render().el);
            changePage(latelyView.$el);
        },
        broadcastPage: function() {
            if (!broadcastView) {
                broadcastView = new BroadcastView();
                $("body").prepend(broadcastView.render().el);
            }
            changePage(broadcastView.$el);
        },
        favoritesPage: function() {
            if (favoritesView) {
                favoritesView.remove();
            }
            favoritesView = new FavoritesView();
            favoritesView.mainView.footerView.player = player;
            this.listenTo(favoritesView.mainView.channelListView, "navigate", this.navigateTo);
            $("body").prepend(favoritesView.render().el);
            changePage(favoritesView.$el);
        },
        channelPage: function(fromPage, catId) {
            if (channelView) {
                channelView.remove();
            }
            channelView = new ChannelView({
                fromPage: fromPage,
                catId: catId
            });
            channelView.mainView.footerView.player = player;
            this.listenTo(channelView.mainView.channelListView, "navigate", this.navigateTo);
            $("body").prepend(channelView.render().el);
            changePage(channelView.$el);
        },
        programPage: function(fromPage, channelId) {
            if (programView) {
                programView.remove();
            }
            programView = new ProgramView({
                fromPage: fromPage,
                channelId: channelId
            });
            this.listenTo(programView.mainView, "back", this.backTo);
            $("body").prepend(programView.render().el);
            changePage(programView.$el);
        },
        playPage: function(fromPage, channelId) {
            if (playView) {
                playView.remove();
            }
            playView = new PlayView({
                fromPage: fromPage,
                channelId: channelId,
                player: player
            });
            this.listenTo(playView, "back", this.backTo);
            $("body").prepend(playView.render().el);
            changePage(playView.$el);
        }
    });
    var changePage = function(to, direction) {
        var from = $(".page.active");
        if (from.length <= 0) {
            from = null;
        }
        direction = direction || "right";
        var callback = function() {
            to.fadeIn(200, function() {
                to.css("display", "none");
                to.addClass("active");
            });
        };
        switch (direction) {
          case "left":
            {
                if (from) {
                    from.fadeOut(200, function() {
                        from.removeClass("active");
                    });
                }
                callback();
                break;
            }

          case "right":
            {
                if (from) {
                    from.fadeOut(200, function() {
                        from.removeClass("active");
                    });
                }
                callback();
                break;
            }
        }
    };
});

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/broadcast/index-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/broadcast/main-debug", "jquery-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/radio-category-debug", "ekai/qtfm/1.0.0/models/radio-category-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/broadcast/sub-category-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/qtfm/1.0.0/views/nav-debug");
    var MainView = require("ekai/qtfm/1.0.0/views/broadcast/main-debug");
    module.exports = Backbone.View.extend({
        pageName: "broadcast",
        className: "page broadcast",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.navView = new NavView();
            this.mainView = new MainView();
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Nav view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/nav-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/nav-debug.tpl");
    module.exports = Backbone.View.extend({
        tagName: "ul",
        className: "nav",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        activeItem: function(name) {
            this.$el.find(".item.active").removeClass("active");
            this.$el.find(".item." + name).addClass("active");
        }
    });
});

define("ekai/qtfm/1.0.0/templates/nav-debug.tpl", [], '<li class="item lately">\n    <a href="#lately" class="icon"></a>\n</li>\n<li class="item broadcast">\n    <a href="#broadcast" class="icon"></a>\n</li>\n<li class="item favorites">\n    <a href="#favorites" class="icon"></a>\n</li>');

/**
 * @Description: Broadcast main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/broadcast/main-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/radio-category-debug", "ekai/qtfm/1.0.0/models/radio-category-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/broadcast/sub-category-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var IScroll = require("iscroll-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/broadcast/main-debug.tpl");
    var LoadingTemplate = require("ekai/qtfm/1.0.0/templates/loading-debug.tpl");
    var RadioCollection = require("ekai/qtfm/1.0.0/collections/radio-category-debug");
    var subCategoryView = require("ekai/qtfm/1.0.0/views/broadcast/sub-category-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var allCategories = store.get(localKeys.all_categories);
    allCategories = allCategories || [];
    var civilCategories = store.get(localKeys.civil_categories);
    civilCategories = civilCategories || [];
    var internationalCategories = store.get(localKeys.international_categories);
    internationalCategories = internationalCategories || [];
    module.exports = Backbone.View.extend({
        className: "main no-footer",
        template: _.template(Template),
        events: {
            "tap .categories li": "catClickEvent",
            "tap .search-bar": "searchBarClickEvent",
            "tap .cancel-btn": "headerSearchCancelBtnClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.currentCat = "all";
            this.allCollection = new RadioCollection(allCategories);
            this.allCollection.url += "&id=100002";
            this.civilCollection = new RadioCollection(civilCategories);
            this.civilCollection.url += "&id=9";
            this.internationalCollection = new RadioCollection(internationalCategories);
            this.internationalCollection.url += "&id=96";
        },
        render: function() {
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template());
            this.prepareData();
            return this;
        },
        prepareData: function() {
            var localKey, collection;
            switch (this.currentCat) {
              case "all":
                {
                    localKey = localKeys.all_categories;
                    collection = this.allCollection;
                    break;
                }

              case "civil":
                {
                    localKey = localKeys.civil_categories;
                    collection = this.civilCollection;
                    break;
                }

              case "international":
                {
                    localKey = localKeys.international_categories;
                    collection = this.internationalCollection;
                    break;
                }
            }
            if (collection.length <= 0) {
                this.createLoadingWidget();
                this.fetchSubCategories(localKey, collection, this.renderSubCategories);
            } else {
                this.renderSubCategories(collection);
            }
        },
        catClickEvent: function(e) {
            var el = $(e.currentTarget);
            if (el.hasClass(this.currentCat)) {
                return;
            }
            if (el.hasClass("all")) {
                this.currentCat = "all";
            } else if (el.hasClass("civil")) {
                this.currentCat = "civil";
            } else if (el.hasClass("international")) {
                this.currentCat = "international";
            }
            var ulEl = this.$el.find(".sub-categories ul");
            ulEl.empty();
            this.prepareData();
        },
        searchBarClickEvent: function() {
            var maskEl = $("body>.mask");
            if (maskEl.length <= 0) {
                $("body").append('<div class="mask"></div>');
                maskEl = $("body>.mask");
            }
            this.$el.find(".header .title").hide();
            var headerSearchBar = this.$el.find(".header-search-bar");
            maskEl.fadeIn(150, function() {
                headerSearchBar.show();
            });
        },
        headerSearchCancelBtnClickEvent: function() {
            var self = this;
            var maskEl = $("body>.mask");
            var headerSearchBar = this.$el.find(".header-search-bar");
            maskEl.fadeOut(150, function() {
                headerSearchBar.hide();
                self.$el.find(".header .title").show();
            });
        },
        fetchSubCategories: function(localKey, collection, callback) {
            var self = this;
            collection.fetch({
                timeout: Settings.request_timeout,
                success: function(collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === "ok") {
                        store.set(localKey, collection.toJSON());
                        callback.call(self, collection);
                    } else {
                        self.createErrorDialog();
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
                $parent: this.$el.find(".sub-categories"),
                noticeContent: LoadingTemplate,
                iconDirection: "center",
                removeAfterHide: true,
                autoShow: true
            });
            this.loadingWidget.el.addClass("qtfm");
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
            msg = msg || "获取电台数据失败，请稍后再试...";
            setTimeout(function() {
                var tips = new topivi.tips.normal("", {
                    $parent: self.$el.find(".sub-categories"),
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: "auto",
                    autoHide: true
                });
                tips.el.addClass("error-tips");
                tips.show();
            }, 300);
        },
        renderSubCategories: function(collection) {
            var self = this;
            var ulEl = this.$el.find(".sub-categories ul");
            collection.each(function(model, collection, options) {
                var view = new subCategoryView({
                    model: model
                });
                ulEl.append(view.render().el);
            });
            setTimeout(function() {
                self.subCategoriesScroll = new IScroll(".page.broadcast .sub-categories", {
                    click: true
                });
            }, 100);
        }
    });
});

define("ekai/qtfm/1.0.0/templates/broadcast/main-debug.tpl", [], '<div class="header">\n    <h1 class="title">广播电台</h1>\n    <div class="header-search-bar">\n        <div class="frame">\n            <span class="icon"></span>\n            <input class="text" placeholder="请输入电台名称或频道"/>\n        </div>\n        <span class="cancel-btn">取消</span>\n    </div>\n</div>\n<div class="content">\n    <div class="search-bar">\n        <span class="icon"></span>\n        <span class="text">搜索</span>\n    </div>\n    <ul class="categories">\n        <li class="item all">\n            <div class="icon"></div>\n            <p class="label">所有</p>\n        </li>\n        <li class="item civil">\n            <div class="icon"></div>\n            <p class="label">国内台</p>\n        </li>\n        <li class="item international">\n            <div class="icon"></div>\n            <p class="label">国际台</p>\n        </li>\n    </ul>\n    <div class="sub-categories">\n        <ul class="scroller"></ul>\n    </div>\n</div>');

define("ekai/qtfm/1.0.0/templates/loading-debug.tpl", [], '<div class="icon"></div>\n<div class="text">数据加载中，请稍候...</div>');

/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/collections/radio-category-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/models/radio-category-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Model = require("ekai/qtfm/1.0.0/models/radio-category-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    module.exports = Backbone.Collection.extend({
        model: Model,
        url: Settings.API_URL + Settings.URLs.radio_category + "?app_key=" + Settings.APP_KEY,
        initialize: function() {},
        parse: function(res, options) {
            var result = [];
            if (res.status === "ok") {
                result = _.map(res.categories, function(category) {
                    return {
                        id: category.id,
                        name: category.name
                    };
                });
            }
            return result;
        }
    });
});

/**
 * @Description: Radio category model.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/models/radio-category-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    module.exports = Backbone.Model.extend({
        defaults: {},
        initialize: function() {}
    });
});

define("ekai/qtfm/1.0.0/settings-debug.json", [], {
    API_URL: "http://www.topivi.com:3001/api",
    APP_KEY: "d7c7ce69d618446d6a84081d62682018",
    STORAGE_KEYS: {
        all_categories: "qtfm_all_categories",
        civil_categories: "qtfm_civil_categories",
        international_categories: "qtfm_international_categories",
        all_channels: "qtfm_all_channels",
        last_played_channel: "qtfm_last_played_channel",
        lately_played_channels: "qtfm_lately_played_channels",
        favorite_channels: "qtfm_favorite_channels"
    },
    URLs: {
        radio_category: "/qtfm/category-list",
        channel_list: "/qtfm/channel-list",
        program_list: "/qtfm/program-list"
    },
    defaults: {
        thumbnail_url: "img/picture.png"
    },
    request_timeout: 8e3
});

/**
 * @Description: sub-category view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/broadcast/sub-category-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/broadcast/sub-category-debug.tpl");
    module.exports = Backbone.View.extend({
        tagName: "li",
        className: "item",
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

define("ekai/qtfm/1.0.0/templates/broadcast/sub-category-debug.tpl", [], '<a class="title" href="#broadcast/channel-list/{{=id}}">{{=name}}</a>');

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/lately/index-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/lately/main-debug", "jquery-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/collections/lately-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/channel-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/qtfm/1.0.0/views/nav-debug");
    var MainView = require("ekai/qtfm/1.0.0/views/lately/main-debug");
    module.exports = Backbone.View.extend({
        pageName: "lately",
        className: "page lately",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.navView = new NavView();
            this.mainView = new MainView({
                fromPage: this.pageName
            });
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Broadcast main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/lately/main-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/collections/lately-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/lately/main-debug.tpl");
    var ChannelCollection = require("ekai/qtfm/1.0.0/collections/lately-channel-debug");
    var FooterPlayView = require("ekai/qtfm/1.0.0/views/footer-play-debug");
    var ChannelListView = require("ekai/qtfm/1.0.0/views/channel-list-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        className: "main",
        template: _.template(Template),
        events: {
            "tap .header .clear": "clearAllClickEvent",
            "swipeleft .listview>.item": "itemSwipeLeftEvent",
            "swiperight .listview>.item": "itemSwipeRightEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.pageName = options.fromPage;
            this.collection = new ChannelCollection();
            this.channelListView = new ChannelListView({
                collection: this.collection,
                scrollSelector: ".page.lately>.main>.content"
            });
            this.footerView = new FooterPlayView({
                fromPage: this.pageName
            });
            this.listenTo(this.collection, "remove", this.removeItemEvent);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template({
                title: "最近收听"
            }));
            this.renderChannels();
            return this;
        },
        renderChannels: function() {
            var self = this;
            var storedChannels = store.get(localKeys.lately_played_channels);
            storedChannels = storedChannels || {};
            storedChannels = _.values(storedChannels);
            this.collection.reset(storedChannels);
            this.channelListView.pageName = this.pageName;
            this.$el.find(">.content").append(this.channelListView.render().el);
            this.$el.find(">.footer").append(this.footerView.render().el);
        },
        clearAllClickEvent: function() {
            if (this.collection.length <= 0) {
                return;
            }
            var self = this;
            var dialog = new topivi.dialog.confirm("", {
                content: "你确定要删除所有收听记录吗？",
                onOkClick: function() {
                    removeAllLatelyChannels();
                    self.footerView.stopPlay();
                    self.render();
                },
                removeAfterClose: true,
                useMask: true,
                closeGesture: "clickmask"
            });
            dialog.el.addClass("qtfm");
            dialog.open();
        },
        itemSwipeLeftEvent: function(e) {
            var itemEl = $(e.currentTarget);
            if (itemEl.hasClass("deleting")) {
                return;
            }
            itemEl.addClass("deleting");
            itemEl.append("<div class='delete-btn'></div>");
            itemEl.find(".delete-btn").fadeIn(300);
        },
        itemSwipeRightEvent: function(e) {
            var itemEl = $(e.currentTarget);
            if (!itemEl.hasClass("deleting")) {
                return;
            }
            itemEl.removeClass("deleting");
            itemEl.find(".delete-btn").remove();
        },
        removeItemEvent: function(model) {
            removeFromLatelyChannels(model.id);
            if (model.id === this.footerView.model.id) {
                removeLateChannel();
                this.footerView.stopPlay();
                this.footerView.render();
            }
        }
    });
    var removeAllLatelyChannels = function() {
        store.remove(localKeys.last_played_channel);
        store.remove(localKeys.lately_played_channels);
    };
    var removeLateChannel = function() {
        store.remove(localKeys.last_played_channel);
    };
    var removeFromLatelyChannels = function(channelId) {
        var channels = store.get(localKeys.lately_played_channels);
        channels = channels || {};
        channels[channelId] = undefined;
        store.set(localKeys.lately_played_channels, channels);
    };
});

define("ekai/qtfm/1.0.0/templates/lately/main-debug.tpl", [], '<div class="header">\n    <h1 class="title">{{=title}}</h1>\n    <span class="clear">清空</span>\n</div>\n<div class="content">\n\n</div>\n<div class="footer">\n\n</div>');

/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/collections/lately-channel-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Channel = require("ekai/qtfm/1.0.0/collections/channel-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    module.exports = Channel.extend({
        comparator: function(m1, m2) {
            return m1.get("listenDate") < m2.get("listenDate");
        },
        initialize: function() {}
    });
});

/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/collections/channel-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Model = require("ekai/qtfm/1.0.0/models/channel-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    module.exports = Backbone.Collection.extend({
        model: Model,
        url: Settings.API_URL + Settings.URLs.channel_list + "?app_key=" + Settings.APP_KEY,
        initialize: function() {},
        parse: function(res, options) {
            var result = [];
            if (res.status === "ok") {
                result = res.channels;
            }
            return result;
        }
    });
});

/**
 * @Description: Channel model.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/models/channel-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    module.exports = Backbone.Model.extend({
        url: Settings.API_URL + Settings.URLs.program_list + "?app_key=" + Settings.APP_KEY,
        defaults: {},
        initialize: function() {},
        parse: function(res) {
            if (res.id) {
                return parse(res);
            }
            var result = {};
            if (res.status === "ok") {
                result = parse(res.channel);
            }
            return result;
        },
        getTodayPrograms: function() {
            var result = [];
            var programs = this.get("programs");
            if (programs && !_.isEmpty(programs)) {
                var now = new Date();
                var day = now.getDay();
                if (day === 0) {
                    day = 7;
                }
                if (programs[day]) {
                    result = programs[day];
                }
            }
            return result;
        },
        getNowProgram: function() {
            var programs = this.getTodayPrograms();
            if (programs.length <= 0) {
                return {};
            }
            var nowTime = new Date().getTime();
            var program = _.find(programs, function(program) {
                var broadcastTime = program.broadcasttime;
                var duration = parseInt(program.duration);
                var parts = broadcastTime.split(":");
                var hours, mins;
                if (parts.length < 2) {
                    console.error("Data broadcasttime is invalid.");
                    return false;
                } else {
                    if (parts.length > 2) {
                        hours = parts[parts.length - 2];
                        mins = parts[parts.length - 1];
                    } else {
                        hours = parts[0];
                        mins = parts[1];
                    }
                }
                var begin = new Date();
                begin.setHours(hours);
                begin.setMinutes(mins);
                begin.setSeconds(0);
                var end = new Date(begin.getTime() + duration * 1e3);
                return nowTime >= begin.getTime() && nowTime <= end.getTime();
            });
            program = program || {};
            return program;
        },
        getNowProgramProgress: function() {
            var program = this.getNowProgram();
            var result = {
                current: 0,
                max: 0
            };
            if (!_.isEmpty(program)) {
                var broadcastTime = program.broadcasttime;
                var duration = parseInt(program.duration);
                // unit is second
                var parts = broadcastTime.split(":");
                var hours = parseInt(parts[0]);
                var mins = parseInt(parts[1]);
                var begin = new Date();
                begin.setHours(hours);
                begin.setMinutes(mins);
                begin.setSeconds(0);
                var now = new Date();
                var playedTime = now.getTime() - begin.getTime();
                result.current = parseInt(playedTime / 1e3);
                result.max = duration;
            }
            return result;
        }
    });
    var parse = function(channel) {
        return {
            id: channel.id,
            name: channel.name,
            desc: channel.desc ? channel.desc : "",
            frequency: channel.frequency,
            mediaId: channel.mediainfo.id,
            mediaSrc: getMediaSrc(channel.mediainfo.id),
            catId: channel.catid,
            thumbnail: channel.pic ? channel.pic : "",
            programs: channel.programs ? parseProgram(channel.programs) : {}
        };
    };
    var parseProgram = function(programs) {
        var result = {};
        _.each(programs, function(day) {
            result[day.dayofweek] = day.programs;
        });
        return result;
    };
    var getMediaSrc = function(mediaId) {
        return "http://http.qingting.fm/" + mediaId + ".mp3";
    };
});

/**
 * @Description: Footer play view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/footer-play-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "store-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/models/channel-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var store = require("store-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/footer-play-debug.tpl");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var ChannelModel = require("ekai/qtfm/1.0.0/models/channel-debug");
    module.exports = Backbone.View.extend({
        className: "footer-play",
        template: _.template(Template),
        events: {
            "tap .play-btn": "playBtnClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.pageName = options.fromPage;
            this.model = new ChannelModel();
        },
        render: function() {
            var self = this;
            var lastPlayedChannel = store.get(localKeys.last_played_channel);
            lastPlayedChannel = lastPlayedChannel || {};
            this.model.clear();
            this.model.set(lastPlayedChannel);
            this.$el.empty();
            this.$el.html(this.template({
                pageName: this.pageName,
                channel: this.model.attributes,
                isPlaying: this.player.isPlaying
            }));
            var el = this.$el.find(".play-progress");
            this.playProgress = new topivi.progress.line(el, {
                onEnd: function() {
                    console.log("end");
                }
            });
            if (this.model.id) {
                this.player.cut(this.model.get("mediaSrc"));
                this.player.addRunnable({
                    name: "footer-play",
                    fn: function() {
                        self.progressRunnable();
                    }
                });
                this.progressRunnable();
            }
            return this;
        },
        progressRunnable: function() {
            var progress = this.model.getNowProgramProgress();
            this.playProgress.options.max = progress.max;
            this.playProgress.setProgress(progress.current);
        },
        playBtnClickEvent: function(e) {
            if (!this.model.id) {
                return;
            }
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass("playing")) {
                this.player.pause();
            } else {
                this.player.play();
            }
            el.toggleClass("playing");
        },
        stopPlay: function() {
            this.player.stop();
            this.$el.find(".play-btn").removeClass("playing");
        }
    });
});

define("ekai/qtfm/1.0.0/templates/footer-play-debug.tpl", [], '<div class="wrapper">\n    {{\n        if (channel.id) {\n    }}\n    <a class="show-program-list" href="#{{=pageName}}/program-list/{{=channel.id}}"></a>\n    <a class="channel-title" href="#{{=pageName}}/play/{{=channel.id}}">{{=channel.name}}</a>\n    {{\n        } else {\n    }}\n    <a class="show-program-list"></a>\n    <p class="channel-title"></p>\n    {{\n        }\n    }}\n    <div class="play-btn {{=isPlaying ? \'playing\' : \'\'}}"></div>\n</div>\n<div class="play-progress"></div>');

/**
 * @Description: Channel list view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/channel-list-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "store-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var IScroll = require("iscroll-debug");
    var ItemView = require("ekai/qtfm/1.0.0/views/channel-item-debug");
    module.exports = Backbone.View.extend({
        tagName: "ul",
        className: "channel-list listview",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.scrollSelector = options.scrollSelector;
            this.listenTo(this.collection, "remove", this.removeItemEvent);
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.collection.each(function(model, list, options) {
                model.set("pageName", self.pageName);
                var view = new ItemView({
                    model: model,
                    parent: self
                });
                self.$el.append(view.render().el);
            });
            setTimeout(function() {
                self.listScroll = new IScroll(self.scrollSelector, {
                    click: true
                });
            }, 250);
            return this;
        },
        removeItemEvent: function(model) {
            this.listScroll.refresh();
        }
    });
});

/**
 * @Description: Channel item view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/channel-item-debug", [ "backbone-debug", "underscore-debug", "store-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/channel-item-debug.tpl");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        tagName: "li",
        className: "item",
        template: _.template(Template),
        events: {
            "tap .link": "linkClickEvent",
            "tap .delete-btn": "deleteBtnClick"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.parentView = options.parent;
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        linkClickEvent: function() {
            var channel = this.model.toJSON();
            channel.pageName = undefined;
            store.set(localKeys.last_played_channel, channel);
            var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
            latelyPlayedChannels = latelyPlayedChannels || {};
            channel.listenDate = new Date().getTime();
            latelyPlayedChannels[channel.id] = channel;
            store.set(localKeys.lately_played_channels, latelyPlayedChannels);
            var hash = this.model.get("pageName") + "/play/" + this.model.id;
            this.parentView.trigger("navigate", hash);
        },
        deleteBtnClick: function(e) {
            this.remove();
            this.parentView.collection.remove(this.model);
        }
    });
});

define("ekai/qtfm/1.0.0/templates/channel-item-debug.tpl", [], '<a class="link">\n    <h2 class="title">{{=name}}</h2>\n    <p class="desc">{{=desc}}</p>\n    {{\n        if (frequency) {\n    }}\n    <span class="mark frequency">FM {{=(frequency.indexOf(\'FM\') >= 0 || frequency.indexOf(\'fm\') >= 0) ? frequency.substr(0, 2) : frequency}}</span>\n    {{\n        }\n    }}\n</a>');

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/favorites/index-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/favorites/main-debug", "jquery-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/collections/favorites-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/channel-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/qtfm/1.0.0/views/nav-debug");
    var MainView = require("ekai/qtfm/1.0.0/views/favorites/main-debug");
    module.exports = Backbone.View.extend({
        pageName: "favorites",
        className: "page favorites",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.navView = new NavView();
            this.mainView = new MainView({
                fromPage: this.pageName
            });
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Favorites main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/favorites/main-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/collections/favorites-channel-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/favorites/main-debug.tpl");
    var ChannelCollection = require("ekai/qtfm/1.0.0/collections/favorites-channel-debug");
    var FooterPlayView = require("ekai/qtfm/1.0.0/views/footer-play-debug");
    var ChannelListView = require("ekai/qtfm/1.0.0/views/channel-list-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        className: "main",
        template: _.template(Template),
        events: {
            "tap .header .clear": "clearAllClickEvent",
            "swipeleft .listview>.item": "itemSwipeLeftEvent",
            "swiperight .listview>.item": "itemSwipeRightEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.pageName = options.fromPage;
            this.collection = new ChannelCollection();
            this.channelListView = new ChannelListView({
                collection: this.collection,
                scrollSelector: ".page.favorites>.main>.content"
            });
            this.footerView = new FooterPlayView({
                fromPage: this.pageName
            });
            this.listenTo(this.collection, "remove", this.removeItemEvent);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template({
                title: "我的收藏"
            }));
            this.renderChannels();
            return this;
        },
        renderChannels: function() {
            var self = this;
            var storedChannels = store.get(localKeys.favorite_channels);
            storedChannels = storedChannels || {};
            storedChannels = _.values(storedChannels);
            this.collection.reset(storedChannels);
            this.channelListView.pageName = this.pageName;
            this.$el.find(">.content").append(this.channelListView.render().el);
            this.$el.find(">.footer").append(this.footerView.render().el);
        },
        clearAllClickEvent: function() {
            if (this.collection.length <= 0) {
                return;
            }
            var self = this;
            var dialog = new topivi.dialog.confirm("", {
                content: "你确定要删除所有收藏记录吗？",
                onOkClick: function() {
                    removeAllFavoritesChannels();
                    self.render();
                },
                removeAfterClose: true,
                useMask: true,
                closeGesture: "clickmask"
            });
            dialog.el.addClass("qtfm");
            dialog.open();
        },
        itemSwipeLeftEvent: function(e) {
            var itemEl = $(e.currentTarget);
            if (itemEl.hasClass("deleting")) {
                return;
            }
            itemEl.addClass("deleting");
            itemEl.append("<div class='delete-btn'></div>");
            itemEl.find(".delete-btn").fadeIn(300);
        },
        itemSwipeRightEvent: function(e) {
            var itemEl = $(e.currentTarget);
            if (!itemEl.hasClass("deleting")) {
                return;
            }
            itemEl.removeClass("deleting");
            itemEl.find(".delete-btn").remove();
        },
        removeItemEvent: function(model) {
            removeFromFavoritesChannels(model.id);
        }
    });
    var removeAllFavoritesChannels = function() {
        store.remove(localKeys.favorite_channels);
    };
    var removeFromFavoritesChannels = function(channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channels[channelId] = undefined;
        store.set(localKeys.favorite_channels, channels);
    };
});

define("ekai/qtfm/1.0.0/templates/favorites/main-debug.tpl", [], '<div class="header">\n    <h1 class="title">{{=title}}</h1>\n    <span class="clear">清空</span>\n</div>\n<div class="content">\n\n</div>\n<div class="footer">\n\n</div>');

/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/collections/favorites-channel-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Channel = require("ekai/qtfm/1.0.0/collections/channel-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    module.exports = Channel.extend({
        comparator: function(m1, m2) {
            return m1.get("favoriteDate") < m2.get("favoriteDate");
        },
        initialize: function() {}
    });
});

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/channel/index-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/channel/main-debug", "jquery-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "ekai/qtfm/1.0.0/views/channel-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/qtfm/1.0.0/views/nav-debug");
    var MainView = require("ekai/qtfm/1.0.0/views/channel/main-debug");
    module.exports = Backbone.View.extend({
        className: "page channel",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.pageName = options.fromPage;
            this.navView = new NavView();
            this.mainView = new MainView(options);
        },
        resetCategoryId: function(catId) {
            this.mainView.catId = catId;
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Broadcast main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/channel/main-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "iscroll-debug", "ekai/qtfm/1.0.0/collections/channel-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/views/footer-play-debug", "ekai/qtfm/1.0.0/views/channel-list-debug", "ekai/qtfm/1.0.0/views/channel-item-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var IScroll = require("iscroll-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/channel/main-debug.tpl");
    var LoadingTemplate = require("ekai/qtfm/1.0.0/templates/loading-debug.tpl");
    var ChannelCollection = require("ekai/qtfm/1.0.0/collections/channel-debug");
    var FooterPlayView = require("ekai/qtfm/1.0.0/views/footer-play-debug");
    var ChannelListView = require("ekai/qtfm/1.0.0/views/channel-list-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        className: "main",
        template: _.template(Template),
        events: {},
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.catId = options.catId;
            this.pageName = options.fromPage;
            this.currentPage = 1;
            this.pageSize = 50;
            this.collection = new ChannelCollection();
            this.channelListView = new ChannelListView({
                collection: this.collection,
                scrollSelector: ".page.channel>.main>.content"
            });
            this.footerView = new FooterPlayView({
                fromPage: this.pageName
            });
        },
        render: function() {
            this.delegateEvents();
            this.$el.empty();
            var currentCategory = searchById(this.catId);
            this.$el.html(this.template({
                title: currentCategory.name,
                pageName: this.pageName
            }));
            var storedChannels = store.get(localKeys.all_channels);
            storedChannels = storedChannels || {};
            if (!storedChannels[this.catId]) {
                this.createLoadingWidget();
                this.fetchChannels(this.renderChannels);
            } else {
                this.collection.reset(storedChannels[this.catId]);
                this.renderChannels();
            }
            this.$el.find(">.footer").append(this.footerView.render().el);
            return this;
        },
        fetchChannels: function(callback) {
            var self = this;
            this.collection.fetch({
                timeout: Settings.request_timeout,
                data: {
                    id: this.catId,
                    curpage: this.currentPage,
                    pagesize: this.pageSize
                },
                success: function(collection, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === "ok") {
                        var storedChannels = store.get(localKeys.all_channels);
                        storedChannels = storedChannels || {};
                        storedChannels[self.catId] = collection.toJSON();
                        store.set(localKeys.all_channels, storedChannels);
                        callback.call(self);
                    } else {
                        self.createErrorDialog();
                    }
                },
                error: function(collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorDialog();
                }
            });
        },
        renderChannels: function() {
            var self = this;
            this.channelListView.pageName = this.pageName;
            this.$el.find(">.content").append(this.channelListView.render().el);
        },
        createLoadingWidget: function() {
            this.loadingWidget = new topivi.loading.normal("", {
                $parent: this.$el.find(">.content"),
                noticeContent: LoadingTemplate,
                iconDirection: "center",
                removeAfterHide: true,
                autoShow: true
            });
            this.loadingWidget.el.addClass("qtfm");
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
            msg = msg || "获取频道数据失败，请稍后再试...";
            setTimeout(function() {
                var tips = new topivi.tips.normal("", {
                    $parent: self.$el.find(">.content"),
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: "auto",
                    autoHide: true
                });
                tips.el.addClass("error-tips");
                tips.show();
            }, 300);
        }
    });
    var searchById = function(catId) {
        catId = parseInt(catId);
        var result = null;
        var allCategories = store.get(localKeys.all_categories);
        allCategories = allCategories || [];
        result = _.findWhere(allCategories, {
            id: catId
        });
        if (result) return result;
        var civilCategories = store.get(localKeys.civil_categories);
        civilCategories = civilCategories || [];
        result = _.findWhere(civilCategories, {
            id: catId
        });
        if (result) return result;
        var internationalCategories = store.get(localKeys.international_categories);
        internationalCategories = internationalCategories || [];
        result = _.findWhere(internationalCategories, {
            id: catId
        });
        if (result) return result;
        return "";
    };
});

define("ekai/qtfm/1.0.0/templates/channel/main-debug.tpl", [], '<div class="header">\n    <h1 class="title">{{=title}}</h1>\n    <a class="back-btn" href="#{{=pageName}}"></a>\n</div>\n<div class="content">\n\n</div>\n<div class="footer">\n\n</div>');

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/program/index-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/views/nav-debug", "ekai/qtfm/1.0.0/views/program/main-debug", "jquery-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/collections/program-debug", "ekai/qtfm/1.0.0/models/program-debug", "ekai/qtfm/1.0.0/views/program/program-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/program/program-item-debug", "ekai/qtfm/1.0.0/util-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var NavView = require("ekai/qtfm/1.0.0/views/nav-debug");
    var MainView = require("ekai/qtfm/1.0.0/views/program/main-debug");
    module.exports = Backbone.View.extend({
        className: "page program",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.pageName = options.fromPage;
            this.navView = new NavView();
            this.mainView = new MainView(options);
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.navView.render().el);
            this.navView.activeItem(this.pageName);
            this.$el.append(this.mainView.render().el);
            return this;
        }
    });
});

/**
 * @Description: Broadcast main view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/program/main-debug", [ "jquery-debug", "backbone-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/collections/program-debug", "ekai/qtfm/1.0.0/models/program-debug", "ekai/qtfm/1.0.0/views/program/program-list-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/program/program-item-debug", "ekai/qtfm/1.0.0/util-debug", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/program/main-debug.tpl");
    var LoadingTemplate = require("ekai/qtfm/1.0.0/templates/loading-debug.tpl");
    var ChannelModel = require("ekai/qtfm/1.0.0/models/channel-debug");
    var ProgramCollection = require("ekai/qtfm/1.0.0/collections/program-debug");
    var ProgramListView = require("ekai/qtfm/1.0.0/views/program/program-list-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        className: "main no-footer",
        template: _.template(Template),
        events: {
            "tap .add-favorite": "addFavoriteBtnClickEvent",
            "tap .back-btn": "backBtnClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.channelId = options.channelId;
            this.pageName = options.fromPage;
            this.day = "1,2,3,4,5,6,7";
            this.model = new ChannelModel();
            this.collection = new ProgramCollection();
            this.programListView = new ProgramListView({
                currentChannel: this.model,
                scrollSelector: ".page.program .listview-wrapper"
            });
        },
        render: function() {
            this.delegateEvents();
            this.$el.empty();
            var currentChannel = searchChannelById(this.channelId);
            currentChannel = currentChannel || {};
            this.model.clear();
            this.model.set(currentChannel);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            this.$el.html(this.template({
                title: this.model.get("name"),
                isFavorite: favoriteChannel ? true : false
            }));
            var programs = this.model.getTodayPrograms();
            if (!programs || programs.length <= 0) {
                this.createLoadingWidget();
                this.fetchPrograms(this.renderPrograms);
            } else {
                this.renderPrograms();
            }
            return this;
        },
        addFavoriteBtnClickEvent: function(e) {
            var el = $(e.currentTarget);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            if (favoriteChannel) {
                removeFromFavoriteChannel(this.channelId);
                el.removeClass("added");
            } else {
                storeIntoFavoriteChannel(this.model.toJSON());
                el.addClass("added");
            }
        },
        backBtnClickEvent: function() {
            this.trigger("back");
        },
        fetchPrograms: function(callback) {
            var self = this;
            this.model.fetch({
                timeout: Settings.request_timeout,
                data: {
                    id: this.channelId,
                    day: this.day
                },
                success: function(model, res, options) {
                    self.hideLoadingWidget();
                    if (res.status === "ok") {
                        storeChannel(model.toJSON());
                        callback.call(self);
                    } else {
                        self.createErrorDialog();
                    }
                },
                error: function(collection, res, options) {
                    self.hideLoadingWidget();
                    self.createErrorDialog();
                }
            });
        },
        renderPrograms: function() {
            var self = this;
            var programs = this.model.getTodayPrograms();
            this.collection.reset(programs);
            this.programListView.collection = this.collection;
            this.programListView.pageName = this.pageName;
            this.$el.find(">.content .count-label .value").text(this.collection.length);
            this.$el.find(">.content .listview-wrapper").append(this.programListView.render().el);
        },
        createLoadingWidget: function() {
            this.loadingWidget = new topivi.loading.normal("", {
                $parent: this.$el.find(">.content"),
                noticeContent: LoadingTemplate,
                iconDirection: "center",
                removeAfterHide: true,
                autoShow: true
            });
            this.loadingWidget.el.addClass("qtfm");
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
            msg = msg || "获取频道数据失败，请稍后再试...";
            setTimeout(function() {
                var tips = new topivi.tips.normal("", {
                    $parent: self.$el.find(">.content"),
                    removeAfterHide: true,
                    dependEl: self.$el,
                    content: msg,
                    direction: "auto",
                    autoHide: true
                });
                tips.el.addClass("error-tips");
                tips.show();
            }, 300);
        }
    });
    var searchChannelById = function(channelId) {
        var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
        latelyPlayedChannels = latelyPlayedChannels || {};
        return latelyPlayedChannels[channelId];
    };
    var storeChannel = function(channel) {
        var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
        latelyPlayedChannels = latelyPlayedChannels || {};
        channel.listenDate = new Date().getTime();
        latelyPlayedChannels[channel.id] = channel;
        store.set(localKeys.lately_played_channels, latelyPlayedChannels);
    };
    var searchInFavoriteChannels = function(channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        return channels[channelId];
    };
    var storeIntoFavoriteChannel = function(channel) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channel.favoriteDate = new Date().getTime();
        channels[channel.id] = channel;
        store.set(localKeys.favorite_channels, channels);
    };
    var removeFromFavoriteChannel = function(channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channels[channelId] = undefined;
        store.set(localKeys.favorite_channels, channels);
    };
});

define("ekai/qtfm/1.0.0/templates/program/main-debug.tpl", [], '<div class="header">\n    <h1 class="title">{{=title}}</h1>\n    <a class="back-btn"></a>\n    <a class="add-favorite {{=isFavorite ? \'added\' : \'\'}}"></a>\n</div>\n<div class="content">\n    <div class="count-label">\n        <p class="wrapper">节目列表（<span class="value"></span>条）</p>\n    </div>\n    <div class="listview-wrapper"></div>\n</div>');

/**
 * @Description: Radio category collection.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/collections/program-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/models/program-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Model = require("ekai/qtfm/1.0.0/models/program-debug");
    module.exports = Backbone.Collection.extend({
        model: Model,
        initialize: function() {}
    });
});

/**
 * @Description: program model.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/models/program-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    module.exports = Backbone.Model.extend({
        defaults: {},
        initialize: function() {}
    });
});

/**
 * @Description: Channel list view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/program/program-list-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "ekai/qtfm/1.0.0/views/program/program-item-debug", "ekai/qtfm/1.0.0/util-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var IScroll = require("iscroll-debug");
    var ItemView = require("ekai/qtfm/1.0.0/views/program/program-item-debug");
    module.exports = Backbone.View.extend({
        tagName: "ul",
        className: "program-list listview",
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.channelModel = options.currentChannel;
            this.scrollSelector = options.scrollSelector;
        },
        render: function() {
            var self = this;
            this.$el.empty();
            var nowProgram = this.channelModel.getNowProgram();
            var nowProgramView = null;
            this.collection.each(function(model, list, options) {
                model.set("pageName", self.pageName);
                var view = new ItemView({
                    model: model
                });
                self.$el.append(view.render().el);
                if (nowProgram.id === model.id) {
                    nowProgramView = view;
                }
            });
            setTimeout(function() {
                self.listScroll = new IScroll(self.scrollSelector, {
                    click: true
                });
                if (nowProgramView) {
                    self.listScroll.scrollToElement(nowProgramView.el, 800);
                    nowProgramView.$el.addClass("current");
                }
            }, 250);
            return this;
        }
    });
});

/**
 * @Description: Channel item view.
 * @Author: fuwensong
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/program/program-item-debug", [ "backbone-debug", "underscore-debug", "ekai/qtfm/1.0.0/util-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/program/program-item-debug.tpl");
    var util = require("ekai/qtfm/1.0.0/util-debug");
    module.exports = Backbone.View.extend({
        tagName: "li",
        className: "item",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            this.$el.html(this.template({
                program: this.model.attributes,
                util: util
            }));
            return this;
        }
    });
});

define("ekai/qtfm/1.0.0/templates/program/program-item-debug.tpl", [], "{{\n    var updateTimeDiff = util.parseTimeDiff(program.updatetime);\n    var updateTimeDiffStr = '';\n    switch (updateTimeDiff.unit) {\n        case 's':\n            updateTimeDiffStr = updateTimeDiff.num + '秒前更新';\n            break;\n        case 'm':\n            updateTimeDiffStr = updateTimeDiff.num + '分钟前更新';\n            break;\n        case 'h':\n            updateTimeDiffStr = updateTimeDiff.num + '小时前更新';\n            break;\n        default:\n            var date = new Date(program.updatetime * 1000);\n            updateTimeDiffStr = (date.getMonth() + 1) + '月' + date.getDate() + '日更新';\n            break;\n    }\n    var duringTimeStr = util.parseTime(program.duration);\n}}\n<a class=\"link\">\n    <h2 class=\"title\">{{=program.name}}</h2>\n    <p class=\"desc update-time\">{{=updateTimeDiffStr}}</p>\n    <span class=\"mark duration\">\n        {{=program.broadcasttime}} / {{=duringTimeStr.h > 0 ? duringTimeStr.h + '小时' : ''}}{{=duringTimeStr.m > 0 || duringTimeStr.s ? duringTimeStr.m + '分' : ''}}{{=duringTimeStr.s > 0 ? duringTimeStr.s + '秒' : ''}}\n    </span>\n</a>");

/**
 * @Description:
 * @Author: fuwensong
 * @Date: 14-10-16
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/util-debug", [], function(require, exports, module) {
    exports.parseTimeDiff = function(time) {
        var nowTime = new Date().getTime();
        var diff = parseInt(nowTime / 1e3) - time;
        var temp = diff;
        // seconds
        if (temp < 60) {
            return {
                num: temp,
                unit: "s"
            };
        }
        temp = parseInt(temp / 60);
        // mins
        if (temp < 60) {
            return {
                num: temp,
                unit: "m"
            };
        }
        temp = parseInt(temp / 60);
        // hours
        if (temp < 24) {
            return {
                num: temp,
                unit: "h"
            };
        }
        temp = parseInt(temp / 24);
        // days
        if (temp < 7) {
            return {
                num: temp,
                unit: "d"
            };
        }
        var week = parseInt(temp / 7);
        // week
        if (week < 4) {
            return {
                num: week,
                unit: "w"
            };
        }
        temp = parseInt(temp / 30);
        // month
        if (temp < 12) {
            return {
                num: temp,
                unit: "mon"
            };
        }
        temp = parseInt(temp / 12);
        // year
        return {
            num: temp,
            unit: "y"
        };
    };
    exports.parseTime = function(seconds) {
        var hours = seconds / 3600;
        var str = "";
        if (hours > 0) {
            hours = parseInt(hours);
            seconds = seconds % 3600;
        }
        var mins = seconds / 60;
        if (mins > 0) {
            mins = parseInt(mins);
            seconds = seconds % 60;
        }
        return {
            h: hours,
            m: mins,
            s: seconds
        };
    };
});

/**
 * @Description: Broadcast page view.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/views/play/index-debug", [ "backbone-debug", "jquery-debug", "underscore-debug", "store-debug", "topivi-debug", "ekai/qtfm/1.0.0/util-debug", "ekai/qtfm/1.0.0/models/channel-debug", "ekai/qtfm/1.0.0/settings-debug.json", "ekai/qtfm/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = require("jquery-debug");
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var topivi = require("topivi-debug");
    var util = require("ekai/qtfm/1.0.0/util-debug");
    var Template = require("ekai/qtfm/1.0.0/templates/play/main-debug.tpl");
    var ChannelModel = require("ekai/qtfm/1.0.0/models/channel-debug");
    var Settings = require("ekai/qtfm/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    module.exports = Backbone.View.extend({
        className: "page play",
        template: _.template(Template),
        events: {
            "tap .back-btn": "backBtnClickEvent",
            "tap .play-btn": "playBtnClickEvent",
            "tap .add-favorite": "addFavoriteBtnClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.player = options.player;
            this.pageName = options.fromPage;
            this.day = "1,2,3,4,5,6,7";
            this.channelId = options.channelId;
            this.model = new ChannelModel();
        },
        render: function() {
            var self = this;
            this.$el.empty();
            var channel = store.get(localKeys.last_played_channel);
            this.model.clear();
            this.model.set(channel);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            this.$el.html(this.template({
                pageName: this.pageName,
                channel: this.model.attributes,
                isPlaying: true,
                isFavorite: favoriteChannel ? true : false,
                defaultThumbnail: Settings.defaults.thumbnail_url
            }));
            var el = this.$el.find(".play-progress");
            this.playProgress = new topivi.progress.line(el, {
                onEnd: function() {
                    console.log("end");
                }
            });
            this.player.cut(this.model.get("mediaSrc"));
            this.player.addRunnable({
                name: "play-page",
                fn: function() {
                    self.progressRunnable();
                }
            });
            this.player.play();
            this.progressRunnable();
            var programs = this.model.getTodayPrograms();
            if (!programs || programs.length <= 0) {
                this.fetchPrograms(this.renderProgram);
            } else {
                this.renderProgram();
            }
            return this;
        },
        fetchPrograms: function(callback) {
            var self = this;
            this.model.fetch({
                timeout: Settings.request_timeout,
                data: {
                    id: this.channelId,
                    day: this.day
                },
                success: function(model, res, options) {
                    if (res.status === "ok") {
                        storeChannel(model.toJSON());
                        callback.call(self);
                    }
                }
            });
        },
        renderProgram: function() {
            var nowProgram = this.model.getNowProgram();
            var currentProgramName = nowProgram && !_.isEmpty(nowProgram) ? nowProgram.name : "暂无节目";
            this.$el.find(">.content .current-program").text(currentProgramName);
        },
        progressRunnable: function() {
            var progress = this.model.getNowProgramProgress();
            this.playProgress.options.max = progress.max;
            this.playProgress.setProgress(progress.current);
            var max = util.parseTime(progress.max);
            var current = util.parseTime(progress.current);
            this.$el.find(">.content .text .played").text(current.h + ":" + (current.m > 9 ? current.m : "0" + current.m) + ":" + (current.s > 9 ? current.s : "0" + current.s));
            this.$el.find(">.content .text .account").text(max.h + ":" + (max.m > 9 ? max.m : "0" + max.m) + ":" + (max.s > 9 ? max.s : "0" + max.s));
        },
        backBtnClickEvent: function(e) {
            this.trigger("back");
        },
        playBtnClickEvent: function(e) {
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass("playing")) {
                this.player.pause();
            } else {
                this.player.play();
            }
            el.toggleClass("playing");
        },
        addFavoriteBtnClickEvent: function(e) {
            var el = $(e.currentTarget);
            var favoriteChannel = searchInFavoriteChannels(this.channelId);
            if (favoriteChannel) {
                removeFromFavoriteChannel(this.channelId);
                el.removeClass("added");
            } else {
                storeIntoFavoriteChannel(this.model.toJSON());
                el.addClass("added");
            }
        }
    });
    var storeChannel = function(channel) {
        store.set(localKeys.last_played_channel, channel);
        var latelyPlayedChannels = store.get(localKeys.lately_played_channels);
        latelyPlayedChannels = latelyPlayedChannels || {};
        channel.listenDate = new Date().getTime();
        latelyPlayedChannels[channel.id] = channel;
        store.set(localKeys.lately_played_channels, latelyPlayedChannels);
    };
    var searchInFavoriteChannels = function(channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        return channels[channelId];
    };
    var storeIntoFavoriteChannel = function(channel) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channel.favoriteDate = new Date().getTime();
        channels[channel.id] = channel;
        store.set(localKeys.favorite_channels, channels);
    };
    var removeFromFavoriteChannel = function(channelId) {
        var channels = store.get(localKeys.favorite_channels);
        channels = channels || {};
        channels[channelId] = undefined;
        store.set(localKeys.favorite_channels, channels);
    };
});

define("ekai/qtfm/1.0.0/templates/play/main-debug.tpl", [], '<div class="header">\n    <a class="back-btn"></a>\n</div>\n<div class="content">\n    <div class="wrapper">\n        <img class="thumbnail" src="{{=channel.thumbnail || defaultThumbnail}}"/>\n        <p class="current-program"></p>\n        <div class="program-progress">\n            <div class="play-progress">\n            </div>\n            <div class="text">\n                <span class="played">01:10</span>\n                <span class="account">04:20</span>\n            </div>\n        </div>\n        <div class="btns">\n            <span class="prev"></span>\n            <span class="play-btn {{=isPlaying ? \'playing\' : \'\'}}"></span>\n            <span class="next"></span>\n        </div>\n    </div>\n</div>\n<div class="footer">\n    <p class="title">{{=channel.name}}{{\n        if (channel.frequency) {\n        }}\n        <span class="mark frequency">FM {{=(channel.frequency.indexOf(\'FM\') >= 0 || channel.frequency.indexOf(\'fm\') >= 0) ? channel.frequency.substr(0, 2) : channel.frequency}}</span>\n        {{\n        }\n        }}</p>\n    <a class="show-program-list" href="#{{=pageName}}/program-list/{{=channel.id}}"></a>\n    <span class="add-favorite {{=isFavorite ? \'added\' : \'\'}}"></span>\n</div>');

/**
 * @Description:
 * @Author: fuwensong
 * @Date: 14-10-16
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/qtfm/1.0.0/player-debug", [ "underscore-debug" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    function Player(options) {
        options = options || {};
        var defaults = {
            onEnd: function() {}
        };
        _.extend(this, defaults, options);
        this.init();
    }
    Player.prototype.init = function() {
        var self = this;
        this.audio = document.createElement("audio");
        this.audio.addEventListener("ended", function(e) {
            self.onEnd.apply(self, arguments);
        });
        this.isPlaying = false;
        this.interval = null;
        this.runnables = {};
    };
    Player.prototype.play = function() {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.audio.play();
        this.startInterval();
    };
    Player.prototype.pause = function() {
        if (!this.isPlaying) {
            return;
        }
        this.isPlaying = false;
        this.audio.pause();
        this.clearInterval();
    };
    Player.prototype.stop = function() {
        if (this.src) {
            this.audio.currentTime = 0;
        }
        this.pause();
    };
    Player.prototype.cut = function(src) {
        if (src === this.src) {
            return;
        }
        this.src = src;
        this.audio.src = src;
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    };
    Player.prototype.addRunnable = function(runnable) {
        var name = runnable.name;
        this.disableRunnable(name);
        this.runnables[name] = runnable.fn;
    };
    Player.prototype.disableRunnable = function(name) {
        if (this.runnables[name]) {
            this.runnables[name] = undefined;
        }
    };
    Player.prototype.startInterval = function() {
        var self = this;
        var seconds = 1e3;
        this.interval = setInterval(function() {
            for (var name in self.runnables) {
                var fn = self.runnables[name];
                fn();
            }
        }, seconds);
    };
    Player.prototype.clearInterval = function() {
        clearInterval(this.interval);
    };
    module.exports = Player;
});
