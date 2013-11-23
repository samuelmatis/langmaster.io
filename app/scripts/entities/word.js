App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    Entities.Word = Backbone.Model.extend({
        urlRoot: "api/words",

        defaults: {
            word: "",
            translation: "",
            strength: 0
        },

        parse: function (response) {
            // console.log(response.items[1]._id["$oid"]);
            var item_num = 0;
            // _.each(response.items, function(item) {
            //     // console.log(item);
            //     // console.log(item._id["$oid"]);
            //     response.items[item_num].id = item.item_id;
            //     item_num++;
            //     // response.items[item].id = item._id["$oid"];
            // });
            // console.log(response);
            // response['items'].id = response["_id"]["$oid"];
            // delete response._id;
            response.id = response.item_id;
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

    Entities.WordCollection = Backbone.Collection.extend({
        url: "api/words",
        model: Entities.Word
    });

    // Entities.configureStorage(Entities.WordCollection);

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

    App.reqres.setHandler("words:entities", function() {
        return API.getWordsEntities();
    });

    App.reqres.setHandler("word:entity", function(id) {
        return API.getWordEntity(id);
    });

});
