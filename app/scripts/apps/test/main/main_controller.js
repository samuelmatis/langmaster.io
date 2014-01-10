App.module('Test.Main', function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {

        /**
         * Start test function
         */
        showStart: function() {

            // Disable original header and show test header
            App.module('Header').stop();
            var HeaderPanel = new Main.TestHeaderPanel();
            App.headerRegion.show(HeaderPanel);

            // Show loading view
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Fetch words
            var words = App.request('words:entities');

            $.when(words).done(function(words) {
                if(words.size() !== 0) {
                    // Sort words with strength attribute
                    words.comparator = function(model) {
                        return model.get('strength');
                    };
                    words.sort();

                    var weakestWords = new Backbone.Collection(words.first(5));

                    // Initialize Start Page view
                    var startView = new Main.StartPage({
                        collection: weakestWords
                    });

                    // Bind and unbind enter key to start the test
                    startView.on('show', function() { Mousetrap.bind('enter', function() { startView.trigger('start:test'); }); });
                    startView.on('close', function() { Mousetrap.unbind('enter'); });

                    // On start test
                    startView.on('start:test', function() {
                        Main.Controller.showTest(weakestWords);
                    });

                    App.appRegion.show(startView);
                } else {
                    // If there are no words
                    var noWords = new Main.TestNoWords();
                    App.appRegion.show(noWords);
                }

            });
        },

        /**
         * Main test function
         *
         * @param weakestWords
         */
        showTest: function(weakestWords) {

            // Show test views
            App.headerRegion.close();
            var testLayout = new Main.TestLayout();
            var testLayoutHeader = new Main.HeaderRegion();

            // On test layout show
            testLayout.on('show', function() {
                testLayout.testHeader.show(testLayoutHeader);

                Mousetrap.bind('backspace', function(e) { e.preventDefault(); });

                // Find a random word from words collection
                var randomWord = function() {
                    var randomNumber = Math.floor(Math.random() * (weakestWords.size() - 1 + 1)) + 1;
                    return weakestWords.at(randomNumber - 1);
                };

                // Create new test view with random word
                var testLayoutMain = new Main.TestRegion({
                    model: randomWord()
                });

                // Test steps
                localStorage['steps'] = 10;

                testLayoutMain.once('show', function() {
                    localStorage.setItem('last_word', '');
                    localStorage.setItem('words', '[]');
                });

                // On test page show
                testLayoutMain.on('show', function() {

                    // Close test after it will exceed steps
                    if(localStorage.getItem('steps') < 0) {
                        testLayout.close();
                        Main.Controller.showAfterTest();
                    }

                    // Check if word is not repeating
                    if(localStorage.getItem('steps') < 11) {
                        if(weakestWords.size() > 1) {
                            if(this.model.get('word') === localStorage.getItem('last_word')) {
                                testLayoutMain.model = randomWord();
                                testLayout.testResult.close();
                                testLayout.testMain.show(testLayoutMain);
                                this.$('#js-submit-answer').focus();
                            }
                        }

                        localStorage.setItem('last_word', this.model.get('word'));
                    }
                });

                // On submit answer
                testLayoutMain.on('submit:answer', function(data) {
                    this.$('.js-test-input').prop('disabled', true);
                    this.$('.js-submit-answer').hide();

                    // Count down steps
                    localStorage['steps']--;

                    var wordId = this.model.get('id');
                    var self = this;

                    // Save progress to localStorage and show result view
                    var showResult = function(result) {

                        // Show result view
                        var result = new Main.TestResult({ result: result, translation: self.model.get('translation') });
                        testLayout.testResult.show(result);

                        Mousetrap.bind('enter', function() { result.trigger('test:next'); });

                        // If localstorage doesn't contain word, add it.
                        var testWords = JSON.parse(localStorage.getItem('words'));
                        if (testWords.indexOf(wordId) < 0) {
                            testWords.push(wordId);
                            localStorage['words'] = JSON.stringify(testWords);
                        }

                        result.on('test:next', function() {
                            testLayoutMain.model = randomWord();
                            testLayout.testResult.close();
                            testLayout.testMain.show(testLayoutMain);
                            self.$('#js-submit-answer').focus();
                        });

                        // Unbind enter if result view is closed
                        result.on('close', function() { Mousetrap.unbind('enter'); });
                    };

                    // Check word correctness from API
                    $.post('api/test', {'origin': this.model.get('word'), 'input': data.answer}, function(data) {

                        // Check how many points received word and show result
                        if(data === 1) {
                            self.$('.js-test-input').addClass('test-input-success');
                            showResult(1);
                        } else if (data < 1.0 && data >= 0.9) {
                            self.$('.js-test-input').addClass('test-input-success');
                            showResult(0);
                        } else if (data < 0.9) {
                            self.$('.js-test-input').addClass('test-input-fail');
                            showResult(-1);
                        }
                    });

                });

                testLayoutHeader.on('test:giveup', function() {

                    // Skip to the end of the test
                    Main.Controller.showAfterTest();
                });

                testLayout.testMain.show(testLayoutMain);
            });

            testLayout.on('close', function() {
                Mousetrap.unbind('backspace');
            });

            App.appRegion.show(testLayout);
        },

        /**
         * After test function
         */
        showAfterTest: function() {

            // Create backbone collection of output words
            var outputWords = new Backbone.Collection();

            $.ajax({
                type: 'POST',
                url: 'api/test/end',
                data: JSON.stringify({'words': JSON.parse(localStorage.getItem('words')).toString()}),
                contentType: 'application/json',
                dataType: 'json',
                success: function(data) {
                    for(var i in data) {
                        if (data.hasOwnProperty(i)) {
                            outputWords.add({word: data[i]['word'], translation: data[i]['translation'], strength: data[i]['strength'], increase: data[i]['success']});
                        }
                    }
                },
                error: function() {
                    App.vent.trigger('app:logout');
                }
            });

            localStorage.removeItem('words');
            localStorage.removeItem('last_word');
            localStorage.removeItem('steps');

            var finalView = new Main.FinalView({collection: outputWords});
            App.appRegion.show(finalView);
        }
    }

});
