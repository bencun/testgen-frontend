define([
    'angular'
], function(
    angular) {

    var UserTestsSearchController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Tests search controller is alive.");

        var query = $stateParams.searchQuery;
        $scope.data = {
            searchItems: DataFactory.userTests.search(query, $rootScope.UI.search.count)
        };
        console.log($scope.data.searchItems);
    };
    UserTestsSearchController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('UserTestsSearchController', UserTestsSearchController);
});