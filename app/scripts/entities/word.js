App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    Entities.Word = Backbone.Model.extend({});

    Entities.WordCollection = Backbone.Collection.extend({
        model: Entities.Word,
        comparator: 'id'
    });

    var words;

    var initializeWords = function() {
        words = new Entities.WordCollection([
            { id: 1, word: 'car', translation: 'auto', knowIndex: 4 },
            { id: 2, word: 'house', translation: 'dom', knowIndex: 5 },
            { id: 3, word: 'computer', translation: 'pocitac', knowIndex: 2 },
            { id: 4, word: 'book', translation: 'kniha', knowIndex: 3 }
        ]);
    };

    var API = {
        getWordsEntities: function() {
            if(words === undefined) {
                initializeWords();
            }
            return contacts;
        }
    };

    App.reqres.setHandler("words:entities", function() {
        return API.getWordsEntities();
    });

});