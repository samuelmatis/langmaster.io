App.module('Common.Views', function(Views, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Loading view
     *
     * @region Common
     * @template #loading-view
     */
    Views.Loading = Marionette.ItemView.extend({
        template: 'common/loading',

        onShow: function() {
            var opts = {
                lines: 13,
                length: 26,
                width: 2,
                radius: 28,
                corners: 1,
                rotate: 0,
                direction: 1,
                color: '#000',
                speed: 1,
                trail: 64,
                shadow: false,
                hwaccel: false,
                className: 'spinner',
                zIndex: 2e9,
                top: 'auto',
                left: 'auto'
            };

            $('#spinner').spin(opts);
        }
    });

});
