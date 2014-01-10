/*global App, Backbone, Marionette*/

"use_strict";

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    headerRegion: '#header',
    appRegion: '#app',
    dialogRegion: Marionette.Region.Dialog.extend({
        el: '#dialog-region'
    })
});

// Check if user is logged in before initialize
App.on('initialize:before', function() {

    App.vent.on('app:logout', function() {
        window.location.replace('/api/logout');
    });

    $.ajax({
        type: 'GET',
        url: '/api/user',
        async: false,
        error: function() {
            App.vent.trigger('app:logout');
        }
    });
});

// After initialize
App.on('initialize:after', function() {

    if(Backbone.history) {
        Backbone.history.start();

        if(this.getCurrentRoute() === '') {
            App.trigger('words:list');
        }
    }
});
