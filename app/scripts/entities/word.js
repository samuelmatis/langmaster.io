App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    /**
     * Word item model
     * 
     * @entity Word
     */
    Entities.Word = Backbone.Model.extend({
        urlRoot: "http://localhost:5000/api/users/petoparada/words",

        defaults: {
            word: "",
            translation: "",
            strength: 0
        },

        parse: function (response) {
            response.id = response.word_id;
            delete response.word_id;
            delete response._id;
            console.log(response);
            return response;
        },

        validate: function(attrs, options) {
            var errors = {};
            if(!attrs.word) {
                errors.word = "Can't be blank";
            }
            if(!attrs.translation) {
                errors.translation = "Can't be blank";
            } else {
                if(attrs.translation.length < 2) {
                    errors.translation = "Is too short";
                }
            }
            if(!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    // Entities.configureStorage(Entities.Word);

    /**
     * Word items collection
     * 
     * @entity Word
     */
    Entities.WordCollection = Backbone.Collection.extend({
        url: "http://localhost:5000/api/users/petoparada/words",
        model: Entities.Word
    });

    // Entities.configureStorage(Entities.WordCollection);

    /**
     * Initialize word items
     * 
     * @entity Word
     */
    var initializeWords = function() {
        var words = new Entities.WordCollection([
            { "id": 1, "word": "car", "translation": "auto", "strength": 4 },
            { "id": 2, "word": "house", "translation": "dom", "strength": 5 },
            { "id": 3, "word": "computer", "translation": "pocitac", "strength": 2 },
            { "id": 4, "word": "book", "translation": "kniha", "strength": 3 }
        ]);

        words.forEach(function(word) {
            word.save();
        });

        return words.models;
    };

    /**
     * API
     * Main API methods for word entity
     */
    var API = {
        getWordsEntities: function() {
            var words = new Entities.WordCollection();
            var defer = $.Deferred();
            words.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();
            return promise;
        },

        getWordEntity: function(wordId) {
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

    /**
     * Events
     */
    App.reqres.setHandler("words:entities", function() {
        return API.getWordsEntities();
    });

    App.reqres.setHandler("word:entity", function(id) {
        return API.getWordEntity(id);
    });

});
