App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

	Show.Word = Marionette.ItemView.extend({
		template: "#word-view",

		events: {
			"click a.js-back": "goBack"
		},

		goBack: function(e) {
			e.preventDefault();
			App.trigger("words:list");
		}
	});

	Show.MissingWord = Marionette.ItemView.extend({
		template: "#missing-word-view"
	});

});
