App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {
        showWord: function(id) {
            var word = App.request("word:entity", id);
            $.when(word).done(function(word) {
                var wordView;

                if(word !== undefined) {
                    wordView = new Show.Word({
                        model: word
                    });
                } else {
                    wordView = new Show.MissingWord();
                }

                App.wordsList.show(wordView);
            });
        }
    }

});
