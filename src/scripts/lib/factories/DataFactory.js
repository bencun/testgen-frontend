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
            ],
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
            ],
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
            ],
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
            ],
            userTests:[
                {
                    id: 1,
                    name: "Junior full stack developer",
                    description: "This template is used during the full stack developer interview.",
                    timed: true,
                    timedTotal: true,
                    timedTotalTime: 1,
                    timedPerQuestion: true,
                    timedPerQuestionTime: 15,
                    questions:[
                        {
                            id: 1,
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
                                    correct: false
                                },
                                {
                                    option: "?>",
                                    correct: false
                                },
                                {
                                    option: ">>",
                                    correct: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            question: "Do global variables exist in Javascript?",
                            note: "Select one option.",
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
                        },
                        {
                            id: 3,
                            question: "How are you feeling?",
                            note: "Select one option.",
                            multiselect: false,
                            options:[
                                {
                                    option: "Great",
                                    correct: false
                                },
                                {
                                    option: "Awesome",
                                    correct: false
                                }
                            ]
                        }
                    ]
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
        console.log(fakeData);

        //an actual factory
        var f = {
            currentArray: [],
            perPage: 10,
            currentPage: 0,
            totalPages: 0,
            target: '',
            setTarget: function(t){
                f.target = t;
            },
            setTargetandLoad: function(t){
                f.target = t;
                return f.load();
            },
            setTargetAPI: function(t){
                f.target = '/api/'+t;
            },
            setTargetAPIandLoad: function(t){
                f.target = '/api/'+t;
                return f.load();
            },
            targets:{
                categories: 'categories',
                questions: 'questions',
                tests: 'tests',
                users: 'users',
                userTests: 'userTests'
            },
            load: function(dir){
                if(dir == null) {
                    start = 1;
                }
                if(dir == 'refresh'){
                    start = start;
                }
                if(dir == 'next'){
                    if(f.currentPage < f.totalPages)
                        start = ((f.currentPage) * f.perPage) + 1;
                    else
                        return {
                            items: f.currentArray,
                            currentPage: f.currentPage,
                            totalPages: f.totalPages
                        };
                }
                if(dir == 'prev'){
                    if(f.currentPage > 1)
                        start = ((f.currentPage-2) * f.perPage) + 1;
                    else
                        return {
                            items: f.currentArray,
                            currentPage: f.currentPage,
                            totalPages: f.totalPages
                        };
                }
                //array.slice also creates a new array with new objects and references!
                f.currentArray = fakeData[f.target].slice(start-1, start-1+f.perPage); //start-1 because of the dummy data array
                f.currentPage = Math.floor(start / f.perPage) + 1;
                f.totalPages = Math.floor(fakeData[f.target].length / f.perPage) + ((fakeData[f.target].length % f.perPage) > 0 ? 1 : 0);
                return {
                    items: f.currentArray,
                    currentPage: f.currentPage,
                    totalPages: f.totalPages
                };
            },
            categories:{
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
            },
            questions:{
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
            },
            tests:{
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
            },
            users:{
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
                        passwordConfirm: "",
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
            },
            userTests:{
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
            }
        };
        return f;
    };
    createFactory.$inject = ['$q', '$http', '$filter'];

    return createFactory;
});