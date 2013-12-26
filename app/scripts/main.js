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
            Cookies.set("access_token", res.access_token, {expires: 3600});
            App.user = {};
            App.user.userName = res.username;
            App.user.fullName = res.fullname;
            App.user.email = res.email;
            App.user.picture = res.picture;
            App.user.authType = res.type;
        },
        error: function() {
            App.vent.trigger("app:logout");
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
        Cookies.expire('access_token');
        window.location.replace("/api/logout");
    });
});
