var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {

	fileOrder = [
		'./src/userscript.js',
		'./src/globalVariable.js',
		'./src/functions.js',

		//INIT
		'./src/main/initData.js',
		'./src/main/initLang.js',
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
		'./src/main/tabs/initData.js',
		'./src/main/tabs/*.js',

		//Le script commence ici
		'./src/start.js'];

	gulp.src(fileOrder)
		.pipe(concat('CTRLW.user.js'), {newLine: ''})
		.pipe(gulp.dest('./'));

});

gulp.task('watch', function() {
	gulp.watch(['./src/**/*'], ['default']);
});
