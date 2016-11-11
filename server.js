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
var url1 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_';
var url2;

var pageLetter = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

var city, country;
var citiesObj = {
  city: '',
  country: ''
};

var json = [];
var file = '/data/data.json';

var reqCount = 0;
var itemCount = 0;

for (var n = 0; n < pageLetter.length; n++){
  url2 = url1 + pageLetter[n];
  // console.log(url2);
  if (n === pageLetter.length - 1){
    console.log("=== URL's generated ===")
  };

  app.get('/scrape', function(req, res){
    request(url2, function(err_r, res_r, body){
      if (err_r){
        console.log('Error: ' + err_r);
      } else if (!err_r){
        var $ = cheerio.load(body);
        console.log('=== On page: ' + $('span:has(small)').text() + ' ===');

        $('tr:has(td)').each(function(index){
          var data = $(this);
          city = data.find('a')[itemCount].children[0].data;
          country = data.find('a')[itemCount + 1].children[0].data;
          console.log(city + ' -- ' + country);
          // citiesObj.city = city;
          // citiesObj.country = country;
          // json.push(citiesObj);

          itemCount += 2;
          // reqCount++;
        });
      };

      // ==================
      // === Write File ===
      // ==================
      // jsonfile.writeFile(file, json, function(err){
      //   console.log('====================================' + '\n' +
      //   'File created!' + '\n' + 'JSON file located in project Dir' +
      //   '\n' + '====================================' );
      // });

      // ===============
      // fs.writeFile('cityPopu.json', JSON.stringify(json, null, 4), function(err){
      //   console.log('====================================' + '\n' + 'File created!' + '\n' + 'JSON file located in project Dir' + '\n' + '====================================' );
      // });
      // ===============

    }); // end of request
    res.send('=== Check terminal for status ===');
  }); // end of app.get
}; // end of pageLetter for loop

exports = exports.module = app;
