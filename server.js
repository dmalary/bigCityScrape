// ====================
// === Server setup ===
// ====================
var express       = require('express'),
    fs            = require('fs'),
    request       = require('request'),
    cheerio       = require('cheerio'),
    jsonfile      = require('jsonfile'),
    prompt        = require('prompt'),
    Progressbar   = require('progress');

var app = express();

prompt.start();
prompt.message = '';
prompt.delimiter = '';
prompt.colors = false;

var port = process.env.PORT || 8081;
app.listen(port);
console.log('Silence please...' + '\n' + 'Curtains up...' + '\n' + 'Server started on: ' + port);

// =================
// === Variables ===
// =================
var url1 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_';
var url2;
var url3 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_A';
var urlCheck = false;

var pageLetter = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

// var city, country, refLink;
// var citiesObj = {
//   city: '',
//   country: '',
//   refLink: ''
// };

var json = [];
var file = '/data/data.json';

var schema = {
  properties: {
    confirm: {
      pattern: /^(yes|no|y|n)$/gi,
      description: 'Do you want to continue?',
      message: '(Y/N))',
      required: true,
      default: 'N'
    }
  }
};

// =================
// === Functions ===
// =================

// === URL Check ===
var urlCheck = function(n){
  if (n === pageLetter.length - 1){
    console.log("=== Scraper URL's generated");
    urlCheck = true;
    return urlCheck;
  };
};

// === Connect to localhost ===
var connect = function(){
  request('http://localhost:8081/scrape', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('=== Connected to http://localhost:8081/scrape');
    };
  });
};

// === Write File ===
var dataWrite = function(){
  // jsonfile.writeFile(file, json, function(err){
  //   console.log('=====================================' + '\n' +
  //   'File created!' + '\n' + 'JSON file located in: ' + file +
  //   '\n' + '=====================================');
  // });
  // ===============
  fs.writeFile('data.json', JSON.stringify(json, null, 4), function(err){
    console.log('### File created >>> JSON file located in project directory');
  });
  // ===============
};

// === Scraper ===
var scrape = function(){
  app.get('/scrape', function(req, res){
    request(url2, (function(n) { return function(err_r, res_r, body){
      if (err_r){
        console.log('Error: ' + err_r);
      } else if (!err_r){
        var $ = cheerio.load(body);
        console.log('=== On page: ' + $('span:has(small)').text());

        $('tr:has(td)').each(function(){
          var data = $(this);
          var city, country, refLink;
          var citiesObj = {
            city: '',
            country: '',
            refLink: ''
          };
          var alpha = {
            n: citiesObj
          };
          // console.log(data.find('a'));

          city = data.find('a')[0].children[0].data;
          country = data.find('a')[1].children[0].data;
          refLink = data.find('a')[1].attribs.href;
          // console.log(city + ' -- ' + country + ' -- ' + refLink);
          // if (city == 'Zakopane'){
          //   console.log('=== Data Scraped');
          // };

          citiesObj.city = city;
          citiesObj.country = country;
          citiesObj.refLink = refLink;
          alpha.n = citiesObj;
          // console.log(citiesObj);
          json.push(alpha);
          // console.log(json);
        });
      };

      if (json.length > 10){
        dataWrite();
      } else {
        console.log('=== INSUFFICIENT DATA!');
      };

    }})(n)); // end of request
    res.send('Check terminal for status');
  }); // end of app.get
}; // end of scrape()

exports = exports.module = app;

// ==================
// === Script Run ===
// ==================
prompt.get(schema, function(err, result){
  var r = result.confirm.toLowerCase();

  if (r != 'y' && r != 'yes'){
    console.log('=== SCRAPE CANCELLED!');
    return;
  } else {
    console.log('=== Initializing');

    for (n = 0; n < pageLetter.length; n++){
      url2 = url1 + pageLetter[n];
      // console.log(url2)
      scrape(url2, n);
      connect();
    };
  }
});


// NEXT FEATURES:
