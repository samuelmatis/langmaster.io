/*global App, Backbone, Marionette*/

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    wordsRegion: '#words',
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    })
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

    // Initialize OAuth
    // OAuth.initialize('fF3y7938pxJouuXVgHM-9ALKMEk');

    if(Backbone.history) {
        Backbone.history.start();

        if(this.getCurrentRoute() === "") {
            App.trigger("words:list");
        }
    }
});
