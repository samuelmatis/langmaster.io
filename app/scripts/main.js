/*global words, $*/

// Define new Marionette application
var Words = new Marionette.Application();

// Add regions on page
Words.addRegions({

});

// On start
Words.on("initialize:after", function() {

    Words.init();
});
