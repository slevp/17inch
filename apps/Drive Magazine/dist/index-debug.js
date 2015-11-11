
define("ekai/drive-magazine/1.0.0/main-debug", [ "backbone-debug", "ekai/drive-magazine/1.0.0/routers/index-debug", "ekai/drive-magazine/1.0.0/views/home-debug", "underscore-debug", "store-debug", "ekai/drive-magazine/1.0.0/data/data-debug.json", "ekai/drive-magazine/1.0.0/collections/books-debug", "ekai/drive-magazine/1.0.0/models/book-debug", "topivi-debug", "ekai/drive-magazine/1.0.0/views/details-debug", "iscroll-debug", "ekai/drive-magazine/1.0.0/collections/images-debug", "ekai/drive-magazine/1.0.0/models/image-debug", "iscroll/5.1.2/iscroll-probe-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/drive-magazine/1.0.0/routers/index-debug");
    var router = new Router();
    Backbone.history.start();
});

define("ekai/drive-magazine/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/drive-magazine/1.0.0/views/home-debug", "underscore-debug", "store-debug", "ekai/drive-magazine/1.0.0/data/data-debug.json", "ekai/drive-magazine/1.0.0/collections/books-debug", "ekai/drive-magazine/1.0.0/models/book-debug", "topivi-debug", "ekai/drive-magazine/1.0.0/views/details-debug", "iscroll-debug", "ekai/drive-magazine/1.0.0/collections/images-debug", "ekai/drive-magazine/1.0.0/models/image-debug", "iscroll/5.1.2/iscroll-probe-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = Backbone.$;
    var HomeView = require("ekai/drive-magazine/1.0.0/views/home-debug");
    var DetailsView = require("ekai/drive-magazine/1.0.0/views/details-debug");
    var homeView = null;
    var detailsView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "book/:bookId": "details"
        },
        homePage: function(page) {
            var self = this;
            if (!homeView) {
                homeView = new HomeView();
                Backbone.$("body").append(homeView.render().el);
                Backbone.$(".page.active").removeClass("active");
                homeView.$el.addClass("active");
            } else {
                Backbone.$("body").find(".active").removeClass("active");
                homeView.$el.addClass("active");
            }
            this.listenTo(homeView, "clickBook", function(url) {
                self.navigate(url, {
                    trigger: true
                });
            });
        },
        details: function(id) {
            if (detailsView) {
                detailsView.remove();
            }
            detailsView = new DetailsView({
                bookId: id
            });
            Backbone.$(".page.active").removeClass("active");
            Backbone.$("body").append(detailsView.render().el);
            detailsView.$el.addClass("active");
        }
    });
});

/**
 * Created by wangyuhao on 14-10-10.
 */
