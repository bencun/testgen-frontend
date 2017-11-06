define(['angular'], function(angular) {
    
    var createFactory = function($q){
        var f = {
            loggedIn: true,
            permAdmin: true,

            checkAuth: function(){
                var deferred = $q.defer();
                deferred.resolve({
                    loggedIn: f.loggedIn,
                    permAdmin: f.permAdmin
                });
                return deferred.promise;
            }
        };
        return f;
    };
    createFactory.$inject = ['$q'];
    
    return createFactory;
});