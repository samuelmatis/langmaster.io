App.module("Words", function(Words, App, Backbone, Marionette, $, _) {

    Words.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "words": "listWords",
            "words/:id/edit": "editWord"
        }
    });

    var API = {
        listWords: function() {
            console.log("[route] list words");
            App.Words.List.Controller.listWords();
        },

        editWord: function(id) {
            App.Words.Edit.Controller.editWord(id);
        }
    };

    App.on("words:list", function() {
        App.navigate("words");
        API.listWords();
    });

    App.on("word:edit", function(id) {
        App.navigate("contacts/" + id + "/edit");
        API.editWord(id);
    });

    App.addInitializer(function() {
        new Words.Router({
            controller: API
        });
    });

});
