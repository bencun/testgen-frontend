define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var fakeData = {
            categories:[
                {
                    id: 1,
                    name: "PHP",
                    description: "Questions about PHP."
                },
                {
                    id: 2,
                    name: "Javascript",
                    description: "Questions about Javascript."
                }
            ]
        };
        for(var i=3; i<=31; i++){
            fakeData.categories.push({
                id: i,
                name: "Dummy category #" + i,
                description: "Dummy description of the dummy category #" + i
            });
        }

        //an actual factory
        var f = {
            getAll: function(){
                return fakeData.categories;
            },
            search: function(query, count){
                var filtered = $filter('filter')(fakeData.categories, query);
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
                var results = $.grep(fakeData.categories, function(e){
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
                var results = $.grep(fakeData.categories, function(e){
                    return e.id === cat.id;
                });
                if(results){
                    var index = fakeData.categories.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.categories[index] = cat;
                        return true;
                    }
                }
                return false;
            },
            delete: function(id){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.categories, function(e){
                    return e.id === id;
                });
                if(results){
                    var index = fakeData.categories.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.categories.splice(index, 1);
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