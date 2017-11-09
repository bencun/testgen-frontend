define([], function() {
    return {
        defaultRoutePath: 'login',
        routes: {
            'login' : {
                templateUrl: '/scripts/sections/login/views/login.html',
                url: '/',
                module: 'login',
                controller: 'LoginController'
            },
            'app.admin.categories': {
                templateUrl: '/scripts/sections/categories/views/categories.html',
                url: '/categories',
                module: 'categories',
                controller: 'CategoriesController'
            },
            'app.admin.categories.search': {
                templateUrl: '/scripts/sections/categories/views/search.html',
                url: '/search/:searchQuery',
                params: {
                    searchQuery : null
                },
                module: 'categories',
                controller: 'CategoriesSearchController'
            },
            'app.admin.category': {
                templateUrl: '/scripts/sections/categories/views/category.html',
                url: '/categories/:categoryId',
                params: {
                    categoryId: null
                },
                module: 'categories',
                controller: 'CategoryController'
            },
            'app.admin.questions': {
                templateUrl: '/scripts/sections/questions/views/questions.html',
                url: '/questions/:categoryId',
                params: {
                    categoryId: null
                },
                module: 'questions',
                controller: 'QuestionsController'
            },
            'app.admin.questions.search': {
                templateUrl: '/scripts/sections/questions/views/search.html',
                url: '/questions/search/:searchQuery',
                params: {
                    searchQuery : null
                },
                module: 'questions',
                controller: 'QuestionsSearchController'
            },
            'app.admin.question': {
                templateUrl: '/scripts/sections/questions/views/question.html',
                url: '/question/:questionId',
                params: {
                    questionId: null,
                    categoryId: null
                },
                module: 'questions',
                controller: 'QuestionController'
            },
            'app.admin.tests': {
                templateUrl: '/scripts/sections/tests/views/tests.html',
                url: '/tests',
                module: 'tests',
                controller: 'TestsController'
            },
            'app.admin.tests.search': {
                templateUrl: '/scripts/sections/tests/views/search.html',
                url: '/tests/search/:searchQuery',
                params: {
                    searchQuery: null
                },
                module: 'tests',
                controller: 'TestsSearchController'
            },
            'app.admin.test': {
                templateUrl: '/scripts/sections/tests/views/test.html',
                url: '/test/:testId',
                params: {
                    testId: null
                },
                module: 'tests',
                controller: 'TestController'
            }
        }
    };
});