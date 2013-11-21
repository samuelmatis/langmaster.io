App.module("Test", function(Test, App, Backbone, Marionette, $, _) {

	Test.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"test": "showTest"
		}
	});

	var API = {
		showTest: function() {
			Test.Main.Controller.showMain();
		}
	};

	App.on("test:main:show", function() {
		App.navigate("test");
		API.showTest();
	});

	App.addInitializer(function() {
		new Test.Router({
			controller: API
		});
	});

});
