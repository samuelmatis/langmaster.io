App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function(criterion) {
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            var words = App.request("words:entities");

            var appRegionLayout = new List.Layout();
            var appRegionNewWord = new List.NewWord();

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

                var appRegionView = new List.Words({
                    collection: filteredWords
                });

                if(criterion) {
                    filteredWords.filter(criterion);
                    appRegionView.once("show", function(){
                        appRegionView.triggerMethod("set:filter:criterion", criterion);
                    });
                }

                appRegionView.on("words:filter", function(filterCriterion) {
                    filteredWords.filter(filterCriterion);
                    App.trigger("words:filter", filterCriterion);
                });

                appRegionLayout.on("show", function() {
                    appRegionLayout.listRegion.show(appRegionView);
                    appRegionLayout.addRegion.show(appRegionNewWord);
                });

                appRegionNewWord.on("form:submit", function(data) {
                    var newWord = new App.Entities.Word();
                    if(newWord.save(data)) {
                        words.add(newWord);
                        appRegionView.children.findByModel(newWord).flash("success");
                    } else {
                        appRegionNewWord.triggerMethod("form:data:invalid", newWord.validationError);
                    }
                });

                appRegionView.on("itemview:word:edit", function(childView, model) {
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

                appRegionView.on("itemview:word:delete", function(childView, model) {
                    model.destroy();
                });

                App.appRegion.show(appRegionLayout);
            });
        }
    }

});
