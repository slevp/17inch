/**
 * @Description: the main entrance of app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/main-debug", [ "backbone-debug", "ekai/player/1.0.0/routers/index-debug", "ekai/player/1.0.0/views/mode-normal-debug", "underscore-debug", "topivi-debug", "ekai/player/1.0.0/collections/song-debug", "ekai/player/1.0.0/models/song-debug", "ekai/player/1.0.0/views/song-list-debug", "ekai/player/1.0.0/views/song-list-item-debug", "iscroll-debug", "ekai/player/1.0.0/views/mode-footer-debug", "ekai/player/1.0.0/models/player-debug", "store-debug", "ekai/player/1.0.0/settings-debug.json", "ekai/player/1.0.0/data/songs-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/player/1.0.0/routers/index-debug");
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
define("ekai/player/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/player/1.0.0/views/mode-normal-debug", "underscore-debug", "topivi-debug", "ekai/player/1.0.0/collections/song-debug", "ekai/player/1.0.0/models/song-debug", "ekai/player/1.0.0/views/song-list-debug", "ekai/player/1.0.0/views/song-list-item-debug", "iscroll-debug", "ekai/player/1.0.0/views/mode-footer-debug", "ekai/player/1.0.0/models/player-debug", "store-debug", "ekai/player/1.0.0/settings-debug.json", "ekai/player/1.0.0/data/songs-debug.json" ], function(require, exports, module) {
    var $p = parent.seajs.require("jquery");
    var Backbone = require("backbone-debug");
    var ModeNormalView = require("ekai/player/1.0.0/views/mode-normal-debug");
    var ModeFooterView = require("ekai/player/1.0.0/views/mode-footer-debug");
    var Player = require("ekai/player/1.0.0/models/player-debug");
    var player = new Player();
    var mainView = null;
    $p(parent.document).on("getPlayerSongList", function(e, callback) {
        callback(player.list);
    });
    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "$mode/:mode": "modePage"
        },
        homePage: function() {
            if (mainView) {
                mainView.remove();
            }
            mainView = new ModeNormalView({
                player: player
            });
            Backbone.$("body").prepend(mainView.render().el);
        },
        modePage: function(mode) {
            mode = mode || "footer";
            switch (mode) {
              case "middle":
                {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeNormalView({
                        player: player
                    });
                    Backbone.$("body").prepend(mainView.render().el);
                    break;
                }

              case "footer":
                {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeFooterView({
                        player: player,
                        expanded: false
                    });
                    Backbone.$("body").prepend(mainView.render().el);
                    break;
                }

              case "footer-expanded":
                {
                    if (mainView) {
                        mainView.remove();
                    }
                    mainView = new ModeFooterView({
                        player: player,
                        expanded: true
                    });
                    Backbone.$("body").prepend(mainView.render().el);
                }
            }
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
define("ekai/player/1.0.0/views/mode-normal-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "ekai/player/1.0.0/collections/song-debug", "ekai/player/1.0.0/models/song-debug", "ekai/player/1.0.0/views/song-list-debug", "ekai/player/1.0.0/views/song-list-item-debug", "iscroll-debug" ], function(require, exports, module) {
    var $p = parent.seajs.require("jquery");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/player/1.0.0/templates/mode-normal-debug.tpl");
    var ContentTemplate = require("ekai/player/1.0.0/templates/mode-normal-content-debug.tpl");
    var SongCollection = require("ekai/player/1.0.0/collections/song-debug");
    var SongListView = require("ekai/player/1.0.0/views/song-list-debug");
    function Constructor() {
        Backbone.View.apply(this, arguments);
    }
    module.exports = Backbone.View.extend({
        className: "page",
        template: _.template(Template),
        contentTemplate: _.template(ContentTemplate),
        events: {
            "tap .play-btn": "playBtnClick",
            "tap .previous": "previousBtnClick",
            "tap .next": "nextBtnClick",
            "swiperight .content": "previousBtnClick",
            "swipeleft .content": "nextBtnClick",
            "tap .show-list-btn": "showListBtnClick"
        },
        constructor: Constructor,
        initialize: function(options) {
            var self = this;
            this.player = options.player;
            this.player.onEnd = function() {
                self.cutSongOutAnimation(function() {
                    this.render();
                    this.cutSongInAnimation();
                });
            };
            this.collection = new SongCollection(this.player.list);
            this.$el.attr("data-mode", "normal");
            $p(parent.document).on("playSong", function(e, name) {
                var id = self.collection.findWhere({
                    title: name
                }).id;
                self.cutToSong(id);
                if (!self.player.isPlaying) {
                    self.$el.find(".play-btn").trigger("tap");
                }
            });
            $p(parent.document).on("randomPlaySong", function(e) {
                var index = parseInt(Math.random() * self.collection.length);
                self.cutToSong(self.collection.at(index).id);
                if (!self.player.isPlaying) {
                    self.$el.find(".play-btn").trigger("tap");
                }
            });
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template());
            this.renderContent();
            this.$el.find(".volume-progress .dot").drag({
                axis: "x",
                ondrag: function() {
                    var el = Backbone.$(this);
                    var elWidth = el.width();
                    var bgEl = self.$el.find(".volume-progress .bg");
                    var runningEl = self.$el.find(".volume-progress .running");
                    var bgWidth = bgEl.width();
                    var minOffset = bgEl.offset().left - elWidth / 2;
                    var maxOffset = bgEl.offset().left + bgWidth + elWidth / 2;
                    if (el.offset().left > maxOffset) {
                        el.css("left", "100%");
                        runningEl.css("width", "100%");
                    } else if (el.offset().left < minOffset) {
                        el.css("left", "0");
                        runningEl.css("width", "0");
                    } else {
                        var elLeftSize = el.css("left");
                        elLeftSize = parseFloat(elLeftSize.substr(0, elLeftSize.length - 2));
                        runningEl.css("width", elLeftSize / bgWidth * 100 + "%");
                    }
                }
            });
            if (this.player.isPlaying) {
                this.createPlayRunnable();
            }
            return this;
        },
        renderContent: function() {
            var el = this.$el.find(".content");
            var currentModel = this.collection.at(this.player.current);
            el.html(this.contentTemplate({
                isPlaying: this.player.isPlaying,
                current: currentModel.attributes,
                previous: this.collection.at(this.player.previous).attributes,
                next: this.collection.at(this.player.next).attributes
            }));
            this.$el.find(".header .title .name").text(currentModel.get("title"));
            this.$el.find(".header .title .artists .value").text(currentModel.get("artists"));
            this.$el.find(".footer .lyric-sound .lyric").text(currentModel.get("lyrics")[0]);
            this.playProgress = new topivi.progress.round(this.$el.find(".playing-progress"), {
                max: 1e3
            });
            if (this.songListView) {
                this.songListView.activeItem(currentModel.id);
            }
        },
        playBtnClick: function(e) {
            var el = Backbone.$(e.currentTarget);
            if (!this.player.isPlaying) {
                this.player.play();
                el.addClass("playing");
                this.createPlayRunnable();
            } else {
                this.player.pause();
                el.removeClass("playing");
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }
        },
        createPlayRunnable: function() {
            var self = this;
            var runnable = function() {
                var durationEl = self.$el.find(".current .duration");
                var durationText = self.player.getDurationText();
                durationEl.text("-" + durationText);
                var process = parseInt(self.player.audio.currentTime / self.player.audio.duration * 1e3);
                if (_.isNaN(process)) {
                    process = 0;
                }
                self.playProgress.setProgress(process);
            };
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(runnable, 1e3);
        },
        nextBtnClick: function() {
            this.cutSongOutAnimation(function() {
                this.player.nextSong();
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        previousBtnClick: function() {
            this.cutSongOutAnimation(function() {
                this.player.previousSong();
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        cutToSong: function(id) {
            var model = this.collection.get(id);
            var index = this.collection.indexOf(model);
            this.cutSongOutAnimation(function() {
                this.player.playSong(index);
                this.renderContent();
                this.cutSongInAnimation();
            });
        },
        cutSongOutAnimation: function(callback) {
            var self = this;
            var timeout = 100;
            this.$el.find(".content").fadeOut(timeout, function() {
                if (callback) callback.call(self);
            });
        },
        cutSongInAnimation: function(callback) {
            var self = this;
            var timeout = 200;
            this.$el.find(".content").fadeIn(timeout, function() {
                if (callback) callback.call(self);
            });
        },
        remove: function() {
            if (this.interval) {
                clearInterval(this.interval);
            }
            Constructor.__super__.remove.call(this);
        },
        showListBtnClick: function(e) {
            var dependEl = Backbone.$(e.currentTarget);
            if (!this.listTips) {
                this.listTips = new topivi.tips.normal("", {
                    dependEl: dependEl,
                    direction: "right"
                });
                this.listTips.el.addClass("song-list-tips");
            }
            if (!this.songListView) {
                this.songListView = new SongListView({
                    player: this.player,
                    collection: this.collection,
                    mainView: this
                });
            }
            if (!dependEl.hasClass("active")) {
                this.listTips.setContent(this.songListView.render().el);
                this.listTips.show();
            } else {
                this.listTips.hide();
            }
            dependEl.toggleClass("active");
        }
    });
});

define("ekai/player/1.0.0/templates/mode-normal-debug.tpl", [], '<div class="header">\n    <div class="show-list-btn"></div>\n    <div class="title">\n        <h1 class="name"></h1>\n        <p class="artists">艺人：<span class="value"></span></p>\n    </div>\n    <div class="play-mode">\n        <div class="normal mode-btn active"></div>\n        <div class="mv mode-btn"></div>\n    </div>\n</div>\n<div class="content">\n\n</div>\n<div class="footer">\n    <div class="alternate"></div>\n    <div class="lyric-sound">\n        <p class="lyric"></p>\n        <div class="sound">\n           <div class="min"></div>\n            <div class="volume-progress">\n                <div class="bg"></div>\n                <div class="running"></div>\n                <div class="dot"></div>\n            </div>\n            <div class="max"></div>\n        </div>\n    </div>\n    <div class="repeat"></div>\n</div>');

define("ekai/player/1.0.0/templates/mode-normal-content-debug.tpl", [], '<div class="previous block">\n    <img class="thumbnail circle" src="{{=previous.thumbnail}}"/>\n    <div class="bg circle"></div>\n    <p class="name">{{=previous.title}}</p>\n    <p class="artists">艺人：{{=previous.artists}}</p>\n    <p class="duration">-{{=previous.duration}}</p>\n</div>\n<div class="current block">\n    <div class="playing-progress"></div>\n    <img class="thumbnail circle" src="{{=current.thumbnail}}"/>\n    <div class="bg circle"></div>\n    <div class="play-btn {{=isPlaying ? \'playing\' : \'\'}}"></div>\n    <p class="duration">-{{=current.duration}}</p>\n</div>\n<div class="next block">\n    <img class="thumbnail circle" src="{{=next.thumbnail}}"/>\n    <div class="bg circle"></div>\n    <p class="name">{{=next.title}}</p>\n    <p class="artists">艺人：{{=next.artists}}</p>\n    <p class="duration">-{{=next.duration}}</p>\n</div>');

/**
 * @Description: App category collection.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/collections/song-debug", [ "backbone-debug", "ekai/player/1.0.0/models/song-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Song = require("ekai/player/1.0.0/models/song-debug");
    module.exports = Backbone.Collection.extend({
        model: Song
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
define("ekai/player/1.0.0/models/song-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    module.exports = Backbone.Model.extend({
        idAttribute: "_id"
    });
});

/**
 * @Description: Song list view.
 * @Author: fuwensong
 * @Date: 14-10-7
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/views/song-list-debug", [ "backbone-debug", "underscore-debug", "ekai/player/1.0.0/views/song-list-item-debug", "iscroll-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/player/1.0.0/templates/song-list-debug.tpl");
    var ItemView = require("ekai/player/1.0.0/views/song-list-item-debug");
    var IScroll = require("iscroll-debug");
    module.exports = Backbone.View.extend({
        template: _.template(Template),
        events: {
            "tap .item": "itemClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.player = options.player;
            this.mainView = options.mainView;
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template({}));
            var currentModel = this.collection.at(this.player.current);
            var ulEl = this.$el.find(".listview ul");
            var currentItemEl = null;
            _.each(this.collection.models, function(model, list) {
                var itemView = new ItemView({
                    model: model
                });
                itemView.render();
                if (currentModel.id === model.id) {
                    currentItemEl = itemView.el;
                    itemView.$el.addClass("current");
                }
                ulEl.append(itemView.el);
            });
            setTimeout(function() {
                self.scroll = new IScroll(".listview");
                self.scroll.scrollToElement(currentItemEl, 1e3);
            }, 200);
            return this;
        },
        itemClickEvent: function(e) {
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass("current")) {
                return;
            }
            var id = el.attr("data-id");
            this.mainView.cutToSong(id);
        },
        activeItem: function(id) {
            var itemEl = this.$el.find(".item[data-id='" + id + "']");
            if (!itemEl || itemEl.length <= 0) {
                return console.error("Not found song by id.");
            }
            if (itemEl.hasClass("current")) {
                return;
            }
            this.$el.find(".item.current").removeClass("current");
            itemEl.addClass("current");
            this.scroll.scrollToElement(itemEl[0], 1e3);
        }
    });
});

define("ekai/player/1.0.0/templates/song-list-debug.tpl", [], '<div id="song-list" class="content">\n    <h1 class="title">播放列表</h1>\n    <div class="listview">\n        <ul class="scroller"></ul>\n    </div>\n</div>\n<div class="angle"></div>');

/**
 * @Description: Song list item view.
 * @Author: fuwensong
 * @Date: 14-10-7
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/views/song-list-item-debug", [ "backbone-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var Template = require("ekai/player/1.0.0/templates/song-list-item-debug.tpl");
    module.exports = Backbone.View.extend({
        tagName: "li",
        className: "item",
        template: _.template(Template),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.$el.attr("data-id", this.model.id);
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
});

define("ekai/player/1.0.0/templates/song-list-item-debug.tpl", [], '<p class="name">{{=title}}</p>\n<p class="artists-duration">\n    <span class="artists">{{=artists}}</span>\n    <span class="duration">{{=duration}}</span>\n</p>\n');

/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/views/mode-footer-debug", [ "backbone-debug", "underscore-debug", "topivi-debug", "ekai/player/1.0.0/collections/song-debug", "ekai/player/1.0.0/models/song-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var topivi = require("topivi-debug");
    var Template = require("ekai/player/1.0.0/templates/mode-footer-debug.tpl");
    var SongCollection = require("ekai/player/1.0.0/collections/song-debug");
    function Constructor() {
        Backbone.View.apply(this, arguments);
    }
    module.exports = Backbone.View.extend({
        className: "page",
        template: _.template(Template),
        events: {
            "tap .play-btn": "playBtnClick",
            "tap .previous": "previousBtnClick",
            "tap .next": "nextBtnClick",
            "swiperight .content": "previousBtnClick",
            "swipeleft .content": "nextBtnClick"
        },
        constructor: Constructor,
        initialize: function(options) {
            var self = this;
            this.player = options.player;
            this.player.onEnd = function() {
                self.render();
            };
            this.collection = new SongCollection(this.player.list);
            this.$el.attr("data-mode", "footer");
            this.isExpaneded = options.expanded;
            if (this.isExpaneded) {
                this.$el.addClass("expanded");
            }
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template({
                isPlaying: this.player.isPlaying,
                current: this.collection.at(this.player.current).attributes
            }));
            this.playProgress = new topivi.progress.round(this.$el.find(".playing-progress"), {
                max: 1e3
            });
            if (this.player.isPlaying) {
                this.createPlayRunnable();
            }
            return this;
        },
        playBtnClick: function(e) {
            var el = Backbone.$(e.currentTarget);
            if (!this.player.isPlaying) {
                this.player.play();
                el.addClass("playing");
                this.createPlayRunnable();
            } else {
                this.player.pause();
                el.removeClass("playing");
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }
        },
        createPlayRunnable: function() {
            var self = this;
            var runnable = function() {
                var durationEl = self.$el.find(".current .duration");
                var durationText = self.player.getDurationText();
                durationEl.text("-" + durationText);
                var process = parseInt(self.player.audio.currentTime / self.player.audio.duration * 1e3);
                if (_.isNaN(process)) {
                    process = 0;
                }
                self.playProgress.setProgress(process);
            };
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(runnable, 1e3);
        },
        nextBtnClick: function() {
            this.player.nextSong();
            this.render();
        },
        previousBtnClick: function() {
            this.player.previousSong();
            this.render();
        },
        remove: function() {
            if (this.interval) {
                clearInterval(this.interval);
            }
            Constructor.__super__.remove.call(this);
        }
    });
});

define("ekai/player/1.0.0/templates/mode-footer-debug.tpl", [], '<div class="left">\n    <div class="header"><h1 class="title">AUDIO</h1></div>\n    <div class="content">\n        <div class="previous"></div>\n        <div class="current">\n            <div class="playing-progress"></div>\n            <div class="play-btn {{=isPlaying ? \'playing\' : \'\'}}"></div>\n            <p class="duration">-{{=current.duration}}</p>\n        </div>\n        <div class="next"></div>\n    </div>\n    <div class="footer">\n        <div class="volume"></div>\n        <p class="name">{{=current.title}}</p>\n        <div class="repeat"></div>\n    </div>\n</div>\n<div class="right">\n    <p class="name">{{=current.title}}</p>\n    <p class="artists">{{=current.artists}}</p>\n    <p class="lyrics-desc">歌词内容</p>\n    <div class="lyrics">\n        <div class="scroll">\n        {{\n            for (var i = 0; i < current.lyrics.length; i++) {\n        }}\n            <p class="line">{{=current.lyrics[i]}}</p>\n        {{\n            }\n        }}\n        </div>\n    </div>\n</div>');

/**
 * @Description: Player model.
 * @Author: fuwensong
 * @Date: 14-9-25
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/player/1.0.0/models/player-debug", [ "underscore-debug", "store-debug", "ekai/player/1.0.0/settings-debug.json", "ekai/player/1.0.0/data/songs-debug.json" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    var store = require("store-debug");
    var Settings = require("ekai/player/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var songs = store.get(localKeys.songs);
    var lastPlayed = store.get(localKeys.last_played);
    lastPlayed = lastPlayed || 0;
    if (!songs) {
        songs = require("ekai/player/1.0.0/data/songs-debug.json");
        store.set(localKeys.songs, songs);
    }
    function Player(options) {
        options = options || {};
        var defaults = {
            isPlaying: false,
            current: lastPlayed,
            list: songs,
            onEnd: function() {
                console.log("song on auto complete.");
            }
        };
        _.extend(this, defaults, options);
        this.init();
    }
    Player.prototype.init = function() {
        var self = this;
        this.list = this.list || [];
        if (this.list.length <= 0) {
            return console.info("No songs");
        }
        this.audio = document.createElement("audio");
        if (!this.list[this.current]) {
            console.error("Invalid current param.");
            this.current = 0;
        }
        this.audio.src = this.list[this.current].contentURI;
        this.audio.addEventListener("ended", function() {
            self.nextSong();
            self.onEnd.apply(self, arguments);
        });
        this.previous = this.getPrevious();
        this.next = this.getNext();
    };
    Player.prototype.getPrevious = function() {
        return this.current <= 0 ? this.list.length - 1 > 0 ? this.list.length - 1 : 0 : this.current - 1;
    };
    Player.prototype.getNext = function() {
        return this.current < this.list.length - 1 ? this.current + 1 : 0;
    };
    Player.prototype.play = function() {
        if (!this.isPlaying) {
            this.isPlaying = true;
        }
        this.audio.play();
    };
    Player.prototype.pause = function() {
        if (this.isPlaying) {
            this.isPlaying = false;
        }
        this.audio.pause();
    };
    Player.prototype.stop = function() {};
    Player.prototype.nextSong = function() {
        this.previous = this.current;
        this.current = this.next;
        this.next = this.getNext();
        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };
    Player.prototype.previousSong = function() {
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.getPrevious();
        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };
    Player.prototype.playSong = function(index) {
        if (index < 0 || index > this.list.length) {
            return console.error("Invalid song index.");
        }
        this.current = index;
        this.next = this.getNext();
        this.previous = this.getPrevious();
        this.audio.src = this.list[this.current].contentURI;
        if (this.isPlaying) {
            this.play();
        }
        store.set(localKeys.last_played, this.current);
    };
    Player.prototype.getRemainingTime = function() {
        var currentTime = Math.ceil(this.audio.currentTime);
        var durationTime = Math.ceil(this.audio.duration);
        return durationTime - currentTime;
    };
    Player.prototype.getDurationText = function() {
        var remainingTime = this.getRemainingTime();
        var durationTimeMin = parseInt(remainingTime / 60);
        var durationTimeSec = remainingTime % 60;
        durationTimeSec = durationTimeSec > 9 ? durationTimeSec + "" : "0" + durationTimeSec;
        return durationTimeMin + ":" + durationTimeSec;
    };
    module.exports = Player;
});

define("ekai/player/1.0.0/settings-debug.json", [], {
    STORAGE_KEYS: {
        songs: "player_songs",
        last_played: "player_last_played_index"
    }
});

define("ekai/player/1.0.0/data/songs-debug.json", [], [ {
    _id: 1,
    title: "空白格",
    artists: "杨宗纬",
    contentURI: "mp3/kongbaige.mp3",
    thumbnail: "mp3/thumbnails/yangzongwei.jpg",
    duration: "4:48",
    album: "我是歌手 第五期",
    lyrics: [ "其实很简单", "其实很自然", "两个人的爱由两人分担", "其实并不难", "是你太悲观", "隔着一道墙不跟谁分享" ]
}, {
    _id: 2,
    title: "父亲",
    artists: "筷子兄弟",
    contentURI: "mp3/fuqin.mp3",
    thumbnail: "mp3/thumbnails/kuaizixiongdi.jpg",
    duration: "4:53",
    album: "父亲",
    lyrics: [ "总是向你索取", "却不曾说谢谢你", "直到长大以后", "才懂得你不容易", "每次离开总是", "装作轻松的样子", "微笑着说回去吧", "转身泪湿眼底" ]
}, {
    _id: 3,
    title: "你是我的眼",
    artists: "林宥嘉",
    contentURI: "mp3/nishiwodeyan.mp3",
    thumbnail: "mp3/thumbnails/linyoujia.jpg",
    duration: "4:45",
    album: "爱星光精选 昨天今天明天",
    lyrics: [ "如果我能看得见", "就能清晰地分辨白天黑夜", "就能准确地在人群中握住你的手", "如果我能看得见", "就能驾车带你到处遨游", "就能惊喜地从背后给你一个拥抱" ]
}, {
    _id: 4,
    title: "最爱",
    artists: "杨宗纬",
    contentURI: "mp3/zuiai.mp3",
    thumbnail: "mp3/thumbnails/yangzongwei.jpg",
    duration: "5:32",
    album: "我是歌手 第十二期",
    lyrics: [ "红颜若是只为一段情", "就让一生只为这段情", "一生只爱一个人", "一世只怀一种愁", "纤纤小手让你握着", "把它握成你的袖", "纤纤小手让你握着", "解你的愁你的忧" ]
}, {
    _id: 5,
    title: "其实都没有",
    artists: "杨宗纬",
    contentURI: "mp3/qishidoumeiyou.mp3",
    thumbnail: "mp3/thumbnails/yangzongwei.jpg",
    duration: "3:51",
    album: "初.爱",
    lyrics: [ "从什么都没有的地方", "到什么都没有的地方", "我们 像没发生事一样", "自顾地 走在路上", "忘掉了的人只是泡沫", "用双手轻轻一触就破", "泛黄 有他泛黄的理由", "思念将 越来越薄" ]
}, {
    _id: 6,
    title: "山水之间",
    artists: "许嵩",
    contentURI: "mp3/shanshuizhijian.mp3",
    thumbnail: "mp3/thumbnails/xusong.jpg",
    duration: "4:36",
    album: "不如吃茶去",
    lyrics: [ "昨夜同门云集 推杯又换盏", "今朝茶凉酒寒 豪言成笑谈", "半生累 尽徒然 碑文完美有谁看", "隐居山水之间 誓与浮名散", "湖畔青石板上 一把油纸伞", "旅人停步折花 淋湿了绸缎", "满树玉瓣多傲然 江南烟雨却痴缠", "花飞雨追一如尘缘理还乱" ]
}, {
    _id: 7,
    title: "小苹果",
    artists: "筷子兄弟",
    contentURI: "mp3/xiaopingguo.mp3",
    thumbnail: "mp3/thumbnails/kuaizixiongdi.jpg",
    duration: "3:37",
    album: "老男孩之猛龙过江 电影原声",
    lyrics: [ "我种下一颗种子", "终于长出了果实", "今天是个伟大日子", "摘下星星送给你", "拽下月亮送给你", "让太阳每天为你升起" ]
} ]);
