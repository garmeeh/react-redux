import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console*/
fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate stylesheet is only used for the production build we need
  // to dynamically add it here
  $('head').prepend('<link rel="stylesheet" href="styles.css"></link>');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});