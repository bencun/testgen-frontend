define([
    'angular'
], function(
    angular) {

    var LoginController = function($rootScope, $scope, $state, AuthFactory, Notification){
        
        $rootScope.UI.pagerVisible = false;
        $rootScope.UI.searchVisible = false;
        $rootScope.UI.navigationVisible = false;
        $rootScope.UI.logoutVisible = false;
        $rootScope.UI.goBackVisible = false;

        $scope.userData = {
            username: "",
            password: ""
        };
        
        //helper functions
        var redirectUser = function(){
            console.debug("Redirecting to user state...");
            $rootScope.UI.goBackVisible = true;
            $rootScope.UI.logoutVisible = true;
            $state.go('app.user.userTests');
        };
        var redirectAdmin = function(){
            console.debug("Redirecting to admin state...");
            $rootScope.UI.goBackVisible = true;
            $rootScope.UI.logoutVisible = true;
            $state.go('app.admin.tests');
        };
        //login the user
        $scope.tryLogin = function(useCredentials){
            //try to login with name:pass
            if(useCredentials === true){
                var letsTest = AuthFactory.login($scope.userData.username, $scope.userData.password).then(
                    function(data){
                        if(data.admin === true){
                            redirectAdmin();
                        }
                        else{
                            redirectUser();
                        }
                    },
                    function(data){
                        console.log(data);
                        Notification.warning(data.message);
                    }
                );
            }
            //else check for the existing auth
            else{
                console.debug("Trying to login checking for auth...");
                //check for existing auth
                AuthFactory.checkAuth().then(
                    //success
                    function(response){
                        if(response.permAdmin === true){
                            redirectAdmin();
                        }
                        else{
                            redirectUser();
                        }
                    },
                    //failure
                    function(response){
                        Notification.warning('You are not logged in!');
                    }
                );
            }
        };
        //check if user is already authenticated
        console.debug("Trying to login...");
        $scope.tryLogin(false);
    };
    LoginController.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory', 'Notification'];

    angular.module('app').controller('LoginController', LoginController);
});