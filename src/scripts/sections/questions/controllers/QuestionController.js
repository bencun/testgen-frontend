define([
    'angular'
], function(
    angular) {

    var QuestionController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $scope.questionId = $stateParams.categoryId;
        $scope.categoryId = $stateParams.categoryId;
        
        DataFactory.setTarget(DataFactory.targets.questions);
    };
    QuestionController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory'];

    angular.module('app').controller('QuestionController', QuestionController);
});