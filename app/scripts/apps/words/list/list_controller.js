App.module('Words.List', function(List, App, Backbone, Marionette, $, _) {
    "use strict";

    List.Controller = {

        /**
         * List words method
         * It shows words list view with optional filter criterion
         *
         * @param {string} criterion
         */
        listWords: function(criterion) {

            // Show loading view
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Initialize views
            App.module('Header').start();
            var appRegionLayout = new List.Layout();
            var appRegionNewWord = new List.NewWord();

            // Fetch words
            var words = App.request('words:entities');

            $.when(words).done(function(words) {

                // Create new filtered collection
                var filteredWords = App.Entities.FilteredCollection({
                    collection: words,
                    filterFunction: function(filterCriterion) {
                        var criterion = filterCriterion.toLowerCase();
                        return function(word) {
                            if(word.get('word').toLowerCase().indexOf(criterion) !== -1 || word.get('translation').toLowerCase().indexOf(criterion) !== -1) {
                                return word;
                            }
                        };
                    }
                });

                // Initialize list view
                var appRegionView = new List.Words({
                    collection: filteredWords
                });

                // Filter words if criterion is defined
                if(criterion) {
                    filteredWords.filter(criterion);

                    appRegionView.once('show', function(){
                        appRegionView.triggerMethod('set:filter:criterion', criterion);
                    });
                }

                // On words filter
                appRegionView.on('words:filter', function(filterCriterion) {
                    filteredWords.filter(filterCriterion);
                    App.trigger('words:filter', filterCriterion);
                });

                // On words layout show
                appRegionLayout.on('show', function() {
                    appRegionLayout.listRegion.show(appRegionView);
                    appRegionLayout.addRegion.show(appRegionNewWord);
                });

                // On submit new word form
                appRegionNewWord.on('form:submit', function(data) {
                    var newWord = new App.Entities.Word();
                    if(newWord.save(data)) {
                        this.$('#create-word, #create-translation').val('');
                        this.$('#create-word').focus();
                        words.add({
                            id: newWord.get('id'),
                            word: newWord.get('word'),
                            translation: newWord.get('translation')
                        });
                    } else {
                        appRegionNewWord.triggerMethod('form:data:invalid', newWord.validationError);
                    }
                });

                // On word edit
                appRegionView.on('itemview:word:edit', function(childView, model) {
                    var view = new List.EditWord({
                        model: model
                    });

                    // On submit form
                    view.on('form:submit', function(data) {
                        if(model.save(data)) {
                            childView.render();
                            view.trigger('dialog:close');
                        } else {
                            view.triggerMethod('form:data:invalid', model.validationError);
                        }
                    });

                    App.dialogRegion.show(view);
                });

                // On word delete
                appRegionView.on('itemview:word:delete', function(childView, model) {
                    model.destroy();
                });

                App.appRegion.show(appRegionLayout);
            });
        }
    };

});
