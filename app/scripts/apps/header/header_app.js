App.module("Header", function(Header, App, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    }
  };

  App.commands.setHandler("set:active:header", function(name){
    App.Header.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
});
