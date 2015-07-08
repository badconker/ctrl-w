var gulp = require('gulp');
var compass = require( 'gulp-simple-compass' );
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var prompt = require('gulp-prompt');

gulp.task('default', function() {

    fileOrder = ['./src/globalVariable.js',
        './src/functions.js',

        //INIT
        './src/main/initLang.js',
        './src/main/initData.js',
        './src/main/init.js',

        './src/main/*.js',

        //UTILS
        './src/main/utils/*.js',

        //CSS
        './src/main/css/initData.js',
        './src/main/css/*.js',

        //GAME
        './src/main/game/initData.js',
        './src/main/game/init.js',
        './src/main/game/*.js',

        //OPTIONS
        './src/main/options/initData.js',
        './src/main/options/init.js',
        './src/main/options/*.js',

        //TABS
        './src/main/tabs/init.js',
        './src/main/tabs/*.js',

        //Le script commence ici
        './src/start.js'];

	gulp.src(fileOrder)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('concated.js'))
        .pipe(replace('{{ SERVER_HOST }}', SERVER_HOST))
        .pipe(uglify())
        .pipe(rename('CTRLW.mini.user.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .on('end', function(){
            gulp.src(['./src/userscript.js', 'CTRLW.mini.user.js'])
                .pipe(concat('CTRLW.mini.user.js'), {newLine: ''})
                .pipe(gulp.dest('./'));
        });

});
