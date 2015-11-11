define("ekai/maintenance/1.0.0/main-debug", [ "backbone-debug", "ekai/maintenance/1.0.0/routers/index-debug", "ekai/maintenance/1.0.0/views/home-debug", "underscore-debug", "store-debug", "ekai/maintenance/1.0.0/views/details-debug", "iscroll-debug", "ekai/maintenance/1.0.0/settings-debug.json", "ekai/maintenance/1.0.0/views/repair-debug", "ekai/maintenance/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/maintenance/1.0.0/routers/index-debug");
    var router = new Router();
    var store = require("store-debug");
    var Settings = require("ekai/maintenance/1.0.0/settings-debug.json");
    Backbone.history.start();
    var LocalMaintenance = store.get("maintenance");
    if (LocalMaintenance == undefined) {
        store.set("maintenance", Settings.Data);
    }
});

define("ekai/maintenance/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/maintenance/1.0.0/views/home-debug", "underscore-debug", "store-debug", "ekai/maintenance/1.0.0/views/details-debug", "iscroll-debug", "ekai/maintenance/1.0.0/settings-debug.json", "ekai/maintenance/1.0.0/views/repair-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = Backbone.$;
    var HomeView = require("ekai/maintenance/1.0.0/views/home-debug");
    var DetailsView = require("ekai/maintenance/1.0.0/views/details-debug");
    var RepairPageView = require("ekai/maintenance/1.0.0/views/repair-debug");
    var homeView = null;
    var detailsView = null;
    var repairPageView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "tag/:tagId": "details",
            repairshop: "repair"
        },
        homePage: function(page) {
            page = page || "all";
            if (!homeView) {
                homeView = new HomeView();
                Backbone.$("body").append(homeView.render().el);
                homeView.$el.addClass("active");
            } else {
                Backbone.$(".page.active").removeClass("active");
                Backbone.$("body").append(homeView.render().el);
                homeView.$el.addClass("active");
            }
            var self = this;
            this.listenTo(homeView, "navigate", function(url) {
                self.navigate(url, {
                    trigger: true
                });
            });
        },
        details: function(id) {
            if (!detailsView) {
                detailsView = new DetailsView({
                    tagId: id
                });
                Backbone.$("body").append(detailsView.render().el);
            } else {
                detailsView.tagId = id;
                detailsView.render();
            }
            Backbone.$(".page.active").remove();
            detailsView.$el.addClass("active");
        },
        repair: function(id) {
            if (!repairPageView) {
                repairPageView = new RepairPageView();
                Backbone.$("body").append(repairPageView.render().el);
            } else {
                repairPageView.render();
            }
            Backbone.$(".page.active").removeClass("active");
            repairPageView.$el.addClass("active");
        }
    });
});

/**
 * Created by wangyuhao on 14-10-10.
 */
