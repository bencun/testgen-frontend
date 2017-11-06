define([
    'angular'
], function(
    angular) {

    var LoginController = function($scope, $state, AuthFactory){
        $scope.userData = {
            username: "",
            password: ""
        };
        
        //checks if user is authenticated
        $scope.tryLogin = function(useCredentials){
            if(useCredentials === true){
                AuthFactory.checkAuth().then(
                    //success
                    function(response){
                        console.log(response);
                        $state.go('app.categories');
                    },
                    //failure
                    function(response){
                        console.log(response);
                    }
                );
            }
            else{
                AuthFactory.checkAuth().then(
                    //success
                    function(response){
                        console.log(response);
                        $state.go('app.categories');
                    },
                    //failure
                    function(response){
                        console.log(response);
                    }
                );
            }
        };
        
        //check if user is already authenticated
        $scope.tryLogin(false);
    };
    LoginController.$inject = ['$scope', '$state', 'AuthFactory'];

    angular.module('app').controller('LoginController', LoginController);
});