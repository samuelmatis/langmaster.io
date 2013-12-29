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
            this.opt = options;
        },

        serializeData: function() {
            return {
                "name": App.user.fullName,
                "username": App.user.userName,
                "email": App.user.email,
                "picture": this.opt.picture,
                "type": this.opt.type.capitalize(),
                "numWords": this.opt.numWords,
                "bio": this.opt.bio,
                "native": this.opt.native,
                "location": this.opt.location,
                "learningSince": this.opt.learningSince
            }
        },

        events: {
            "click .js-save": "saveAbout"
        },

        triggers: {
            "click .js-remove-account": "remove:account"
        },

        saveAbout: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("about:submit", data);
        }
	});

});
