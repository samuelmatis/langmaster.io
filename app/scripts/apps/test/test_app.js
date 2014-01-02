App.module('Test', function(Test, App, Backbone, Marionette, $, _) {

    /**
     * Router
     * Define routers for test sub-app
     */
    Test.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'test': 'showTest'
        }
    });

    /**
     * API
     * Main API methods for test sub-app
     */
    var API = {
        showTest: function() {
            Test.Main.Controller.showMain();
            App.execute('set:active:header', 'test');
        }
    };

    /**
     * Events
     */
    App.on('test:main:show', function() {
        App.navigate('test');
        API.showTest();
    });

    /**
     * Initialize test sub-app
     */
    App.addInitializer(function() {
        new Test.Router({
            controller: API
        });
    });

});
