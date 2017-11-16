define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var localData = [];

        //an actual factory
        var f = {
            stripProperties: function(u){
                //strip unnecessary stuff
                var oldTests = u.tests; //save reference
                var newTests = [];
                u.tests = newTests; //new reference
                for(var i = 0; i < oldTests.length; i++){
                    newTests.push({
                        id: oldTests[i].id
                    });
                }
                console.log(oldTests);
                console.log(u.tests);
                return u;
            },
            getAll: function(){
                var deferred = $q.defer();
                $http.get('api/users').then(
                    function(response){
                        localData = response.data;
                        deferred.resolve(localData);
                        return localData;
                    },
                    function(response){
                        deferred.reject(response);
                        return response;
                    }
                );
                return deferred.promise;
            },
            search: function(query, count){
                var filtered = $filter('filter')(localData, query);
                filtered = $filter('orderBy')(filtered, '+name');
                filtered = $filter('limitTo')(filtered, count);
                return filtered;
                
            },
            new: function(){
                return {
                    id: 0,
                    name: "",
                    details: "",
                    password: "",
                    passwordConfirmation: "",
                    admin: false,
                    tests:[]
                };
            },
            create: function(u){
                var deferred = $q.defer();
                u = f.stripProperties(angular.copy(u, {}));
                //create remote
                delete u.id;
                $http.post('api/users', u).then(
                    function(response){
                        deferred.resolve();
                    },
                    function(response){
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            },
            read: function(id){
                var deferred = $q.defer();
                //grab data from the local array if available
                if(localData.length > 0){
                    var results = $.grep(localData, function(e){
                        return e.id === id;
                    });
                    if(results.length){
                        if(results.length > 0){
                            deferred.resolve(angular.copy(results[0], {}));
                        }
                    }
                    deferred.reject();
                }
                //otherwise load it from the server
                else{
                    $http.get('api/users/'+id).then(
                        function(response){
                            deferred.resolve(response.data);
                            return localData;
                        },
                        function(response){
                            deferred.reject(response);
                            return response;
                        }
                    );
                }
                return deferred.promise;
            },
            update: function(u){
                u = f.stripProperties(angular.copy(u, {}));
                var deferred = $q.defer();
                //update remote
                $http.put('api/users', u).then(
                    function(response){
                        deferred.resolve();
                    },
                    function(response){
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            },
            delete: function(id){
                var deferred = $q.defer();
                //update remote
                $http.delete('api/users/'+id).then(
                    function(response){
                        deferred.resolve();
                    },
                    function(response){
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            }
        };
        return f;
    };
    createFactory.$inject = ['$q', '$http', '$filter'];

    return createFactory;
});