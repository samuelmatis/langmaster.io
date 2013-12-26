App.module("Profile.Show", function(Show, App, Backbone, Marionette, $, _) {

	/**
	 * Profile view
	 *
	 * @region Profile
	 * @template #profile-template
	 */
	Show.Profile = Marionette.ItemView.extend({
		template: "profile/profile",
		className: "pure-g content-ribbon",

        initialize: function(options) {
            this.numWords = options.numWords;
        },

        serializeData: function() {
            return {
                "name": App.user.fullName,
                "email": App.user.email,
                "picture": App.user.picture,
                "type": App.user.authType.capitalize(),
                "numWords": this.numWords
            }
        }
	});

});
