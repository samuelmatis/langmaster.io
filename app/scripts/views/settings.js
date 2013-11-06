/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    /**
     *  Settings layout
     *
     *  Renders all views on the settings page
     */
    App.Views.HomeLayout = Marionette.Layout.extend({

        template: "#settings-layout-template",

        regions: {

        }
    });

})();
