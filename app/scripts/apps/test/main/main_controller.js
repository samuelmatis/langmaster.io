App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {
        
        /**
         * Test main method
         * It shows test view with all components
         */
        showMain: function() {

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

                var weakestWords = new Backbone.Collection(words.first(4));

                // Initialize Start Page view
                var startView = new Main.StartPage({
                    collection: weakestWords
                });

                // On start test
                startView.on("start:test", function() {

                    var testLayout = new Main.TestLayout();
                    var testLayoutHeader = new Main.HeaderRegion();

                    // On test layout show
                    testLayout.on("show", function() {

                        testLayout.testHeader.show(testLayoutHeader);

                        // Find a random word from words collection
                        randomWord = function() {
                            var randomNumber = Math.floor(Math.random() * (words.size() - 1 + 1)) + 1;
                            var selectedWord = words.get(randomNumber);
                            return selectedWord;
                        };

                        // Create new test view with random word
                        var testLayoutMain = new Main.TestRegion({
                            model: randomWord()
                        });

                        // On submit answer
                        testLayoutMain.on("submit:answer", function(data) {

                            answer = this.model.get("translation");
                            if(data.answer !== answer) {
                                console.log("nie!");
                            } else {
                                // Change word and show updated view
                                testLayoutMain.model = randomWord();
                                testLayout.testMain.show(testLayoutMain);
                            }
                        });

                        testLayout.testMain.show(testLayoutMain);
                    });

                    App.appRegion.show(testLayout);
                });

                App.appRegion.show(startView);
            });
        }
    }

});
