/*global App, Backbone, Marionette, JST*/

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    wordsList: '#words-list'
});

// On start
App.on("initialize:after", function() {
    App.Words.List.Controller.listWords();

    if(Backbone.history) {
        Backbone.history.start();
    }
});