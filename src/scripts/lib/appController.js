define([
    'angular'
], function(
    angular) {

    var AppController = function($scope, AuthFactory){
        console.log('App controller is alive.');
    };
    AppController.$inject = ['$scope', 'AuthFactory'];

    return AppController;
});