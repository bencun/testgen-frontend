define([
    'angular'
], function(
    angular) {

    var UserController = function($scope, $rootScope, $state, $stateParams, DataFactory, NotificationExtended){
        console.log("Question controller is alive.");

        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        var userId = parseInt($stateParams.userId, 10);
        
        $scope.data = {
            userData: (userId > 0) ? DataFactory.users.read(userId) : DataFactory.users.new(),
            allTests: DataFactory.tests.getAll()
        };
        //get tests, merge the simple ones with the real ones
        for(var i=0; i<$scope.data.userData.tests.length; i++){
            angular.merge($scope.data.userData.tests[i],
                DataFactory.tests.read($scope.data.userData.tests[i].id));
        }
        $scope.actions = {
            addTest: function(test){
                //TODO
                $scope.data.userData.tests.unshift(test);
            },
            removeTest: function(test){
                $scope.data.userData.tests.splice(
                    $scope.data.userData.tests.indexOf(test), 1);
            },
            update: function(){
                DataFactory.users.update($scope.data.userData);
            },
            cancel: function(){
                $rootScope.UI.goBack();
            }
        };
    };
    UserController.$inject = ['$scope', '$rootScope', '$state','$stateParams', 'DataFactory', 'NotificationExtended'];

    angular.module('app').controller('UserController', UserController);
});