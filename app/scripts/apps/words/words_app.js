App.module('Words', function(Words, App, Backbone, Marionette, $, _) {
    "use strict";

    /**
     * Router
     * Define routers for words sub-app
     */
    Words.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'words': 'listWords',
            'words/(?filter=:criterion)': 'filterWords'
        }
    });

    /**
     * API
     * Main API methods for words sub-app
     */
    var API = {
        listWords: function() {
            App.Words.List.Controller.listWords();
            App.execute('set:active:header', 'words');
        },

        filterWords: function(criterion) {
            App.Words.List.Controller.listWords(criterion);
            App.execute('set:active:header', 'words');
        }
    };

    /**
     * Events
     */
    App.on('words:list', function() {
        App.navigate('words');
        API.listWords();
    });

    App.on('words:filter', function(criterion) {
        if(criterion) {
            App.navigate('words?filter=' + criterion);
        } else {
            App.navigate('words');
        }
    });

    /**
     * Initialize words sub-app
     */
    App.addInitializer(function() {
        new Words.Router({
            controller: API
        });
    });

});
