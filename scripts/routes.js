page('/',
  indexController.index,
  Stocks.loadQuote(Stocks.toIndexPage)
);

page('/input',
inputController.index);

page();
