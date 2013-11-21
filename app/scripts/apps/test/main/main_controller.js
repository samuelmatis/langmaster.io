App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {
        showMain: function() {
            var view = new Main.Page();
            App.appRegion.show(view);
        }
    }

});
