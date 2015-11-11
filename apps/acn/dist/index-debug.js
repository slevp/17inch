/**
 * @Description: the main entrance of app.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/acn/1.0.0/main-debug", [ "backbone-debug", "ekai/acn/1.0.0/routers/index-debug", "ekai/acn/1.0.0/views/mode-normal-debug", "jquery-debug", "underscore-debug", "ekai/acn/1.0.0/models/acn-debug", "store-debug", "ekai/acn/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var Router = require("ekai/acn/1.0.0/routers/index-debug");
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
define("ekai/acn/1.0.0/routers/index-debug", [ "backbone-debug", "ekai/acn/1.0.0/views/mode-normal-debug", "jquery-debug", "underscore-debug", "ekai/acn/1.0.0/models/acn-debug", "store-debug", "ekai/acn/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var ModeNormalView = require("ekai/acn/1.0.0/views/mode-normal-debug");
    var mainView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "modePage",
            "$mode/:mode": "modePage"
        },
        modePage: function(mode) {
            mode = mode || "middle";
            if (!mainView) {
                mainView = new ModeNormalView();
                Backbone.$("body").prepend(mainView.render().el);
            }
            mainView.changeMode(mode);
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
define("ekai/acn/1.0.0/views/mode-normal-debug", [ "backbone-debug", "jquery-debug", "underscore-debug", "ekai/acn/1.0.0/models/acn-debug", "store-debug", "ekai/acn/1.0.0/settings-debug.json" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = require("jquery-debug");
    var _ = require("underscore-debug");
    var ACNModel = require("ekai/acn/1.0.0/models/acn-debug");
    var Template = require("ekai/acn/1.0.0/templates/mode-normal-debug.tpl");
    var store = require("store-debug");
    var Settings = require("ekai/acn/1.0.0/settings-debug.json");
    var localKeys = Settings.STORAGE_KEYS;
    var acn = store.get(localKeys.acn);
    acn = acn || {};
    module.exports = Backbone.View.extend({
        className: "page",
        template: _.template(Template),
        events: {
            "click .btns .item": "centerBtnsClickEvent",
            "swipeup .circle": "windDirectionUp",
            "swipedown .circle": "windDirectionDown",
            "click .circle .item": "windDirectionClickEvent",
            "click .wind .item": "windQuantityClickEvent",
            "swipeup .wind ": "windQuantityUp",
            "swipedown .wind ": "windQuantityDown",
            "swipeleft .temperature .wrapper": "temperatureHigher",
            "swiperight .temperature .wrapper": "temperatureLower",
            "click .temperature .wrapper li": "temperatureItemClickEvent"
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function(options) {
            this.model = new ACNModel(acn);
            this.listenTo(this.model, "change:left_wind_direction", this.windDirectionChange);
            this.listenTo(this.model, "change:right_wind_direction", this.windDirectionChange);
            this.listenTo(this.model, "change:left_wind_quantity", this.windQuantityChange);
            this.listenTo(this.model, "change:right_wind_quantity", this.windQuantityChange);
            this.listenTo(this.model, "change:left_temperature", this.temperatureChange);
            this.listenTo(this.model, "change:right_temperature", this.temperatureChange);
            this.listenTo(this.model, "change", this.saveAcnInfo);
        },
        render: function() {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        changeMode: function(mode) {
            switch (mode) {
              case "middle":
                {
                    this.$el.attr("data-mode", "middle");
                    this.$el.removeClass("expanded");
                    break;
                }

              case "footer":
                {
                    this.$el.attr("data-mode", "footer");
                    this.$el.removeClass("expanded");
                    break;
                }

              case "footer-expanded":
                {
                    this.$el.attr("data-mode", "footer");
                    this.$el.addClass("expanded");
                    break;
                }
            }
        },
        saveAcnInfo: function(model, options) {
            store.set(localKeys.acn, model.toJSON());
        },
        centerBtnsClickEvent: function(event) {
            var el = $(event.target);
            var isActive = el.hasClass("active");
            if (el.hasClass("auto")) {
                this.model.set("is_auto", !isActive);
                if (isActive) {
                    this.showWindDirection();
                } else {
                    this.hideWindDirection();
                }
            } else {
                var names = {
                    defogging: "is_defogging",
                    ac: "is_ac",
                    "air-purifier": "is_air_purifier",
                    pollen: "is_pollen"
                };
                for (var key in names) {
                    if (el.hasClass(key)) {
                        this.model.set(names[key], !isActive);
                        break;
                    }
                }
            }
            el.toggleClass("active");
        },
        hideWindDirection: function() {
            this.$el.find(".circle .active").removeClass("active");
            this.$el.find(".circle .label").addClass("active");
        },
        showWindDirection: function() {
            var leftWindDirection = this.model.get("left_wind_direction");
            var rightWindDirection = this.model.get("right_wind_direction");
            this.$el.find(".circle.left").find("." + leftWindDirection).addClass("active");
            this.$el.find(".circle.right").find("." + rightWindDirection).addClass("active");
            this.$el.find(".circle .label").removeClass("active");
        },
        windDirectionUp: function(event) {
            var el = $(event.target);
            if (this.model.get("is_auto") || !el.hasClass("circle")) {
                return;
            }
            var name = el.hasClass("left") ? "left_wind_direction" : "right_wind_direction";
            var direction = this.model.get(name);
            switch (direction) {
              case "top":
                break;

              case "middle":
                this.model.set(name, "top", {
                    el: el
                });
                break;

              case "bottom":
                this.model.set(name, "middle", {
                    el: el
                });
                break;
            }
        },
        windDirectionDown: function(event) {
            var el = $(event.target);
            if (this.model.get("is_auto") || !el.hasClass("circle")) {
                return;
            }
            var name = el.hasClass("left") ? "left_wind_direction" : "right_wind_direction";
            var direction = this.model.get(name);
            switch (direction) {
              case "top":
                this.model.set(name, "middle", {
                    el: el
                });
                break;

              case "middle":
                this.model.set(name, "bottom", {
                    el: el
                });
                break;

              case "bottom":
                break;
            }
        },
        windDirectionChange: function(model, value, options) {
            var el = options.el;
            var name = el.hasClass("left") ? "left_wind_direction" : "right_wind_direction";
            var previousDirection = model.previous(name);
            el.find("." + previousDirection).removeClass("active");
            el.find("." + value).addClass("active");
        },
        windDirectionClickEvent: function(event) {
            if (this.model.get("is_auto")) {
                return;
            }
            var el = $(event.target);
            var parentEl = el.parent();
            var name = parentEl.hasClass("left") ? "left_wind_direction" : "right_wind_direction";
            if (el.hasClass("top")) {
                this.model.set(name, "top", {
                    el: parentEl
                });
            } else if (el.hasClass("middle")) {
                this.model.set(name, "middle", {
                    el: parentEl
                });
            } else if (el.hasClass("bottom")) {
                this.model.set(name, "bottom", {
                    el: parentEl
                });
            }
        },
        windQuantityClickEvent: function(event) {
            var el = $(event.target);
            var parentEl = el.parent();
            var name = parentEl.hasClass("left") ? "left_wind_quantity" : "right_wind_quantity";
            var quantity = parseInt(el.attr("data-quantity"));
            this.model.set(name, quantity, {
                el: parentEl
            });
        },
        windQuantityChange: function(model, value, options) {
            var el = options.el;
            el.attr("data-quantity", value);
            var name = el.hasClass("left") ? "left_wind_quantity" : "right_wind_quantity";
            var previousQuantity = model.previous(name);
            var min = Math.min(value, previousQuantity);
            var max = Math.max(value, previousQuantity);
            for (var i = min + 1; i <= max; i++) {
                el.find(".quantity" + i).toggleClass("shown");
            }
            el.find(".fan").remove();
            el.prepend('<div class="fan"></div>');
        },
        windQuantityUp: function(event) {
            var el = $(event.target);
            if (!el.hasClass("wind")) {
                el = el.parent(".wind");
            }
            var name = el.hasClass("left") ? "left_wind_quantity" : "right_wind_quantity";
            var quantity = this.model.get(name);
            if (quantity >= 7) {
                this.model.set(name, 7, {
                    el: el
                });
            } else {
                this.model.set(name, quantity + 1, {
                    el: el
                });
            }
        },
        windQuantityDown: function(event) {
            var el = $(event.target);
            if (!el.hasClass("wind")) {
                el = el.parent(".wind");
            }
            var name = el.hasClass("left") ? "left_wind_quantity" : "right_wind_quantity";
            var quantity = this.model.get(name);
            if (quantity <= 1) {
                this.model.set(name, 1, {
                    el: el
                });
            } else {
                this.model.set(name, quantity - 1, {
                    el: el
                });
            }
        },
        temperatureHigher: function(event) {
            var el = $(event.currentTarget);
            var name = el.hasClass("left") ? "left_temperature" : "right_temperature";
            var higherTemperature = this.model.higherTemperature(name, 1);
            this.model.set(name, higherTemperature, {
                name: name,
                el: el
            });
        },
        temperatureLower: function(event) {
            var el = $(event.currentTarget);
            var name = el.hasClass("left") ? "left_temperature" : "right_temperature";
            var lowerTemperature = this.model.lowerTemperature(name, 1);
            this.model.set(name, lowerTemperature, {
                name: name,
                el: el
            });
        },
        temperatureChange: function(model, value, options) {
            var el = options.el;
            var name = options.name;
            var values = this.model.getRelativeTemperature(name);
            el.find("li").each(function(index, item) {
                $(item).text(values[index]);
            });
        },
        temperatureItemClickEvent: function(event) {
            var el = $(event.target);
            var temperature = parseInt($.trim(el.text()));
            if (typeof temperature == NaN) {
                return;
            }
            var parentEl = el.parent().parent(".wrapper");
            var name = parentEl.hasClass("left") ? "left_temperature" : "right_temperature";
            this.model.set(name, temperature, {
                name: name,
                el: parentEl
            });
        }
    });
});

/**
 * @Description: Acn model..
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define("ekai/acn/1.0.0/models/acn-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    module.exports = Backbone.Model.extend({
        defaults: {
            is_defogging: false,
            is_ac: true,
            is_auto: false,
            is_air_purifier: false,
            is_pollen: false,
            left_wind_quantity: 5,
            left_wind_direction: "middle",
            left_temperature: 21,
            right_wind_quantity: 3,
            right_wind_direction: "top",
            right_temperature: 25,
            external_temperature: 28,
            max_temperature: 32,
            min_temperature: 16
        },
        initialize: function() {
            this.on("change:left_temperature", this.temperatureChanged);
            this.on("change:right_temperature", this.temperatureChanged);
            this.temperatureChanged(this, this.get("left_temperature"), {
                name: "left_temperature"
            });
            this.temperatureChanged(this, this.get("right_temperature"), {
                name: "right_temperature"
            });
        },
        temperatureChanged: function(model, value, options) {
            var name = options.name;
            var max = model.get("max_temperature");
            var min = model.get("min_temperature");
            model.set("_" + name, model.lowerTemperature(name, 1));
            model.set("__" + name, model.lowerTemperature(name, 2));
            model.set(name + "_", model.higherTemperature(name, 1));
            model.set(name + "__", model.higherTemperature(name, 2));
        },
        higherTemperature: function(name, num) {
            var value = this.get(name);
            num = num || 1;
            var max = this.get("max_temperature");
            var min = this.get("min_temperature");
            if (value + num > max) {
                value = value + num - max - 1 + min;
            } else {
                value += num;
            }
            return value;
        },
        lowerTemperature: function(name, num) {
            var value = this.get(name);
            num = num || 1;
            var max = this.get("max_temperature");
            var min = this.get("min_temperature");
            if (value - num < min) {
                value = max - (min - (value - num) - 1);
            } else {
                value -= num;
            }
            return value;
        },
        getRelativeTemperature: function(name) {
            return [ this.get("__" + name), this.get("_" + name), this.get(name), this.get(name + "_"), this.get(name + "__") ];
        }
    });
});

define("ekai/acn/1.0.0/templates/mode-normal-debug.tpl", [], '<div class="external-temperature">\n    外部温度：<span class="value">{{=external_temperature}}</span><span>℃</span>\n</div>\n<div class="center-area">\n    <div class="circle left">\n        <div class="top item {{=(!is_auto && left_wind_direction == \'top\') ? \' active\' : \'\'}}"></div>\n        <div class="middle item {{=(!is_auto && left_wind_direction == \'middle\') ? \' active\' : \'\'}}"></div>\n        <div class="bottom item {{=(!is_auto && left_wind_direction == \'bottom\') ? \' active\': \'\'}}"></div>\n        <div class="label {{=is_auto ? \'active\' : \'\'}}">AUTO</div>\n    </div>\n    <div class="btns">\n        <div class="item defogging {{=is_defogging ? \'active\': \'\'}}"></div>\n        <div class="item ac {{=is_ac ? \'active\': \'\'}}"></div>\n        <div class="item auto {{=is_auto ? \'active\': \'\'}}"></div>\n        <div class="item air-purifier {{=is_air_purifier ? \'active\': \'\'}}"></div>\n        <div class="item pollen {{=is_pollen ? \'active\': \'\'}}"></div>\n    </div>\n    <div class="circle right">\n        <div class="top item {{=(!is_auto && right_wind_direction == \'top\') ? \' active\' : \'\'}}"></div>\n        <div class="middle item {{=(!is_auto && right_wind_direction == \'middle\') ? \' active\' : \'\'}}"></div>\n        <div class="bottom item {{=(!is_auto && right_wind_direction == \'bottom\') ? \' active\' : \'\'}}"></div>\n        <div class="label {{=is_auto ? \'active\' : \'\'}}">AUTO</div>\n    </div>\n</div>\n<div class="wind left" data-quantity="{{=left_wind_quantity}}">\n    <div class="fan"></div>\n    {{\n    for (var i = 7; i > 0; i--) {\n    }}\n    <div class="item quantity{{=i}} {{=(left_wind_quantity >= i) ? \'shown\': \'\'}}" data-quantity="{{=i}}"></div>\n    {{\n    }\n    }}\n</div>\n<div class="wind right" data-quantity="{{=right_wind_quantity}}">\n    <div class="fan"></div>\n    {{\n    for (var i = 7; i > 0; i--) {\n    }}\n    <div class="item quantity{{=i}} {{=(right_wind_quantity >= i) ? \'shown\': \'\'}}" data-quantity="{{=i}}"></div>\n    {{\n    }\n    }}\n</div>\n<div class="temperature">\n    <div id="temperature-left" class="wrapper left">\n        <ul>\n            <li>{{=__left_temperature}}</li>\n            <li class="bigger">{{=_left_temperature}}</li>\n            <li class="biggest">{{=left_temperature}}</li>\n            <li class="bigger">{{=left_temperature_}}</li>\n            <li>{{=left_temperature__}}</li>\n        </ul>\n        <div class="circle"></div>\n    </div>\n    <div class="label">℃</div>\n    <div id="temperature-right" class="wrapper right">\n        <ul class="temperature-list">\n            <li>{{=__right_temperature}}</li>\n            <li class="bigger">{{=_right_temperature}}</li>\n            <li class="biggest">{{=right_temperature}}</li>\n            <li class="bigger">{{=right_temperature_}}</li>\n            <li>{{=right_temperature__}}</li>\n        </ul>\n        <div class="circle"></div>\n    </div>\n</div>');

define("ekai/acn/1.0.0/settings-debug.json", [], {
    STORAGE_KEYS: {
        acn: "acn_basic_info"
    }
});
