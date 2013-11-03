/*global Words, Backbone, Marionette, JST*/

Words.Collections = Words.Collections || {};

(function () {
    'use strict';

   /**
    *  Collection of words
    *
    *  model: Words.Models.Word
    */
    Words.Collections.Words = Backbone.Collection.extend({

        model: Words.Models.Word,

        // Sort models
        comparator: 'id'

    });

})();