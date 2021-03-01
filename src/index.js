require('./utils/initExpress')();
// initMongoose will give error as of Feb 19, as mongo version is ahead of mongoose, the client.
require('./utils/initMongoose')();
require('./controllers/scraper/initScraper')();
// require('./utils/initScraper')();
