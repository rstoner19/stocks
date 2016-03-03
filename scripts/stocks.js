(function(module){
  'use strict';
  var stockData = [];

  Stocks.data = [];
  function Stocks (ops){
    Object.keys(ops).forEach(function(e,index,keys){
      if(ops[e]!== null){
        this[e] = ops[e];
      }
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

  Stocks.loadQuote = function(fn){
    return Stocks.list.forEach(function(symbol){
      Stocks.loadData(symbol).done(function(){
        Stocks.data = stockData.map(function(ele){
          return new Stocks(ele);
        });
      });
    });
  };

  Stocks.prototype.toHtml = function(id){
    var template = Handlebars.compile($(id).text());
    return template(this);
  };

  Stocks.toIndexPage = function(){
    console.log('running');
    Stocks.data.forEach(function(a){
      $('#stock-data').append(a.toHtml('#stock-data-template'));
    });
  };


  module.Stocks = Stocks;
})(window);
