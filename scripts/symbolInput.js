(function(module){
  'use strict';

  $('#new-symbol').on('submit', function(e){
    e.preventDefault();
    Stocks.userList.push($('.symbol-input').val().toUpperCase());
    Stocks.userList = Stocks.userList.filter(function(y,pos){
      return Stocks.userList.indexOf(y) === pos;
    });
    Stocks.userList = Stocks.userList.sort();
    $('.symbol-input').val('');
    Stocks.saveLocal();
    Stocks.toInputPage();
  });

  Stocks.toInputPage = function() {
    $('#symbol-list').empty();
    Stocks.userList.forEach(function(a){
      $('#symbol-list').append('<li><span>' + a + '</span><img type="text" class="remove-symbol" name="' + a + '" src="img/remove.png"></li>');
    });
    $('.remove-symbol').on('click', function(ele){
      Stocks.removeSymbol(this.name);
    });
  };

  Stocks.loadLocal = function(){
    if(localStorage.stockData) {
      Stocks.userList = JSON.parse(localStorage.stockData);
    } else {
      Stocks.userList = ['^GSPC','^IXIC'];
    }
  };

  Stocks.removeSymbol = function(remove) {
    Stocks.userList = Stocks.userList.filter(function(ele){
      if(remove !== ele){
        return ele;
      }
    });
    Stocks.saveLocal();
    Stocks.toInputPage();
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
    $('##prefillSymbol').autocomplete('close');
  });

  module.Stocks = Stocks;
}(window));
