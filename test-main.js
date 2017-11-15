var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(file);
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/src',

  paths: {
    //folders
    'lib' : 'scripts/lib',
    'tests' : '../tests',

    //libraries
    'jquery' : 'vendor/jquery/dist/jquery.min',
    'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap.min',
    'angular' : 'vendor/angular/angular.min',
    'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router.min',
    'angular-animate' : 'vendor/angular-animate/angular-animate.min',
    'angular-ui-notification' : 'vendor/angular-ui-notification/dist/angular-ui-notification',
    'ngStorage' : 'vendor/ngstorage/ngStorage',
    'angular-loading-bar' : 'vendor/angular-loading-bar/build/loading-bar',

    'angular-mocks' : '../node_modules/angular-mocks/angular-mocks'

    //app files

    
  },

  shim: {
    'angular': {
        deps : ['jquery'],
        exports: 'angular'
    },
    'jquery' : {
        exports: '$'
    },
    'bootstrap' : ['jquery'],
    'angular-ui-router' : ['angular'],
    'angular-mocks' : ['angular', 'angular-ui-router']
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
