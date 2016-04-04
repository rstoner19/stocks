(function(module){

  $('.single-symbol-input').on('click', function(e){
    $('.single-symbol-input').val('');
  });

  $('#single-symbol').on('submit', function(e){
    e.preventDefault();
    Stocks.single = $('.single-symbol-input').val();
  });


}(window));
