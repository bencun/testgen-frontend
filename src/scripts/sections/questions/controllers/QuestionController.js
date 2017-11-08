define([
    'angular'
], function(
    angular) {

    var QuestionController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var questionId = parseInt($stateParams.questionId, 10);
        
        $scope.data = {
            questionData: DataFactory.questions.read(questionId),
            difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };
        $scope.actions = {
            addOption: function(){
                $scope.data.questionData.options.push({
                    option: "",
                    correct: false
                });
            },
            removeOption: function(opt){
                $scope.data.questionData.options.splice(
                    $scope.data.questionData.options.indexOf(opt), 1);
            },
            update: function(){
                DataFactory.questions.update($scope.data.questionData);
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    QuestionController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory'];

    angular.module('app').controller('QuestionController', QuestionController);
});