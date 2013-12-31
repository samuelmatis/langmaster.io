App.module("Home.Show", function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {

        showHome: function() {
            App.appRegion.close();
        }

    }

});
