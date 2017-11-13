define([
    'angular'
], function(
    angular) {

    var LoginController = function($rootScope, $scope, $state, AuthFactory, Notification){
        
        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;

        $scope.userData = {
            username: "",
            password: ""
        };
        
        //checks if user is authenticated
        $scope.tryLogin = function(useCredentials){
            if(useCredentials === true){
                //mock the login
                AuthFactory.loggedIn = true;
                AuthFactory.permAdmin = true;
            }

            //real login
            //TODO
            
            //existing auth
            AuthFactory.checkAuth().then(
                //success
                function(response){
                    console.log(response);
                    $rootScope.UI.goBackVisible = true;
                    if(response.permAdmin){
                        $state.go('app.admin.tests');
                    }
                    else{
                        $state.go('app.user.userTests');
                    }
                },
                //failure
                function(response){
                    Notification.warning('You are not logged in!');
                }
            );
        };
        //check if user is already authenticated
        $scope.tryLogin(false);
    };
    LoginController.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory', 'Notification'];

    angular.module('app').controller('LoginController', LoginController);
});