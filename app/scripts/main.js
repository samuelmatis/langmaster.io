/*global words, $*/

// Define new Marionette application
var Words = new Marionette.Application();

// Add regions on page
Words.addRegions({
    wordsList: '#words-list'
});

// On start
Words.on("initialize:after", function() {

    // Define test words
    // Known index - from 1 to 10
    var words = new Words.wordsCollection([
        {
            "word": "car",
            "translate": "auto",
            "knowIndex": 4.352
        },
        {
            "word": "house",
            "translate": "word",
            "knowIndex": 8.4
        }
    ]);

    Words.init();
});
