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
var alphaArr = [];
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
  // console.log(json);
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
    request(url2, function(err_r, res_r, body){
      if (err_r){
        console.log('Error: ' + err_r);
      } else if (!err_r){
        var $ = cheerio.load(body);
        console.log('=== On page: ' + $('span:has(small)').text());

        $('tr:has(td)').each(function(){
          var data = $(this);
          var city, country, refLink, alpha, pageData;
          var citiesObj = {
            city: '',
            country: '',
            refLink: ''
          };
          var alphaObj = {
            alpha: pageData
          };

          // console.log(data.find('a'))
          city = data.find('a')[0].children[0].data;
          country = data.find('a')[1].children[0].data;
          // refLink = data.find('a').attribs.href.data;
          // console.log(city + ' -- ' + country);
          if (city == 'Zakopane'){
            console.log('=== Data Scraped');
          };

          citiesObj.city = city;
          citiesObj.country = country;
          alpha = $('span:has(small)').text();
          pageData = citiesObj;
          // console.log(citiesObj.city + ' ++ ' + citiesObj.country);
          // console.log(citiesObj);
          // json.push(citiesObj);
          alphaArr.push(alphaObj);
          json.push(alphaArr);
          // console.log(json);
        });
      };

      dataWrite();
      // fs.writeFile('data.json', JSON.stringify(json, null, 4), function(err){
      //   console.log('### File created >>> JSON file located in project directory');
      // });

    }); // end of request
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
    for (var n = 0; n < pageLetter.length; n++){
      url2 = url1 + pageLetter[n];
      // console.log(url2);
      urlCheck(n);

      if (urlCheck == true){
        console.log('=== Running Scrape');
        scrape(url2);
        connect();
      } else if (urlCheck == false){
        console.log('=== URL LOAD FAILED!')
      };
    };
  };
});


// NEXT FEATURES:
    // ==================
    // if (json.length > 3){
    //   dataWrite();
    // } else {
    //   console.log('=== INSUFFICIENT DATA!');
    // };
    // ==================
