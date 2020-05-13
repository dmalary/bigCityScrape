const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const citiesObj = [{
  city: 'String',
  country: 'String',
  cityUrl: 'String',
  countryUrl: 'Strin'
}];

const pagesAlpha = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

async function listScrape(page) {
  const data = [];

  for (var x = 0; x < pagesAlpha.length; x++) {
    await page.goto('https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_' + pagesAlpha[x]);

    const html = await page.content();
    const $ = cheerio.load(html);
    // TEST
    // fs.writeFileSync('./test' + pagesAlpha[i] + '.html', html);

    $('#mw-content-text > div > table > tbody > tr').each((i, el) => {
      if (i === 0) {
        return true;
      }
      const cityEl = $(el).find('td:nth-child(1) > a');
      const countryEl = $(el).find('td:nth-child(2) > a');

      const city = $(cityEl).text();
      const country = $(countryEl).text();
      const cityUrl = 'https://en.wikipedia.org' + $(cityEl).attr('href');
      const countryUrl = 'https://en.wikipedia.org' + $(countryEl).attr('href');

      const dataRow = {
        city,
        country,
        cityUrl,
        countryUrl
      };
      data.push(dataRow)
    })
    await sleep(500);
  }
  return data;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function writeFile(cityList) {
  fs.writeFile('./data.json', JSON.stringify(cityList, null, 4), (err) => {
    console.log('Write-file success');
  })
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  const cityList = await listScrape(page);
  // console.log(cityList);
  writeFile(cityList);
}
main();