define([
    'angular'
], function(
    angular) {

    var CategoryController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Category controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var categoryId = parseInt($stateParams.categoryId, 10);
        
        $scope.data = {
            catData: DataFactory.categories.read(categoryId)
        };
        $scope.actions = {
            update: function(){
                DataFactory.categories.update($scope.data.catData);
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    CategoryController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('CategoryController', CategoryController);
});