page('/',
  controller.homepage
);

page('/input',
inputController.index,
Stocks.loadLocal(),
Stocks.toInputPage()
);

page();
