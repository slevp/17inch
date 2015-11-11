define("seventeen-inch/1.0.0/index-debug", ["jquery", "underscore", "backbone"], function(require, exports, module) {
  var seventeenInch = require("seventeen-inch/1.0.0/src/main-debug");
  module.exports = seventeenInch;
});
define("seventeen-inch/1.0.0/src/main-debug", ["jquery", "underscore", "backbone"], function(require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Router = require("seventeen-inch/1.0.0/src/routers/index-debug");
  var router = new Router();
  Backbone.history.start();
  $(document).ready(function() {
    $('#exit-btn').click(function() {
      var app = tizen.application.getCurrentApplication();
      app.exit();
    });
  });
});
define("seventeen-inch/1.0.0/src/routers/index-debug", ["backbone", "underscore"], function(require, exports, module) {
  var Backbone = require('backbone');
  //var HomeView = require('../views/home');
  var homeView = null;
  var apps = require("seventeen-inch/1.0.0/src/data/apps-debug.json");
  //var NavAppCollection = require('../collections/app');
  //window.seventeen_inch = {
  //    app_collection: new NavAppCollection(apps),
  //    _app_collection: new NavAppCollection(apps)
  //};
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'homePage',
      'home': 'homePage',
      'navi': 'naviPage',
      'phone': 'phonePage',
      'app-store': 'appStorePage',
      'player': 'playerPage',
      'acn': 'acnPage',
      'drive-analysis': 'driveAnalysisPage',
      'tap-weather': 'tapWeatherPage',
      'qtfm': 'qtfmPage',
      'mirror-link': 'mirrorLinkPage'
    },
    homePage: function() {
      if (!homeView) {
        this.initPage();
      } else {
        if (!homeView.atHomePage) {
          homeView.trigger('backToHome');
        }
      }
    },
    naviPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/navi/index');
      homeView.trigger('displayApp', App);
    },
    phonePage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/phone/index');
      homeView.trigger('displayApp', App);
    },
    appStorePage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/app-store/index');
      homeView.trigger('displayApp', App);
    },
    playerPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/player/index');
      homeView.trigger('displayApp', App);
    },
    acnPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/acn/index');
      homeView.trigger('displayApp', App);
    },
    driveAnalysisPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/drive-analysis/index');
      homeView.trigger('displayApp', App);
    },
    tapWeatherPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/tap-weather/index');
      homeView.trigger('displayApp', App);
    },
    qtfmPage: function() {
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/qtfm/index');
      homeView.trigger('displayApp', App);
    },
    mirrorLinkPage: function() {
      return;
      if (!homeView) {
        this.initPage();
      }
      //        var App = require('../views/apps/mirror-link/index');
      homeView.trigger('displayApp', App);
    },
    initPage: function() {
      homeView = new HomeView();
      $('body').prepend(homeView.render().el);
      this.listenTo(homeView, 'backToHome', this.changeHash);
      this.listenTo(homeView, 'displayApp', this.changeHash);
    },
    changeHash: function(options) {
      if (options && options.navigate) {
        options.hash = options.hash || 'home';
        this.navigate(options.hash, {
          trigger: true
        });
      }
    }
  });
});
define("seventeen-inch/1.0.0/src/data/apps-debug.json", [], function(require, exports, module) {
  module.exports = [{
    "id": 1,
    "name": "home"
  }, {
    "id": 2,
    "name": "navi"
  }, {
    "id": 3,
    "name": "phone"
  }, {
    "id": 4,
    "name": "acn"
  }, {
    "id": 5,
    "name": "player"
  }, {
    "id": 6,
    "name": "app-store"
  }, {
    "id": 7,
    "name": "qtfm"
  }, {
    "id": 8,
    "name": "drive-analysis"
  }, {
    "id": 9,
    "name": "tap-weather"
  }, {
    "id": 10,
    "name": "mirror-link"
  }];
});