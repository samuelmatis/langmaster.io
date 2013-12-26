App.module("Test.Main", function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {

        /**
         * Test main method
         * It shows test view with all components
         */
        showMain: function() {
            App.module("Header").stop();
            var HeaderPanel = new Main.TestHeaderPanel();
            App.headerRegion.show(HeaderPanel);

            // Show loading view
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Fetch words
            var words = App.request("words:entities");

            $.when(words).done(function(words) {
                if(words.size() !== 0) {
                    // Sort words with strength attribute
                    words.comparator = function(model) {
                        return model.get("strength");
                    }
                    words.sort();

                    var weakestWords = new Backbone.Collection(words.first(5));

                    // Initialize Start Page view
                    var startView = new Main.StartPage({
                        collection: weakestWords
                    });

                    // On start test
                    startView.on("start:test", function() {
                        App.Test.Main.Controller.showTest(words);
                    });

                    App.appRegion.show(startView);
                } else {

                    // If there are no words
                    var noWords = new Main.TestNoWords();
                    App.appRegion.show(noWords);
                }
            });
        },

        showTest: function(words) {
            App.headerRegion.close();
            var testLayout = new Main.TestLayout();
            var testLayoutHeader = new Main.HeaderRegion();

            // On test layout show
            testLayout.on("show", function() {
                testLayout.testHeader.show(testLayoutHeader);

                // Find a random word from words collection
                randomWord = function() {
                    var randomNumber = _.random(1, words.size());
                    var selectedWord = words.at(randomNumber);
                    return selectedWord;
                };

                // Create new test view with random word
                var testLayoutMain = new Main.TestRegion({
                    model: randomWord()
                });

                // Test steps
                var steps = 5;

                testLayoutMain.once("show", function() {
                    localStorage.setItem("last_word", "");
                    console.log(testLayoutMain.model);
                });

                // On test page show
                testLayoutMain.on("show", function() {

                    // Check if localStorage word test item exist
                    if(localStorage.getItem("test_word_" + this.model.get("word")) === null) {
                        localStorage.setItem("test_word_" + this.model.get("word"), "");
                    }

                    // Check if word is not repeating
                    if(steps < 5) {
                        if(this.model.get("word") === localStorage.getItem("last_word")) {
                            testLayoutMain.model = randomWord();
                            testLayout.testResult.close();
                            testLayout.testMain.show(testLayoutMain);
                            self.$("#js-submit-answer").focus();
                        }

                        localStorage.setItem("last_word", this.model.get("word"));
                    }

                    // Close test after it will exceed steps
                    if(steps < 0) {
                        testLayout.close();
                        App.Test.Main.Controller.showAfterTest(words);
                    }
                });

                // On submit answer
                testLayoutMain.on("submit:answer", function(data) {
                    this.$(".js-submit-answer").hide();

                    // Count down steps
                    steps--;

                    var origin_word = this.model.get("word");
                    var input_word = data.answer;
                    var self = this;

                    // Check word correctness from API
                    $.post("api/users/"+ App.user.userName +"/compare", {"origin": origin_word, "input": input_word}, function(data) {

                        console.log(data);

                        // Save progress to localStorage and show result view
                        var showResult = function(text, number) {
                            localStorage["test_word_" + origin_word] += number;

                            var result = new Main.TestResult({ result: text });
                            testLayout.testResult.show(result);

                            this.$(".js-next").focus();

                            result.on("test:next", function() {
                                testLayoutMain.model = randomWord();
                                testLayout.testResult.close();
                                testLayout.testMain.show(testLayoutMain);
                                self.$("#js-submit-answer").focus();
                            });
                        }

                        if(data == 1) {
                            showResult("good", 1);
                        } else if (data < 1.0 && data >= 0.9) {
                            showResult("ok", 1);
                        } else if (data < 0.9) {
                            showResult("bad", 0);
                        }
                    });

                });

                testLayoutHeader.on("test:giveup", function() {
                    var HeaderPanel = new Main.TestHeaderPanel();
                    App.headerRegion.show(HeaderPanel);
                    App.trigger("test:main:show");
                });

                testLayout.testMain.show(testLayoutMain);
            });

            App.appRegion.show(testLayout);
        },

        showAfterTest: function(words) {
            // Create backbone collection of output words
            var outputWords = new Backbone.Collection();

            // Send test words
            Object.keys(localStorage).forEach(function(key) {
                if(/^test_word_.*$/.test(key)) {
                    console.log(key);
                    var word = key.split("_")[2];
                    var know = localStorage.getItem(key);

                    // Send (demo) test results to the API and add results to collection
                    $.post("api/users/"+ App.user.userName +"/test", {"word": word, "know": know}, function(data) {
                        outputWords.add({word: data.word, strength: data.strength, increase: data.increase});
                        localStorage.removeItem("test_word_" + data.word);
                    });
                }
            });
            localStorage.removeItem("last_word");

            var finalView = new Main.FinalView({collection: outputWords});
            App.appRegion.show(finalView);
        }
    }

});
