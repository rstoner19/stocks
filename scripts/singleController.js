(function(module){
  var singleController = {};

  singleController.index = function(ctx, next){
    $('.blur').css('-webkit-filter', 'blur(5px)');
    $('#single-stock').fadeIn(650);
    
  };

  module.singleController = singleController;
})(window);
