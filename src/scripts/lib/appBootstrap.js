//requirejs config
require.config({
    baseUrl: '/',
    paths: {
        'lib' : 'scripts/lib',

        'jquery' : 'vendor/jquery/dist/jquery.min',
        'bootstrap' : 'vendor/bootstrap/dist/js/bootstrap.min',
        'angular' : 'vendor/angular/angular.min',
        'angular-ui-router' : 'vendor/angular-ui-router/release/angular-ui-router.min',
        'angular-animate' : 'vendor/angular-animate/angular-animate.min',
        'angular-ui-notification' : 'vendor/angular-ui-notification/dist/angular-ui-notification'
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
    ], function(appModule) {
        return angular.bootstrap(document, [appModule.name]);
    });
});