define([
    'angular'
], function(
    angular) {

    var UserTestViewController = function($scope, $timeout, $interval, $rootScope, $state, $stateParams, DataFactory, Notification, NotificationExtended, $transitions){
        console.log("User test view controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;

        var testId = parseInt($stateParams.testId, 10);
        if(!testId) $state.go("login");

        $scope.data = {
            testData: null,
            testScore: 0,
            testMaxScore: 0,
            totalQuestions: 0
        };

        DataFactory.userTests.getGraded(testId).then(
            function(data){
                $scope.data.testData = data;
                console.debug(data);
                $scope.data.totalQuestions = data.questions.length;
                for(var i=0; i < data.questions.length; i++){
                    var currentQ = data.questions[i];
                    console.debug(currentQ.question);
                    //add one to max score
                    $scope.data.testMaxScore += 1;
                    //go through options
                    var noOptions = currentQ.options.length;
                    for(var j=0; j<noOptions; j++){
                        if(currentQ.options[j].correct == false){
                            noOptions -= 1; //decrement noOptions for every option that's incorrect.
                        }
                    }
                    //in the end noOptions contains a number of correct options
                    //if the number of correct options is equal to a total number of options...
                    //...then the answer is correct
                    if(noOptions == currentQ.options.length){
                        $scope.data.testScore += 1;
                    }
                }
            },
            function(response){
                $state.go("app.user.userTests");

            }
        );


        $scope.actions = {
            
        };

    };
    UserTestViewController.$inject = ['$scope', '$timeout', '$interval', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification', 'NotificationExtended', '$transitions'];

    angular.module('app').controller('UserTestViewController', UserTestViewController);
});