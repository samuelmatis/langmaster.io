App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {
        showMain: function() {
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            var words = App.request("words:entities");

            $.when(words).done(function(words) {

                words.comparator = function(model) {
                    return model.get("strength");
                }

                words.sort();
                var weakestWords = new Backbone.Collection(words.first(4));

                var startView = new Main.StartPage({
                    collection: weakestWords
                });

                startView.on("start:test", function() {
                    console.log("test started");
                    console.log(words);

                    var testLayout = new Main.TestLayout();
                    var testLayoutHeader = new Main.HeaderRegion();
                    var testLayoutMain = new Main.TestRegion();

                    testLayout.on("show", function() {
                        testLayout.testHeader.show(testLayoutHeader);
                        testLayout.testMain.show(testLayoutMain);
                    });

                    App.appRegion.show(testLayout);
                });

                App.appRegion.show(startView);
            });
        }
    }

});
