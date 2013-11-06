/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    /**
     *  Homepage layout
     *
     *  Renders all views on the home page
     */
    App.Views.HomeLayout = Marionette.Layout.extend({

        template: "#home-layout-template",

        regions: {

        }
    });

})();
