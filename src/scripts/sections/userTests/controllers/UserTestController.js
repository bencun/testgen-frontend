define([
    'angular'
], function(
    angular) {

    var UserTestController = function($scope, $timeout, $interval, $rootScope, $state, $stateParams, DataFactory, Notification, NotificationExtended, $transitions){
        console.log("User test controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;

        var testId = parseInt($stateParams.testId, 10);
        if(!testId) $state.go("login");


        $scope.data = {
            currentQuestion: null,
            totalTimeLeft: 0,
            questionTimeLeft: 0
        };

        DataFactory.userTests.generate(testId).then(
            function(data){
                $scope.data.testData = data;
            },
            function(data){
                //TODO
            }
        );

        var totalTimeExpired = function(){
            $scope.actions.stopTest();
        };
        var questionTimeExpired = function(){
            $scope.actions.nextQuestion();
        };
        var updateUI = function(){
            if($scope.data.questionTimeLeft <= 0){
                questionTimeExpired();
                return;
            }
            if($scope.data.totalTimeLeft <= 0){
                totalTimeExpired();
                return;
            }
            
            $scope.data.totalTimeLeft -= 1;
            $scope.data.questionTimeLeft -= 1;
        };
        var updateUIInterval;

        $scope.actions = {
            startTest: function(){
                $scope.data.totalTimeLeft = $scope.data.testData.timedTotalTime*60;
                $scope.data.questionTimeLeft = $scope.data.testData.timedPerQuestionTime;
                $scope.data.currentQuestion = $scope.data.testData.questions[0];
                updateUIInterval = $interval(updateUI, 1000);
            },
            stopTest: function(){
                $interval.cancel(updateUIInterval);
                console.log($scope.data.testData);
            },
            nextQuestion: function(){
                //current question index
                var idx = $scope.data.testData.questions.indexOf($scope.data.currentQuestion);
                //next question
                idx += 1;
                if(idx < $scope.data.testData.questions.length && idx >= 0){
                    $scope.data.questionTimeLeft = $scope.data.testData.timedPerQuestionTime;
                    $scope.data.currentQuestion = $scope.data.testData.questions[idx];
                }
                else{
                    $scope.actions.stopTest();
                }
            },
            selectOption: function(option){
                option.selected = !option.selected;
                if($scope.data.currentQuestion.multiselect != true){
                    $scope.actions.nextQuestion();
                }
            }
        };

        NotificationExtended.confirmationDialog("Are you sure you want to start this test?").then(
            function(response){
                Notification.info("Go, go, go!");
                $scope.actions.startTest();
            },
            function(response){
                Notification.info("Chickening out...");
                $state.go("app.user.userTests");
            }
        );
    };
    UserTestController.$inject = ['$scope', '$timeout', '$interval', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification', 'NotificationExtended', '$transitions'];

    angular.module('app').controller('UserTestController', UserTestController);
});