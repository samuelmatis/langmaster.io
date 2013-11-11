App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

	Show.Word = Marionette.ItemView.extend({
		template: "#word-view"
	});

});
