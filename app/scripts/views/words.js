/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    /**
     *  Words page layout
     *
     *  Renders all views on the words page
     */
    App.Views.WordLayout = Marionette.Layout.extend({

        template: "#words-layout-template",

        regions: {
            wordList: "#list-words",
            newWord: "#add-new-word"
        }
    });

    /**
     *  Word item view
     *
     *  Renders row in table
     */
    App.Views.WordItemView = Marionette.ItemView.extend({

    	tagName: "tr",

    	template: "#words-row-template"
    });


    /**
     *  Word table view
     *
     *  Renders whole table with WordItemView
     */
    App.Views.WordTableView = Marionette.CompositeView.extend({

    	itemView: App.Views.WordItemView,

    	itemViewContainer: "tbody",

    	template: "#words-table-template"
    });


    /**
     *  Add a new word
     *
     *  Renders form for creating a new word
     */
    App.Views.NewWord = Marionette.ItemView.extend({

        template: "#words-new-word",

        events: {
            'click #submit': 'submit'
        },

        submit: function(e) {
            e.preventDefault();
            alert("clicked add word");
        }
    })

})();
