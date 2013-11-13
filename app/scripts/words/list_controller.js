App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function() {
            var words = App.request("words:entities");

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
        }
    }

});
