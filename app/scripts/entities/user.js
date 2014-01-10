App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Current user model
     *
     * @entity User
     */
    Entities.CurrentUser = Backbone.Model.extend({
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
        getCurrentUser: function() {
            var user = new Entities.CurrentUser();
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
    App.reqres.setHandler('current:user', function() {
        return API.getCurrentUser();
    });

});
