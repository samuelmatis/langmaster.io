// Router helper methods
App.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

App.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

Backbone.Marionette.Renderer.render = function(template, data){
    if (!JST[template]) { throw 'Template "' + template + '" not found!'; }
    return JST[template](data);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
