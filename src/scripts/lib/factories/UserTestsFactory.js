define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var localData = [];

        //an actual factory
        var f = {
            getAllTemplates: function(){
                var deferred = $q.defer();
                $http.get('api/alltemplates').then(
                    function(response){
                        localData = response.data;
                        deferred.resolve(localData);
                        console.debug(localData);
                        return localData;
                    },
                    function(response){
                        deferred.reject(response);
                        return response;
                    }
                );
                return deferred.promise;
            },
            getTemplate: function(id){
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
                    $http.get('api/alltemplates/'+id).then(
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
            getAllGraded: function(){
                var deferred = $q.defer();
                $http.get('api/test').then(
                    function(response){
                        localData = response.data;
                        deferred.resolve(localData);
                        console.debug(localData);
                        return localData;
                    },
                    function(response){
                        deferred.reject(response);
                        return response;
                    }
                );
                return deferred.promise;
            },
            getGraded: function(id){
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
                    $http.get('api/test/'+id).then(
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
            search: function(query, count){
                var filtered = $filter('filter')(localData, query);
                filtered = $filter('orderBy')(filtered, '+name');
                filtered = $filter('limitTo')(filtered, count);
                return filtered;
                
            },
            updateFull: function(t){
                var deferred = $q.defer();
                //update remote
                $http.post('api/test', t).then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(response){
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            },
            updateQuestion: function(t){
                var deferred = $q.defer();
                //update remote
                $http.put('api/test/question', t).then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(response){
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            },
            generate: function(id){
                var deferred =  $q.defer();
                $http.get('api/test/generate/'+id).then(
                    function(response){
                        deferred.resolve(response.data);
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