define("ekai/maintenance/1.0.0/views/home-debug", [ "backbone-debug", "underscore-debug", "store-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var store = require("store-debug");
    var HomeView = require("ekai/maintenance/1.0.0/templates/home-debug.tpl");
    var ckeckTagData = {};
    module.exports = Backbone.View.extend({
        className: "page home",
        template: _.template(HomeView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        events: {
            "taphold .tag": "tapHoldTag",
            "taphold .moreTag": "tapHoldTag",
            "click .update-btn": "dataUpdate",
            "click .tag": "clickTag",
            "click .moreTag": "clickTag"
        },
        initialize: function() {
            this.on("tapHoldTag", this.updateBtn);
        },
        render: function() {
            this.delegateEvents();
            this.$el.empty();
            this.$el.append(this.template({
                ckeckTagData: ckeckTagData
            }));
            if (this.$el.find(".checkTag").length > 0) {
                this.$el.find(".main .update-btn").addClass("active");
            }
            return this;
        },
        tapHoldTag: function(e) {
            e.stopImmediatePropagation();
            var el = $(e.currentTarget);
            var key = parseInt(el.attr("data-key"));
            if (el.find(".checkTag").length > 0) {
                if (ckeckTagData[key]) {
                    ckeckTagData[key] = false;
                }
                el.find(".checkTag").remove();
            } else {
                ckeckTagData[key] = true;
                el.append('<div class="checkTag"></div>');
            }
            this.trigger("tapHoldTag");
            this.isHolding = true;
        },
        updateBtn: function() {
            if (this.$el.find(".main .checkTag").length > 0) {
                this.$el.find(".main .update-btn").addClass("active");
            } else {
                this.$el.find(".main .update-btn").removeClass("active");
                ckeckTagData = {};
            }
        },
        dataUpdate: function() {
            var LocalMaintenance = store.get("maintenance");
            var p = this.$el.find(".checkTag");
            var d = $(".checkTag").parent();
            var Week = [ "日", "一", "二", "三", "四", "五", "六" ];
            for (var i = 0; i < d.length; i++) {
                var j = $(d).eq(i).attr("class");
                var s = j.indexOf(" ");
                var tagName = j.substring(s + 1);
                var nowDate = new Date();
                var month = parseInt(nowDate.getMonth()) + 1;
                var nowDate = nowDate.getFullYear() + "年" + month + "月" + nowDate.getDate() + "日" + "  " + "周" + Week[nowDate.getDay()];
                var data = LocalMaintenance[tagName];
                var latelyTime = data.nowTime;
                data.latelyTime = latelyTime;
                data.nowTime = nowDate;
                LocalMaintenance[tagName] = data;
                store.set("maintenance", LocalMaintenance);
            }
            this.$el.find(".checkTag").remove();
            var self = this;
            setTimeout(function() {
                ckeckTagData = {};
                self.$el.find(".update-btn").removeClass("active");
            }, 100);
        },
        clickTag: function(e) {
            if (this.isHolding) {
                this.isHolding = false;
                return;
            }
            if (Backbone.$("body").find(".main .tag .checkTag")[0]) {
                return;
            } else {
                var el = Backbone.$(e.currentTarget);
                var key = el.attr("data-key");
                this.trigger("navigate", "tag/" + key);
            }
        }
    });
});

define("ekai/maintenance/1.0.0/templates/home-debug.tpl", [], '<div class="main">\n    <div class="tag engine" data-key="1">\n        {{\n            if (ckeckTagData[\'1\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n            }\n        }}\n    </div>\n    <div class="tag fuel" data-key="2">\n        {{\n            if (ckeckTagData[\'2\']) {\n        }}\n            <div class="checkTag"></div>\n        {{\n            }\n        }}\n    </div>\n    <div class="tag cartridge" data-key="3">\n        {{\n        if (ckeckTagData[\'3\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="tag tyre" data-key="4">\n        {{\n        if (ckeckTagData[\'4\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="tag cell" data-key="5">\n        {{\n        if (ckeckTagData[\'5\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="tag break" data-key="6">\n        {{\n        if (ckeckTagData[\'6\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="tag brush" data-key="7">\n        {{\n        if (ckeckTagData[\'7\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="tag refrigerator" data-key="8">\n        {{\n        if (ckeckTagData[\'8\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n\n    </div>\n    <div class="tag brake-oil" data-key="9">\n        {{\n        if (ckeckTagData[\'9\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n\n    </div>\n    <div class="tag transmission-oil" data-key="10">\n        {{\n        if (ckeckTagData[\'10\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n\n    </div>\n    <div class="moreTag service" data-key="11">\n        {{\n        if (ckeckTagData[\'11\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="moreTag filtration" data-key="12">\n        {{\n        if (ckeckTagData[\'12\']) {\n        }}\n        <div class="checkTag"></div>\n        {{\n        }\n        }}\n    </div>\n    <div class="update-btn"></div>\n    <div class="appointment-btn"></div>\n        <a  class="shop-btn" href="#/repairshop">\n            <div class="btn-img"></div>\n        </a>\n\n</div>\n');

/**
 * Created by wangyuhao on 14-10-10.
 */
define("ekai/maintenance/1.0.0/views/details-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "store-debug", "ekai/maintenance/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var IScroll = require("iscroll-debug");
    var store = require("store-debug");
    var Settings = require("ekai/maintenance/1.0.0/settings-debug.json");
    var detailsView = require("ekai/maintenance/1.0.0/templates/details-debug.tpl");
    var TagData = [ "engine", "fuel", "cartridge", "tyre", "cell", "break", "brush", "refrigerator", "brake-oil", "transmission-oil", "service", "filtration" ];
    var LocalMaintenance = store.get("maintenance");
    module.exports = Backbone.View.extend({
        className: "page information",
        template: _.template(detailsView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            var tagId = options.tagId;
            this.tagId = tagId;
        },
        events: {
            "swipeleft .content": "swipeLeftTag",
            "swiperight .content": "swipeRightTag",
            "click .tag": "changeTag"
        },
        render: function() {
            var LocalMaintenance = store.get("maintenance");
            var self = this;
            this.$el.empty();
            switch (parseInt(self.tagId)) {
              case 1:
                var uptwo = 11;
                var upone = 12;
                var nextone = 2;
                var nexttwo = 3;
                break;

              case 2:
                var uptwo = 12;
                var upone = 1;
                var nextone = 3;
                var nexttwo = 4;
                break;

              case 11:
                var uptwo = 9;
                var upone = 10;
                var nextone = 12;
                var nexttwo = 1;
                break;

              case 12:
                var uptwo = 10;
                var upone = 11;
                var nextone = 1;
                var nexttwo = 2;
                break;

              default:
                var uptwo = parseInt(self.tagId) - 2;
                var upone = parseInt(self.tagId) - 1;
                var nextone = parseInt(self.tagId) + 1;
                var nexttwo = parseInt(self.tagId) + 2;
            }
            var localKey = TagData[self.tagId - 1];
            this.$el.append(this.template({
                uptwo: {
                    className: TagData[uptwo - 1],
                    tagId: uptwo
                },
                upone: {
                    className: TagData[upone - 1],
                    tagId: upone
                },
                now: {
                    className: TagData[self.tagId - 1],
                    tagId: self.tagId
                },
                nextone: {
                    className: TagData[nextone - 1],
                    tagId: nextone
                },
                nexttwo: {
                    className: TagData[nexttwo - 1],
                    tagId: nexttwo
                },
                data: LocalMaintenance[localKey]
            }));
            return this;
        },
        swipeLeftTag: function(e) {
            var el = $(e.currentTarget);
            var dataKey = el.find("li:eq(2)").attr("data-key");
            var key = parseInt(dataKey) + 1;
            if (key == 13) {
                this.tagId = 1;
            } else {
                this.tagId = key;
            }
            this.render();
        },
        swipeRightTag: function(e) {
            var el = $(e.currentTarget);
            var dataKey = el.find("li:eq(2)").attr("data-key");
            var key = parseInt(dataKey) - 1;
            if (key == 0) {
                this.tagId = 12;
            } else {
                this.tagId = key;
            }
            this.render();
        },
        changeTag: function(e) {
            var el = $(e.currentTarget);
            var dataKey = el.attr("data-key");
            this.tagId = dataKey;
            this.render();
        }
    });
});

