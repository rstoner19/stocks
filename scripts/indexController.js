(function(module){
  var indexController = {};

  indexController.index = function(ctx, next){
    $('#symbol-input').hide();
    $('.blur').css('-webkit-filter', 'blur(0px)');
    $('#stock-data').show();
  };

  module.indexController = indexController;
})(window);
