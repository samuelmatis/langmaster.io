/*global App, Backbone, Marionette*/

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    headerRegion: "#header",
    appRegion: '#app',
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    })
});

// Before initialize
App.on("initialize:before", function(options){
    // Get user info
    $.ajax({
        url: "/api/session",
        async: false,
        success: function(res) {
            App.user = {};
            App.user.userName = res.username;
            App.user.fullName = res.fullname;
            App.user.email = res.email;
        },
        error: function() {
            window.location.replace("/api/logout");
        }
    });
});

// After initialize
App.on("initialize:after", function() {
    if(Backbone.history) {
        Backbone.history.start();

        if(this.getCurrentRoute() === "") {
            App.trigger("words:list");
        }
    }

    App.vent.on("app:logout", function() {
        window.location.replace("/api/logout");
    });
});
