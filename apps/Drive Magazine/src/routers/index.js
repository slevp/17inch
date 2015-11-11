
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = Backbone.$;
    var HomeView = require('../views/home');
    var DetailsView = require('../views/details');
    var homeView = null;
    var detailsView = null;

    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "book/:bookId": "details"
        },
        homePage: function (page) {
            var self = this;
            if (!homeView) {
                homeView = new HomeView();
                Backbone.$('body').append(homeView.render().el);
                Backbone.$('.page.active').removeClass('active');
                homeView.$el.addClass('active');
            } else {
                Backbone.$('body').find('.active').removeClass('active');
                homeView.$el.addClass('active');
            }
            this.listenTo(homeView, 'clickBook', function(url){
                self.navigate(url, {trigger: true})
            });
        },
        details: function (id) {
            if (detailsView) {
                detailsView.remove();
            }
            detailsView = new DetailsView(
                {bookId: id}
            )
            Backbone.$('.page.active').removeClass('active');
            Backbone.$('body').append(detailsView.render().el);
            detailsView.$el.addClass('active');
        }

    });
});