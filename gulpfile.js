var gulp = require('gulp'),
    frep = require('gulp-frep'),
    del = require('del'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');
    less = require('gulp-less');
    requirejs = require('requirejs');

var paths = {
    css: [
        "tmp/vendor/bootstrap/dist/css/bootstrap.min.css",
        "tmp/styles/**/*.css"
    ],
    less: [
        'tmp/styles/less/**/*.less'
    ]
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
//replace the require.js reference and the Bootstrap CSS reference in HTML
gulp.task('buildhtml', ['buildrequire'], function(){
    return gulp.src('tmp/index.html')
    .pipe(frep([{
        pattern: '/vendor/requirejs/require.js',
        replacement: '/scripts/lib/require.js'
    }]))
    .pipe(gulp.dest('tmp/'));
});

//process the less files
gulp.task('buildless', ['buildcore'], function(){
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(concat('appLESS.css'))
        .pipe(gulp.dest('tmp/styles/'));
});

//minify/concat all of the css files (custom, bootstrap...) into one file
gulp.task('buildcss', ['buildless'], function(){
    return gulp.src(paths.css)
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('tmp/styles/'));
});

//...delete all other css/less files
gulp.task('deletecssless', ['buildcss'], function(){
    del(['tmp/styles/*.css', '!tmp/styles/styles.css']);
    del('tmp/styles/less/**/*');
});


//copy the necessary fontawesome files

//minify js

//TODO karma-jasmine unit tests

//remove the vendor folder


gulp.task('build', ['buildcore', 'buildrequire', 'buildhtml', 'buildless', 'buildcss', 'deletecssless'], function(){});