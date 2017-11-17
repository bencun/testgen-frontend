define([
    'angular'
], function(
    angular) {

    var TestController = function($scope, $rootScope, $state, $stateParams, DataFactory, Notification, NotificationExtended){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var testId = parseInt($stateParams.testId, 10);

        $scope.data = {
            difficultyScale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            questionCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        };
        

        //get all of the real categories
        DataFactory.categories.getAll().then(
            function(realCategories){
                //put them on the scope
                $scope.data.allCategories = realCategories;
                //check if id > 0
                if(testId > 0){
                    //get the test
                    DataFactory.tests.read(testId).then(
                        function(td){
                            //filter and merge
                            for (var i = 0; i < realCategories.length; i++) {
                                for (var j = 0; j < td.categories.length; j++) {
                                    if(realCategories[i].id == td.categories[j].id){
                                        //used for verification
                                        td.categories[j].categoryExists = true;
                                        angular.merge(
                                            td.categories[j],
                                            realCategories[i]
                                        );
                                    }
                                }
                            }
                            console.log(td.categories);
                            //remove the categories that don't exist anymore
                            var k = 0;
                            while (td.categories[k]) {
                                if(!td.categories[k].categoryExists){
                                    td.categories.splice(k, 1);
                                }
                                else{
                                    k++;
                                }

                            }
                            console.log(td.categories);
                            //put it on scope
                            $scope.data.testData = td;
                        },
                        function(response){
                            console.debug("Failed to load the test.");
                            $state.go("login");
                        }
                    );
                }
                //if id <= 0
                else{
                    //get an empty template
                    $scope.data.testData = DataFactory.tests.new();
                }
            },
            function(){
                //fail
                console.debug("Failed to load categories.");
                $state.go("login");                            
            }
        );


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
            create: function(){
                DataFactory.tests.create($scope.data.testData).then(
                    function(){
                        Notification.success("Test created!");
                        $scope.actions.cancel();
                    },
                    function(data){
                        Notification.error("Creation failed! Server message: " + data.message);
                    }
                );
            },
            update: function(){
                DataFactory.tests.update($scope.data.testData).then(
                    function(){
                        Notification.success("Test updated!");
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
    TestController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'Notification', 'NotificationExtended'];

    angular.module('app').controller('TestController', TestController);
});