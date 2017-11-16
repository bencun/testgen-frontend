define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var localData = [];

        //an actual factory
        var f = {
            stripProperties: function(t){
                //strip unnecessary stuff
                var oldCats = t.categories; //save reference
                var newCats = [];
                t.categories = newCats; //new reference
                for(var i = 0; i < oldCats.length; i++){
                    newCats.push({
                        id: oldCats[i].id,
                        minDiff: oldCats[i].minDiff,
                        maxDiff: oldCats[i].maxDiff,
                        count: oldCats[i].count
                    });
                }
                console.log(oldCats);
                console.log(t.categories);
                return t;
            },
            getAll: function(){
                var deferred = $q.defer();
                $http.get('api/templates').then(
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
                    description: "",
                    timed: false,
                    timedTotal: false,
                    timedTotalTime: 45,
                    timedPerQuestion: false,
                    timedPerQuestionTime: 30,
                    categories:[]
                };
            },
            create: function(t){
                var deferred = $q.defer();
                t = f.stripProperties(angular.copy(t, {}));
                //create remote
                delete t.id;
                $http.post('api/templates', t).then(
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
                    $http.get('api/templates/'+id).then(
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
            update: function(t){
                t = f.stripProperties(angular.copy(t, {}));
                var deferred = $q.defer();
                //update remote
                $http.put('api/templates', t).then(
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
                $http.delete('api/templates/'+id).then(
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