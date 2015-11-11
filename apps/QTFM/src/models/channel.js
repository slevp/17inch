/**
 * @Description: Channel model.
 * @Author: fuwensong
 * @Date: 14-10-13
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Settings = require('../settings.json');

    module.exports = Backbone.Model.extend({
        url: Settings.API_URL + Settings.URLs.program_list + '?app_key=' + Settings.APP_KEY,
        defaults: {
        },
        initialize: function () {
        },
        parse: function (res) {
            if (res.id) {
                return parse(res);
            }
            var result = {};
            if (res.status === 'ok') {
                result = parse(res.channel);
            }
            return result;
        },
        getTodayPrograms: function () {
            var result = [];
            var programs = this.get('programs');
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
        getNowProgram: function () {
            var programs = this.getTodayPrograms();
            if (programs.length <= 0) {
                return {};
            }
            var nowTime = new Date().getTime();
            var program = _.find(programs, function (program) {
                var broadcastTime = program.broadcasttime;
                var duration = parseInt(program.duration);
                var parts = broadcastTime.split(':');
                var hours, mins;
                if (parts.length < 2) {
                    console.error('Data broadcasttime is invalid.');
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
                var end = new Date(begin.getTime() + duration * 1000);
                return (nowTime >= begin.getTime() && nowTime <= end.getTime());
            });
            program = program || {};
            return program;
        },
        getNowProgramProgress: function () {
            var program = this.getNowProgram();
            var result = {
                current: 0,
                max: 0
            };
            if (!_.isEmpty(program)) {
                var broadcastTime = program.broadcasttime;
                var duration = parseInt(program.duration); // unit is second
                var parts = broadcastTime.split(':');
                var hours = parseInt(parts[0]);
                var mins = parseInt(parts[1]);
                var begin = new Date();
                begin.setHours(hours);
                begin.setMinutes(mins);
                begin.setSeconds(0);
                var now = new Date();
                var playedTime = now.getTime() - begin.getTime();
                result.current = parseInt(playedTime / 1000);
                result.max = duration;
            }
            return result;
        }
    });
    var parse = function (channel) {
        return {
            id: channel.id,
            name: channel.name,
            desc: channel.desc ? channel.desc : '',
            frequency: channel.frequency,
            mediaId: channel.mediainfo.id,
            mediaSrc: getMediaSrc(channel.mediainfo.id),
            catId: channel.catid,
            thumbnail: channel.pic ? channel.pic : '',
            programs: channel.programs ? parseProgram(channel.programs) : {}
        };
    };
    var parseProgram = function (programs) {
        var result = {};
        _.each(programs, function (day) {
            result[day.dayofweek] = day.programs;
        });
        return result;
    };
    var getMediaSrc = function (mediaId) {
        return 'http://http.qingting.fm/' + mediaId + '.mp3';
    };
});