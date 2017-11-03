define(['angular'], function(angular) {

    var HomeViewController = function($scope){
        $scope.page = {
            heading: 'Welcome'
        };
        $scope.items = ["A", "List", "Of", "Items"];
    };
    HomeViewController.$inject = ['$scope'];

    angular.module('app').controller('HomeViewController', HomeViewController);
});