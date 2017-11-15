define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var fakeData = {
            tests:[
                {
                    id: 1,
                    name: "Junior full stack developer",
                    description: "This template is used during the full stack developer interview.",
                    timed: true,
                    timedTotal: true,
                    timedTotalTime: 45,
                    timedPerQuestion: true,
                    timedPerQuestionTime: 60,
                    categories:[
                        {
                            id: 1,
                            minDiff: 2,
                            maxDiff: 7,
                            count: 3
                        },
                        {
                            id: 2,
                            minDiff: 3,
                            maxDiff: 8,
                            count: 2
                        }
                    ]
                }
            ]
        };
        for(i=2; i<=15; i++){
            fakeData.tests.push({
                id: i,
                name: "Dummy test template #" + i,
                description: "This template is a dummy template.",
                timed: true,
                timedTotal: false,
                timedTotalTime: i*3,
                timedPerQuestion: true,
                timedPerQuestionTime: (i*10)%60,
                categories:[
                    {
                        id: 1,
                        minDiff: 2,
                        maxDiff: 7,
                        count: i % 5
                    },
                    {
                        id: 2,
                        minDiff: 3,
                        maxDiff: 8,
                        count: i % 5
                    }
                ]
            });
        }

        //an actual factory
        var f = {
            getAll: function(){
                return fakeData.tests;
            },
            search: function(query, count){
                var filtered = $filter('filter')(fakeData.tests, query);
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
                //update remote
                //if remote update successful update local
            },
            read: function(id){
                //grab data from the local array
                var results = $.grep(fakeData.tests, function(e){
                    return e.id === id;
                });
                if(results.length)
                    if(results.length > 0)
                        return angular.copy(results[0], {});
                //otherwise return false
                return false;
            },
            update: function(t){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.tests, function(e){
                    return e.id === t.id;
                });
                if(results){
                    var index = fakeData.tests.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.tests[index] = t;
                        return true;
                    }
                }
                return false;
            },
            delete: function(id){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.tests, function(e){
                    return e.id === id;
                });
                if(results){
                    var index = fakeData.tests.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.tests.splice(index, 1);
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