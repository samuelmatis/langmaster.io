App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function() {
            var loadingView = new App.Common.Views.Loading();
            App.wordsRegion.show(loadingView);

            var words = App.request("words:entities");

            var wordsRegionLayout = new List.Layout();
            var wordsRegionNewWord = new List.NewWord();

            $.when(words).done(function(words) {
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

                var wordsRegionView = new List.Words({
                    collection: filteredWords
                });

                wordsRegionView.on("words:filter", function(filterCriterion) {
                    filteredWords.filter(filterCriterion);
                });

                wordsRegionLayout.on("show", function() {
                    wordsRegionLayout.listRegion.show(wordsRegionView);
                    wordsRegionLayout.addRegion.show(wordsRegionNewWord);
                });

                wordsRegionNewWord.on("form:submit", function(data) {
                    var newWord = new App.Entities.Word();
                    var highestId = words.max(function(c){ return c.id; }).get("id");
                    data.id = highestId + 1;
                    if(newWord.save(data)) {
                        words.add(newWord);
                        wordsRegionView.children.findByModel(newWord).flash("success");
                    } else {
                        wordsRegionNewWord.triggerMethod("form:data:invalid", newWord.validationError);
                    }
                });

                wordsRegionView.on("itemview:word:edit", function(childView, model) {
                    App.trigger("word:edit", model.get('id'));
                    var view = new App.Words.Edit.Word({
                        model: model
                    });

                    view.on("form:submit", function(data) {
                        if(model.save(data)) {
                            childView.render();
                            view.trigger("dialog:close");
                            childView.flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    App.dialogRegion.show(view);
                });

                wordsRegionView.on("itemview:word:delete", function(childView, model) {
                    model.destroy();
                });

                App.wordsRegion.show(wordsRegionLayout);
            });
        }
    }

});
