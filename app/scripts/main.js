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

// Before initialize
App.on('initialize:before', function(){
    // Get user info
    $.ajax({
        url: '/api/user',
        async: false,
        success: function(res) {
            App.user = {};
            App.user.userName = res[0].username;
            App.user.fullName = res[0].name;
            App.user.email = res[0].email;
        },
        error: function() {
            window.location.replace('/api/logout');
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

    App.vent.on('app:logout', function() {
        window.location.replace('/api/logout');
    });
});
