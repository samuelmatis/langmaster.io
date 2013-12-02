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
            testMain: "#test-main",
            testResult: "#test-result"
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

    /**
     * Test result view
     * 
     * @region Test-TestPage
     * @template #test-result-region
     */
     Main.TestResult = Marionette.ItemView.extend({
        template: "#test-result-region",

        serializeData: function() {
            if(this.options.result === "good") {
                return {
                    "result": "success",
                    "result_text": "Good! :)"
                }
            } else if (this.options.result === "ok") {
                return {
                    "result": "warning",
                    "result_text": "You have a small typo in your answer."
                }
            } else {
                return {
                    "result": "danger",
                    "result_text": "No No No!"
                }
            }
        },

        triggers: {
            "click .js-next": "test:next"
        }
     });

});
