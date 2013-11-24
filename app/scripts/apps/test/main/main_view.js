App.module("Test.Main", function(Main, Test, Backbone, Marionette, $, _) {

    Main.Layout = Marionette.Layout.extend({
        template: "#test-region-layout",
        className: "pure-g content-ribbon",

        regions: {
            startPage: "#test-start-region",
            testPage: "#test-page-region"
        }
    });

    Main.Page = Marionette.ItemView.extend({
        template: "#test-start",

        triggers: {
            "click .js-start-test": "start:test" 
        }
    });

});
