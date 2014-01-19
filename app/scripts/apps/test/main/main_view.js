App.module('Test.Main', function(Main, Test, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Test header panel
     *
     * @region Test-StartPage
     * @template #test-header-panel
     */
     Main.TestHeaderPanel = Marionette.ItemView.extend({
        template: 'test/header-panel',
        tagName: 'nav',
        className: 'navbar-wrapper navbar-test navbar-default',

        events: {
            'click .js-back-to-words': 'backToWords'
        },

        backToWords: function(e) {
            e.preventDefault();
            App.trigger('words:list');
        }
     });

    /**
     * Weakest words table ItemView
     *
     * @region Test-StartPage
     * @template #test-weakest-words
     */
    Main.StartPageWords = Marionette.ItemView.extend({
        tagName: 'tr',
        template: 'test/weakest-words'
    });

    /**
     * Start page view
     *
     * @region Test-StartPage
     * @template #test-start
     */
    Main.StartPage = Marionette.CompositeView.extend({
        template: 'test/start',
        className: 'col-md-4 col-md-offset-4',
        id: 'test',
        itemView: Main.StartPageWords,
        itemViewContainer: 'tbody',

        triggers: {
            'click .js-start-test': 'start:test'
        },

        keyboardEvents: {
            'enter': function() { this.trigger('start:test'); }
        }
    });

    /**
     * Test layout
     *
     * @region Test-TestPage
     * @template #test-region-layout
     */
    Main.TestLayout = Marionette.Layout.extend({
        template: 'test/region-layout',
        className: 'row',

        regions: {
            testHeader: '#test-header',
            testMain: '#test-main',
            testResult: '#test-result'
        },

        keyboardEvents: {
            'backspace': function(e) { e.preventDefault(); }
        }
    });

    /**
     * Header region view
     *
     * @region Test-TestPage
     * @template #test-header-region
     */
    Main.HeaderRegion = Marionette.ItemView.extend({
        template: 'test/header',

        initialize: function() {
            this.totalSteps = localStorage.getItem('totalSteps');
        },

        triggers: {
            'click .js-giveup': 'test:giveup'
        },

        serializeData: function() {
            return {
                'totalSteps': this.totalSteps,
                'step': this.totalSteps - localStorage.getItem('step')
            };
        }
    });

    /**
     * Main test region
     *
     * @region Test-TestPage
     * @template #test-main-region
     */
    Main.TestRegion = Marionette.ItemView.extend({
        template: 'test/main-region',

        events: {
            'click .js-submit-answer': 'submitAnswer'
        },

        keyboardEvents: {
            'enter': 'submitAnswer'
        },

        submitAnswer: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('submit:answer', data);
        }
    });

    /**
     * Test result view
     *
     * @region Test-TestPage
     * @template #test-result-region
     */
     Main.TestResult = Marionette.ItemView.extend({
        template: 'test/result-region',

        serializeData: function() {
            if (this.options.result == 1) {
                $('.js-test-input').addClass('test-input-success');
                return {
                    'result': 'success',
                    'result_text': 'Good! :)',
                    'answer': ''
                };
            } else if (this.options.result < 1.0 && this.options.result >= 0.9) {
                $('.js-test-input').addClass('test-input-warning');
                return {
                    'result': 'warning',
                    'result_text': 'You have a small typo in your answer. The answer is ',
                    'answer': this.options.translation
                };
            } else if (this.options.result < 0.9) {
                $('.js-test-input').addClass('test-input-fail');
                return {
                    'result': 'danger',
                    'result_text': 'No, the answer is ',
                    'answer': this.options.translation
                };
            }
        },

        triggers: {
            'click .js-next': 'test:next'
        },

        keyboardEvents: {
            'enter': function() { this.trigger('test:next'); }
        }
     });

    /**
     * Final test table view
     *
     * @region Test-TestPage
     * @template #test-final-table
     */
    Main.FinalTableView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: 'test/final-table'
    });

    /**
     * Final test view
     *
     * @region Test-TestPage
     * @template #test-final
     */
    Main.FinalView = Marionette.CompositeView.extend({
        template: 'test/final',
        className: 'col-md-4 col-md-offset-4',
        id: 'test',
        itemView: Main.FinalTableView,
        itemViewContainer: 'tbody',

        serializeData: function() {
            return {
                'result': this.options.data
            }
        },

        events: {
            'click .js-start-again': 'startAgain',
            'click .js-end-test': 'testEnd'
        },

        startAgain: function(e) {
            e.preventDefault();
            App.trigger('test:main:show');
        },

        testEnd: function(e) {
            e.preventDefault();
            App.trigger('words:list');
        }

     });

    /**
     * No words for test view
     *
     * @region Test-TestPage
     * @template #test-no-words
     */
     Main.TestNoWords = Marionette.ItemView.extend({
        template: 'test/no-words',
        className: 'col-md-6 col-md-offset-3',
        id: 'test'
     });

});
