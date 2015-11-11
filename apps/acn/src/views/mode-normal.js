/**
 * @Description: Home view.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = require('jquery');
    var _ = require('underscore');
    var ACNModel = require('../models/acn');
    var Template = require('../templates/mode-normal.tpl');
    var store = require('store');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var acn = store.get(localKeys.acn);
    acn = acn || {};

    module.exports = Backbone.View.extend({
        className: 'page',
        template: _.template(Template),
        events: {
            'click .btns .item': 'centerBtnsClickEvent',
            'swipeup .circle': 'windDirectionUp',
            'swipedown .circle': 'windDirectionDown',
            'click .circle .item': 'windDirectionClickEvent',
            'click .wind .item': 'windQuantityClickEvent',
            'swipeup .wind ': 'windQuantityUp',
            'swipedown .wind ': 'windQuantityDown',
            'swipeleft .temperature .wrapper': 'temperatureHigher',
            'swiperight .temperature .wrapper': 'temperatureLower',
            'click .temperature .wrapper li': 'temperatureItemClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function (options) {
            this.model = new ACNModel(acn);
            this.listenTo(this.model, 'change:left_wind_direction', this.windDirectionChange);
            this.listenTo(this.model, 'change:right_wind_direction', this.windDirectionChange);

            this.listenTo(this.model, 'change:left_wind_quantity', this.windQuantityChange);
            this.listenTo(this.model, 'change:right_wind_quantity', this.windQuantityChange);

            this.listenTo(this.model, 'change:left_temperature', this.temperatureChange);
            this.listenTo(this.model, 'change:right_temperature', this.temperatureChange);
            this.listenTo(this.model, 'change', this.saveAcnInfo);
        },
        render: function () {
            var self = this;
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        changeMode: function (mode) {
            switch (mode) {
                case 'middle': {
                    this.$el.attr('data-mode', 'middle');
                    this.$el.removeClass('expanded');
                    break;
                }
                case 'footer': {
                    this.$el.attr('data-mode', 'footer');
                    this.$el.removeClass('expanded');
                    break;
                }
                case 'footer-expanded': {
                    this.$el.attr('data-mode', 'footer');
                    this.$el.addClass('expanded');
                    break;
                }
            }
        },
        saveAcnInfo: function (model, options) {
            store.set(localKeys.acn, model.toJSON());
        },
        centerBtnsClickEvent: function(event) {
            var el = $(event.target);
            var isActive = el.hasClass('active');
            if (el.hasClass('auto')) {
                this.model.set('is_auto', !isActive);
                if (isActive) {
                    this.showWindDirection();
                } else {
                    this.hideWindDirection();
                }
            } else {
                var names = {
                    'defogging': 'is_defogging',
                    'ac': 'is_ac',
                    'air-purifier': 'is_air_purifier',
                    'pollen': 'is_pollen'
                };
                for (var key in names) {
                    if (el.hasClass(key)) {
                        this.model.set(names[key], !isActive);
                        break;
                    }
                }
            }
            el.toggleClass('active');
        },
        hideWindDirection: function() {
            this.$el.find('.circle .active').removeClass('active');
            this.$el.find('.circle .label').addClass('active');
        },
        showWindDirection: function() {
            var leftWindDirection = this.model.get('left_wind_direction');
            var rightWindDirection = this.model.get('right_wind_direction');
            this.$el.find('.circle.left').find('.' + leftWindDirection).addClass('active');
            this.$el.find('.circle.right').find('.' + rightWindDirection).addClass('active');
            this.$el.find('.circle .label').removeClass('active');
        },
        windDirectionUp: function(event) {
            var el = $(event.target);
            if (this.model.get('is_auto') || !el.hasClass('circle')) {
                return;
            }
            var name = el.hasClass('left') ? 'left_wind_direction' : 'right_wind_direction';
            var direction = this.model.get(name);
            switch (direction) {
                case 'top':
                    break;
                case 'middle':
                    this.model.set(name, 'top', {el: el});
                    break;
                case 'bottom':
                    this.model.set(name, 'middle', {el: el});
                    break;
            }
        },
        windDirectionDown: function(event) {
            var el = $(event.target);
            if (this.model.get('is_auto') || !el.hasClass('circle')) {
                return;
            }
            var name = el.hasClass('left') ? 'left_wind_direction' : 'right_wind_direction';
            var direction = this.model.get(name);
            switch (direction) {
                case 'top':
                    this.model.set(name, 'middle', {el: el});
                    break;
                case 'middle':
                    this.model.set(name, 'bottom', {el: el});
                    break;
                case 'bottom':
                    break;
            }
        },
        windDirectionChange: function(model, value, options) {
            var el = options.el;
            var name = el.hasClass('left') ? 'left_wind_direction' : 'right_wind_direction';
            var previousDirection = model.previous(name);
            el.find('.' + previousDirection).removeClass('active');
            el.find('.' + value).addClass('active');
        },
        windDirectionClickEvent: function(event) {
            if (this.model.get('is_auto')) {
                return;
            }
            var el = $(event.target);
            var parentEl = el.parent();
            var name = parentEl.hasClass('left') ? 'left_wind_direction' : 'right_wind_direction';
            if (el.hasClass('top')) {
                this.model.set(name, 'top', {el: parentEl});
            } else if (el.hasClass('middle')) {
                this.model.set(name, 'middle', {el: parentEl});
            } else if (el.hasClass('bottom')) {
                this.model.set(name, 'bottom', {el: parentEl});
            }
        },
        windQuantityClickEvent: function(event) {
            var el = $(event.target);
            var parentEl = el.parent();
            var name = parentEl.hasClass('left') ? 'left_wind_quantity' : 'right_wind_quantity';
            var quantity = parseInt(el.attr('data-quantity'));
            this.model.set(name, quantity, {el: parentEl});
        },
        windQuantityChange: function(model, value, options) {
            var el = options.el;
            el.attr('data-quantity', value);
            var name = el.hasClass('left') ? 'left_wind_quantity' : 'right_wind_quantity';
            var previousQuantity = model.previous(name);
            var min = Math.min(value, previousQuantity);
            var max = Math.max(value, previousQuantity);
            for (var i = min + 1; i <= max; i++) {
                el.find('.quantity' + i).toggleClass('shown');
            }
            el.find('.fan').remove();
            el.prepend('<div class="fan"></div>');
        },
        windQuantityUp: function(event) {
            var el = $(event.target);
            if (!el.hasClass('wind')) {
                el = el.parent('.wind');
            }
            var name = el.hasClass('left') ? 'left_wind_quantity' : 'right_wind_quantity';
            var quantity = this.model.get(name);
            if (quantity >= 7) {
                this.model.set(name, 7, {el: el});
            } else {
                this.model.set(name, quantity + 1, {el: el});
            }
        },
        windQuantityDown: function(event) {
            var el = $(event.target);
            if (!el.hasClass('wind')) {
                el = el.parent('.wind');
            }
            var name = el.hasClass('left') ? 'left_wind_quantity' : 'right_wind_quantity';
            var quantity = this.model.get(name);
            if (quantity <= 1) {
                this.model.set(name, 1, {el: el});
            } else {
                this.model.set(name, quantity - 1, {el: el});
            }
        },
        temperatureHigher: function(event) {
            var el = $(event.currentTarget);
            var name = el.hasClass('left') ? 'left_temperature' : 'right_temperature';
            var higherTemperature = this.model.higherTemperature(name, 1);
            this.model.set(name, higherTemperature, {name: name, el: el});
        },
        temperatureLower: function(event) {
            var el = $(event.currentTarget);
            var name = el.hasClass('left') ? 'left_temperature' : 'right_temperature';
            var lowerTemperature = this.model.lowerTemperature(name, 1);
            this.model.set(name, lowerTemperature, {name: name, el: el});
        },
        temperatureChange: function(model, value, options) {
            var el = options.el;
            var name = options.name;
            var values = this.model.getRelativeTemperature(name);
            el.find('li').each(function(index, item) {
                $(item).text(values[index]);
            });
        },
        temperatureItemClickEvent: function(event) {
            var el = $(event.target);
            var temperature = parseInt($.trim(el.text()));
            if (typeof temperature == NaN) {
                return;
            }
            var parentEl = el.parent().parent('.wrapper');
            var name = parentEl.hasClass('left') ? 'left_temperature' : 'right_temperature';
            this.model.set(name, temperature, {name: name, el: parentEl});
        }
    });
});