/**
 * Created by wangyuhao on 14-10-10.
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = Backbone.$;
    var store = require('store');
    var Datas = require('../data/data.json');
    var HomeView = require('../templates/home.tpl');
    var bookColl = require('../collections/books');
    store.set('books', Datas.Data);
    var books = store.get('books');
    module.exports = Backbone.View.extend({
        className: 'page home',
        template: _.template(HomeView),
        constructor: function() {
            Backbone.View.apply(this, arguments);
        },
        events: {
            'click .item': 'clickBook'
        },
        initialize: function() {
            this.collection = new bookColl(books);
        },
        render: function() {
            this.delegateEvents();
            if (this.collection.length > 0) {
                console.log(this.collection.length);
            }
            this.$el.empty();
            this.$el.append(this.template({
                books: books,
                length: this.collection.length
            }));
            return this;
        },
        clickBook: function (e) {
            e.stopImmediatePropagation();
            var el = $(e.currentTarget);
            var dataKey = el.attr('data-key');
            if (parseInt(dataKey) > 1) {

            } else {
                this.trigger("clickBook", "#/book/" +dataKey);
            }

        }
    });
})