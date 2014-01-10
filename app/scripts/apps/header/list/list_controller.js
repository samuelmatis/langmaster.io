App.module('Header.List', function(List, App, Backbone, Marionette, $, _){
    "use strict";

    List.Controller = {

        /**
         * Header list method
         * It shows header view
         */
        listHeader: function() {

            // Fetch header links and current user
            var links = App.request('header:entities'),
                user = App.request('current:user');

            $.when(links, user).done(function(links, user) {
                var headers = new List.Headers({collection: links, name: user.get('name')});

                headers.on('brand:clicked', function(){
                    App.trigger('words:list');
                });

                headers.on('itemview:navigate', function(childView, model){
                    var trigger = model.get('navigationTrigger');
                    App.trigger(trigger);
                });

                App.headerRegion.show(headers);
            });
        },

        /**
         * setActiveHeader method
         * It sets active item in header
         */
        setActiveHeader: function(headerUrl){
            var links = App.request('header:entities');
            var headerToSelect = links.find(function(header){ return header.get('url') === headerUrl; });
            headerToSelect.select();
            links.trigger('reset');
        }

    }

});
