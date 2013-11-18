App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function() {
            var loadingView = new App.Common.Views.Loading();
            App.wordsList.show(loadingView);

            var words = App.request("words:entities");

            var wordsListLayout = new List.Layout();
            var wordsListNewWord = new List.NewWord();

            $.when(words).done(function(words) {
                var wordsListView = new List.Words({
                    collection: words
                });

                wordsListLayout.on("show", function() {
                    wordsListLayout.listRegion.show(wordsListView);
                    wordsListLayout.addRegion.show(wordsListNewWord);
                });

                wordsListNewWord.on("form:submit", function(data) {
                    var newWord = new App.Entities.Word();
                    var highestId = words.max(function(c){ return c.id; }).get("id");
                    data.id = highestId + 1;
                    if(newWord.save(data)) {
                        words.add(newWord);
                        wordsListView.children.findByModel(newWord).flash("success");
                    } else {
                        wordsListNewWord.triggerMethod("form:data:invalid", newWord.validationError);
                    }
                });

                wordsListView.on("itemview:word:edit", function(childView, model) {
                    // App.trigger("word:edit", model.get('id'));
                    var view = new App.Words.Edit.Word({
                        model: model,
                        asModal: true
                    });

                    view.on("form:submit", function(data) {
                        if(model.save(data)) {
                            childView.render();
                            App.editDialog.close();
                            childView.flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    App.editDialog.show(view);
                });

                wordsListView.on("itemview:word:delete", function(childView, model) {
                    model.destroy();
                });

                App.wordsList.show(wordsListLayout);
            });
        }
    }

});
