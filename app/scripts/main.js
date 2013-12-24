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

// Router helper methods
App.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

App.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

// On start
App.on("initialize:after", function() {

    var self = App;
    $.get("/api/session", function(res) {
        Cookies.set("access_token", res.access_token, {expires: 3600});
        self.username = res.username;
    });

    console.log(App.username);

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
