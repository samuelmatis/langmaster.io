App.module('Profile', function(Profile, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Router
     * Define routes for profile sub-app
     */
    Profile.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'profile': 'showProfile'
        }
    });

    /**
     * API
     * Main API methods for profile
     */
    var API = {
        showProfile: function() {
            App.Profile.Show.Controller.showProfile();
            App.execute('set:active:header', 'profile');
        }
    };

    /**
     * Events
     */
    App.on('profile:show', function() {
        App.navigate('profile');
        API.showProfile();
    });

    /**
     * Initialize profile sub-app
     */
    App.addInitializer(function() {
        new Profile.Router({
            controller: API
        });
    });

});
