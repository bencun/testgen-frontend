define([
    'angular'
], function(
    angular) {
    
    var createFactory = function(
        $q,
        $http,
        $filter,
        CategoriesFactory,
        QuestionsFactory,
        TestsFactory,
        UsersFactory,
        UserTestsFactory){
        
        var pagingArray = [];
       
        //an actual factory
        var f = {
            currentArray: [],
            perPage: 10,
            currentPage: 0,
            totalPages: 0,
            target: '',
            targetLoader: undefined,
            targetLoaderParam: null,
            setTarget: function(t, tlp){
                //empty the data array - next load function will fill it
                pagingArray = [];
                f.target = t;
                f.targetLoaderParam = tlp;
                if(t == f.targets.categories){
                    f.targetLoader = f.categories.getAll;
                }
                if(t == f.targets.questions){
                    f.targetLoader = f.questions.getAll;
                }
                if(t == f.targets.tests){
                    f.targetLoader = f.tests.getAll;
                }
                if(t == f.targets.users){
                    f.targetLoader = f.users.getAll;
                }
                if(t == f.targets.userTests){
                    f.targetLoader = f.userTests.getAllTemplates;
                }
            },
            targets:{
                categories: 'categories',
                questions: 'questions',
                tests: 'tests',
                users: 'users',
                userTests: 'userTests'
            },
            load: function(dir){
                //prepare stuff
                var deferred = $q.defer();
                if(dir == 'refresh'){
                    pagingArray = [];
                }
                //check if f.targetLoader is even set
                if(f.targetLoader == undefined){
                    deferred.reject("No targetLoader set.");
                    return;
                }

                //main pager logic when data is available;                
                var pagerLogic = function(){
                    //paging logic
                    if(dir == null) {
                        start = 1;
                    }
                    if(dir == 'refresh'){
                        start = start;
                    }
                    if(dir == 'next'){
                        if(f.currentPage < f.totalPages)
                            start = ((f.currentPage) * f.perPage) + 1;
                        else{
                            deferred.resolve({
                                items: f.currentArray,
                                currentPage: f.currentPage,
                                totalPages: f.totalPages
                            });
                            return;
                        }
                    }
                    if(dir == 'prev'){
                        if(f.currentPage > 1)
                            start = ((f.currentPage-2) * f.perPage) + 1;
                        else{
                            deferred.resolve({
                                items: f.currentArray,
                                currentPage: f.currentPage,
                                totalPages: f.totalPages
                            });
                            return;
                        }
                    }
                    //array.slice also creates a new array with new objects and references!
                    f.currentArray = pagingArray.slice(start-1, start-1+f.perPage); //start-1 because of the dummy data array
                    f.currentPage = Math.floor(start / f.perPage) + 1;
                    f.totalPages = Math.floor(pagingArray.length / f.perPage) + ((pagingArray.length % f.perPage) > 0 ? 1 : 0);
                    deferred.resolve({
                        items: f.currentArray,
                        currentPage: f.currentPage,
                        totalPages: f.totalPages
                    });
                    return;
                };
                
                //check if we got the data or we need to fetch it
                if(pagingArray.length < 1){
                    //all potential targetLoaders tie in to the other factories' functions...
                    //...and all of those return a promise
                    f.targetLoader(f.targetLoaderParam).then(
                        function(response){
                            pagingArray = response;
                            pagerLogic();
                        },
                        function(response){
                            console.debug("Fetching data from targetLoader failed miserably.");
                            deferred.reject(response);
                        }
                    );
                }
                else{
                    pagerLogic();
                }
                //return the promise
                return deferred.promise;
            },  //load
            categories:{
                getAll: function(){
                    return CategoriesFactory.getAll();
                },
                search: function(query, count){
                    return CategoriesFactory.search(query, count);
                    
                },
                new: function(){
                    return CategoriesFactory.new();
                },
                create: function(cat){
                    return CategoriesFactory.create(cat);
                },
                read: function(id){
                    return CategoriesFactory.read(id);
                },
                update: function(cat){
                    return CategoriesFactory.update(cat);
                },
                delete: function(id){
                    return CategoriesFactory.delete(id);
                }
            },
            questions:{
                getAll: function(catId){
                    return QuestionsFactory.getAll(catId);
                },
                search: function(query, count){
                    return QuestionsFactory.search(query, count);
                },
                new: function(categoryId){
                    return QuestionsFactory.new(categoryId);
                },
                create: function(q){
                    return QuestionsFactory.create(q);
                },
                read: function(id){
                    return QuestionsFactory.read(id);
                },
                update: function(q){
                    return QuestionsFactory.update(q);
                },
                delete: function(id){
                    return QuestionsFactory.delete(id);
                }
            },
            tests:{
                getAll: function(){
                    return TestsFactory.getAll();
                },
                search: function(query, count){
                    return TestsFactory.search(query, count);
                },
                new: function(){
                    return TestsFactory.new();
                },
                create: function(t){
                    return TestsFactory.create(t);
                },
                read: function(id){
                    return TestsFactory.read(id);
                },
                update: function(t){
                    return TestsFactory.update(t);
                },
                delete: function(id){
                    return TestsFactory.delete(id);
                }
            },
            users:{
                getAll: function(){
                    return UsersFactory.getAll();
                },
                search: function(query, count){
                    return UsersFactory.search(query, count);
                },
                new: function(){
                    return UsersFactory.new();
                },
                create: function(u){
                    return UsersFactory.create(u);
                },
                read: function(id){
                    return UsersFactory.read(id);
                },
                update: function(u){
                    return UsersFactory.update(u);
                },
                delete: function(id){
                    return UsersFactory.delete(id);
                }
            },
            userTests:{
                search: function(query, count){
                    return UserTestsFactory.search(query, count);
                },
                getAllTemplates: function(){
                    return UserTestsFactory.getAllTemplates();
                },
                getTemplate: function(id){
                    return UserTestsFactory.getTemplate(id);
                },
                getAllGraded: function(){
                    return UserTestsFactory.getAllGraded();
                },
                getGraded: function(id){
                    return UserTestsFactory.getGraded(id);
                },
                updateFull: function(t){
                    return UserTestsFactory.updateFull(t);
                },
                updateQuestion: function(t){
                    return UserTestsFactory.updateQuestion(t);
                },
                generate: function(id){
                    return UserTestsFactory.generate(id);
                }
            }
        };
        return f;
    };
    createFactory.$inject = [
        '$q',
        '$http',
        '$filter',
        'CategoriesFactory',
        'QuestionsFactory',
        'TestsFactory',
        'UsersFactory',
        'UserTestsFactory'
    ];

    return createFactory;
});