define([
    'angular'
], function(
    angular) {

    var TestController = function($scope, $rootScope, $state, $stateParams, DataFactory, NotificationExtended){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var testId = parseInt($stateParams.testId, 10);
        
        $scope.data = {
            testData: (testId > 0) ? DataFactory.tests.read(testId) : DataFactory.tests.new(),
            allCategories: DataFactory.categories.getAll(),
            difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            questionCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        };
        //get categories, merge the simple ones with the real ones
        for(var i=0; i<$scope.data.testData.categories.length; i++){
            angular.merge($scope.data.testData.categories[i],
                DataFactory.categories.read($scope.data.testData.categories[i].id));
        }
        $scope.actions = {
            addCategory: function(cat){
                //TODO
                cat.minDiff = 1;
                cat.maxDiff = 10;
                cat.count = 1;
                $scope.data.testData.categories.unshift(cat);
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
    TestController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'NotificationExtended'];

    angular.module('app').controller('TestController', TestController);
});