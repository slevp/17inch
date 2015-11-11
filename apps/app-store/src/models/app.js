/**
 * @Description: App model.
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var store = require('store');
    var topivi = require('topivi');
    var Settings = require('../settings.json');
    var localKeys = Settings.STORAGE_KEYS;
    var installedApps = store.get(localKeys.home_apps);
    installedApps = installedApps || [];
    var enabledApps = Settings.enabled_apps;

    module.exports = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            charge: 0,
            rating: '4',
            previews: [],
            installed: false,
            install_status: 'none',
            is_enabled: false
        },
        initialize: function () {
            this.initSizeName();
            this.checkInstalled();
            this.checkEnabled();
        },
        checkInstalled: function () {
            var name = this.get('name');
            if (_.findWhere(installedApps, {name: name})) {
                this.set('installed', true);
            }
            return this.get('installed');
        },
        initSizeName: function () {
            var size = this.get('size');
            this.set('size_name', topivi.util.fileSizeString(size, 1));
        },
        checkEnabled: function () {
            var name = this.get('name');
            if (_.contains(enabledApps, name)) {
                this.set('is_enabled', true);
            }
        }
    });
});