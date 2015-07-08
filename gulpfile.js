var gulp = require('gulp');
var compass = require( 'gulp-simple-compass' );
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var replace = require('gulp-replace');
var prompt = require('gulp-prompt');

var SERVER_HOST = "http://florianperrot.github.io/";

gulp.task('load_css', function(){

    gulp.src(['./src/main/css/bubbles/bubbles.css'])
        .pipe(prompt.prompt({
            type: 'input',
            name: 'url',
            message: 'Ou est le serveur ? (ex: http://username.github.io/ctrl-w)'
        }, function(result){
            if(result.url != ""){
                SERVER_HOST = result.url;
            }
        }))
        .on('end', function(){
            gulp.src(['./src/main/css/bubbles/bubbles.css'])
                .pipe(replace('{{ SERVER_HOST }}', SERVER_HOST))
                .pipe(uglifycss())
                .pipe(gulp.dest('./build/css'));
        });

    gulp.src(['./src/main/css/ingame/ingame.css'])
        .pipe(uglifycss())
        .pipe(gulp.dest('./build/css'));

    gulp.src(['./src/main/css/customMenu/customMenu.css'])
        .pipe(uglifycss())
        .pipe(gulp.dest('./build/css'));

    gulp.src(['./src/main/css/ranking/ranking.css'])
        .pipe(uglifycss())
        .pipe(gulp.dest('./build/css'));
});

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
        './src/main/css/**/*.js',

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
        //.pipe(uglify())
        .pipe(rename('CTRLW.mini.user.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .on('end', function(){
            gulp.src(['./src/userscript.js', 'CTRLW.mini.user.js'])
                .pipe(concat('CTRLW.mini.user.js'), {newLine: ''})
                .pipe(gulp.dest('./'))
                .pipe(rename('CTRLW.user.js'))
                .pipe(gulp.dest('/home/florian/.mozilla/firefox/p53bc2t8.default/gm_scripts/CTRL+W'));
        });

});
