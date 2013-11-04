/*global App, Backbone, Marionette, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

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

        submit: function(event) {
            event.preventDefault();
            alert("clicked add word");
        }
    })

})();