define("ekai/drive-magazine/1.0.0/views/home-debug", [ "backbone-debug", "underscore-debug", "store-debug", "ekai/drive-magazine/1.0.0/data/data-debug.json", "ekai/drive-magazine/1.0.0/collections/books-debug", "ekai/drive-magazine/1.0.0/models/book-debug", "topivi-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var store = require("store-debug");
    var Datas = require("ekai/drive-magazine/1.0.0/data/data-debug.json");
    var HomeView = require("ekai/drive-magazine/1.0.0/templates/home-debug.tpl");
    var bookColl = require("ekai/drive-magazine/1.0.0/collections/books-debug");
    store.set("books", Datas.Data);
    var books = store.get("books");
    module.exports = Backbone.View.extend({
        className: "page home",
        template: _.template(HomeView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        events: {
            "click .item": "clickBook"
        },
        initialize: function() {
            this.collection = new bookColl(books);
        },
        render: function() {
            this.delegateEvents();
            if (this.collection.length > 0) {
                console.log(this.collection.length);
            }
            this.$el.empty();
            this.$el.append(this.template({
                books: books,
                length: this.collection.length
            }));
            return this;
        },
        clickBook: function(e) {
            e.stopImmediatePropagation();
            var el = $(e.currentTarget);
            var dataKey = el.attr("data-key");
            if (parseInt(dataKey) > 1) {} else {
                this.trigger("clickBook", "#/book/" + dataKey);
            }
        }
    });
});

define("ekai/drive-magazine/1.0.0/data/data-debug.json", [], {
    Data: [ {
        id: "1",
        name: "智驾杂志",
        type: "",
        cover: "magazine/autor/1111.jpg",
        img: [ {
            src: "magazine/autor/AutoR4.jpg"
        }, {
            src: "magazine/autor/AutoR6.jpg"
        }, {
            src: "magazine/autor/AutoR8.jpg"
        }, {
            src: "magazine/autor/AutoR10.jpg"
        }, {
            src: "magazine/autor/AutoR22.jpg"
        }, {
            src: "magazine/autor/AutoR23.jpg"
        }, {
            src: "magazine/autor/AutoR24.jpg"
        }, {
            src: "magazine/autor/AutoR25.jpg"
        }, {
            src: "magazine/autor/AutoR27.jpg"
        }, {
            src: "magazine/autor/AutoR28.jpg"
        }, {
            src: "magazine/autor/AutoR34.jpg"
        }, {
            src: "magazine/autor/AutoR36.jpg"
        }, {
            src: "magazine/autor/AutoR37.jpg"
        } ],
        time: "1413363707"
    }, {
        id: "2",
        name: "汽车杂志",
        type: "",
        cover: "magazine/qichezazhi/qichezazhi_01.png",
        img: [ {
            src: "magazine/qichezazhi/qichezazhi_06.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_07.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_08.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_09.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_10.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_11.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_12.png"
        }, {
            src: "magazine/qichezazhi/qichezazhi_13.png"
        } ],
        time: "1413363707"
    }, {
        id: "3",
        name: "智驾杂志",
        type: "",
        cover: "magazine/autor/3333.jpg",
        img: [],
        time: "1413363707"
    }, {
        id: "4",
        name: "智驾杂志",
        type: "",
        cover: "magazine/autor/4444.jpg",
        img: [],
        time: "1413363707"
    }, {
        id: "5",
        name: "智驾杂志",
        type: "",
        cover: "magazine/autor/5555.jpg",
        img: [],
        time: "1413363707"
    }, {
        id: "6",
        name: "智驾杂志",
        type: "",
        cover: "magazine/autor/6666.jpg",
        img: [],
        time: "1413363707"
    } ]
});

define("ekai/drive-magazine/1.0.0/templates/home-debug.tpl", [], '<div class="main">\n    <ul>\n    {{\n        var height = Math.floor(length/4) + 1;\n        for( var i = 0; i < 3 ; i ++) {\n        var m = 4 *(i+1);\n    }}\n        <li class="column">\n            <div class="books">\n                {{\n                    for(var n = 4 * i; n < m; n ++) {\n                        if (n > length - 1) {\n                            break;\n                        }\n                }}\n                        <div class="item {{=books[n].img.length <= 0 ? \'no-data\' : \'\'}}" data-key="{{=n}}">\n                            <img alt="" src="{{=books[n].cover}}"/>\n                            <p class="label">未下载</p>\n                        </div>\n\n                {{\n                    }\n                }}\n            </div>\n         </li>\n{{\n    }\n}}\n            </ul>\n    <div class="shop-btn">\n        <a href="#/shop">商店</a>\n    </div>\n</div>\n');

/**
 * @Description: App collection.
 * @Author: wangyuhao
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/drive-magazine/1.0.0/collections/books-debug", [ "backbone-debug", "ekai/drive-magazine/1.0.0/models/book-debug", "underscore-debug", "topivi-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Book = require("ekai/drive-magazine/1.0.0/models/book-debug");
    module.exports = Backbone.Collection.extend({
        model: Book,
        url: function() {
            return;
        },
        parse: function(response) {
            return response.apps;
        }
    });
});

/**
 * @Description: App model.
 * @Author: wangyuhao
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/drive-magazine/1.0.0/models/book-debug", [ "backbone-debug", "underscore-debug", "topivi-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    module.exports = Backbone.Model.extend({
        initialize: function() {}
    });
});

/**
 * Created by wangyuhao on 14-10-10.
 */
define("ekai/drive-magazine/1.0.0/views/details-debug", [ "backbone-debug", "underscore-debug", "iscroll-debug", "store-debug", "ekai/drive-magazine/1.0.0/collections/images-debug", "ekai/drive-magazine/1.0.0/models/image-debug", "iscroll/5.1.2/iscroll-probe-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var $ = Backbone.$;
    var IScroll = require("iscroll-debug");
    var store = require("store-debug");
    var detailsView = require("ekai/drive-magazine/1.0.0/templates/details-debug.tpl");
    var imageColl = require("ekai/drive-magazine/1.0.0/collections/images-debug");
    var books = store.get("books");
    var IScrollProbe = require("iscroll/5.1.2/iscroll-probe-debug");
    var isDragging = false;
    var isScrolling = false;
    module.exports = Backbone.View.extend({
        className: "page read ",
        template: _.template(detailsView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            var bookId = options.bookId;
            this.bookId = bookId;
            this.collection = new imageColl(books[this.bookId].img);
        },
        events: {
            "click .content .imgs": "showHead"
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.append(this.template({
                title: books[this.bookId].name,
                imageData: this.collection.models
            }));
            var progressEl = this.$el.find(".content .progress-line");
            var progressTop = progressEl.offset().top;
            var circleEl = this.$el.find(".content .circle");
            setTimeout(function() {
                self.resetScrollWidth();
                self.scroll = new IScrollProbe(".content", {
                    scrollX: true,
                    scrollY: false,
                    probeType: 1,
                    zoom: true,
                    wheelAction: "zoom"
                });
                var progressLength = progressEl.height();
                self.$el.find(".circle").drag("options", {
                    axis: "y",
                    min: {
                        top: 0
                    },
                    max: {
                        top: progressLength
                    },
                    ondrag: function(e) {
                        isDragging = true;
                        var circleTop = circleEl.offset().top;
                        var diff = circleTop - progressTop;
                        var percentage = diff / progressLength;
                        var index = Math.floor(percentage * self.collection.length);
                        if (index > self.collection.length) {
                            index = self.collection.length;
                        }
                        var el = self.$el.find(".content ul li:eq(" + (index - 1) + ")");
                        self.scroll.scrollToElement(el[0], 500);
                        self.$el.find(".head").hide();
                    },
                    ondragend: function() {
                        isDragging = false;
                        self.$el.find(".head").hide();
                    }
                });
                self.scroll.on("scroll", function() {
                    isScrolling = true;
                    if (isDragging) return;
                    var changeWidth = Math.abs(this.x);
                    var changeProportion = changeWidth / Math.abs(this.maxScrollX);
                    var diffHeight = progressLength * changeProportion;
                    var newTop = progressTop + diffHeight;
                    self.$el.find(".content .progress .circle").css("top", newTop);
                    self.$el.find(".head").hide();
                });
                self.scroll.on("scrollEnd", function() {
                    isScrolling = false;
                });
            }, 200);
            this.setHideHeaderTimeout();
            return this;
        },
        setHideHeaderTimeout: function() {
            var self = this;
            this.headerTimeout = setTimeout(function() {
                self.$el.find(".head").fadeOut(1e3);
            }, 5e3);
        },
        resetScrollWidth: function() {
            var contentEl = this.$el.find(".content");
            var liWidth = contentEl.width();
            var ulWidth = this.collection.length * liWidth;
            contentEl.find("ul.imgs").css("width", ulWidth);
            contentEl.find("ul.imgs>li").css("width", liWidth);
        },
        showHead: function() {
            if (isScrolling) {
                return;
            }
            if (this.headerTimeout) {
                clearTimeout(this.headerTimeout);
            }
            this.$el.find(".head").fadeIn(600);
            this.setHideHeaderTimeout();
        }
    });
});

define("ekai/drive-magazine/1.0.0/templates/details-debug.tpl", [], '\n<div class="content">\n    <ul class="imgs">\n        {{\n            for(var i = 0; i< imageData.length; i++ ){\n        }}\n            <li>\n                <img alt="" class="" src="{{=imageData[i].get(\'src\')}}"></img>\n            </li>\n        {{\n            }\n        }}\n    </ul>\n    <div class="progress">\n        <div class="progress-line">\n            <div class="browsed"></div>\n            <div class="browing"></div>\n        </div>\n        <div class="circle"></div>\n    </div>\n</div>\n<div class="head">\n    <p class="title">{{=title}}</p>\n    <div class="back-btn active">\n        <a href="#"></a>\n    </div>\n    <div class="bookrack">\n        <a href="#">我的书架</a>\n    </div>\n</div>');

/**
 * @Description: App collection.
 * @Author: wangyuhao
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/drive-magazine/1.0.0/collections/images-debug", [ "backbone-debug", "ekai/drive-magazine/1.0.0/models/image-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Image = require("ekai/drive-magazine/1.0.0/models/image-debug");
    module.exports = Backbone.Collection.extend({
        model: Image,
        url: function() {
            return;
        },
        parse: function(response) {
            return response.apps;
        }
    });
});

/**
 * @Description: App model.
 * @Author: wangyuhao
 * @Date: 14-10-15
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/drive-magazine/1.0.0/models/image-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    module.exports = Backbone.Model.extend({
        initialize: function() {}
    });
});
