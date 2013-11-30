App.module("Test.Main", function(Main, Test, Backbone, Marionette, $, _) {

    /**
     * Weakest words table ItemView
     * 
     * @region Test-StartPage
     * @template #test-weakest-words
     */
    Main.StartPageWords = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#test-weakest-words"
    });

    /**
     * Start page view
     * 
     * @region Test-StartPage
     * @template #test-start
     */
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

    /**
     * Test layout
     * 
     * @region Test-TestPage
     * @template #test-region-layout
     */
    Main.TestLayout = Marionette.Layout.extend({
        template: "#test-region-layout",
        className: "row",

        regions: {
            testHeader: "#test-header",
            testMain: "#test-main"
        }
    });

    /**
     * Header region view
     * 
     * @region Test-TestPage
     * @template #test-header-region
     */
    Main.HeaderRegion = Marionette.ItemView.extend({
        template: "#test-header-region"
    });

    /**
     * Main test region
     * 
     * @region Test-TestPage
     * @template #test-main-region
     */
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
