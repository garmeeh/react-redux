// Weback node api ->  https://webpack.github.io/docs/node.js-api.html
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConifg from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; 

console.log('Generating minified bundle for production via Webpack. This will take a moment...'.blue);

webpack(webpackConifg)
  .run((err, stats) => {
    if (err) {
      console.log(err.bold.red);
      return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
      return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
      console.log('Webpack generated the following warnings: '.bold.yellow);
      jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack Stats: ${stats}`);

    console.log('App compiled in production mode and written to /dist. Ready To Go!'.bold.green);
    return 0;
  });