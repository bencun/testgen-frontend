define(['angular'], function(angular) {
    
    var createFactory = function($q, $http){
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
                templates: 'templates',
                users: 'users'
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
                //console.log("start is " + start);
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
            }
        };
        return f;
    };
    createFactory.$inject = ['$q', '$http'];

    return createFactory;
});