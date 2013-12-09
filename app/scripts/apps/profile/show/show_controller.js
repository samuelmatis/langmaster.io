App.module("Profile.Show", function(Show, App, Backbone, Marionette, $, _) {

	Show.Controller = {

		/**
		 * Show profile method
		 * It shows profile of current user
		 */
		showProfile: function() {
			var profileView = new Show.Profile();
			App.appRegion.show(profileView);
		}

	}

});
