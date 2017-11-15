define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var fakeData = {
            questions:[
                {
                    id: 1,
                    categoryId: 1,
                    difficulty: 2,
                    question: "What are the opening and the closing tag of the PHP file?",
                    note: "There are multiple correct answers.",
                    multiselect: true,
                    options:[
                        {
                            option: "<!php",
                            correct: false
                        },
                        {
                            option: "<?php",
                            correct: true
                        },
                        {
                            option: "?>",
                            correct: true
                        },
                        {
                            option: ">>",
                            correct: false
                        }
                    ]
                }
            ]
        };
        for(i=2; i<=15; i++){
            fakeData.questions.push({
                id: i,
                categoryId: 1,
                difficulty: i % 10,
                question: "Dummy question #" + i,
                note: "There are multiple correct answers.",
                multiselect: true,
                options: [
                    {
                        option: "Option 1",
                        correct: false
                    },
                    {
                        option: "Option 2",
                        correct: true
                    },
                    {
                        option: "Option 3",
                        correct: true
                    }
                ]
            });
        }
        
        //an actual factory
        var f = {
            getAll: function(){
                return fakeData.questions;
            },
            search: function(query, count){
                var filtered = $filter('filter')(fakeData.questions, query);
                filtered = $filter('orderBy')(filtered, '+question');
                filtered = $filter('limitTo')(filtered, count);
                return filtered;
                
            },
            new: function(categoryId){
                return {
                    id: 0,
                    categoryId: categoryId,
                    difficulty: 5,
                    question: "",
                    note: "",
                    multiselect: false,
                    options:[]
                };
            },
            create: function(q){
                //update remote
                //if remote update successful update local
            },
            read: function(id){
                //grab data from the local array
                var results = $.grep(fakeData.questions, function(e){
                    return e.id === id;
                });
                if(results.length)
                    if(results.length > 0)
                        return angular.copy(results[0], {});
                //otherwise return false
                return false;
            },
            update: function(q){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.questions, function(e){
                    return e.id === q.id;
                });
                if(results){
                    var index = fakeData.questions.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.questions[index] = q;
                        return true;
                    }
                }
                return false;
            },
            delete: function(id){
                //update remote
                //if remote update successful update local
                var results = $.grep(fakeData.questions, function(e){
                    return e.id === id;
                });
                if(results){
                    var index = fakeData.questions.indexOf(results[0]);
                    if(index >= 0){
                        fakeData.questions.splice(index, 1);
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