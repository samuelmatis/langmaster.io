App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {
        showMain: function() {
            var view = new Main.Page();

            view.on("start:test", function() {
                console.log("test started");
            });

            App.appRegion.show(view);
        }
    }

});
