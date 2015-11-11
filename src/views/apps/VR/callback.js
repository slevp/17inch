/**
 * Created by caiyidi on 14/10/08.
 */

define(function (require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var iscroll = require('iscroll');
    var store = require('store');
    var topivi = require('topivi');
    var commandTemplate = require('./templates/command.tpl');
    var answerTemplate = require('./templates/answer.tpl');
    var temp, responseType, onsTimer, findMusic;

    var dialog = null;
    var topiviSocket = null;
    var status = null;
    var songs = null;
    var weatherData = null;
    var Json = {
        "appid":"siriAppID",
        "type": "3",
        "test": ''
    };


    exports.init = function (options) {
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
    exports.status = function () {
        return status == false
    };
    
    exports.fn = function (e) {
        console.log(e.data);

        var result = eval("(" + e.data + ")");
        if (result.speaker == 'machine' && result.speakContentExist == 'yes') {
            $('.VR-animation1').addClass('select').show();

            if (Json.test == '') {
                $('.machine-words').text(result.speakContent).show();
            } else {
                $('.machine-words').text(Json.test).show();
                Json.test = '';
            }
        }
        if (result.speaker == 'machine' && result.commandExist == 'yes') {
            temp = _.template(commandTemplate);
            $('.VR .content').html(temp(result));
        }
        if (result.speaker == 'record') {
            $('.VR-animation2').show();
            $('.VR-animation1').hide();
            $('.machine-words').hide();
        }
        if (result.speaker == 'iat') {
            responseType = '';
            $('.VR-animation2').hide();
            $('.VR-animation1').removeClass('.select');
        }
        switch (result.opetype) {
            case '1' :
                if (result.setappid == "5MA6VxmSYR.MediaP") {
                    $(document).trigger('openApp', 'player');
                    $(document).trigger('getPlayerSongList', function (list) {
                        songs = {
                            command: _.pluck(list, 'title')
                        };
                    });
                    temp = _.template(commandTemplate);
                    $('.VR .content').empty().html(temp(songs));
                } else if (result.setappid == "pyQvMFdkMd.navi") {
                    $(document).trigger('openApp', 'navi');
                }
                break;
            case '3' :
                responseType = 'music';
                if(result.settype==131073) {
                    findMusic = _.find(songs.command, function (name) {
                        return $.trim(name) == $.trim(result.setinfoText);
                    });
                    if (findMusic) {
                        // play music
                        $(document).trigger('playSong', findMusic);
                    } else {
                        Json.test = '未找到"' + result.setinfoText + '"，将为您随机播放';
                        topiviSocket.send(JSON.stringify(Json));
                        $(document).trigger('randomPlaySong');
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
            case '7' :
                status = false;
                switch (responseType) {
                    case '':
                        onsTimer = 1000;
                        break;
                    case 'music':
                        onsTimer = 3000;
                        break;
                    case 'answer':
                        onsTimer = false;
                        break;
                    case 'query':
                        onsTimer = false;
                        break;
                    case 'weather':
                        onsTimer = 100;
                        break;
                    case 'oil':
                        onsTimer = 1000;
                        break;
                    default :
                        break;
                }
                if (onsTimer) {
                    setTimeout(function () {
                        dialog.close();
                    }, onsTimer);
                }
                break;
            default :
                break;
        }

        if (result.rc != undefined && result.rc != null) {
            if (result.rc <= 3 ) {
                switch (result.operation) {
                    case 'ANSWER':
                        responseType = 'answer';
                        temp = _.template(answerTemplate);
                        $('.VR .content').empty().html(temp(result));
                        setTimeout(function () {
                            new iscroll('.VR .content .command-list');
                        },100);

                        Json.test = result.answer.text;
                        topiviSocket.send(JSON.stringify(Json));
                        Json.test = '';
                        break;
                    case 'QUERY':
                        responseType = 'query';
                         if (result.service == "weather") {
                             responseType = 'weather';
                             var queryCity = result.semantic.slots.location.city;
                             if (queryCity == 'CURRENT_CITY') {
                                 queryCity = '上海'
                             }
                             $(document).trigger('getLocationWeather', [queryCity, function (data) {
                                 weatherData = data;
                                 Json.test = '今天' + weatherData[0].date + ','
                                     +'星期' + weatherData[0].day + ','
                                     + weatherData[0].status + ','
                                     + weatherData[0].wind + ','
                                     + '最高温度' + weatherData[0].temperature.to + '度' + ','
                                     + '最低温度' + weatherData[0].temperature.from + '度';
                                 topiviSocket.send(JSON.stringify(Json));
                                 Json.test = '';
                             }]);
                         }
                        break;
                    case 'PLAY':
                        responseType = 'music';
                        $(document).trigger('openApp', 'player');
                        $(document).trigger('getPlayerSongList', function (list) {
                            songs = {
                                command: _.pluck(list, 'title')
                            };
                        });
                        findMusic = _.find(songs.command, function (name) {
                            return $.trim(name) == $.trim(result.semantic.slots.song);
                        });
                        setTimeout(function () {
                            if (findMusic) {
                                // play music
                                $(document).trigger('playSong', findMusic);
                            } else {
                                Json.test = '未找到"' + result.semantic.slots.song + '"，将为您随机播放';
                                topiviSocket.send(JSON.stringify(Json));
                                $('.VR-animation1').show();
                                $('.machine-words').show().text(Json.test);
                                Json.test = '';
                                $(document).trigger('randomPlaySong');
                            }
                        }, 2000);
                        break;
                    case 'LAUNCH':
                        if (result.service == 'radio') {
                            var playinfo = result.semantic.slots.name;
                            console.log("playinfo :" + playinfo);
                            //TODO
                        }
                        break;
                    default :
                        break;
                }
            } else {
                if (result.text.indexOf('油价') != -1) {
                    responseType = 'oil';
                    $(document).trigger('showOilDialog');
                }
            }
        }
    };
});