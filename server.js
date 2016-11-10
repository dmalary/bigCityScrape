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
  var url2;

  var pageLetter = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

  var city, country;
  var cities = {
    city: '',
    country: ''
  };

  var count = 0;
  var json = [];


  for (var n = 0; n < pageLetter.length; n++){
    url2 = url1 + pageLetter.n;

    request(url2, function(err, res, body){
      if (err){
        console.log('Error' + err);
      } else if (!err){
        var $ = cheerio.load(body);
        console.log('On page:' $('span:has(small)').text())

        $('').each(function(index){
          var data = $(this);


        });
      };
    )}; // end of request
  }; // end of pageLetter for loop
}); // end of app.get

exports = exports.module = app;
