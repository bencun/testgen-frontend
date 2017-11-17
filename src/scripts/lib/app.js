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