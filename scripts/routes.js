page('/',
  indexController.index,
  Stocks.loadQuote(Stocks.toIndexPage)  
);

page('/about');

page();
