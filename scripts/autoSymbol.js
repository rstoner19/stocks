(function(module){
  var AutoComplete =[];
  AutoComplete.symbols = [];
  AutoComplete.loadSymbol = function() {
    var data1;
    var data2;
    $.getJSON('data/nasdaq.json')
      .done(function(data) {
        data1 = data.map(function(a){
          return a.Symbol;
        });
      });
    $.getJSON('data/nyse.json')
      .done(function(data) {
        data2 = data.map(function(a){
          return a.Symbol;
        });
        AutoComplete.symbols = data1.concat(data2);
        $('#single-symbol-input').autocomplete({
          source: AutoComplete.symbols
        });
        $('#prefillSymbol').autocomplete({
          source: AutoComplete.symbols
        });
      });
  };


  module.AutoComplete = AutoComplete;
}(window));
