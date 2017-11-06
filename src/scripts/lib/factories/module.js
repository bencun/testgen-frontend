define([
    'angular',
    './AuthFactory',
    './DataFactory'
], function(
    angular,
    AuthFactory,
    DataFactory) {
        var factoriesModule = angular.module('app.factories', []);
        
        factoriesModule.factory('AuthFactory', AuthFactory);
        factoriesModule.factory('DataFactory', DataFactory);
        
        return factoriesModule;
});