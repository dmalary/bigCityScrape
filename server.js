// ====================
// === Server setup ===
// ====================
var express   = require('express'),
    fs        = require('fs'),
    request   = require('request'),
    cheerio   = require('cheerio'),
    // CronJob   = require('cron').CronJob,
    jsonfile  = require('jsonfile'),
    prompt     = require('prompt');

var app = express();
prompt.start();

var port = process.env.PORT || 8081;
app.listen(port);
console.log('Silence please...' + '\n' + 'Curtains up...' + '\n' + 'Server started on: ' + port);

// =================
// === Variables ===
// =================
var url1 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_';
var url2;

var pageLetter = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

var city, country, refLink;
var citiesObj = {
  city: '',
  country: '',
  refLink: ''
};

var json = [];
var file = '/data/data.json';

var scrapeRun       = 'Run scraper? (Y/N)',
    scrapeContinue  = 'Continue scraper? (Y/N)';

// =================
// === Functions ===
// =================

// === URL Check ===
var urlCheck = function(){
  if (n === pageLetter.length - 1){
    console.log("=== Scraper URL's generated ===")
  };
};

// === Write File ===
var dataWrite = function(){
  jsonfile.writeFile(file, json, function(err){
    console.log('=====================================' + '\n' +
    'File created!' + '\n' + 'JSON file located in: ' + file +
    '\n' + '=====================================');
  });
  // ===============
  // fs.writeFile('cityPopu.json', JSON.stringify(json, null, 4), function(err){
  //   console.log('====================================' + '\n' + 'File created!' + '\n' + 'JSON file located in project Dir' + '\n' + '====================================' );
  // });
  // ===============
};

// === Cron Job ===
// var job = new CronJob({
//   cronTime: '',
//   onTick: function() {
//     var r = request('http://127.0.0.1:8081/scrape', function(error, response, body){
//       console.log('==================' + '\n' + 'Scrapper running' + '\n' + '==================');
//     });
//   },
//   start: true
// });

// === Scraper ===
var scrape = function(){
  app.get('/scrape', function(req, res){
    request(url2, function(err_r, res_r, body){
      if (err_r){
        console.log('Error: ' + err_r);
      } else if (!err_r){
        var $ = cheerio.load(body);
        console.log('=== On page: ' + $('span:has(small)').text() + ' ===');

        $('tr:has(td)').each(function(){
          var data = $(this);
          // console.log(data.find('a'))

          city = data.find('a')[0].children[0].data;
          country = data.find('a')[1].children[0].data;
          // refLink = data.find('a').attribs.href.data;
          // console.log(city + ' -- ' + country);
          if (city == 'Zakopane'){
            console.log('=== Data located ===');
          };

          citiesObj.city = city;
          citiesObj.country = country;
          json.push(citiesObj);
        });
      };

      console.log(citiesObj);
      dataWrite();

    }); // end of request
    res.send('Check terminal for status');
  }); // end of app.get
}; // end of scrape()

exports = exports.module = app;

// ==================
// === Script Run ===
// ==================
prompt.get([scrapeRun], function(err, result){
  if (result.scrapeRun === 'Y' || 'y') {
    for (var n = 0; n < pageLetter.length; n++){
      url2 = url1 + pageLetter[n];
      // console.log(url2);
      if (n > 0){
        prompt.get([scrapeContinue], function(err, result){
          if (result.scrapeContinue === 'Y' || 'y') {
            urlCheck();
            scrape();
          } else {
            console.log('Scrape cancelled.');
          };
        };
      } else {
        urlCheck();
        scrape();
      };
    };
  } else {
    console.log('Scrape cancelled.');
  };
});
