// ====================
// === Server setup ===
// ====================
var express   = require('express'),
    fs        = require('fs'),
    request   = require('request'),
    cheerio   = require('cheerio'),
    // CronJob   = require('cron').CronJob,
    jsonfile  = require('jsonfile');

var app = express();

var port = process.env.PORT || 8081;
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
app.get('/scrape', function(req, res){
  var url1 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_';
  var url2;

  var pageLetter = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

  var city, country;
  var citiesObj = {
    city: '',
    country: ''
  };

  var json = [];
  var file = '/tmp/data.json';

  var reqCount = 0;
  var itemCount = 0;

  for (var n = 0; n < pageLetter.length; n++){
    url2 = url1 + pageLetter[n];

    request(url2, function(err, res, body){
      if (err){
        console.log('Error: ' + err);
      } else if (!err){
        var $ = cheerio.load(body);
        console.log('On page: ' + $('span:has(small)').text())

        $('tr:has(td)').each(function(index){
          var data = $(this);

          city = data.find('a')[itemCount];
          country = data.find('a')[itemCount + 1];
          citiesObj.city = city;
          citiesObj.country = country;
          json.push(citiesObj);

          itemCount += 2;
          // reqCount++;
        });
      };

      jsonfile.writeFile(file, json, function(err){
        console.log('====================================' + '\n' +
        'File created!' + '\n' + 'JSON file located in project Dir' +
        '\n' + '====================================' );
      });
      // ===============
      // fs.writeFile('cityPopu.json', JSON.stringify(json, null, 4), function(err){
      //   console.log('====================================' + '\n' + 'File created!' + '\n' + 'JSON file located in project Dir' + '\n' + '====================================' );
      // });
      // ===============

      res.send('Check console for status');
    }); // end of request
  }; // end of pageLetter for loop
}); // end of app.get

exports = exports.module = app;
