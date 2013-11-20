App.module("Words", function(Words, App, Backbone, Marionette, $, _) {

    Words.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "words": "listWords",
            "words/(?filter=:criterion)": "filterWords",
            "words/:id/edit": "editWord"
        }
    });

    var API = {
        listWords: function() {
            App.Words.List.Controller.listWords();
        },

        filterWords: function(criterion) {
            App.Words.List.Controller.listWords(criterion);
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
        App.navigate("words/"+ id + "/edit");
    });

    App.on("words:filter", function(criterion) {
        if(criterion) {
            App.navigate("words?filter=" + criterion);
        } else {
            App.navigate("words");
        }
    });

    App.addInitializer(function() {
        new Words.Router({
            controller: API
        });
    });

});
