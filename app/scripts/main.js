/*global words, $*/


window.words = {
    Models: {},
    Collections: {},
    Views: {},
    Templates: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    words.init();
});
