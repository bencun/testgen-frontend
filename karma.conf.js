// Karma configuration
// Generated on Fri Nov 03 2017 12:50:51 GMT+0100 (Central Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test-main.js',
      //vendor files
      {pattern : 'src/vendor/jquery/dist/jquery.js', included : false},
      {pattern : 'src/vendor/bootstrap/dist/js/bootstrap.js', included : false},
      {pattern : 'src/vendor/angular/angular.js', included : false},
      {pattern : 'node_modules/angular-mocks/angular-mocks.js', included : false},
      {pattern : 'src/vendor/angular-ui-router/release/angular-ui-router.js', included : false},
      {pattern : 'src/vendor/angular-animate/angular-animate.js', included: false},
      {pattern : 'src/vendor/angular-ui-notification/dist/angular-ui-notification.js', included : false},
      {pattern : 'src/vendor/ngstorage/ngStorage.js', included : false},
      {pattern : 'src/vendor/angular-loading-bar/build/loading-bar.js', included : false},

      //application files
      {pattern : 'src/scripts/lib/appVendorLibs.js', included: false},
      //{pattern : 'src/scripts/lib/appBootstrap.js', included: false},
      {pattern : 'src/scripts/lib/appModule.js', included: false},
      {pattern : 'src/scripts/lib/**/*.js', included: false},
      {pattern : 'src/scripts/lib/*.js', included: false},
      {pattern : 'src/scripts/**/*.js', included: false},

      //tests
      {pattern : 'tests/**/*.js', included: false},
    ],


    // list of files to exclude
    exclude: [
      'src/scripts/lib/appBootstrap.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/scripts/lib/**/*.js' : ['coverage'],
      'src/scripts/**/*.js' : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter : {
      type: 'html',
      dir: 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
