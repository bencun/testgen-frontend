define([
    'angular'
], function(
    angular) {

    var CategoryController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Category controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var categoryId = parseInt($stateParams.categoryId, 10);
        
        console.debug(DataFactory.categories.read(categoryId));

        if(categoryId > 0){
            DataFactory.categories.read(categoryId).then(
                function(data){
                    console.debug('Load category returned:');
                    console.debug(data);
                    $scope.data = {
                        catData: data
                    };
                },
                function(response){
                    console.debug('Load category has failed:');
                    console.debug(response);
                }
            );
        }
        else{
            $scope.data = {
                catData: DataFactory.categories.new()
            };
        }

        $scope.actions = {
            create: function(){
                DataFactory.categories.create($scope.data.catData).then(
                    function(){
                        $scope.actions.cancel();
                    },
                    function(){
                        
                    }
                );
            },
            update: function(){
                DataFactory.categories.update($scope.data.catData).then(
                    function(){
                        
                    },
                    function(){
                        
                    }
                );
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    CategoryController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'DataFactory'];

    angular.module('app').controller('CategoryController', CategoryController);
});