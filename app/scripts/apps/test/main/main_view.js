App.module("Test.Main", function(Main, Test, Backbone, Marionette, $, _) {

    Main.Layout = Marionette.Layout.extend({
        template: "#test-region-layout",
        className: "pure-g content-ribbon",

        regions: {
            mainPage: "#main-page",
            testPage: "#test-page"
        }
    });

    Main.Page = Marionette.ItemView.extend({
        template: "#test-main"
    });

});
