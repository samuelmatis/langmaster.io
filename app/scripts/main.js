/*global App, Backbone, Marionette, JST*/

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    wordsList: '#words-list',
    editDialog: '#edit-dialog'
});

App.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

App.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

// On start
App.on("initialize:after", function() {
    // App.Words.List.Controller.listWords();

    if(Backbone.history) {
        Backbone.history.start();

        if(this.getCurrentRoute() === "") {
            App.trigger("words:list");
        }
    }
});
