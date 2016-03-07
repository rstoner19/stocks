
'use strict';

$('#new-symbol').on('submit', function(e){
  e.preventDefault();
  Stocks.userList.push($('.symbol-input').val().toUpperCase());
  Stocks.userList = Stocks.userList.filter(function(y,pos){
    return Stocks.userList.indexOf(y) === pos;
  });
  Stocks.userList = Stocks.userList.sort();
  $('.symbol-input').val('');
});

$('.symbol-input').on('click', function(e){
  // e.preventDefault();
  $('.symbol-input').val('');
});
