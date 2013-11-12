App.module("Words", function(Words, App, Backbone, Marionette, $, _) {

    Words.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "words": "listWords",
            "words/:id": "showWord"
        }
    });

    var API = {
        listWords: function() {
            console.log("[route] list words");
            App.Words.List.Controller.listWords();
        },

        showWord: function(id) {
            console.log("[route] show word");
            App.Words.Show.Controller.showWord(id);
        }
    };

    App.on("words:list", function() {
        App.navigate("words");
        API.listWords();
    });

    App.on("word:show", function(id) {
        App.navigate("words/" + id);
        API.showWord(id);
    })

    App.addInitializer(function() {
        new Words.Router({
            controller: API
        });
    });

});
