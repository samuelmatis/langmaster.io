App.module('Profile.Show', function(Show, App, Backbone, Marionette, $, _) {

	/**
	 * Profile view
	 *
	 * @region Profile
	 * @template #profile-template
	 */
	Show.Profile = Marionette.ItemView.extend({
		template: 'profile/profile',
		className: 'pure-g content-ribbon',

        events: {
            'click .js-save': 'saveAbout'
        },

        triggers: {
            'click .js-remove-account': 'remove:account'
        },

        saveAbout: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('about:submit', data);
        }
	});

});
