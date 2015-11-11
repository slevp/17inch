/**
 * @Description: Confirm dialog.
 * @Author: fuwensong
 * @Date: 14-9-18
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var util = require('../util');
    var Dialog = require('./dialog');
    var Template = require('../templates/dialog-confirm.tpl');
    var IScroll = require('iscroll');

    function Confirm (selector, options) {
        this.template = _.template(Template);
        var defaults = {
            onOkClick: function (e) {
            },
            onCancelClick: function (e) {
            }
        };
        options = _.extend(defaults, options);
        Dialog.apply(this, arguments);
    }
    util.inherits(Confirm, Dialog);

    Confirm.prototype.init = function () {
        Dialog.prototype.init.apply(this, arguments);
        var self = this;
        var options = this.options;

        this.el.addClass('confirm');
        this.el.on('click', '.ok', function () {
            self.close({from: 'ok'});
            options.onOkClick(arguments);
        });
        this.el.on('click', '.cancel', function () {
            self.close({from: 'cancel'});
            options.onCancelClick(arguments);
        })
    };

    Confirm.prototype.render = function () {
        var self = this;
        this.el.html(this.template({content: this.options.content}));
        this.el.find('.content').wrapInner("<div class='wrapper'></div>");
        setTimeout(function() {
            if (!self.id) {
                console.error('ID is not set.');
                return;
            }
            self.contentScroll = new IScroll('#' + self.id + ' .content', {
                scrollX: false,
                scrollY: true,
                mouseWheel: true
            });
        }, 100);

    };
    module.exports = Confirm;
});