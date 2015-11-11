define("ekai/phone/1.0.0/main-debug", [ "backbone-debug", "ekai/phone/1.0.0/routers/index-debug", "ekai/phone/1.0.0/views/index-debug", "underscore-debug", "ekai/phone/1.0.0/views/dial-debug", "topivi-debug", "ekai/phone/1.0.0/views/dialing-debug", "ekai/phone/1.0.0/views/contact-debug", "iscroll-debug", "ekai/phone/1.0.0/views/contact-item-debug", "ekai/phone/1.0.0/views/recent-debug", "ekai/phone/1.0.0/views/favorites-debug", "ekai/phone/1.0.0/contacts-debug.json", "ekai/phone/1.0.0/collections/contact-debug", "ekai/phone/1.0.0/models/contact-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = Backbone.$;
    var Router = require("ekai/phone/1.0.0/routers/index-debug");
    var router = new Router();
    Backbone.history.start();
});

/**
 * Created by wangyuhao on 14-9-26.
 */
define("ekai/phone/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/phone/1.0.0/views/index-debug", "underscore-debug", "ekai/phone/1.0.0/views/dial-debug", "topivi-debug", "ekai/phone/1.0.0/views/dialing-debug", "ekai/phone/1.0.0/views/contact-debug", "iscroll-debug", "ekai/phone/1.0.0/views/contact-item-debug", "ekai/phone/1.0.0/views/recent-debug", "ekai/phone/1.0.0/views/favorites-debug", "ekai/phone/1.0.0/contacts-debug.json", "ekai/phone/1.0.0/collections/contact-debug", "ekai/phone/1.0.0/models/contact-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var HomeView = require("ekai/phone/1.0.0/views/index-debug");
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
 * Created by fuwensong on 14-7-4.
 */
define("ekai/phone/1.0.0/views/index-debug", [ "backbone-debug", "underscore-debug", "ekai/phone/1.0.0/views/dial-debug", "topivi-debug", "ekai/phone/1.0.0/views/dialing-debug", "ekai/phone/1.0.0/views/contact-debug", "iscroll-debug", "ekai/phone/1.0.0/views/contact-item-debug", "ekai/phone/1.0.0/views/recent-debug", "ekai/phone/1.0.0/views/favorites-debug", "ekai/phone/1.0.0/contacts-debug.json", "ekai/phone/1.0.0/collections/contact-debug", "ekai/phone/1.0.0/models/contact-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var phoneTemplate = require("ekai/phone/1.0.0/templates/app-phone-debug.tpl");
    var DialView = require("ekai/phone/1.0.0/views/dial-debug");
    var ContactView = require("ekai/phone/1.0.0/views/contact-debug");
    var RecentView = require("ekai/phone/1.0.0/views/recent-debug");
    var FavoritesView = require("ekai/phone/1.0.0/views/favorites-debug");
    var contacts = require("ekai/phone/1.0.0/contacts-debug.json");
    var ContactsCollection = require("ekai/phone/1.0.0/collections/contact-debug");
    module.exports = Backbone.View.extend({
        className: "app-phone",
        template: _.template(phoneTemplate),
        events: {
            "click .nav-btns .item": "navItemClickEvent",
            "click .dialing": "dialingClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.currentPage = "dial";
            this.contactsCollection = new ContactsCollection(contacts);
            this.dialView = new DialView({
                collection: this.contactsCollection
            });
            this.contactView = new ContactView({
                collection: this.contactsCollection
            });
            this.contactView.indexView = this;
            this.currentView = this.dialView;
            this.on("switchPage", this.switchPage);
            this.recentView = new RecentView({
                collection: this.contactsCollection
            });
            this.favoritesView = new FavoritesView({
                collection: this.contactsCollection
            });
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template({
                page: this.currentPage
            }));
            var view;
            switch (this.currentPage) {
              case "dial":
                this.dialView.$el = this.$el.find(".dial-page");
                view = this.dialView;
                break;

              case "phone-book":
                this.contactView.$el = this.$el.find(".phone-book-page");
                view = this.contactView;
                break;

              case "recent-call":
                this.recentView.$el = this.$el.find("recent-call-pag");
                view = this.recentView;
                break;

              case "favorites":
                this.favoritesView.$el = this.$el.find("favorites-page");
                view = this.favoritesView;
                break;
            }
            view.render();
            this.$el.find(".page.active").removeClass("active");
            view.$el.addClass("active");
            this.currentView = view;
            return this;
        },
        navItemClickEvent: function(event) {
            var el = $(event.target);
            var page = el.attr("data-page");
            if (page == this.currentPage) {
                return;
            }
            this.$el.find(".nav-btns .active").removeClass("active");
            el.addClass("active");
            this.currentPage = page;
            this.render();
        },
        switchPage: function(options) {
            options = options || {
                page: "dial"
            };
            this.currentPage = options.page;
            this.render();
            if (options.fn) {
                this.currentView[options.fn].call(this.currentView, options);
            }
        },
        saveToRecent: function(options) {}
    }, {
        tag: "phone"
    });
});

