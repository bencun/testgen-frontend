define([
    'angular'
], function(
    angular) {

    var UserController = function($scope, $rootScope, $state, $stateParams, DataFactory, NotificationExtended){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var userId = parseInt($stateParams.userId, 10);
        
        $scope.data = {};
        //get all of the real templates
        DataFactory.tests.getAll().then(
            function(realTemplates){
                //put them on the scope
                $scope.data.allTests = realTemplates;
                //check if id > 0
                if(userId > 0){
                    //get the user
                    DataFactory.users.read(userId).then(
                        function(user){
                            //filter and merge
                            for (var i = 0; i < realTemplates.length; i++) {
                                for (var j = 0; j < user.tests.length; j++) {
                                    if(realTemplates[i].id == user.tests[j].id){
                                        //used for verification
                                        user.tests[j].testExists = true;
                                        angular.merge(
                                            user.tests[j],
                                            realTemplates[i]
                                        );
                                    }
                                }
                            }
                            console.log(user.tests);
                            //remove the categories that don't exist anymore
                            var k = 0;
                            while (user.tests[k]) {
                                if(!user.tests[k].testExists){
                                    user.tests.splice(k, 1);
                                }
                                else{
                                    k++;
                                }

                            }
                            console.log(user.categories);
                            //put it on scope
                            $scope.data.userData = user;
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
                    $scope.data.userData = DataFactory.users.new();
                }
            },
            function(){
                //fail
                console.debug("Failed to load categories.");
                $state.go("login");                            
            }
        );

        
        $scope.actions = {
            addTest: function(test){
                //TODO
                $scope.data.userData.tests.unshift(test);
            },
            removeTest: function(test){
                $scope.data.userData.tests.splice(
                    $scope.data.userData.tests.indexOf(test), 1);
            },
            create: function(){
                DataFactory.users.create($scope.data.userData).then(
                    function(){
                        $scope.actions.cancel();
                    },
                    function(){
                        
                    }
                );
            },
            update: function(){
                DataFactory.users.update($scope.data.userData).then(
                    function(){
                        
                    },
                    function(){
                        
                    }
                );
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    UserController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'NotificationExtended'];

    angular.module('app').controller('UserController', UserController);
});