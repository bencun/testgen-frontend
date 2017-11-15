define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var fakeData = {
            users:[
                {
                    id: 1,
                    name: "Peter Peterson",
                    details: "This user is a full stack developer.",
                    admin: false,
                    tests:[
                        {
                            id: 1
                        },
                        {
                            id: 2
                        }
                    ]
                }
            ]
        };
        for(i=2; i<=15; i++){
            fakeData.users.push({
                id: i,
                name: "Dummy Dummyslav #" + i,
                details: "This user is a dummy user.",
                admin: false,
                tests:[
                    {
                        id: i % 10
                    },
                    {
                        id: i % 11
                    }
                ]
            });
        }

        //an actual factory
        var f = {
            getAll: function(){
                return fakeData.users;
            },
            search: function(query, count){
                var filtered = $filter('filter')(fakeData.users, query);
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
                //update remote
                //if remote update successful update local
            },
            read: function(id){
                //grab data from the local array
                var results = $.grep(fakeData.users, function(e){
                    return e.id === id;
                });
                if(results.length)
                    if(results.length > 0)
                        return angular.copy(results[0], {});
                //otherwise return false
                return false;
            },
            update: function(u){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.users, function(e){
                    return e.id === u.id;
                });
                if(results){
                    var index = fakeData.users.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.users[index] = u;
                        return true;
                    }
                }
                return false;
            },
            delete: function(id){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.users, function(e){
                    return e.id === id;
                });
                if(results){
                    var index = fakeData.users.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.users.splice(index, 1);
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