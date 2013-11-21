App.module("Words.Edit", function(Edit, App, Backbone, Marionette, $, _) {

    Edit.Controller = {
        editWord: function(id) {
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            var word = App.request("word:entity", id);
            $.when(word).done(function(word) {
                var view;
                if(word !== undefined) {
                    view = new Edit.Word({
                        model: word,
                        generateTitle: true
                    });

                    view.on("form:submit", function(data) {
                        if(word.save(data)) {
                            App.trigger("words:list");
                        } else {
                            view.triggerMethod("form:data:invalid", word.validationError);
                        }
                    });
                } else {
                    view = new App.Words.Show.MissingWord();
                }

                App.appRegion.show(view);
            })
        }
    }

});
