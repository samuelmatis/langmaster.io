App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
  var findStorageKey = function(entity){

    if(entity.urlRoot){
      return _.result(entity, "urlRoot");
    }

    if(entity.url){
      return _.result(entity, "url");
    }

    if(entity.collection && entity.collection.url){
      return _.result(entity.collection, "url");
    }

    throw new Error("Unable to determine storage key");
  };

  var StorageMixin = function(entityPrototype){
    var storageKey = findStorageKey(entityPrototype);
    return { localStorage: new Backbone.LocalStorage(storageKey) };
  };

  Entities.configureStorage = function(entity){
    _.extend(entity.prototype, new StorageMixin(entity.prototype));
  };
});
