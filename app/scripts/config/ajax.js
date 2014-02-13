$.ajaxSetup({
    success: function(response) {
        if(response.error === 'Authentication is required') {
            App.vent.trigger('app:logout');
        }
    }
});
