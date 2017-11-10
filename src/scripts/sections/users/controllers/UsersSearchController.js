define([
    'angular'
], function(
    angular) {

    var UsersSearchController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Users search controller is alive.");

        var query = $stateParams.searchQuery;
        $scope.data = {
            searchItems: DataFactory.users.search(query, $rootScope.UI.search.count)
        };
        console.log($scope.data.searchItems);
    };
    UsersSearchController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('UsersSearchController', UsersSearchController);
});