define(['angular'], function(angular) {
    
    var createFactory = function($q, $http, $filter){
        //fake data for testing purposes
        var fakeData = {
            userTests:[
                {
                    name: "Junior full stack developer",
                    description: "This template is used during the full stack developer interview.",
                    timed: true,
                    timedTotal: true,
                    timedTotalTime: 45,
                    timedPerQuestion: true,
                    timedPerQuestionTime: 60,
                    user_id: 2,
                    questions: [
                        {
                            id: 1,
                            question: "What are the opening and the closing tag of the PHP file?",
                            note: "There are multiple correct answers.",
                            category: "Vanilla PHP",
                            difficulty: 3,
                            multiselect: true,
                            options: [
                                {
                                    option: "<!php",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "<?php",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "?>",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: ">>",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 37,
                            question: "Dummy question 36",
                            note: "Dummy question note, category 1 and difficulty 7",
                            category: "Vanilla PHP",
                            difficulty: 7,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 25,
                            question: "Dummy question 24",
                            note: "Dummy question note, category 1 and difficulty 5",
                            category: "Vanilla PHP",
                            difficulty: 5,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 5,
                            question: "Dummy question 4",
                            note: "Dummy question note, category 2 and difficulty 5",
                            category: "Vanilla JS",
                            difficulty: 5,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 14,
                            question: "Dummy question 13",
                            note: "Dummy question note, category 2 and difficulty 4",
                            category: "Vanilla JS",
                            difficulty: 4,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 33,
                            question: "Dummy question 32",
                            note: "Dummy question note, category 3 and difficulty 3",
                            category: "Laravel 5.x",
                            difficulty: 3,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 42,
                            question: "Dummy question 41",
                            note: "Dummy question note, category 3 and difficulty 2",
                            category: "Laravel 5.x",
                            difficulty: 2,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        },
                        {
                            id: 12,
                            question: "Dummy question 11",
                            note: "Dummy question note, category 3 and difficulty 2",
                            category: "Laravel 5.x",
                            difficulty: 2,
                            multiselect: false,
                            options: [
                                {
                                    option: "Dummy option 1",
                                    correct: false,
                                    selected: false
                                },
                                {
                                    option: "Dummy option 2",
                                    correct: false,
                                    selected: false
                                }
                            ]
                        }
                    ],
                    updated_at: "2017-11-14 11:50:34",
                    created_at: "2017-11-14 11:50:34",
                    id: 8
                }
            ]
        };
        for(i=2; i<=4; i++){
            fakeData.userTests.push({
                id: i,
                name: "Dummy test #" + i,
                description: "A dummy test description.",
                timed: true,
                timedTotal: true,
                timedTotalTime: 45,
                timedPerQuestion: false,
                timedPerQuestionTime: 60,
                questions:[
                    {
                        id: 1,
                        question: "Dummy question",
                        note: "There are multiple dummy answers.",
                        multiselect: true,
                        options:[
                            {
                                option: "Dummy 1",
                                correct: false
                            },
                            {
                                option: "Dummy 2",
                                correct: false
                            },
                            {
                                option: "Dummy 3",
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 2,
                        question: "Another dummy question",
                        note: "Select one dummy.",
                        multiselect: false,
                        options:[
                            {
                                option: "Yes",
                                correct: false
                            },
                            {
                                option: "No",
                                correct: false
                            }
                        ]
                    }
                ]
            });
        }

        //an actual factory
        var f = {
            getAll: function(){
                return fakeData.userTests;
            },
            search: function(query, count){
                var filtered = $filter('filter')(fakeData.userTests, query);
                filtered = $filter('orderBy')(filtered, '+name');
                filtered = $filter('limitTo')(filtered, count);
                return filtered;
                
            },
            read: function(id){
                //grab data from the local array
                var results = $.grep(fakeData.userTests, function(e){
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
                //if remote update successful update local data
            }
        };
        return f;
    };
    createFactory.$inject = ['$q', '$http', '$filter'];

    return createFactory;
});