define("ekai/phone/1.0.0/templates/app-phone-debug.tpl", [], '<div class="nav-btns">\n    <div class="item favorites {{=page == \'favorites\' ? \'active\' : \'\'}}" data-page="favorites"></div>\n    <div class="item recent-call {{=page == \'recent-call\' ? \'active\' : \'\'}}" data-page="recent-call"></div>\n    <div class="item phone-book {{=page == \'phone-book\' ? \'active\' : \'\'}}" data-page="phone-book"></div>\n    <div class="item dial {{=page == \'dial\' ? \'active\' : \'\'}}" data-page="dial"></div>\n</div>\n<div class="favorites-page page">\n</div>\n<div class="recent-call-page page">\n</div>\n<div class="phone-book-page page">\n</div>\n<div class="dial-page page">\n</div>');

/**
 * Created by fuwensong on 14-7-4.
 */
define("ekai/phone/1.0.0/views/dial-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "ekai/phone/1.0.0/views/dialing-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var topivi = require("topivi-debug");
    var dialTemplate = require("ekai/phone/1.0.0/templates/dial-page-debug.tpl");
    var DialingView = require("ekai/phone/1.0.0/views/dialing-debug");
    module.exports = Backbone.View.extend({
        template: _.template(dialTemplate),
        events: {
            "click .dial-btns .numbers>div": "numberClickEvent",
            "click .dial-top .dial-delete": "dialDeleteClickEvent",
            "click .dialing": "dialingClickEvent",
            "taphold .dial-delete": "dialDeleteHoldEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.dialingView = new DialingView();
            this.listenTo(this.dialingView, "hangUp", this.hangUpEvent);
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template());
            this.dialingView.$el = this.$el.find(".dialing-pad");
            if (this.cursorInterval) {
                clearInterval(this.cursorInterval);
            }
            this.cursorInterval = setInterval(function() {
                self.$el.find(".dial-cursor").toggleClass("hide");
            }, 500);
            return this;
        },
        numberClickEvent: function(event) {
            var value = $(event.target).attr("data-value");
            var dialNumberEl = this.$el.find(".dial-top .dial-number");
            var text = dialNumberEl.text();
            text += value;
            dialNumberEl.text(text);
        },
        dialDeleteClickEvent: function() {
            var dialNumberEl = this.$el.find(".dial-top .dial-number");
            var text = dialNumberEl.text();
            if (text) {
                text = text.substring(0, text.length - 1);
            }
            dialNumberEl.text(text);
        },
        dialingClickEvent: function() {
            var dialog = new topivi.dialog.normal("", {
                removeAfterClose: true,
                content: "未接入模块，请稍后再试...",
                useMask: true,
                closeGesture: "clickmask swiperight"
            });
            dialog.el.addClass("phone");
            dialog.open();
        },
        dialDeleteHoldEvent: function() {
            this.$el.find(".dial-top .dial-number").text("");
        },
        hangUpEvent: function() {
            this.dialingView.$el.hide();
            this.$el.find(".dial-pad").show();
        }
    });
});

define("ekai/phone/1.0.0/templates/dial-page-debug.tpl", [], '<div class="dial-pad">\n    <div class="dial-top">\n        <div class="dial-number"></div>\n        <div class="dial-delete"></div>\n        <div class="dial-cursor">_</div>\n    </div>\n    <div class="dial-btns">\n        <div class="numbers">\n            <div class="number1" data-value="1"></div>\n            <div class="number2" data-value="2"></div>\n            <div class="number3" data-value="3"></div>\n            <div class="number4" data-value="4"></div>\n            <div class="number5" data-value="5"></div>\n            <div class="number6" data-value="6"></div>\n            <div class="number7" data-value="7"></div>\n            <div class="number8" data-value="8"></div>\n            <div class="number9" data-value="9"></div>\n            <div class="number-mi" data-value="*"></div>\n            <div class="number0" data-value="0"></div>\n            <div class="number-jin" data-value="#"></div>\n        </div>\n        <div class="dialing"></div>\n    </div>\n</div>\n<div class="dialing-pad">\n</div>');

