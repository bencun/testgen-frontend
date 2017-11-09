define([
    'angular',
    './AuthFactory',
    './DataFactory',
    './NotificationExtended'
], function(
    angular,
    AuthFactory,
    DataFactory,
    NotificationExtended) {
        var factoriesModule = angular.module('app.factories', []);
        
        factoriesModule.factory('AuthFactory', AuthFactory);
        factoriesModule.factory('DataFactory', DataFactory);
        factoriesModule.factory('NotificationExtended', NotificationExtended);
        
        return factoriesModule;
});