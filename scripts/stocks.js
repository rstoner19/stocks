(function(module){
  'use strict';
  var stockData = [];

  Stocks.data = [];
  function Stocks (ops){
    Object.keys(ops).forEach(function(e,index,keys){
      this[e] = ops[e];
    },this);
  }

  Stocks.loadData = function(symbol) {
    var url = 'http://query.yahooapis.com/v1/public/yql';
    var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + symbol + '")');
    return $.getJSON(url, 'q=' + data + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env')
      .done(function (data) {
        stockData.push(data.query.results.quote);
      })
        .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ', ' + error;
          $('#result').text('Request failed: ' + err);
        });
  };

  Stocks.list = ['AAPL', 'VIAB', 'ANIK', 'IBM'];

  Stocks.load = function(){
    return Stocks.list.forEach(function(symbol){
      Stocks.loadData(symbol).done(function(){
        Stocks.data = new Stocks(stockData);
      });
    });
  };


  module.Stocks = Stocks;
})(window);
