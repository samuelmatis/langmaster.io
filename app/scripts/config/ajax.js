$.ajaxSetup({
    success: function(response) {
        if(response.error) {
            App.vent.trigger('app:logout');
        }
    }
});