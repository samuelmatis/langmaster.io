App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function() {
            var loadingView = new App.Common.Views.Loading();
            App.wordsList.show(loadingView);

            var words = App.request("words:entities");
            $.when(words).done(function(words) {
                var wordsListView = new List.Words({
                    collection: words
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
                            view/triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    App.editDialog.show(view);
                });

                wordsListView.on("itemview:word:delete", function(childView, model) {
                    model.destroy();
                });

                App.wordsList.show(wordsListView);
            });
        }
    }

});
