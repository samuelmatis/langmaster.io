App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

    /**
     * Header item model
     * 
     * @entity Header
     */
    Entities.Header = Backbone.Model.extend({
        initialize: function() {
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
        }
    });

    /**
     * Header items collection
     * 
     * @entity Header
     */
    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function() {
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    /**
     * Initialize header items
     * 
     * @entity Header
     */
    var initializeHeaders = function() {
        Entities.headers = new Entities.HeaderCollection([
            { name: "Home", url: "home", navigationTrigger: "home:show" },
            { name: "Test", url: "test", navigationTrigger: "test:main:show" },
            { name: "Words", url: "words", navigationTrigger: "words:list" },
            { name: "Settings", url: "settings", navigationTrigger: "settings:show"}
        ]);
    };

    /**
     * API
     * Main API methods for word entity
     */
    var API = {
        getHeaders: function() {
            if(Entities.headers === undefined) {
                initializeHeaders();
            }
            return Entities.headers;
        }
    };

    /**
     * Events
     */
    App.reqres.setHandler("header:entities", function() {
        return API.getHeaders();
    });
 
});
