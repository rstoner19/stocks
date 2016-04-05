(function(module){

  $('.single-symbol-input').on('click', function(e){
    $('.single-symbol-input').val('');
  });

  $('#single-symbol').on('submit', function(e){
    e.preventDefault();
    Stocks.Single = $('.single-symbol-input').val();
  });

  Stocks.toSinglePage = function(){
    Stocks.data.forEach(function(a){
      $('#single-stock').append(a.toHtml('#detailed-data-template'));
    });
  };

  Stocks.Single = function() {
    Stocks.loadQuote(Stocks.toSinglePage, Stocks.Single);
  };

  module.Stocks = Stocks;
}(window));
