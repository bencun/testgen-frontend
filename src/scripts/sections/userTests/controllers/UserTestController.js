define([
    'angular'
], function(
    angular) {

    var UserTestController = function($scope, $timeout, $interval, $rootScope, $state, $stateParams, DataFactory, Notification, NotificationExtended, $transitions){
        console.log("User test controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;
        var testActive = false;

        var testId = parseInt($stateParams.testId, 10);
        if(!testId) $state.go("login");


        $scope.data = {
            currentQuestion: null,
            totalTimeLeft: 0,
            questionTimeLeft: 0
        };

        //test generation (will be moved)
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
            if($scope.data.questionTimeLeft <= 0 &&
                $scope.data.testData.timedPerQuestion == true){
                    questionTimeExpired();
                    return;
            }
            if($scope.data.totalTimeLeft <= 0 &&
                $scope.data.testData.timedTotal == true){
                totalTimeExpired();
                return;
            }
            
            $scope.data.totalTimeLeft -= 1;
            $scope.data.questionTimeLeft -= 1;
        };
        var updateUIInterval;

        $scope.actions = {
            startTest: function(){
                testActive = true;
                $scope.data.totalTimeLeft = $scope.data.testData.timedTotalTime*60;
                $scope.data.questionTimeLeft = $scope.data.testData.timedPerQuestionTime;
                $scope.data.currentQuestion = $scope.data.testData.questions[0];
                updateUIInterval = $interval(updateUI, 1000);
            },
            stopTest: function(){
                testActive = false;
                $interval.cancel(updateUIInterval);
                console.debug($scope.data.testData);
                DataFactory.userTests.updateFull($scope.data.testData).then(
                    function(data){
                        console.debug(data);
                    },
                    function(data){
                        console.debug(data);
                    }
                );
            },
            nextQuestion: function(){
                //send question update
                var payload = {
                    id: $scope.data.testData.id,
                    questions: [
                        {
                            id: $scope.data.currentQuestion.id,
                            options: $scope.data.currentQuestion.options
                        }

                    ]

                };
                DataFactory.userTests.updateQuestion(payload).then(
                    function(data){
                        console.log(payload);
                        console.log(data);
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
                    function(data){
                        console.debug(data);
                    }
                );
            },
            selectOption: function(option){
                option.selected = !option.selected;
                if($scope.data.currentQuestion.multiselect != true &&
                    $scope.data.testData.timedPerQuestion == true){
                        //go to the next one
                        $scope.actions.nextQuestion();
                }
            }
        };

        NotificationExtended.confirmationDialog("Are you sure you want to start this test?").then(
            function(response){
                Notification.info("Go, go, go!");
                $scope.actions.startTest();

                $transitions.onStart({ }, function(trans) {
                    if(testActive)
                        return false;
                    else
                        return true;
                });
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