//requirejs config
require.config({
    baseUrl: '/',
    paths: {
        'lib' : 'scripts/lib',

        'app' : 'scripts/lib/app',

        'jquery' : 'vendor/jquery/dist/jquery',
        'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap',
        'angular' : 'vendor/angular/angular',
        'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router',
        'angular-animate' : 'vendor/angular-animate/angular-animate',
        'angular-ui-notification' : 'vendor/angular-ui-notification/dist/angular-ui-notification',
        'ngStorage' : 'vendor/ngstorage/ngStorage',
        'angular-loading-bar' : 'vendor/angular-loading-bar/build/loading-bar'
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
        'angular-loading-bar' : ['angular']
    },

    deps: ['app']
});