page('/',
  indexController.index,
  Stocks.loadLocal(),
  Stocks.loadQuote(Stocks.toIndexPage)
);

page('/input',
inputController.index,
Stocks.loadLocal(),
Stocks.toInputPage()
);

page();
