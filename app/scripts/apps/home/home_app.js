App.module('Home', function(Home, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Router
     * Define routes for words sub-app
     */
    Home.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'home': 'showHome'
        }
    });

    /**
     * API
     * Main API methods for words sub-app
     */
    var API = {
        showHome: function() {
            // App.Home.Show.Controller.showHome();
            // App.execute('set:active:header', 'home');
            App.trigger('words:list');
        }
    };

    /**
     * Events
     */
    App.on('home:show', function() {
        App.navigate('home');
        API.showHome();
    });

    /**
     * Initialize words sub-app
     */
    App.addInitializer(function() {
        new Home.Router({
            controller: API
        });
    });

});
