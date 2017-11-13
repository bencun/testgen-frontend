define(['angular'], function(angular) {
    
    var createFactory = function($q){
        var f = {
            loggedIn: false,
            permAdmin: false,

            checkAuth: function(){
                var deferred = $q.defer();
                if(f.loggedIn === true)
                    deferred.resolve({permAdmin: f.permAdmin});
                else
                    deferred.reject(false);
                return deferred.promise;
            },
            checkAuthAdmin: function(){
                var deferred = $q.defer();
                f.checkAuth().then(
                    function(response){
                        if(response.permAdmin === true)
                            deferred.resolve();
                        else
                            deferred.reject();
                    },
                    function(error){
                        deferred.reject();
                    });
                return deferred.promise;
            },
            checkAuthUser: function(){
                var deferred = $q.defer();
                f.checkAuth().then(
                    function(response){
                        if(response.permAdmin === false)
                            deferred.resolve();
                        else
                            deferred.reject();
                    },
                    function(error){
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };
        return f;
    };
    createFactory.$inject = ['$q'];
    
    return createFactory;
});