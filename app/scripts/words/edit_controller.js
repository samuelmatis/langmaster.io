App.module("Words.Edit", function(Edit, App, Backbone, Marionette, $, _) {

    Edit.Controller = {
        editWord: function(id) {
            var loadingView = new App.Common.Views.Loading();
            App.wordsList.show(loadingView);

            var word = App.request("word:entity", id);
            $.when(word).done(function(word) {
                var view;
                if(word !== undefined) {
                    view = new Edit.Word({
                        model: word
                    });

                    view.on("form:submit", function(data) {
                        word.save(data);
                        App.trigger("words:list");
                    });
                } else {
                    view = new App.Words.Show.MissingWord();
                }

                App.wordsList.show(view);
            })
        }
    }

});
