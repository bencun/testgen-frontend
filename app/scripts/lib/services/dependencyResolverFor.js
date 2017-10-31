define([], function() {
    return function(module) {
        var definition = {
            resolver: ['$q','$rootScope', function($q, $rootScope) {
                var deferred = $q.defer();

                require([module+"/module"], function() {
                    $rootScope.$apply(function() {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
        return definition;
    }
});
