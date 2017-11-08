define([
    'angular'
], function(
    angular) {

    var TestController = function($scope, $rootScope, $state, $stateParams, DataFactory, Notification){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var testId = parseInt($stateParams.testId, 10);
        
        $scope.data = {
            testData: DataFactory.tests.read(testId),
            difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };
        //get categories, merge the simple ones with the real ones
        for(var i=0; i<$scope.data.testData.categories.length; i++){
            angular.merge($scope.data.testData.categories[i],
                DataFactory.categories.read($scope.data.testData.categories[i].id));
        }
        console.log($scope.data.testData);
        $scope.actions = {
            addCategory: function(){
                //TODO
                $scope.data.testData.categories.push({
                    id: null,
                    minDiff: 1,
                    maxDiff: 10
                });
            },
            removeCategory: function(cat){
                $scope.data.testData.categories.splice(
                    $scope.data.testData.categories.indexOf(cat), 1);
            },
            update: function(){
                DataFactory.tests.update($scope.data.testData);
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    TestController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification'];

    angular.module('app').controller('TestController', TestController);
});