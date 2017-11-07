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
            'app.admin.question': {
                templateUrl: '/scripts/sections/questions/views/question.html',
                url: '/question/:questionId',
                params: {
                    categoryId: null,
                    questionId: null
                },
                module: 'questions',
                controller: 'QuestionController'
            }
        }
    };
});