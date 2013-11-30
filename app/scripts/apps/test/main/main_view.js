App.module("Test.Main", function(Main, Test, Backbone, Marionette, $, _) {

    Main.StartPageWords = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#test-weakest-words"
    });

    Main.StartPage = Marionette.CompositeView.extend({
        template: "#test-start",
        className: "col-md-4 col-md-offset-4",
        id: "test",
        itemView: Main.StartPageWords,
        itemViewContainer: "tbody",

        triggers: {
            "click .js-start-test": "start:test" 
        }
    });

    Main.TestLayout = Marionette.Layout.extend({
        template: "#test-region-layout",
        className: "row",

        regions: {
            testHeader: "#test-header",
            testMain: "#test-main"
        }
    });

    Main.HeaderRegion = Marionette.ItemView.extend({
        template: "#test-header-region"
    });

    Main.TestRegion = Marionette.ItemView.extend({
        template: "#test-main-region",

        events: {
            "click .js-submit-answer": "submitAnswer"
        },

        submitAnswer: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("submit:answer", data);
        }
    });

});
