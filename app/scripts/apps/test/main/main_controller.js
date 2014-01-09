App.module('Test.Main', function(Main, App, Backbone, Marionette, $, _) {

    Main.Controller = {

        /**
         * Test main method
         * It shows test view with all components
         */
        showMain: function() {
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
                    }
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
                        App.Test.Main.Controller.showTest(weakestWords);
                    });

                    App.appRegion.show(startView);
                } else {
                    // If there are no words
                    var noWords = new Main.TestNoWords();
                    App.appRegion.show(noWords);
                }
            });
        },

        showTest: function(weakestWords) {

            App.headerRegion.close();
            var testLayout = new Main.TestLayout();
            var testLayoutHeader = new Main.HeaderRegion();

            // On test layout show
            testLayout.on('show', function() {
                testLayout.testHeader.show(testLayoutHeader);

                Mousetrap.bind('backspace', function(e) { e.preventDefault(); });

                // Find a random word from words collection
                randomWord = function() {
                    var randomNumber = Math.floor(Math.random() * (weakestWords.size() - 1 + 1)) + 1;
                    var selectedWord = weakestWords.at(randomNumber - 1);
                    return selectedWord;
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
                        App.Test.Main.Controller.showAfterTest(weakestWords);
                    }

                    // Check if word is not repeating
                    if(localStorage.getItem('steps') < 16) {
                        if(weakestWords.size() > 1) {
                            if(this.model.get('word') === localStorage.getItem('last_word')) {
                                testLayoutMain.model = randomWord();
                                testLayout.testResult.close();
                                testLayout.testMain.show(testLayoutMain);
                                self.$('#js-submit-answer').focus();
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

                    var origin_word = this.model.get('word');
                    var translation = this.model.get('translation');
                    var word_id = this.model.get('id');
                    var input_word = data.answer;
                    var self = this;

                    // Check word correctness from API
                    $.post('api/test', {'origin': origin_word, 'input': input_word}, function(data) {

                        // Save progress to localStorage and show result view
                        var showResult = function(text, number) {

                            var test_words = JSON.parse(localStorage.getItem('words'));

                            if (test_words.indexOf(word_id) < 0) {
                                test_words.push(word_id);
                                localStorage['words'] = JSON.stringify(test_words);
                            }

                            var result = new Main.TestResult({ result: text, translation: translation });
                            testLayout.testResult.show(result);

                            this.$('.js-next').focus();

                            result.on('test:next', function() {
                                testLayoutMain.model = randomWord();
                                testLayout.testResult.close();
                                testLayout.testMain.show(testLayoutMain);
                                self.$('#js-submit-answer').focus();
                            });
                        }

                        if(data == 1) {
                            self.$('.js-test-input').addClass('test-input-success');
                            showResult('good', 1);
                        } else if (data < 1.0 && data >= 0.9) {
                            self.$('.js-test-input').addClass('test-input-success');
                            showResult('ok', 1);
                        } else if (data < 0.9) {
                            self.$('.js-test-input').addClass('test-input-fail');
                            showResult('bad', 0);
                        }
                    });

                });

                testLayoutHeader.on('test:giveup', function() {
                    $.post('api/test/giveup', function() {
                        localStorage.removeItem('words');
                        localStorage.removeItem('last_word');
                        localStorage.removeItem('steps');
                        var HeaderPanel = new Main.TestHeaderPanel();
                        App.headerRegion.show(HeaderPanel);
                        App.trigger('test:main:show');
                    });

                });

                testLayout.testMain.show(testLayoutMain);
            });

            testLayout.on('close', function() {
                Mousetrap.unbind('backspace');
            })

            App.appRegion.show(testLayout);
        },

        showAfterTest: function(weakestWords) {
            // Create backbone collection of output words
            var outputWords = new Backbone.Collection();

            var data = { 'words': JSON.parse(localStorage.getItem('words')).toString() }
            $.ajax({
                type: 'POST',
                url: 'api/test/end',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'json',
                success: function(data) {
                    for(i in data) {
                        outputWords.add({word: data[i]['word'], translation: data[i]['translation'], strength: data[i]['strength'], increase: data[i]['success']})
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
