/*global App, Backbone, Marionette*/

var App = new Marionette.Application();

// Add regions on page
App.addRegions({
    headerRegion: '#header',
    appRegion: '#app',
    dialogRegion: Marionette.Region.Dialog.extend({
        el: '#dialog-region'
    })
});

App.on('initialize:before', function() {
    $.ajax({
        type: 'GET',
        url: '/api/user',
        error: function() {
            window.location.replace('/api/logout');
        }
    });
})

// After initialize
App.on('initialize:after', function() {
    if(Backbone.history) {
        Backbone.history.start();

        if(this.getCurrentRoute() === '') {
            App.trigger('words:list');
        }
    }

    App.vent.on('app:logout', function() {
        window.location.replace('/api/logout');
    });
});
