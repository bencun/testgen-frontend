define([
    'angular',
    './AuthFactory',
    './DataFactory',
    './CategoriesFactory',
    './QuestionsFactory',
    './TestsFactory',
    './UsersFactory',
    './UserTestsFactory',
    './NotificationExtended'
], function(
    angular,
    AuthFactory,
    DataFactory,
    CategoriesFactory,
    QuestionsFactory,
    TestsFactory,
    UsersFactory,
    UserTestsFactory,
    NotificationExtended) {
        var factoriesModule = angular.module('app.factories', []);
        
        factoriesModule.factory('AuthFactory', AuthFactory);
        factoriesModule.factory('DataFactory', DataFactory);
        factoriesModule.factory('CategoriesFactory', CategoriesFactory);
        factoriesModule.factory('QuestionsFactory', QuestionsFactory);
        factoriesModule.factory('TestsFactory', TestsFactory);
        factoriesModule.factory('UsersFactory', UsersFactory);
        factoriesModule.factory('UserTestsFactory', UserTestsFactory);
        factoriesModule.factory('NotificationExtended', NotificationExtended);
        
        return factoriesModule;
});