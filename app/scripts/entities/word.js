App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    Entities.Word = Backbone.Model.extend({
        urlRoot: "contacts"
    });

    Entities.configureStorage(Entities.Word);

    Entities.WordCollection = Backbone.Collection.extend({
        url: "contacts",
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

        return words;
    };

    var API = {
        getWordsEntities: function() {
            var words = new Entities.WordCollection();
            words.fetch();
            if(words.length === 0) {
                return initializeWords();
            }
            return words;
        },

        getContactEntity: function(wordId) {
            var word = new Entities.Word({id: wordId});
            word.fetch();
            return word;
        }
    };

    App.reqres.setHandler("words:entities", function() {
        return API.getWordsEntities();
    });

    App.reqres.setHandler("word:entity", function(id) {
        return API.getContactEntity(id);
    });

});
