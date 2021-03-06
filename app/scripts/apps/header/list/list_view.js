App.module('Header.List', function(List, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Header items
     *
     * @region Header
     * @template #header-link
     */
    List.Header = Marionette.ItemView.extend({
        template: 'header/link',
        tagName: 'li',

        events: {
            'click a': 'navigate'
        },

        navigate: function(e) {
            e.preventDefault();
            this.trigger('navigate', this.model);
        },

        onRender: function() {
            if(this.model.selected){
                this.$el.addClass('active');
            }
        }
    });

    /**
     * Header view
     *
     * @region Header
     * @template #header-template
     */
    List.Headers = Marionette.CompositeView.extend({
        template: 'header/header',
        tagName: 'nav',
        className: 'navbar-wrapper navbar-default navbar-fixed-top',
        itemView: List.Header,
        itemViewContainer: 'ul.nav-main',

        events: {
            'click a.navbar-brand': 'brandClicked',
            'click .js-logout': 'logout'
        },

        serializeData: function() {
            return {
                'name': this.opt.name
            };
        },

        brandClicked: function(e) {
            e.preventDefault();
            this.trigger('brand:clicked');
        },

        logout: function() {
            App.vent.trigger('app:logout');
        },

        initialize: function(options) {
            this.opt = options;
            this.$el.attr('role', 'navigation');
        }
    });
});
