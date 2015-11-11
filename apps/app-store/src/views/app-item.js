/**
 * @Description: App item of app list.
 * @Author: fuwensong
 * @Date: 14-9-23
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var $p = parent.seajs.require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');
    var Template = require('../templates/app-item.tpl');
    var AppDetailView = require('./app-detail');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;

    module.exports = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: _.template(Template),
        events: {
            'tap .install': 'installBtnClick',
            'tap .uninstall': 'uninstallBtnClick',
            'tap .link': 'showDetailDialog',
            'tap .pause': 'pauseDownloadBtnClick',
            'tap .stop': 'stopDownloadBtnClick'
        },
        constructor: function () {
            Backbone.View.apply(this, arguments);
        },
        initialize: function () {
            this.listenTo(this.model, 'change:installed', this.installedStatusChanged);
            this.listenTo(this.model, 'change', this.updateStoreApp);
        },
        render: function () {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        updateStoreApp: function (model, value, options) {
            var apps = store.get(localKeys.apps);
            for (var i = 0; i < apps.length; i++) {
                if (model.id === apps[i]._id) {
                    apps[i] = model.toJSON();
                    break;
                }
            }
            store.set(localKeys.apps, apps);
        },
        installedStatusChanged: function (model, value, options) {
            var installBtnEl = this.$el.find('.install');
            if (value) {
                installBtnEl.text('打开');
                this.$el.prepend("<div class='uninstall'></div>");
            } else {
                var charge = model.get('charge');
                installBtnEl.text(charge > 0 ? '￥' + charge : '免费');
                this.$el.find('.uninstall').remove();
            }
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
        uninstallBtnClick: function (e) {
            var self = this;
            e.stopPropagation();
            var isInstalled = this.model.get('installed');
            if (!isInstalled) {
                return;
            }
            $p(parent.document).trigger('uninstallApp', {
                app: {
                    id: this.model.id
                },
                callback: function () {
                    self.model.set('installed', false);
                }
            });
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
        },
        showDetailDialog: function (e) {
            var el = Backbone.$(e.currentTarget);
            var offset = el.offset();
            var width, height;
            var elWidth = el.width();
            var elHeight = el.height();
            var appDetailView = new AppDetailView({model: this.model});
            var dialog = new topivi.dialog.normal('#app-detail-dialog', {
                useMask: true,
                closeGesture: 'clickmask',
                content: appDetailView.render().el,
                beforeOpen: function () {
                    el.hide();
                },
                onOpen: function () {
                    appDetailView.initScrolls();
                },
                onClose: function () {
                    el.show();
                    appDetailView.remove();
                },
                inAnimation: function (callback) {
                    var timeout = 200;
                    var ease = 'easeOutBack';
                    this.el.animate({
                        top: "50%",
                        left: "50%",
                        width: width,
                        height: height,
                        'marginTop': -height / 2,
                        'marginLeft': -width / 2
                    }, timeout, ease, function() {
                        callback();
                    });
                },
                outAnimation: function (callback) {
                    var self = this;
                    var timeout = 200;
                    var ease = 'easeInBack';
                    this.el.animate({
                        top: offset.top,
                        left: offset.left,
                        width: elWidth,
                        height: elHeight,
                        'marginTop': '0',
                        'marginLeft': '0'
                    }, timeout, ease, function() {
                        self.el.css({
                            width: width,
                            height: height,
                            'margin-top': 0,
                            'margin-left': 0
                        });
                        callback();
                    });
                }
            });
            width = dialog.el.width();
            height = dialog.el.height();
            dialog.el.css({
                width: el.width(),
                height: el.height(),
                top: offset.top,
                left: offset.left,
                'margin-top': 0,
                'margin-left': 0
            });
            dialog.open();
        }
    });
});