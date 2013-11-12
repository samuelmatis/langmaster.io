App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Word = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#word-list-item",

        events: {
            "click td": "highlightWord",
            "click button.js-edit": "editClicked",
            "click td a.js-show": "showClicked"
        },

        highlightWord: function() {
            this.$el.css('background-color', 'red');
            // console.log("clicked");
        },

        deleteClicked: function(e) {
            e.stopPropagation();
            // this.trigger("contact:delete", this.model);
        },

        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("word:show", this.model);
        }
    });

    List.Words = Marionette.CompositeView.extend({
        tagName: "table",
        className: "pure-table",

        template: "#word-list",

        itemView: List.Word,

        itemViewContainer: "tbody"
    });

});
