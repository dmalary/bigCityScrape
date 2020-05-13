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

async function listScrape() {
  const data = []

  for (var i = 0; i < pagesAlpha.length; i++) {
    await page.goto('https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_' + pagesAlpha[i]);

    const html = await page.content();
    const $ = cheerio.load(html);

    $('#mw-content-text > div > table > tbody > tr').each((i, el) => {
      const cityEl = $(el).find('');
      const countryEl = $(el).find('');
      const cityUrlEl = $(el).find('');
      const countryUrlEl = $(el).find('');

      const city = $(cityEl).;
      const country = $(countryEl).;
      const cityUrl = $(cityUrlEl).;
      const countryUrl = $(countryUrlEl).;

      const dataRow = {
        city,
        country,
        cityUrl,
        countryUrl
      };
    })
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  const cityList = await listScrape(page);
  console.log(cityList);
}