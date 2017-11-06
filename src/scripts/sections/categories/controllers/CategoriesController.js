define([
    'angular'
], function(
    angular) {

    var CategoriesController = function($scope, DataFactory){
        console.log("Categories controller is alive.");
        
        DataFactory.setTarget(DataFactory.targets.categories);

        $scope.pager = function(dir){
            var currentData = DataFactory.load(dir);
            console.log(currentData);
            $scope.items = currentData.items;
            $scope.currentPage = currentData.currentPage; 
            $scope.totalPages = currentData.totalPages;
        };

        $scope.pager();
    };
    CategoriesController.$inject = ['$scope', 'DataFactory'];

    angular.module('app').controller('CategoriesController', CategoriesController);
});