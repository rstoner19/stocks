'use strict';

Stocks.data = [];
function Stocks (ops){
  Object.keys(ops).forEach(function(e,index,keys){
    this[e] = ops[e];
  },this);
}

Stocks.getData = function(symbol) {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
          console.log(data.query.results.quote)
        return data.query.results.quote
    })
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
            $("#result").text('Request failed: ' + err);
    });
}

Stocks.list = ['AAPL', 'VIAB', 'ANIK', 'IBM'];

Stocks.load = function(){
  Stocks.list.forEach(function(symbol){
    console.log(Stocks.getData(symbol))
    return Stocks.getData(symbol);
  })
}
