App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

    /**
     * User model
     *
     * @entity Word
     */
    Entities.User = Backbone.Model.extend({
        defaults: {
            id: 1
        },

        url: 'api/user'
    });

    /**
     * API
     * Main API methods for user entity
     */
    var API = {
        getUser: function() {
            var user = new Entities.User();
            var defer = $.Deferred();
            user.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();
            return promise;
        }
    };

    /**
     * Events
     */
    App.reqres.setHandler('user:entity', function() {
        return API.getUser();
    });

});
