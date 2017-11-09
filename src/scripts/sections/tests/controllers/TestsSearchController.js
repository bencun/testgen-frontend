define([
    'angular'
], function(
    angular) {

    var TestsSearchController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Tests search controller is alive.");

        var query = $stateParams.searchQuery;
        $scope.data = {
            searchItems: DataFactory.tests.search(query, $rootScope.UI.search.count)
        };
        console.log($scope.data.searchItems);
    };
    TestsSearchController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('TestsSearchController', TestsSearchController);
});