/**
 * Created by fuwensong on 14-7-4.
 */
define("ekai/phone/1.0.0/views/dialing-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var phoneDialingTemplate = require("ekai/phone/1.0.0/templates/dial-page-dialing-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "app-phone",
        template: _.template(phoneDialingTemplate),
        events: {
            "click .hang-up-btn": "hangUpClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            this.$el.find(".outer").addClass("diffusion");
            this.$el.find(".outer-bigger").addClass("diffusion");
            return this;
        },
        hangUpClickEvent: function() {
            this.$el.find(".outer").removeClass("diffusion");
            this.trigger("hangUp");
        }
    });
});

define("ekai/phone/1.0.0/templates/dial-page-dialing-debug.tpl", [], '<div class="dialing-info">\n    <div class="title"><span class="number">{{=number}}</span><span class="connecting">连接中...</span></div>\n    <div class="layers">\n        <div class="layer outer-bigger"></div>\n        <div class="layer outer"></div>\n        <div class="layer inner"></div>\n        <img class="layer avatar" src="{{=avatar}}"/>\n        <div class="layer inner-center">\n            <p class="name">{{=name}}</p>\n        </div>\n    </div>\n    <div class="attribution">{{=attribution}}</div>\n</div>\n<div class="hang-up-btn"></div>\n');

/**
 * Created by fuwensong on 14-7-4.
 */
define("ekai/phone/1.0.0/views/contact-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "ekai/phone/1.0.0/views/contact-item-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var IScroll = require("iscroll-debug");
    var phoneContactTemplate = require("ekai/phone/1.0.0/templates/contact-page-debug.tpl");
    var contactItemView = require("ekai/phone/1.0.0/views/contact-item-debug");
    module.exports = Backbone.View.extend({
        template: _.template(phoneContactTemplate),
        events: {
            "click .off-hook": "offHookClick"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template());
            var listEl = this.$el.find("#contact-list ul");
            var models = this.collection.sortBy("sorter");
            _.each(models, function(model, index, list) {
                if (index > 0) {
                    var previous = list[index - 1];
                    var sorter = model.get("sorter");
                    var previousSorter = previous.get("sorter");
                    model.set("is_show_index", !(sorter == previousSorter));
                } else {
                    model.set("is_show_index", true);
                }
                var item = new contactItemView({
                    model: model
                });
                listEl.append(item.render().el);
            });
            setTimeout(function() {
                self.scroll = new IScroll("#contact-list", {
                    hScroll: false,
                    vScrollbar: false
                });
                self.letterScroll = new IScroll("#letter-list", {
                    hScroll: false,
                    vScrollbar: false
                });
            }, 100);
            return this;
        },
        offHookClick: function(event) {
            var el = $(event.target);
            this.indexView.trigger("switchPage", {
                page: "dial",
                fn: "dialingClickEvent",
                number: el.prev(".number").text()
            });
            this.indexView.trigger("saveToRecent", {});
        }
    });
});

define("ekai/phone/1.0.0/templates/contact-page-debug.tpl", [], '<div id="contact-list">\n    <ul>\n\n    </ul>\n</div>\n<div id="letter-list">\n    <ul>\n        <li></li><li></li><li></li>\n        {{\n            var code = \'A\'.charCodeAt();\n            for (var i = 0; i < 26; i++) {\n        }}\n            <li class="{{=(i == 0) ? \'bigger\': \'\'}}">{{= String.fromCharCode(code + i)}}</li>\n        {{\n            }\n        }}\n        <li></li><li></li><li></li>\n    </ul>\n    <div class="circle"></div>\n</div>');

/**
 * Created by caiyidi on 14/08/21.
 */
