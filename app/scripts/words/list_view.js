App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

	List.Word = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#word-list-item"
	});

	List.Words = Marionette.CompositeView.extend({
		tagName: "table",
		className: "pure-table",

		template: "#word-list",

		itemView: List.Word,

		itemViewContainer: "tbody"
	});

});