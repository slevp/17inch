/**
 * @Description: header v3.
 * @Author: fuwensong
 * @Date: 14-9-26
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');
    var Settings = require('../settings.json');
    var storageKeys = Settings.STORAGE_KEYS;
    var homeInfo = store.get(storageKeys.home_info);

    var BigTemplate = require('../templates/header-big.tpl');
    var SmallTemplate = require('../templates/header-small.tpl');
    var WheelPressApp = require('./apps/wheel-press/index');
    var WeatherApp = require('./apps/weather/index');
    var OilApp = require('./apps/oil/index');

    var vrTemplate = require('./apps/VR/templates/index.tpl');
    var wheelPressApp, wheelPressDialog, weatherApp, weatherDialog, oilApp, oilDialog, voiceDialog;


    var objConnect = {
        "appid":"siriAppID",
        "type": "4",
        "test": "siri"
    };

    voiceDialog = new topivi.dialog.normal('', {
        content: _.template(vrTemplate),
//        useMask: true,
        closeGesture: 'swiperight clickmask'
    });
    var onMessage = require('./apps/VR/callback');
    var topiviSocket = new topivi.socket('ws://' + Settings.SOCKET_HOST + ':2001', 'dumb-increment-protocol', onMessage.fn);
    var linkSockert = new topivi.socket('ws://' + Settings.SOCKET_HOST + ':2002', 'dumb-increment-protocol');

    var vrStatus = false;
    onMessage.init({
        dialog: voiceDialog,
        socket: topiviSocket,
        status: vrStatus
    });
    topiviSocket.int();
    linkSockert.int();
    setTimeout(function () {
        linkSockert.send(JSON.stringify(objConnect));
    }, 2000);

    module.exports = Backbone.View.extend({
        id: 'header-container',
        bigTemplate: _.template(BigTemplate),
        smallTemplate: _.template(SmallTemplate),
        events: {
            'tap .voice-btn': 'voiceBtnClickEvent',
            'tap .big-info .weather': 'weatherClickEvent',
            'tap .big-info .maintain': 'maintainClickEvent',
            'tap .big-info .drive': 'driveClickEvent',
//            'tap .small-info .press': 'wheelPressClickEvent',
            'tap .alarms .icon': 'alarmIconClickEvent'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            var self = this;
            this.mode = 'big';
            this.on('changeMode', this.changeMode);
            $(document).on('updateHomeWeather', function () {
                self.updateHomeWeather();
            });
            $(document).on('showOilDialog', function () {
                self.showOilDialog();
            });
            $(document).on('getLocationWeather', function (e, location, callback) {
                self.weatherClickEvent(e, location, callback);
            });
        },
        render: function () {
            this.$el.empty();
            if (this.mode === 'big') {
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
        changeMode: function (options) {
            options = options || {};
            this.mode = options.mode;
            this.render();
        },
        voiceBtnClickEvent: function() {
            if (onMessage.status()) {
                objConnect.type = '1';
                topiviSocket.send(JSON.stringify(objConnect));
                voiceDialog.open();
                vrStatus = true;
                onMessage.init({
                    status: vrStatus
                });
            }


        },
        weatherClickEvent: function (e, location, callback) {
            if (!weatherDialog) {
                weatherDialog = new topivi.dialog.normal('', {
                    useMask: true,
                    closeGesture: 'swiperight clickmask'
                });
                weatherDialog.el.addClass('home-weather');
            }
            if (!weatherApp) {
                weatherApp = new WeatherApp({
                    $parent: weatherDialog.el
                });
            }
            if (location) {
                weatherApp.fetchData(function () {
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
        maintainClickEvent: function () {
            $(document).trigger('openApp', 'Maintenance');
        },
        driveClickEvent: function () {
            $(document).trigger('openApp', 'Driving Habits Analysis');
        },
        showOilDialog: function () {
            if (!oilDialog) {
                oilDialog = new topivi.dialog.normal('', {
                    useMask: true,
                    closeGesture: 'swiperight clickmask'
                });
                oilDialog.el.addClass('home-oil');
            }
            if (!oilApp) {
                oilApp = new OilApp({
                    $parent: oilDialog.el
                });
            }
            oilDialog.setContent(oilApp.render().el);
            oilDialog.open();
        },
        wheelPressClickEvent: function () {
            if (!wheelPressApp) {
                wheelPressApp = new WheelPressApp();
            }
            if (!wheelPressDialog) {
                wheelPressDialog = new topivi.dialog.normal('', {
                    useMask: true,
                    closeGesture: 'swiperight clickmask',
                    content: wheelPressApp.render().el
                });
            }
            wheelPressDialog.open();
        },
        alarmIconClickEvent: function (e) {
            var el = $(e.currentTarget);
            if (el.hasClass('active')) {
                return;
            }
            el.addClass('active');
            var content = '';
            if (el.hasClass('front-fog')) {
                content = '前雾灯';
            } else if (el.hasClass('stop')) {
                content = '手刹';
            } else if (el.hasClass('big-light')) {
                content = '远光灯';
            } else if (el.hasClass('key')) {
                content = '钥匙门';
            } else if (el.hasClass('abs')) {
                content = '防抱死';
            } else if (el.hasClass('back-fog')) {
                content = '后雾灯';
            }
            var tips = new topivi.tips.normal('', {
                removeAfterHide: true,
                dependEl: el,
                content: content,
                direction: 'top',
                autoHide: true,
                beforeHide: function () {
                    el.removeClass('active');
                }
            });
            tips.el.addClass('alarm-tips');
            tips.show();
        },
        clockRunnable: function () {
            var self = this;
            var runnable = function () {
                var el = self.$el.find('.header-clock');
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
                el.find('.dot').toggleClass('invisible');
                el.find('.hour-ten').attr('class', 'hour-ten number' + hourTen);
                el.find('.hour-bit').attr('class', 'hour-bit number' + hourBit);
                el.find('.min-ten').attr('class', 'min-ten number' + minTen);
                el.find('.min-bit').attr('class', 'min-bit number' + minBit);
            };
            runnable();
            if (!this.clockInteval) {
                this.clockInteval = setInterval(runnable, 1000);
            }
        },
        safeDistanceRunnable: function () {
            var mode = this.mode;
            var el = this.$el.find('.header-safe-distance');
            var timeout = 900;
            var runnableBottom = function () {
                if (mode === 'big') {
                    el.find('.bottom').addClass('brighter');
                    setTimeout(runnableMiddle, timeout);
                }
            };
            var runnableMiddle = function () {
                if (mode === 'big') {
                    el.find('.middle').addClass('brighter');
                    setTimeout(runnableTop, timeout);
                }
            };
            var runnableTop = function () {
                if (mode === 'big') {
                    el.find('.top').addClass('brighter');
                    setTimeout(runnableReset, timeout);
                }
            };
            var runnableReset = function () {
                if (mode === 'big') {
                    el.find('.bottom, .middle, .top').removeClass('brighter');
                    setTimeout(runnableBottom, timeout);
                }
            };
            if (mode === 'big') {
                setTimeout(runnableBottom, timeout);
            }
        },
        updateHomeWeather: function () {
            if (this.mode === 'big') {
                var weather = getHeaderWeather();
                var weatherEl = this.$el.find('.weather');
                weatherEl.find('.icon').attr({
                    src: weather.iconPath
                });
                weatherEl.find('.temperature .value').text(weather.temperature.from);
                weatherEl.find('.status').text(weather.status);
            }
        }
    });
    var getHeaderWeather = function () {
        var todayWeather = store.get(storageKeys.today_weather);
        if (!todayWeather) {
            return homeInfo['weather']['default'];
        }
        return todayWeather;
    };
});