define([
    'angular'
], function(
    angular) {

    var QuestionsSearchController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Search controller is alive.");

        var query = $stateParams.searchQuery;
        $scope.data = {
            searchItems: DataFactory.questions.search(query, $rootScope.UI.search.count)
        };
        console.log($scope.data.searchItems);
    };
    QuestionsSearchController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('QuestionsSearchController', QuestionsSearchController);
});