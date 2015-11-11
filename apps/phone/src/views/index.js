/**
 * Created by fuwensong on 14-7-4.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;


    var phoneTemplate = require('../templates/app-phone.tpl');

    var DialView = require('./dial');
    var ContactView = require('./contact');
    var RecentView = require('./recent');
    var FavoritesView = require('./favorites');
    var contacts = require('../contacts.json');
    var ContactsCollection = require('../collections/contact');

    module.exports = Backbone.View.extend({
        className: 'app-phone',
        template: _.template(phoneTemplate),
        events: {
            'click .nav-btns .item': 'navItemClickEvent',
            'click .dialing': 'dialingClickEvent',
        },
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        initialize: function() {
            this.currentPage = 'dial';
            this.contactsCollection = new ContactsCollection(contacts);

            this.dialView = new DialView({
                collection: this.contactsCollection
            });
            this.contactView = new ContactView({
                collection: this.contactsCollection
            });
            this.contactView.indexView = this;
            this.currentView = this.dialView;
            this.on('switchPage', this.switchPage);

            this.recentView = new RecentView({
                collection: this.contactsCollection
            });
            this.favoritesView = new FavoritesView({
                collection: this.contactsCollection
            })
        },
        render: function() {
            var self = this;
            this.delegateEvents();
            this.$el.empty();
            this.$el.html(this.template({page: this.currentPage}));
            var view;
            switch(this.currentPage) {
                case 'dial':
                    this.dialView.$el = this.$el.find('.dial-page');
                    view = this.dialView;
                    break;
                case 'phone-book':
                    this.contactView.$el = this.$el.find('.phone-book-page');
                    view = this.contactView;
                    break;
                case 'recent-call':
                    this.recentView.$el = this.$el.find('recent-call-pag');
                    view = this.recentView;
                    break;
                case 'favorites':
                    this.favoritesView.$el = this.$el.find('favorites-page');
                    view = this.favoritesView;
                    break;
            }
            view.render();
            this.$el.find('.page.active').removeClass("active");
            view.$el.addClass('active');
            this.currentView = view;
            return this;
        },
        navItemClickEvent: function(event) {
            var el = $(event.target);
            var page = el.attr('data-page');
            if (page == this.currentPage) {
                return ;
            }
            this.$el.find('.nav-btns .active').removeClass("active");
            el.addClass('active');
            this.currentPage = page;
            this.render();
        },
        switchPage: function(options) {
            options = options || {
                page: 'dial'
            };
            this.currentPage = options.page;
            this.render();
            if (options.fn) {
                this.currentView[options.fn].call(this.currentView, options);
            }
        },
        saveToRecent: function(options) {

        }
    },
    {
        tag: 'phone'
    });
});