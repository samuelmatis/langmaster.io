App.module("Words", function(Words, App, Backbone, Marionette, $, _) {

    Words.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "words": "listWords"
        }
    });

    var API = {
        listWords: function() {
            console.log("[route] list words");
            App.Words.List.Controller.listWords();
        }
    };

    App.addInitializer(function() {
        new Words.Router({
            controller: API
        });
    });

});
