(function(module){
  'use strict';
  var stockData = [];
  Stocks.data = [];
  var doneWithRender;

  function Stocks (ops){
    Object.keys(ops).forEach(function(e,index,keys){
      this[e] = ops[e];
    },this);
    doneWithRender = true;
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
    navigateHelp();
  };

  function navigateHelp () {
    $('.aside-symbol').on('click',function(){
      $('html, body').animate({ scrollTop: $('#' + this.innerText).offset().top});
    });
    $('.to-the-top').on('click',function(){
      $('body').scrollTop(0);
    });
  }

  Stocks.sortBy = function(sortBy){
    Stocks.data = Stocks.data.sort(function(a,b){
      if(sortBy === 'percent-change'){
        return (parseFloat(b.PercentChange) - parseFloat(a.PercentChange));
      } else if (sortBy === 'biggest-movers'){
        return (Math.abs(parseFloat(b.PercentChange)) - Math.abs(parseFloat(a.PercentChange)));
      } else if (sortBy === 'div-yield') {
        if(!a.DividendYield) {
          a.DividendYield = '0.00';
        } else if (!b.DividendYield) {
          b.DividendYield = '0.00';
        }
        return (parseFloat(b.DividendYield) - parseFloat(a.DividendYield));
      } else if (sortBy ==='price-earnings') {
        if(!a.PERatio){
          a.temp = 100000;
        } else {a.temp = parseFloat(a.PERatio);}
        if(!b.PERatio){
          b.temp = 100000;
        } else {b.temp = parseFloat(b.PERatio);}
        return (a.temp - b.temp);
      } else {
        if (a.symbol < b.symbol){
          return -1;
        };
      }
    });
    $('#stock-data').empty();
    $('#detailed-data').empty();
    Stocks.toIndexPage();
  };

  $('.sort-options').on('click',function(){
    Stocks.sortBy(this.id);
  });

  Stocks.SingleSymbol = false;
  Stocks.singledata =[];

  $('.single-symbol-input').on('click', function(e){
    $('.single-symbol-input').val('');
  });

  $('#single-symbol').on('submit', function(e){
    e.preventDefault();
    $('.blur').css('-webkit-filter', 'blur(5px)');
    $('#single-symbol').css('-webkit-filter', 'blur(0px)');
    $('#single-stock').fadeIn(650);
    Stocks.SingleSymbol = $('.single-symbol-input').val().toUpperCase();
    Stocks.Single(Stocks.toSinglePage);
    $('.single-symbol-input').val('Enter Symbol');
    $('#single-symbol-input').autocomplete('close');
  });

  Stocks.toSinglePage = function(){
    $('#single-stock').append('<img id="close-single-page" src="img/close.png">');
    Stocks.singledata.forEach(function(a){
      $('#single-stock').append(a.toHtml('#detailed-data-template'));
    });
    Stocks.closeSingle();
  };

  Stocks.closeSingle = function(){
    $('#close-single-page').on('click', function(){
      $('#single-stock').hide().empty();
      $('.blur').css('-webkit-filter', 'blur(0px)');
    });
  };


  Stocks.Single = function(fn) {
    Stocks.loadData(Stocks.SingleSymbol).done(function(){
      Stocks.singledata = stockData.map(function(ele){
        return new Stocks(ele);
      });
      fn();
    });
  };


  module.Stocks = Stocks;
})(window);
