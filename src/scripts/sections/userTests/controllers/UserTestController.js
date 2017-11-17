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


        //active test settings
        $scope.data = {
            originalTemplate: null,
            currentQuestion: null,
            totalTimeLeft: 0,
            questionTimeLeft: 0
        };
        $scope.data.testActive = false;
        $scope.data.questionActive = true;

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

        //load the original template
        DataFactory.userTests.getTemplate(testId).then(
            function(data){
                $scope.data.originalTemplate = data;
                $scope.data.totalQuestions = 0;
                for(var i=0; i < data.categories.length; i++){
                    $scope.data.totalQuestions += data.categories[i].count;
                }
            },
            function(response){
                //TODO
            }
        );

        $scope.actions = {
            confirmTest: function(){
                //confirmation dialog
                NotificationExtended.confirmationDialog("Are you sure you want to start this test?").then(
                    function(response){
                        //test generation
                        DataFactory.userTests.generate(testId).then(
                            function(data){
                                //start the test
                                $scope.data.testData = data;
                                Notification.info("Go, go, go!");
                                $scope.actions.startTest();
                
                                $transitions.onStart({ }, function(trans) {
                                    if($scope.data.testActive)
                                        return false;
                                    else
                                        return true;
                                });
                            },
                            function(data){
                                //test generation failed
                                //TODO
                            }
                        );
                    },
                    function(response){
                        //user didn't confirm the beginning of the test
                        Notification.info("Chickening out...");
                        $state.go("app.user.userTests");
                    }
                );
            },
            startTest: function(){
                $scope.data.testActive = true;
                $scope.data.totalTimeLeft = $scope.data.testData.timedTotalTime*60;
                $scope.data.questionTimeLeft = $scope.data.testData.timedPerQuestionTime;
                $scope.data.currentQuestion = $scope.data.testData.questions[0];
                updateUIInterval = $interval(updateUI, 1000);
            },
            stopTest: function(){
                $scope.data.testActive = false;
                $interval.cancel(updateUIInterval);
                console.debug($scope.data.testData);
                Notification.info("Sending data...");
                DataFactory.userTests.updateFull($scope.data.testData).then(
                    function(data){
                        Notification.info("Completed. Wait for your results...");
                        $state.go('app.user.userTestView', {
                            testId: $scope.data.testData.id
                        });
                        console.debug(data);
                    },
                    function(data){
                        Notification.error("Server rejected the data.");
                        console.debug(data);
                    }
                );
            },
            nextQuestion: function(){
                //disable answering
                $scope.data.questionActive = false;
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
                        console.debug("PAYLOAD:");
                        console.debug(payload);
                        console.debug("RECEIVED DATA:");
                        console.debug(data);
                        //current question index
                        var idx = $scope.data.testData.questions.indexOf($scope.data.currentQuestion);
                        console.debug("CURRENT QUESTION:");
                        console.debug($scope.data.currentQuestion);
                        var questionGraded = null;
                        //find a question
                        var i;
                        var j;
                        for(i=0; i < data.questions.length; i++){
                            if(data.questions[i].id == $scope.data.currentQuestion.id)
                                questionGraded = data.questions[i];
                        }
                        console.debug("questionGraded:");
                        console.debug(questionGraded);

                        //set the correct/incorrect var
                        for(i=0; i < $scope.data.currentQuestion.options.length; i++){
                            for(j=0; j < questionGraded.options.length; j++){
                                console.debug("COMPARING:");
                                console.debug($scope.data.currentQuestion.options[i]);
                                console.debug(questionGraded.options[j]);
                                if($scope.data.currentQuestion.options[i].option == questionGraded.options[j].option){
                                    console.debug("COMPARISON MATCHED");
                                    if(questionGraded.options[j].correct == true){
                                        $scope.data.currentQuestion.options[i].isCorrect = true;
                                    }
                                    else{
                                        $scope.data.currentQuestion.options[i].isCorrect = false;
                                    }
                                }
                            }
                        }
                        console.debug("AFTER LOOP CURRENT QUESTION:");
                        console.debug($scope.data.currentQuestion.options);
                        $timeout(function(){
                            //next question
                            idx += 1;
                            if(idx < $scope.data.testData.questions.length && idx >= 0){
                                $scope.data.questionTimeLeft = $scope.data.testData.timedPerQuestionTime;
                                $scope.data.currentQuestion = $scope.data.testData.questions[idx];
                                //enable answering
                                $scope.data.questionActive = true;
                            }
                            else{
                                $scope.actions.stopTest();
                            }
                        }, 1000);
                    },
                    function(data){
                        //enable answering
                        $scope.data.questionActive = true;
                        console.debug(data);
                    }
                );
            },
            selectOption: function(option){
                if($scope.data.questionActive == true){
                    option.selected = !option.selected;
                    if($scope.data.currentQuestion.multiselect != true &&
                        $scope.data.testData.timedPerQuestion == true){
                            //go to the next one
                            $scope.actions.nextQuestion();
                    }
                }
            }
        };

    };
    UserTestController.$inject = ['$scope', '$timeout', '$interval', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification', 'NotificationExtended', '$transitions'];

    angular.module('app').controller('UserTestController', UserTestController);
});