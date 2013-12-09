App.module("Profile.Show", function(Show, App, Backbone, Marionette, $, _) {

	/**
	 * Profile view
	 *
	 * @region Profile
	 * @template #profile-template
	 */
	Show.Profile = Marionette.ItemView.extend({
		template: "#profile-template",
		className: "pure-g content-ribbon"
	});

});
