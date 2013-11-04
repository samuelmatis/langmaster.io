/*global App, Backbone, Marionette, JST*/

App.Routers = App.Routers || {};

(function () {
    'use strict';

   /**
    *  Main app router
    *
    *  Handles all application routes
    */
    App.Routers.AppRouter = Backbone.Router.extend({

        routes: {
            // Index Page
            "": "indexPage",

            // #words
            "words": "showWords",

            // #words/2
            "word/:id": "showOneWord",

            // #test
            "test": "showTest",

            // #user
            "user": "showUser",

            // #user/samuelmatis
            "user/:name": "showUser",

            // #settings
            "settings" : "showSettings"
        },

        indexPage: function() {
            console.log("Index page...");
        },

        showWords: function() {
            console.log("Words page...");
        },

        showOneWord: function(id) {
            console.log("Word #" + id);
        },

        showTest: function() {
            console.log("Test page...");
        },

        showUser: function(name) {
            if(arguments.length == 1) {
                console.log("User " + name);
            } else {
                console.log("User page...");
            }
        },

        showSettings: function() {
            console.log("Settings page...");
        }

    });

})();