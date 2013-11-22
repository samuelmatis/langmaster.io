App.module("Header.List", function(List, App, Backbone, Marionette, $, _) {

    List.Controller = {
        listHeader: function() {
            var links = App.request("header:entities");
            var headers = new List.Headers({ collection: links });

            headers.on("brand:clicked", function() {
                App.trigger("words:list");
            });

            headers.on("itemview:navigate", function(childView, model) {
                var trigger = model.get("navigationTrigger");
                App.trigger(trigger);
            });

            App.headerRegion.show(headers);
        },

        setActiveHeader: function(headerUrl){
            var links = App.request("header:entities");
            var headerToSelect = links.find(function(header){
                return header.get("url") === headerUrl;
            });
            headerToSelect.filter();
            links.trigger("reset");
        }
    };

});
