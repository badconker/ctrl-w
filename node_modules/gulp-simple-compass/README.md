# gulp-simple-compass
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> A simple [Compass](http://compass-style.org/) plugin for [gulp](https://github.com/wearefractal/gulp)

Simple Compass is a simple Gulp task for running Compass. It's opinionated and only allows you to configure a handful of things. If you want something more configurable, look at [gulp-compass](https://www.npmjs.org/package/gulp-compass).

## Requirements

Install [Bundler](http://bundler.io/) and make sure your [Gemfile](http://bundler.io/gemfile.html) includes Compass. Also make sure your gems are installed. I recommend running `bundle install --path vendor` to install them to a vendor folder local to your current project. All Simple Compass commands are run through Bundler. Yes, you must use Bundler.

Simple Compass relies on Compass' [`config.rb`](http://compass-style.org/help/documentation/configuration-reference/) for configuring. It is expecting this file to be at the same level as your `Gulpfile.js`. No, you cannot configure this.

## Usage

First, install `gulp-simple-compass` as a development dependency:

```shell
npm install --save-dev gulp-simple-compass
```

Then, add it to your `gulpfile.js`:

```javascript
var compass = require('gulp-simple-compass');

gulp.src('./sass/**/*.scss')
	.pipe(compass());
```

## Configuration

### compass(options)

Options are optional.

#### options.watch
Type: `Boolean`
Flag: `--watch`
Default: `false`

Whether you would like to run `compass watch`. If set to `false`, will run `compass compile`

#### options.poll
Type: `Boolean`
Flag: `--poll`
Default: `false`

Whether you would like to poll for changes while using `--watch`

#### options.environment
Type: `Boolean`
Flag: `--environment name` or `--env name`
Default: `':development'`

The environment you would like to run against.

#### options.force
Type: `Boolean`
Flag: `--force`
Default: `false`

Whether you would like to force a compilation to take place


#### options.time
Type: `Boolean`
Flag: `--time`
Default: `false`

Whether you would like Compass to return the amount of time it's taken to run the compile

#### options.failOnError
Type: `Boolean`
Flag: `--fail`
Default: `false`

Whether you would like the plugin to break the process on an error



## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-simple-compass
[npm-image]: https://badge.fury.io/js/gulp-simple-compass.png

[travis-url]: http://travis-ci.org/Snugug/gulp-simple-compass
[travis-image]: https://secure.travis-ci.org/Snugug/gulp-simple-compass.png?branch=master

[coveralls-url]: https://coveralls.io/r/Snugug/gulp-simple-compass
[coveralls-image]: https://coveralls.io/repos/Snugug/gulp-simple-compass/badge.png

[depstat-url]: https://david-dm.org/Snugug/gulp-simple-compass
[depstat-image]: https://david-dm.org/Snugug/gulp-simple-compass.png
