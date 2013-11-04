/*global App, Backbone, Marionette, JST*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

   /**
    *  Collection of App
    *
    *  model: App.Models.Word
    */
    App.Collections.Words = Backbone.Collection.extend({

        model: App.Models.Word,

        // Sort models
        comparator: 'id'

    });

})();
