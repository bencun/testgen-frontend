var gulp = require('gulp'),
    frep = require('gulp-frep'),
    del = require('del'),
    requirejs = require('requirejs');

var paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcCSS: 'src/**/*.css',
    srcJS: 'src/**/*.js',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpHTML: 'tmp/**/*.html',
    tmpCSS: 'tmp/**/*.css',
    tmpJS: 'tmp/**/*.js',

    dist: 'dist',
    distIndex: 'dist/index.html',
    distHTML: 'dist/**/*.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
};

//pipe all of the html files
/*gulp.task('html', function(){
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmpHTML));
});*/


//first build task using requirejs
gulp.task('buildcore', function(cb){
	requirejs.optimize({
		mainConfigFile: 'src/scripts/lib/appBootstrap.js',
		baseUrl: 'src/',
		deps: null,
		removeCombined: true,
		findNestedDependencies: true,
		optimizeCss: 'none',
		dir: 'tmp/',
		uglify: {
			// needed as angular libs explode with mangled var/func
			no_mangle: true
        },
        modules: [
			{
				name: 'lib/appBootstrap',
				exclude: [
					'lib/appVendorLibs',
                ],
                include: [
                    'lib/appModule'
                ]
            },
            {
                name: 'lib/appVendorLibs'
            }
		]
	}, function(buildResponse){
		console.log('build response', buildResponse);
		cb();
	}, cb);
});

//copy the require.js library
gulp.task('buildrequire', ['buildcore'], function(){
    return gulp.src('tmp/vendor/requirejs/require.js')
    .pipe(gulp.dest('tmp/scripts/lib/'));
});
//replace require.js reference in HTML
gulp.task('buildhtml', ['buildrequire'], function(){
    return gulp.src('tmp/index.html')
    .pipe(frep([{
        pattern: '/vendor/requirejs/require.js',
        replacement: '/scripts/lib/require.js'
    }]))
    .pipe(gulp.dest('tmp/'));
});

//replace vendor lib references

gulp.task('build', ['buildcore', 'buildrequire', 'buildhtml'], function(){});