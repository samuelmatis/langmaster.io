/*global words, Backbone*/

words.Collections = words.Collections || {};

(function () {
    'use strict';

    words.Collections.ApplicationCollection = Backbone.Collection.extend({

        model: words.Models.ApplicationModel

    });

})();