define("ekai/maintenance/1.0.0/settings-debug.json", [], {
    Data: {
        engine: {
            latelyTime: "2014年10月12日 周日",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        fuel: {
            latelyTime: "2014年10月11日 周六",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        cartridge: {
            latelyTime: "2014年10月13日 周一",
            nowTime: "2014年10月13日 周一",
            mileage: "998.00 公里",
            remainMileage: "460.00 公里"
        },
        tyre: {
            latelyTime: "2014年10月13日 周一",
            nowTime: "2014年10月13日 周一",
            mileage: "469.00 公里",
            remainMileage: "10.00 公里"
        },
        cell: {
            latelyTime: "2014年10月9日 周四",
            nowTime: "2014年10月13日 周一",
            mileage: "130.00 公里",
            remainMileage: "270.00 公里"
        },
        "break": {
            latelyTime: "2014年10月8日 周三",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        brush: {
            latelyTime: "2014年8月1日 周五",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        refrigerator: {
            latelyTime: "2014年8月2日 周六",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        "brake-oil": {
            latelyTime: "2014年8月13日 周三",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        "transmission-oil": {
            latelyTime: "2014年9月17日 周三",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        service: {
            latelyTime: "2014年9月1日 周一",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        },
        filtration: {
            latelyTime: "2014年9月13日 周六",
            nowTime: "2014年10月13日 周一",
            mileage: "1000.00 公里",
            remainMileage: "500.00 公里"
        }
    }
});

define("ekai/maintenance/1.0.0/templates/details-debug.tpl", [], '\n<div class="back">\n    <a href="#"></a>\n</div>\n<div class="content">\n<div class="head">\n    <ul>\n        <li class="tag {{=uptwo.className}}" data-key="{{=uptwo.tagId}}"></li>\n        <li class="tag {{=upone.className}}" data-key="{{=upone.tagId}}"></li>\n        <li class="tag {{=now.className}}" data-key="{{=now.tagId}}"></li>\n        <li class="tag {{=nextone.className}}" data-key="{{=nextone.tagId}}"></li>\n        <li class="tag {{=nexttwo.className}}" data-key="{{=nexttwo.tagId}}"></li>\n    </ul>\n    <div class="box"></div>\n</div>\n<div class="foot">\n    <div class="item">\n        <p class="text">上次维修时间</p>\n        <p class="semicolon">:</p>\n        <p class="textbox">{{=data.latelyTime}}</p>\n    </div>\n    <div class="item">\n        <p class="text">本次维修时间</p>\n        <p class="semicolon">:</p>\n        <p class="textbox">{{=data.nowTime}}</p>\n    </div>\n    <div class="item">\n        <p class="text">本次保养里程</p>\n        <p class="semicolon">:</p>\n        <p class="textbox">{{=data.mileage}}</p>\n    </div>\n    <div class="item">\n        <p class="text">剩余保养里程</p>\n        <p class="semicolon">:</p>\n        <p class="textbox">{{=data.remainMileage}}</p>\n    </div>\n</div>\n</div>');

/**
 * Created by wangyuhao on 14-10-10.
 */
define("ekai/maintenance/1.0.0/views/repair-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var RepairView = require("ekai/maintenance/1.0.0/templates/repair-debug.tpl");
    module.exports = Backbone.View.extend({
        className: "page shop",
        template: _.template(RepairView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {},
        render: function() {
            this.$el.empty();
            this.$el.append(this.template({}));
            return this;
        }
    });
});

define("ekai/maintenance/1.0.0/templates/repair-debug.tpl", [], '<div class="back">\n    <a href="#"></a>\n</div>\n<div class="repair-page">\n<div class="my-shop">\n    <div class="my-icon"></div>\n    <p class="my-title">我的4S店</p>\n    <p class="stop-information">裕兴专营店</p>\n</div>\n<div class="column">\n    <div class="icon" id="saler-icon"></div>\n    <div class="title">经 销 商</div>\n    <p class="information">裕兴专营店</p>\n</div>\n<div class="column">\n    <div class="icon" id="phone-icon"></div>\n    <div class="title">电&nbsp&nbsp&nbsp&nbsp&nbsp话 </div>\n    <p class="information">021-681752222\n    </p>\n\n</div>\n<div class="column">\n    <div class="icon" id="address-icon"></div>\n    <div class="title">地&nbsp&nbsp&nbsp&nbsp&nbsp址</div>\n    <p class="information">上海市浦东新区沪南公路7511号\n    </p>\n</div>\n<div class="map">\n    <div class="go-btn"></div>\n</div>\n</div>');
