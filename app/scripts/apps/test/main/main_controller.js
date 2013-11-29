App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {
        /**
         * Test main method
         * shows test page with all components
         */
        showMain: function() {

            // Initialize and show loading view
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Fetch words
            var words = App.request("words:entities");

            $.when(words).done(function(words) {

                // Sort words with strength attribute
                words.comparator = function(model) {
                    return model.get("strength");
                }

                words.sort();

                // Create collection with weakest words
                var weakestWords = new Backbone.Collection(words.first(4));

                // Initialize Start Page view
                var startView = new Main.StartPage({
                    collection: weakestWords
                });

                // After click on "start test" button
                startView.on("start:test", function() {
                    // Initialize test layout
                    var testLayout = new Main.TestLayout();

                    // Initialize test header
                    var testLayoutHeader = new Main.HeaderRegion();

                    // On layout show
                    testLayout.on("show", function() {

                        // Initialize main views for test
                        testLayout.testHeader.show(testLayoutHeader);

                        // Method for finding random word from words collection
                        randomWord = function() {
                            var randomNumber = Math.floor(Math.random() * (words.size() - 1 + 1)) + 1;
                            var selectedWord = words.get(randomNumber);
                            console.log(selectedWord);
                            return selectedWord;
                        };

                        // Create new test view with random word
                        var testLayoutMain = new Main.TestRegion({
                            model: randomWord()
                        });

                        // On submit answer
                        testLayoutMain.on("submit:answer", function(data) {
                            answer = this.model.get("word");
                            if(data.answer === answer) {
                                console.log("ok");
                            } else {
                                console.log("tak nie");
                            }

                            testLayoutMain.model = randomWord();
                        });

                        // Show new view in test
                        testLayout.testMain.show(testLayoutMain);
                    });

                    // Show test in region
                    App.appRegion.show(testLayout);
                });

                // Show start test view in region
                App.appRegion.show(startView);
            });
        }
    }

});
