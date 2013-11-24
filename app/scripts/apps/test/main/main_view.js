App.module("Test.Main", function(Main, Test, Backbone, Marionette, $, _) {

    Main.Layout = Marionette.Layout.extend({
        template: "#test-region-layout",
        className: "pure-g content-ribbon",

        regions: {
            startPage: "#test-start-region",
            testPage: "#test-page-region"
        }
    });

    Main.StartPageWords = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#test-weakest-words"
    });

    Main.StartPage = Marionette.CompositeView.extend({
        template: "#test-start",
        itemView: Main.StartPageWords,
        itemViewContainer: "tbody",

        // triggers: {
        //     "click .js-start-test": "start:test" 
        // }
    });

});
