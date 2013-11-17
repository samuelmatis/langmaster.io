App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Layout = Marionette.Layout.extend({
        template: "#words-list-layout",
        className: "pure-g content-ribbon",

        regions: {
            listRegion: "#list-words",
            addRegion: "#add-new-word"
        }
    });

    List.NewWord = Marionette.ItemView.extend({
        template: "#words-list-newword"
    });

    List.Word = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#word-list-item",

        events: {
            "click td": "highlightWord",
            "click td a.js-edit": "editClicked",
            "click button.js-delete": "deleteClicked"
        },

        flash: function(cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                setTimeout(function() {
                    $view.toggleClass(cssClass);
                }, 500);
            });
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
            e.preventDefault();
            e.stopPropagation();
            this.trigger("word:edit", this.model);
        }
    });

    List.Words = Marionette.CompositeView.extend({

        template: "#word-list",

        itemView: List.Word,

        itemViewContainer: "tbody"
    });

});
