App.module('Header', function(Header, App, Backbone, Marionette, $, _){

    /**
     * API
     * Main API methods for header
     */
    var API = {
        listHeader: function(){
            Header.List.Controller.listHeader();
        }
    };

    /**
     * Events
     */
    App.commands.setHandler('set:active:header', function(name){
        App.Header.List.Controller.setActiveHeader(name);
    });

    /**
     * On start and stop header sub-app
     */
    Header.on('start', function(){
        API.listHeader();
    });

    Header.on('stop', function() {
        App.headerRegion.close();
    });
});
