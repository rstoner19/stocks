(function(module){
  var indexController = {};

  indexController.index = function(ctx, next){
    $('#stock-data').show();
  };

  module.indexController = indexController;
})(window);
