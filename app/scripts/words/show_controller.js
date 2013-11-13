App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {
        showWord: function(id) {
            var word = App.request("word:entity", id);
            var wordView;

            if(word !== undefined) {
                wordView = new Show.Word({
                    model: word
                });
            } else {
                wordView = new Show.MissingWord();
            }

            App.wordsList.show(wordView);
        }
    }

});
