(function(module){
  'use strict';
  var stockData = [];

  function Stocks (ops){
    Object.keys(ops).forEach(function(e,index,keys){
      if(ops[e]!== null){
        this[e] = ops[e];
      }
    },this);
  }

  Stocks.loadData = function(symbol) {
    stockData = [];
    var url = 'https://query.yahooapis.com/v1/public/yql';
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

  Stocks.loadQuote = function(fn){
    Stocks.list = Stocks.userList.join(',');
    console.log('loadQuote running');
    Stocks.loadData(Stocks.list).done(function(){
      Stocks.data = stockData[0].map(function(ele){
        return new Stocks(ele);
      });
      fn();
    });
  };

  Stocks.prototype.toHtml = function(id){
    var template = Handlebars.compile($(id).text());
    if(this.LastTradePriceOnly){
      this.LastTradePriceOnly = Number(this.LastTradePriceOnly).toFixed(2);
      this.Change = Number(this.Change).toFixed(2);
    }
    if(this.Change>0){
      this.movement = 'up';
    } else if (this.Change<0){
      this.movement = 'down';
    }
    return template(this);
  };

  Stocks.toIndexPage = function(){
    Stocks.data.forEach(function(a){
      $('#stock-data').append(a.toHtml('#stock-data-template'));
      $('#detailed-data').append(a.toHtml('#detailed-data-template'));
    });
  };

  module.Stocks = Stocks;
})(window);
