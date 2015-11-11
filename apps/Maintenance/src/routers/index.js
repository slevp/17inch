
define(function (require, exports, module) {
    var Backbone = require('backbone');
    var $ = Backbone.$;
    var HomeView = require('../views/home');
    var DetailsView = require('../views/details');
    var RepairPageView = require('../views/repair');
    var homeView = null;
    var detailsView = null;
    var repairPageView = null;
    module.exports = Backbone.Router.extend({
        routes: {
            "": "homePage",
            "tag/:tagId": "details",
            "repairshop": "repair"
        },
        homePage: function (page) {
            page = page || 'all';
            if (!homeView) {

                homeView = new HomeView();

                Backbone.$('body').append(homeView.render().el);
                homeView.$el.addClass('active');
            } else {

                Backbone.$('.page.active').removeClass('active');
                Backbone.$('body').append(homeView.render().el);
                homeView.$el.addClass('active');
            }
            var self = this;
            this.listenTo(homeView, 'navigate', function(url){
                self.navigate(url, {trigger: true})
            });
//            Backbone.$('.page information active').removeClass('.information active');
//            console.log(homeView.$el);
//            homeView.$el.addClass('active');
        },
        details: function (id) {
            if (!detailsView) {
                detailsView = new DetailsView({
                    tagId: id
                });
                Backbone.$('body').append(detailsView.render().el);
            } else {
                detailsView.tagId = id;
                detailsView.render();
            }
            Backbone.$('.page.active').remove();
            detailsView.$el.addClass('active');
        },
        repair: function (id) {
            if (!repairPageView) {
                repairPageView = new RepairPageView();
                Backbone.$('body').append(repairPageView.render().el);
            } else {
                repairPageView.render();
            }
            Backbone.$('.page.active').removeClass('active');
            repairPageView.$el.addClass('active');
        }
    });
});