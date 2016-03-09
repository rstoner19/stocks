
'use strict';

$('#new-symbol').on('submit', function(e){
  e.preventDefault();
  Stocks.userList.push($('.symbol-input').val().toUpperCase());
  Stocks.userList = Stocks.userList.filter(function(y,pos){
    return Stocks.userList.indexOf(y) === pos;
  });
  Stocks.userList = Stocks.userList.sort();
  $('.symbol-input').val('');
  $('#symbol-list').empty();
  Stocks.saveLocal();
  Stocks.toInputPage();
});

Stocks.toInputPage = function() {
  Stocks.userList.forEach(function(a){
    $('#symbol-list').append('<li>' + a + '</li>');
  });
};

Stocks.loadLocal = function(){
  if(localStorage.stockData) {
    Stocks.userList = JSON.parse(localStorage.stockData);
  } else {
    Stocks.userList = ['^GSPC','^IXIC'];
  }
};

Stocks.saveLocal = function(){
  if(localStorage.stockData) {
    localStorage.stockData = JSON.stringify(Stocks.userList);
  } else {
    localStorage.setItem('stockData', JSON.stringify(Stocks.userList));
  }
};

$('.symbol-input').on('click', function(e){
  $('.symbol-input').val('');
});
