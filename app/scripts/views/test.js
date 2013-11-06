/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    /**
     *  Test layout
     *
     *  Renders all views on the test page
     */
    App.Views.TestLayout = Marionette.Layout.extend({

        template: "#test-layout-template",

        regions: {

        }
    });

})();
