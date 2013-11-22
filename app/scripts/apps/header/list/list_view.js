App.module("Header.List", function(List, App, Backbone, Marionette, $, _) {

    List.Header = Marionette.ItemView.extend({
        template: "#header-link",
        tagName: "li",

        events: {
            "click a ": "navigate"
        },

        navigate: function(e) {
            e.preventDefault();
            this.trigger("navigate", this.model);
        },

        onRender: function() {
            if(this.model.selected) {
                this.$el.addClass("active");
            }
        }
    });

    List.Headers = Marionette.CompositeView.extend({
        template: "#header-template",
        tagName: "nav",
        className: "navbar-wrapper navbar-default navbar-fixed-top",
        itemView: List.Header,
        itemViewContainer: "ul.nav-main",

        events: {
            "click a.navbar-brand": "brandClicked"
        },

        brandClicked: function(e) {
            e.preventDefault();
            this.trigger("brand:clicked");
        },

        initialize: function() {
            this.$el.attr('role', 'navigation');
        }
    });

})
