/**
 * Created by wangyuhao on 14-10-10.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var store = require('store');
    var HomeView = require('../templates/home.tpl');
    var ckeckTagData = {};

    module.exports = Backbone.View.extend({
        className: 'page home',
        template: _.template(HomeView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        events: {
            'taphold .tag': 'tapHoldTag',
            'taphold .moreTag': 'tapHoldTag',
            'click .update-btn': 'dataUpdate',
            'click .tag': 'clickTag',
            'click .moreTag': 'clickTag'
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
            if(this.$el.find('.checkTag').length > 0){
                this.$el.find('.main .update-btn').addClass('active');
            }
            return this;
        },
        tapHoldTag: function (e) {
            e.stopImmediatePropagation();
            var el = $(e.currentTarget);
            var key = parseInt(el.attr('data-key'));
            if (el.find('.checkTag').length > 0) {
                if(ckeckTagData[key]){
                    ckeckTagData[key] = false;
                }
              el.find('.checkTag').remove();
            }else {
                ckeckTagData[key] = true;
                el.append('<div class="checkTag"></div>');
            }
            this.trigger("tapHoldTag");
            this.isHolding = true;
        },
        updateBtn : function () {
            if(this.$el.find('.main .checkTag').length > 0) {
                this.$el.find('.main .update-btn').addClass('active');
            } else {
                this.$el.find('.main .update-btn').removeClass('active');
                ckeckTagData = {};
            }
        },
        dataUpdate : function () {
            var LocalMaintenance = store.get('maintenance');
            var p = this.$el.find('.checkTag');
            var d = $(".checkTag").parent();
            var Week = ['日','一','二','三','四','五','六'];
            for(var i = 0; i< d.length; i++) {
                var j =$(d).eq(i).attr('class');
                var s = j.indexOf(' ');
                var tagName = j.substring(s + 1);
                var nowDate = new Date();
                var month = parseInt(nowDate.getMonth()) + 1;
                var nowDate= nowDate.getFullYear() + '年' + month + '月' + nowDate.getDate()+ '日' + '  ' + '周' + Week[nowDate.getDay()];
                var data = LocalMaintenance[tagName];

                var latelyTime = data.nowTime;
                data.latelyTime = latelyTime;
                data.nowTime = nowDate;
                LocalMaintenance[tagName] = data;
                store.set('maintenance', LocalMaintenance);
            }
            this.$el.find('.checkTag').remove();
            var self =this;
            setTimeout(function() {
                ckeckTagData = {};
                self.$el.find('.update-btn').removeClass('active');
            }, 100);
        },
        clickTag: function (e) {
                if (this.isHolding) {
                    this.isHolding = false;
                    return;
                }
                if (Backbone.$('body').find('.main .tag .checkTag')[0]) {
                    return;
                } else {
                    var el = Backbone.$(e.currentTarget);
                    var key = el.attr('data-key');
                    this.trigger('navigate', "tag/" + key);
                }
        }
    });
})