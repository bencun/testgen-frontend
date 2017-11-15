define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $localStorage){
        var f = {
            loggedIn: false,
            permAdmin: false,

            //when promise is resolved returns {permAdmin: true|false}
            checkAuth: function(){
                var deferred = $q.defer();
                $http.post('api/verify', {}).then(
                    function(response){
                        f.loggedIn = true;
                        f.permAdmin = response.data.admin;
                        deferred.resolve({permAdmin: response.data.admin});
                    },
                    function(response){
                        f.loggedIn = false;
                        f.permAdmin = false;
                        deferred.reject(false);
                    }
                );
                
                return deferred.promise;
            },
            //confirms that the user is logged in as admin
            checkAuthAdmin: function(){
                var deferred = $q.defer();
                f.checkAuth().then(
                    function(response){
                        console.debug("[DataFactory] checkAuthAdmin: checkAuth resolved.");
                        if(response.permAdmin === true){
                            console.debug("[DataFactory] permAdmin is true.");
                            deferred.resolve();
                        }
                        else{
                            console.debug("[DataFactory] permAdmin is false.");
                            deferred.reject();
                        }
                    },
                    function(error){
                        console.debug("[DataFactory] checkAuthAdmin: checkAuth rejected.");
                        deferred.reject();
                    });
                return deferred.promise;
            },
            //confirms that the user is logged in as user
            checkAuthUser: function(){
                var deferred = $q.defer();
                f.checkAuth().then(
                    function(response){
                        console.debug("[DataFactory] checkAuthUser: checkAuth resolved.");
                        if(response.permAdmin === false){
                            console.debug("[DataFactory] permAdmin is false.");
                            deferred.resolve();
                        }
                        else{
                            console.debug("[DataFactory] permAdmin is true.");
                            deferred.reject();
                        }
                    },
                    function(error){
                        console.debug("[DataFactory] checkAuthUser: checkAuth rejected.");
                        deferred.reject();
                    });
                return deferred.promise;
            },
            login: function(n, p){
                console.debug("[DataFactory] Returning login promise...");
                var deferred = $q.defer();
                //returning $http.post(...).then(...); does not work...
                //...because that line of code doesn't return the actual promise but only the state of the proimse!
                $http.post('api/login',{name: n, password: p}).then(
                    function(response){
                        console.debug("[DataFactory] Login OK");
                        $localStorage.authToken = response.data.token;
                        f.loggedIn = true;
                        f.permAdmin = response.data.admin;
                        deferred.resolve(response.data);
                        return response.data;
                    },
                    function(response){
                        console.debug("[DataFactory] Login failed");
                        delete $localStorage.authToken;
                        f.loggedIn = false;
                        f.permAdmin = false;
                        deferred.reject(response.data);
                        return response.data;
                    }
                );
                return deferred.promise;
            },
            //login(n, p){...} should also work in object notation lol
            logout: function(){
                var deferred = $q.defer();
                $http.post('api/logout',{}).then(
                    function(response){
                        delete $localStorage.authToken;
                        f.loggedIn = false;
                        f.permAdmin = false;
                        deferred.resolve(response.data);
                        return response.data;
                    },
                    function(response){
                        deferred.reject(response.data);
                        return false;
                    }
                );
                return deferred.promise;
            },
            getAuthToken: function(){
                return $localStorage.authToken;
            }

        };
        return f;
    };
    createFactory.$inject = ['$q', '$http', '$localStorage'];
    
    return createFactory;
});