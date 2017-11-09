define([
    'angular'
], function(
    angular) {

    var CategoriesSearchController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Search controller is alive.");

        var query = $stateParams.searchQuery;
        $scope.data = {
            searchItems: DataFactory.categories.search(query, $rootScope.UI.search.count)
        };
        console.log($scope.data.searchItems);
    };
    CategoriesSearchController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('CategoriesSearchController', CategoriesSearchController);
});