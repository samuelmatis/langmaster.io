App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {
        showWord: function(id) {
            var words = App.request("words:entities");
            var model = words.get(id);
            var wordView;

            if(model !== undefined) {
                wordView = new Show.Word({
                    model: model
                });
            } else {
                wordView = new Show.MissingWord();
            }

            App.wordsList.show(wordView);
        }
    }

});
