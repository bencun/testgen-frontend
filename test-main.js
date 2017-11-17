var allTestFiles = []
var TEST_REGEXP = /(spec)\.js$/i

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
    
    //libraries
    'jquery' : 'vendor/jquery/dist/jquery',
    'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap',
    'angular' : 'vendor/angular/angular',
    'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router',
    'angular-animate' : 'vendor/angular-animate/angular-animate',
    'angular-ui-notification' : 'vendor/angular-ui-notification/dist/angular-ui-notification',
    'ngStorage' : 'vendor/ngstorage/ngStorage',
    'angular-loading-bar' : 'vendor/angular-loading-bar/build/loading-bar',
    
    'angular-mocks' : '../node_modules/angular-mocks/angular-mocks',
    
    //folders
    'lib' : 'scripts/lib',
    'tests' : '../tests'
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
    'angular-animate' : ['angular'],
    'angular-ui-notification' : ['angular'],
    'ngStorage' : ['angular'],
    'angular-loading-bar' : ['angular'],
    'angular-mocks' : ['angular']
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
