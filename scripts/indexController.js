(function(module){
  var indexController = {};
  var controller = {};

  controller.homepage = function() {
    $('#symbol-input').hide();
    $('.blur').css('-webkit-filter', 'blur(0px)');
    $('#stock-data').empty();
    $('#detailed-data').empty();
    $('#stock-data').show();
    Stocks.loadLocal(),
    Stocks.loadQuote(Stocks.toIndexPage);
  };

  module.controller = controller;
})(window);
