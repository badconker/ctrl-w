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

function loadCss($nameDir){
    return gulp.src(['./src/main/css/'+$nameDir+'/'+$nameDir+'.css'])
        .pipe(concat('temp.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./src/main/css/'+$nameDir))
        .on('end', function(){
            gulp.src([
                './src/main/css/'+$nameDir+'/css'+$nameDir+'PreProcess.js',
                './src/main/css/cssWrapperStart.js',
                './src/main/css/'+$nameDir+'/temp.css',
                './src/main/css/cssWrapperEnd.js',
                './src/main/css/'+$nameDir+'/css'+$nameDir+'PostProcess.js'])
                .pipe(concat('temp.js'))
                .pipe(gulp.dest('./src/main/css/'+$nameDir));
        });
}

gulp.task('load_css', function(){

    SERVER_HOST = "https://raw.githubusercontent.com/badconker/ctrl-w/master/build";

    gulp.src(['./src/main/css/bubbles/bubbles.css'])
        .pipe(prompt.prompt({
            type: 'input',
            name: 'url',
            message: 'Ou est le serveur ? (ex: http://raw.github.com/*****)'
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
});

gulp.task('default', function() {

    fileOrder = ['./src/globalVariable.js',
        './src/functions.js',

        //INIT
        './src/main/initLang.js',
        './src/main/initData.js',
        './src/main/init.js',

        './src/main/displayMainMenu.js',
        './src/main/updateMainMenu.js',

        //CSS
        './src/main/css/initData.js',
        './src/main/css/bubbles/bubbles.js',
        './src/main/css/customMenu/customMenu.js',
        './src/main/css/ingame/ingame.js',

        //GAME
        './src/main/game/initData.js',
        './src/main/game/init.js',
        './src/main/game/clear.js',
        './src/main/game/save.js',
        './src/main/game/updateDayAndCycle.js',
        './src/main/game/updatePlayerInfos.js',

        //OPTIONS
        './src/main/options/initData.js',
        './src/main/options/init.js',
        './src/main/options/open.js',
        './src/main/options/update.js',
        './src/main/options/updateCookie.js',
        './src/main/options/updateOpt.js',

        './src/other.js'];

	gulp.src(fileOrder)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('concated.js'))
        //.pipe(uglify())
        .pipe(rename('CTRLW.mini.user.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .on('end', function(){
            gulp.src(['./src/userscript.js', 'CTRLW.mini.user.js'])
                .pipe(concat('CTRLW.mini.user.js'), {newLine: ''})
                .pipe(gulp.dest('./'))
                .pipe(gulp.dest('/home/florian/.mozilla/firefox/p53bc2t8.default/gm_scripts/CTRL+W'));
        });

});
