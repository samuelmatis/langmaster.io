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

                wordsListView.on("itemview:word:show", function(childView, model) {
                    App.trigger("word:show", model.get('id'));
                });

                wordsListView.on("itemview:word:delete", function(childView, model) {
                    model.destroy();
                });
                
                App.wordsList.show(wordsListView);
            });
        }
    }

});
