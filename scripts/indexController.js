(function(module){
  var indexController = {};

  indexController.index = function(ctx, next){
    $('#stock-data').show();
    next();
  };

  module.indexController = indexController;
})(window);
