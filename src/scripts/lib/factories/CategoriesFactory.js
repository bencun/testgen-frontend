define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //local data array
        var localData = {};
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
                //update remote
                //if remote update successful update local
            },
            read: function(id){
                //grab data from the local array
                var results = $.grep(localData.categories, function(e){
                    return e.id === id;
                });
                if(results.length)
                    if(results.length > 0)
                        return angular.copy(results[0], {});
                //otherwise return false
                return false;
            },
            update: function(cat){
                //update remote
                //if remote update successful update local
                var results = $.grep(localData.categories, function(e){
                    return e.id === cat.id;
                });
                if(results){
                    var index = localData.categories.indexOf(results[0]);
                    if(index >= 0){
                        localData.categories[index] = cat;
                        return true;
                    }
                }
                return false;
            },
            delete: function(id){
                //update remote
                //if remote update successful update local
                var results = $.grep(localData.categories, function(e){
                    return e.id === id;
                });
                if(results){
                    var index = localData.categories.indexOf(results[0]);
                    if(index >= 0){
                        localData.categories.splice(index, 1);
                        return true;
                    }
                }
                return false;
            }
        };
        return f;
    };
    createFactory.$inject = ['$q', '$http', '$filter'];

    return createFactory;
});