define("ekai/phone/1.0.0/views/contact-item-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var phoneContactItemTemplate = require("ekai/phone/1.0.0/templates/contact-page-item-debug.tpl");
    module.exports = Backbone.View.extend({
        tagName: "li",
        template: _.template(phoneContactItemTemplate),
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

define("ekai/phone/1.0.0/templates/contact-page-item-debug.tpl", [], '<div class="index">{{=is_show_index ? sorter : \'\'}}</div>\n<div class="info">\n    <div class="name">{{=name}}</div>\n    <div class="number">{{=number}}</div>\n    <div class="off-hook"></div>\n</div>');

/**
 * Created by wangyuhao on 14-9-26.
 */
define("ekai/phone/1.0.0/views/recent-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    module.exports = Backbone.View.extend({
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.on("hangUp", this.recent);
        },
        render: function() {
            var self = this;
            return this;
        },
        recent: function() {}
    });
});

/**
 * Created by wangyuhao on 14-9-26.
 */
define("ekai/phone/1.0.0/views/favorites-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    module.exports = Backbone.View.extend({
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            var self = this;
            return this;
        }
    });
});

define("ekai/phone/1.0.0/contacts-debug.json", [], [ {
    id: "1",
    name: "蔡亦迪",
    number: "13818812627",
    attribution: "上海·移动",
    avatar: "img/linyoujia.jpg",
    sorter: "C"
}, {
    id: "2",
    name: "傅文松",
    number: "13167181237",
    attribution: "上海·联通",
    avatar: "img/yangzongwei.jpg",
    sorter: "F"
}, {
    id: "3",
    name: "法律在线",
    number: "110",
    attribution: "中国",
    avatar: "img/110.jpg",
    sorter: "F"
}, {
    id: "4",
    name: "億凯信息技术",
    number: "51314558",
    attribution: "中国·上海",
    avatar: "img/110.jpg",
    sorter: "Y"
}, {
    id: "5",
    name: "新国际博览中心",
    number: "51801133",
    attribution: "中国·上海",
    avatar: "img/xinguoji.png",
    sorter: "X"
}, {
    id: "6",
    name: "中国移动",
    number: "10086",
    attribution: "中国移动",
    sorter: "Z"
}, {
    id: "7",
    name: "联通",
    number: "10010",
    attribution: "联通",
    sorter: "L"
}, {
    id: "8",
    name: "电信",
    number: "10000",
    attribution: "电信",
    sorter: "D"
}, {
    id: "9",
    name: "查询电话号码",
    number: "114",
    attribution: "中国·上海",
    sorter: "C"
}, {
    id: "10",
    name: "天气预报",
    number: "121",
    attribution: "中国·上海",
    sorter: "X"
}, {
    id: "11",
    name: "报时服务",
    number: "121",
    attribution: "中国·上海",
    sorter: "B"
}, {
    id: "12",
    name: "水务热线",
    number: "84500",
    attribution: "中国·上海",
    sorter: "S"
}, {
    id: "13",
    name: "消协热线",
    number: "12315",
    attribution: "中国·上海",
    sorter: "X"
}, {
    id: "14",
    name: "打假热线",
    number: "63177329",
    attribution: "中国·上海",
    sorter: "D"
}, {
    id: "15",
    name: "环卫热线",
    number: "52901111",
    attribution: "中国·上海",
    sorter: "H"
}, {
    id: "16",
    name: "煤气热线",
    number: "83777",
    attribution: "中国·上海",
    sorter: "M"
}, {
    id: "17",
    name: "邮政服务",
    number: "185",
    attribution: "中国·上海",
    sorter: "Y"
}, {
    id: "18",
    name: "公安报警",
    number: "110",
    attribution: "中国·上海",
    sorter: "G"
}, {
    id: "19",
    name: "阿甘",
    number: "15245691212",
    attribution: "中国·上海",
    sorter: "A"
} ]);

/**
 * Created by wangyuhao on 14-9-26.
 */
define("ekai/phone/1.0.0/collections/contact-debug", [ "ekai/phone/1.0.0/models/contact-debug", "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var ContactModel = require("ekai/phone/1.0.0/models/contact-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    module.exports = Backbone.Collection.extend({
        model: ContactModel,
        initialize: function() {}
    });
});

/**
 * Created by wangyuhao on 14-9-26.
 */
define("ekai/phone/1.0.0/models/contact-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    module.exports = Backbone.Model.extend({
        defaults: {
            name: "",
            attribution: "Unknown",
            avatar: "img/kuaizixiongdi.jpg"
        },
        initialize: function() {}
    });
});
