/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    /**
     *  User layout
     *
     *  Renders all views on the user page
     */
    App.Views.HomeLayout = Marionette.Layout.extend({

        template: "#user-layout-template",

        regions: {

        }
    });

})();
