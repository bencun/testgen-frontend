define([
    'angular'
], function(
    angular) {

    var QuestionController = function($scope, $rootScope, $state, $stateParams, DataFactory, Notification, NotificationExtended){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var questionId = parseInt($stateParams.questionId, 10);
        var categoryId = $stateParams.categoryId;
        //categoryId must be defined for adding new questions
        if(!categoryId) $state.go("login");

        if(questionId > 0){
            DataFactory.questions.read(questionId).then(
                function(data){
                    console.debug('Load question returned:');
                    console.debug(data);
                    $scope.data = {
                        questionData: data,
                        difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    };
                },
                function(response){
                    console.debug('Load question has failed:');
                    console.debug(response);
                }
            );
        }
        else{
            $scope.data = {
                questionData: DataFactory.questions.new(categoryId),
                difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            };
        }
        
        
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
            create: function(){
                console.debug($scope.data.questionData);
                DataFactory.questions.create($scope.data.questionData).then(
                    function(){
                        Notification.success("Question created!");
                        $scope.actions.cancel();
                    },
                    function(data){
                        Notification.error("Creation failed! Server message: " + data.message);
                    }
                );
            },
            update: function(){
                DataFactory.questions.update($scope.data.questionData).then(
                    function(){
                        Notification.success("Question updated!");
                    },
                    function(data){
                        Notification.error("Update failed! Server message: " + data.message);
                    }
                );
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    QuestionController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification', 'NotificationExtended'];

    angular.module('app').controller('QuestionController', QuestionController);
});