//requirejs config
require.config({
    baseUrl: '/',
    paths: {
        //'appVendorLibs' : 'lib/appVendorLibs',
        //'appBootstrap' : 'lib/appBootstrap',
        //'appModule' : 'lib/appModule',
        //'appRoutes' : 'lib/appRoutes',
        'lib' : 'scripts/lib',

        'jquery' : 'vendor/jquery/dist/jquery.min',
        'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap.min',
        'angular' : 'vendor/angular/angular.min',
        'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router.min'
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
        'angular-ui-router' : ['angular']
    }
});


//the actual app bootstrapping
require(['lib/appVendorLibs'], function(){
    /*
    If we're wrapping the top-level angular app dependencies into a module then this can be used,
    afterwards we just inject the ['lazyOverride', 'app'] when bootstrapping.
    var app = {'lazy': angular.module('lazyOverride', ['ui.router'])};
    */
    require([
        'lib/appModule'
    ], function(app) {
        angular.bootstrap(document, [app.name]);
    });
});