(function(module){
  var inputController = {};

  inputController.index = function(ctx, next){
    $('.blur').css('-webkit-filter', 'blur(5px)');
    $('#symbol-input').fadeIn(650);
  };

  module.inputController = inputController;
})(window);
