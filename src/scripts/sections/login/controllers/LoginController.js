define([
    'angular'
], function(
    angular) {

    var LoginController = function($rootScope, $scope, $state, AuthFactory, Notification){
        var self = this;
        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;
        $rootScope.UI.logoutVisible = false;
        $rootScope.UI.goBackVisible = false;

        $scope.userData = {
            username: "",
            password: ""
        };
        
        /*for testing purposes we need to expose the helper methods*/
        self.redirectUser = redirectUser = function(){
            console.debug("[LoginController] Redirecting to user state...");
            $rootScope.UI.goBackVisible = true;
            $rootScope.UI.logoutVisible = true;
            $state.go('app.user.userTests');
        };;
        self.redirectAdmin = function(){
            console.debug("[LoginController] Redirecting to admin state...");
            $rootScope.UI.goBackVisible = true;
            $rootScope.UI.logoutVisible = true;
            $state.go('app.admin.tests');
        };;
        //login the user
        $scope.tryLogin = function(useCredentials){
            console.debug("[LoginController] Trying to login...");
            //try to login with name:pass
            if(useCredentials === true){
                console.debug("[LoginController] Trying to login with credentials...");
                AuthFactory.login($scope.userData.username, $scope.userData.password).then(
                    function(data){
                        console.debug("[LoginController] Logged in with credentials...");
                        if(data.admin === true){
                            console.debug("[LoginController] Logged in as admin...");
                            self.redirectAdmin();
                        }
                        else{
                            console.debug("[LoginController] Logged in as user...");
                            self.redirectUser();
                        }
                    },
                    function(data){
                        console.debug("[LoginController] Login failed...");
                        console.debug(data);
                        Notification.warning(data.message);
                    }
                );
            }
            //else check for the existing auth
            else{
                console.debug("[LoginController] Trying to login checking for auth...");
                //check for existing auth
                AuthFactory.checkAuth().then(
                    //success
                    function(response){
                        console.debug("[LoginController] Auth check OK...");
                        if(response.permAdmin === true){
                            console.debug("[LoginController] User has admin privileges...");
                            redirectAdmin();
                        }
                        else{
                            console.debug("[LoginController] User has user privileges...");
                            redirectUser();
                        }
                    },
                    //failure
                    function(response){
                        console.debug("[LoginController] Auth failed...");
                        Notification.warning('You are not logged in!');
                    }
                );
            }
        };
        //check if user is already authenticated
        $scope.tryLogin(false);
    };
    LoginController.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory', 'Notification'];

    angular.module('app').controller('LoginController', LoginController);
});