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
        //fake data for testing purposes
        var fakeData = {};
        //mock data
        fakeData.categories = CategoriesFactory.getAll();
        fakeData.questions = QuestionsFactory.getAll();
        fakeData.tests = TestsFactory.getAll();
        fakeData.users = UsersFactory.getAll();
        fakeData.userTests = UserTestsFactory.getAll();
       
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
                getAll: function(){
                    return UserTestsFactory.getAll();
                },
                search: function(query, count){
                    return UserTestsFactory.search(query, count);
                },
                read: function(id){
                    return UserTestsFactory.read(id);
                },
                update: function(t){
                    return UserTestsFactory.update(t);
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