var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

//requirejs config
require.config({
    baseUrl: '/base/src',
    paths: {
        'lib' : 'scripts/lib',
        'tests' : '../tests',

        'jquery' : 'vendor/jquery/dist/jquery.min',
        'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap.min',
        'angular' : 'vendor/angular/angular.min',
        'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router.min',

        'angular-mocks' : '../node_modules/angular-mocks/angular-mocks'
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
        'angular-mocks' : ['angular']
    },

    deps: tests
});