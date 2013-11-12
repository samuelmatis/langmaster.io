App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Word = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#word-list-item",

        events: {
            "click td": "highlightWord",
            "click td a.js-edit": "editClicked",
            "click button.js-delete": "deleteClicked"
        },

        highlightWord: function() {
            // this.$el.css('background-color', '#eeeeee');
            this.$el.toggleClass('pure-table-highlighted');
            // console.log("clicked");
        },

        deleteClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("word:delete", this.model);
        },

        editClicked: function(e) {
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
