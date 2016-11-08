// ====================
// === Server setup ===
// ====================
var express   = require('express'),
    fs        = require('fs'),
    request   = require('request'),
    cheerio   = require('cheerio'),
    CronJob   = require('cron').CronJob;

var app = express();

var port prcoess.env.PORT || 8081;
app.listen(port);
console.log('Silence please...' + '\n' + 'Curtains up...' + '\n' + 'Server started on: ' + port);

// ================
// === Cron Job ===
// ================
// var job = new CronJob({
//   cronTime: '',
//   onTick: function() {
//     var r = request('http://127.0.0.1:8081/scrape', function(error, response, body){
//       console.log('==================' + '\n' + 'Scrapper running' + '\n' + '==================');
//     });
//   },
//   start: true
// });


// ===============
// === Scraper ===
// ===============
app.get('scrape', function(req, res){
  var url = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_'

  var pageLetter = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

  
});

exports = exports.module = app;
