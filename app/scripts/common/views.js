App.module('Common.Views', function(Views, App, Backbone, Marionette, $, _) {

    Views.Loading = Marionette.ItemView.extend({
        template: "#loading-view",

        serializeData: function() {
            return {
                title: this.options.title || "Loading Data",
                message: this.options.message || "Please wait, data is loading"
            }
        },

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
    })

})
