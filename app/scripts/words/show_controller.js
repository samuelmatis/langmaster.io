App.module("Words.Show", function(Show, App, Backbone, Marionette, $, _) {

	Show.Controller = {
		showWord: function(id) {
			var words = App.request("words:entities");
			var model = words.get(id)
			var wordView = new Show.Word({
				model: model
			});

			App.wordsList.show(wordView);
		}
	}

});
