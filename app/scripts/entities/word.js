App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    Entities.Word = Backbone.Model.extend({
        urlRoot: "words"
    });

    Entities.configureStorage(Entities.Word);

    Entities.WordCollection = Backbone.Collection.extend({
        url: "words",
        model: Entities.Word
    });

    Entities.configureStorage(Entities.WordCollection);

    var initializeWords = function() {
        var words = new Entities.WordCollection([
            { "id": 1, "word": "car", "translation": "auto", "knowIndex": 4 },
            { "id": 2, "word": "house", "translation": "dom", "knowIndex": 5 },
            { "id": 3, "word": "computer", "translation": "pocitac", "knowIndex": 2 },
            { "id": 4, "word": "book", "translation": "kniha", "knowIndex": 3 }
        ]);

        words.forEach(function(word) {
            word.save();
        });

        return words.models;
    };

    var API = {
        getWordsEntities: function() {
            var words = new Entities.WordCollection();
            var defer = $.Deferred();
            setTimeout(function() {
                words.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    }
                });
            }, 500);
            var promise = defer.promise();
            $.when(promise).done(function(words) {
                if(words.length === 0) {
                    var models = initializeWords();
                    words.reset(models);
                }
            });
            return promise;
        },

        getContactEntity: function(wordId) {
            var word = new Entities.Word({id: wordId});
            var defer = $.Deferred();
            setTimeout(function() {
                word.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    },
                    error: function(data) {
                        defer.resolve(undefined);
                    }
                });
            }, 500);
            return defer.promise();
        }
    };

    App.reqres.setHandler("words:entities", function() {
        return API.getWordsEntities();
    });

    App.reqres.setHandler("word:entity", function(id) {
        return API.getContactEntity(id);
    });

});
