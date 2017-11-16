define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //local data array
        var localData = [];
        //an actual factory
        var f = {
            getAll: function(){
                var deferred = $q.defer();
                $http.get('api/categories').then(
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
                    description: ""
                };
            },
            create: function(cat){
                var deferred = $q.defer();
                //create remote
                delete cat.id;
                $http.post('api/categories', cat).then(
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
                    $http.get('api/categories/'+id).then(
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
            update: function(cat){
                var deferred = $q.defer();
                //update remote
                $http.put('api/categories', cat).then(
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
                $http.delete('api/categories/'+id).then(
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