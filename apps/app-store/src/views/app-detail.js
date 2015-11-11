/**
 * @Description: App dtail view.
 * @Author: fuwensong
 * @Date: 14-9-24
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $p = parent.seajs.require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var topivi = require('topivi');
    var IScroll = require('iscroll');
    var Template = require('../templates/app-detail.tpl');

    module.exports = Backbone.View.extend({
        className: 'scroller',
        template: _.template(Template),
        events: {
            'tap .install': 'installBtnClick',
            'tap .pause': 'pauseDownloadBtnClick',
            'tap .stop': 'stopDownloadBtnClick'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.listenTo(this.model, 'change:installed', this.installedStatusChanged);
        },
        render: function () {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        installedStatusChanged: function (model, value, options) {
            var installBtnEl = this.$el.find('.install');
            if (value) {
                installBtnEl.text('打开');
            } else {
                var charge = model.get('charge');
                installBtnEl.text(charge > 0 ? '￥' + charge : '免费');
            }
        },
        initScrolls: function () {
            var self = this;
            setTimeout(function() {
                self.contentScroll = new IScroll('#app-detail-dialog .content');
                var previewsUlEl = self.$el.find('.wrapper>ul');
                if (previewsUlEl.length > 0) {
                    self.resetPreviewWidth();
                    self.previewsScroll = new IScroll('#app-detail-dialog .wrapper', {
                        scrollX: true,
                        scrollY: false,
                        click: true
                    });
                }
            }, 100);
        },
        resetPreviewWidth: function () {
            var previewsUlEl = this.$el.find('.wrapper ul');
            var previewLength = this.model.get('previews').length;
            var itemWidth = previewsUlEl.find('.item').outerWidth(true);
            previewsUlEl.css('width', previewLength * itemWidth);
        },
        installBtnClick: function (e) {
            e.stopPropagation();

            var self = this;
            var el = Backbone.$(e.currentTarget);
            if (el.hasClass('installing') || el.hasClass('disabled')) {
                return;
            }
            var loadingEl = this.$el.find('.loading');
            var btnsEl = this.$el.find('.btns');
            var progressEl = this.$el.find('.download-progress');
            var isInstalled = this.model.get('installed');
            if (isInstalled) {
                console.log('Open app -> ' + this.model.get('name'));
                return this.noticeHomeOpenApp();
            }
            var success = function () {
                loadingEl.hide();
                btnsEl.show();
                progressEl.show();
                self.startDownload();
            };
            var error = function () {
                loadingEl.hide();
                el.show();
            };
            el.hide();
            var charge = this.model.get('charge');
            if (charge > 0) {
                var dialog = new topivi.dialog.confirm('', {
                    useMask: true,
                    closeGesture: 'clickmask',
                    removeAfterClose: true,
                    content: '下载该应用需要收费，金额：￥' + charge,
                    onOkClick: function () {
                        loadingEl.show();
                        el.addClass('installing');
                        self.checkDownload({success: success, error: error});
                    },
                    onClose: function (options) {
                        options = options || {};
                        if (options.from && options.from !== 'ok') {
                            el.show();
                        }
                    }
                });
                dialog.el.addClass('app-store');
                dialog.open();
            } else {
                loadingEl.show();
                el.addClass('installing');
                this.checkDownload({success: success, error: error});
            }
        },
        checkDownload: function (options) {
            setTimeout(options.success, 1000);
//            var id = this.model.id;
//            Backbone.$.ajax({
//                url: Settings.API_URL + '/app/' + id + '/download',
//                data: {
//                    app_key: Settings.APP_KEY
//                },
//                type: 'GET'
//            }).success(function (data, textStatus, jqXHR) {
//                if (data.status === 'ok') {
//                    options.success();
//                } else {
//                    new topivi.dialog.normal('', {
//                        autoOpen: true,
//                        removeAfterClose: true,
//                        content: data.msg
//                    });
//                    options.error();
//                }
//            }).error(function (jqXHR, textStatus, errorThrown) {
//                new topivi.dialog.normal('', {
//                    autoOpen: true,
//                    removeAfterClose: true,
//                    content: '服务器出错，请稍后再试...'
//                });
//                options.error();
//            });
        },
        startDownload: function () {
            var self = this;
            var progressEl = this.$el.find('.download-progress');
            this.downloadProgress = new topivi.progress.line(progressEl, {
                onEnd: function () {
                    clearInterval(self.downloadInterval);
                    self.startInstall();
                }
            });
            this.createDownloadRunnable();
        },
        pauseDownloadBtnClick: function (e) {
            e.stopPropagation();
            var el = Backbone.$(e.currentTarget);
            if (!el.hasClass('paused')) {
                if (this.downloadInterval) {
                    clearInterval(this.downloadInterval);
                }
            } else {
                this.createDownloadRunnable();
            }
            el.toggleClass('paused');
        },
        createDownloadRunnable: function () {
            var self = this;
            this.downloadInterval = setInterval(function () {
                var random = Math.random() * 40;
                self.downloadProgress.plusProgress(random);
            }, 1000);
        },
        stopDownloadBtnClick: function (e) {
            e.stopPropagation();

            var installBtnEl = this.$el.find('.install');
            var btnsEl = this.$el.find('.btns');
            var progressEl = this.$el.find('.download-progress');
            var pauseBtnEl = this.$el.find('.pause');
            if (this.downloadInterval) {
                clearInterval(this.downloadInterval);
            }
            this.downloadProgress = undefined;
            btnsEl.hide();
            progressEl.hide();
            installBtnEl.show();
            installBtnEl.removeClass('installing');
            pauseBtnEl.removeClass('paused');
        },
        startInstall: function () {
            var self = this;
            var installBtnEl = this.$el.find('.install');
            var btnsEl = this.$el.find('.btns');
            var progressEl = this.$el.find('.download-progress');
            installBtnEl.text('安装中...');
            installBtnEl.show();
            btnsEl.hide();
            progressEl.hide();
            this.noticeHomeInstallApp(function () {
                self.model.set('installed', true);
                installBtnEl.removeClass('installing');
            });
        },
        noticeHomeInstallApp: function (callback) {
            $p(parent.document).trigger('installApp', {
                callback: callback,
                app: {
                    _id: this.model.id,
                    name: this.model.get('name')
                }
            });
        },
        noticeHomeOpenApp: function () {
            var name = this.model.get('name');
            $p(parent.document).trigger('openApp', name);
        }
    });
});