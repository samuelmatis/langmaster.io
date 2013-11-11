App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listWords: function() {
            var words = App.request("words:entities");

            var wordsListView = new List.Words({
                collection: words
            });
            
            App.wordsList.show(wordsListView);
        }
    }

});