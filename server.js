const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const citiesObj = {
  city: 'String',
  country: 'String',
  cityUrl: 'String',
  countryUrl: 'Strin'
};

const pagesAlpha = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

var url1 = 'https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_';

async function listScrape() {

}

async function main() {
  const browser = await puppeteer.launch({
    headless.false
  });
  const page = await browser.newPage();

  const cityList = await listScrape(page);
  console.log(cityList);
}


