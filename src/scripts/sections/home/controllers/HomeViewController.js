define([
    'angular'
], function(
    angular) {

    var HomeViewController = function($scope, TestFactory){
        TestFactory.testMethod();
        $scope.page = {
            heading: 'Welcome'
        };
        $scope.items = ["A", "List", "Of", "Items"];
    };
    HomeViewController.$inject = ['$scope', 'TestFactory'];

    angular.module('app').controller('HomeViewController', HomeViewController);
});