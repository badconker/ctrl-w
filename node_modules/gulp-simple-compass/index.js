'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    PluginError = gutil.PluginError,
    command = ['exec', 'compass'],
    PLUGIN_NAME = 'gulp-simple-compass';

module.exports = function (options) {
  var compile = function (file, encoding, cb) {
    var compass,
        stdout = '',
        stderr = '';

    if (file.isNull()) {
      // this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error',
        new gutil.PluginError({
          plugin: PLUGIN_NAME,
          message: 'Stream content is not supported'
        }));
      return cb();
    }

    command = ['exec', 'compass'];
    //////////////////////////////
    // Compass Options
    //////////////////////////////
    options = options || {};

    // Grab arguments
    process.argv.forEach(function (val, index, array) {
      if (index >= 3) {
        if (val === '--environment' || val === '--env') {
          if (array[index + 1] === undefined) {
            if (options.failOnError) {
              return cb(new gutil.PluginError({
                plugin: PLUGIN_NAME,
                message: 'Environment flag must me followed by an environment name'
              }));
            }
            else {
              gutil.log(gutil.colors.red('[Error] ') + 'Environment flag must me followed by an environment name');
            }
          }
        }
        else if (val === '--force') {
          options.force = true;
        }
        else if (val === '--time') {
          options.time = true;
        }
        else if (val === '--watch') {
          options.watch = true;
        }
        else if (val === '--fail') {
          options.failOnError = true;
        }
        else if (val === '--poll') {
          options.poll = true;
        }
      }
    });

    // Watch or Compile
    command.push(options.watch ? 'watch' : 'compile');
    if (options.watch) {
      command.push(options.poll ? '--poll' : '');
    }
    // command.push(options.watch ? '' : file.path.replace(process.cwd() + '/patterns', ''));
    // Environment
    command.push(options.env ? '--environment ' + options.env : '');
    // Force
    command.push(options.force ? '--force' : '');
    // Compile Time
    command.push(options.time ? '--time' : '');

    // Remove all empty string options
    command = command.filter(function(n){ return n !== '' });

    //////////////////////////////
    // Spawn Compass
    //////////////////////////////
    compass = spawn('bundle', command);

    compass.stdout.setEncoding('utf8');

    // Output messages
    compass.stdout.on('data', function (data) {
      stdout = '';
      stdout += data;
      stdout = stdout.replace(/\n/g, '');
      console.log(stdout);
    });

    // Output error
    compass.stderr.on('data', function (data) {
      stderr = '';
      stderr += data;
      stderr = stderr.replace(/\n/g, '');
      stderr = '\n' + stderr;
      if (options.failOnError) {
        return cb(new gutil.PluginError({
          plugin: PLUGIN_NAME,
          message: stderr
        }));
      }
      else {
        if (stderr !== '\n') {
          console.log(stderr);
        }
      }
    });

    compass.on('close', function (code, signal) {
      // this.push(file);
      return cb();
    });
  }

  return through.obj(compile);
}
