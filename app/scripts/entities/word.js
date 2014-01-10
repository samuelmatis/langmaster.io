App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    /**
     * Word item model
     *
     * @entity Word
     */
    Entities.Word = Backbone.Model.extend({
        defaults: {
            word: '',
            translation: '',
            strength: 0
        },

        urlRoot: function() {
            return '/api/user/words';
        },

        parse: function (response) {
            response.id = response["word_id"];
            delete response["word_id"];
            delete response["_id"];
            console.log(response);
            return response;
        },

        initialize: function(attributes, options) {
            options || (options = {});
            this.bind('error', this.defaultErrorHandler);
            this.init && this.init(attributes, options);
        },

        defaultErrorHandler: function(model, error) {
            if (error.status == 401 || error.status == 403 || error.status == 500) {
                App.vent.trigger('app:logout');
            }
        },

        validate: function(attrs) {
            var errors = {};
            if(!attrs.word) {
                errors.word = "Can't be blank";
            }
            if(!attrs.translation) {
                errors.translation = "Can't be blank";
            }
            if(!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    /**
     * Word items collection
     *
     * @entity Word
     */
    Entities.WordCollection = Backbone.Collection.extend({
        url: function() {
            return '/api/user/words';
        },

        model: Entities.Word,

        initialize: function(attributes, options) {
            options || (options = {});
            this.bind('error', this.defaultErrorHandler);
            this.init && this.init(attributes, options);
        },

        defaultErrorHandler: function(model, error) {
            if (error.status === 401 || error.status === 403 || error.status === 500) {
                App.vent.trigger('app:logout');
            }
        }
    });

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
            return defer.promise();
        },

        getWordEntity: function(wordId) {
            var word = new Entities.Word({id: wordId});
            var defer = $.Deferred();
            word.fetch({
                success: function(data) {
                    defer.resolve(data);
                },
                error: function() {
                    defer.resolve(undefined);
                }
            });
            return defer.promise();
        }
    };

    /**
     * Events
     */
    App.reqres.setHandler('words:entities', function() {
        return API.getWordsEntities();
    });

    App.reqres.setHandler('word:entity', function(id) {
        return API.getWordEntity(id);
    });

});
