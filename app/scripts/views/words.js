/*global Words, Backbone, Marionette, JST*/

Words.Views = Words.Views || {};

(function () {
    'use strict';

    /**
    *  Word item view
    *
    *  Renders row in table
    */
    Words.Views.WordItemView = Marionette.ItemView.extend({

    	tagName: "tr",
    	
    	template: "#words-row-template"
    });

    /**
    *  Word table view
    *
    *  Renders whole table with WordItemView
    */
    Words.Views.WordTableView = Marionette.CompositeView.extend({

    	itemView: Words.Views.WordItemView,

    	itemViewContainer: "tbody",

    	template: "#words-table-template"
    });

})();
